import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const execFileAsync = promisify(execFile);

try {
  await main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const storybooks = options.baseUrl
    ? [await readStorybook(options.baseUrl)]
    : await discoverStorybooks();

  if (storybooks.length === 0) {
    throw new Error(
      'No running Storybook server was found. Start Storybook or pass --base-url http://localhost:PORT.',
    );
  }

  const unmatchedQueries = [];
  const matches = [];

  for (const query of options.queries) {
    const queryMatches = storybooks.flatMap((storybook) =>
      matchStories(storybook, query),
    );

    if (queryMatches.length === 0) {
      unmatchedQueries.push(query);
    } else {
      matches.push(...queryMatches);
    }
  }

  if (unmatchedQueries.length > 0) {
    throw new Error(
      `No stories matched these queries:\n${JSON.stringify(unmatchedQueries, null, 2)}`,
    );
  }

  process.stdout.write(
    `${JSON.stringify(deduplicateMatches(matches), null, 2)}\n`,
  );
}

function parseOptions(args) {
  const parsed = {queries: []};

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (
      argument === '--story' ||
      argument === '--export' ||
      argument === '--base-url'
    ) {
      const value = args[index + 1];

      if (!value) {
        throw new Error(`${argument} requires a value.`);
      }

      if (argument === '--story') {
        parsed.queries.push({importPath: value});
      } else if (argument === '--export') {
        const query = parsed.queries.at(-1);

        if (!query) {
          throw new Error('--export must follow a --story argument.');
        }

        query.exportNames ??= [];
        query.exportNames.push(value);
      } else {
        parsed.baseUrl = value;
      }

      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (parsed.queries.length === 0) {
    throw new Error('Pass at least one --story PATH argument.');
  }

  return parsed;
}

async function discoverStorybooks() {
  if (process.platform !== 'win32') {
    throw new Error(
      'Automatic Storybook discovery currently supports Windows. Pass --base-url http://localhost:PORT.',
    );
  }

  const {stdout} = await execFileAsync('netstat.exe', ['-ano', '-p', 'tcp'], {
    encoding: 'utf8',
    windowsHide: true,
  });
  const ports = [
    ...new Set(
      stdout
        .split(/\r?\n/)
        .map((line) => line.trim().split(/\s+/))
        .filter(
          (columns) =>
            columns[0] === 'TCP' &&
            columns[3] === 'LISTENING' &&
            isLocalAddress(columns[1]),
        )
        .map((columns) => Number(columns[1].match(/:(\d+)$/)?.[1]))
        .filter(Number.isInteger),
    ),
  ];
  const discovered = await Promise.all(
    ports.map(async (port) => {
      for (const hostname of ['localhost', '127.0.0.1']) {
        try {
          return await readStorybook(`http://${hostname}:${port}`);
        } catch {
          continue;
        }
      }

      return undefined;
    }),
  );

  return discovered.filter(Boolean);
}

function isLocalAddress(endpoint) {
  const address = endpoint.replace(/:\d+$/, '');

  return (
    address === '0.0.0.0' ||
    address === '127.0.0.1' ||
    address === '[::]' ||
    address === '[::1]'
  );
}

async function readStorybook(baseUrl) {
  const normalizedBaseUrl = new URL(baseUrl);
  normalizedBaseUrl.pathname = '/';
  normalizedBaseUrl.search = '';
  normalizedBaseUrl.hash = '';

  const response = await fetch(new URL('index.json', normalizedBaseUrl), {
    signal: AbortSignal.timeout(750),
  });

  if (!response.ok) {
    throw new Error(
      `${normalizedBaseUrl.origin} returned ${response.status} for /index.json.`,
    );
  }

  const index = await response.json();

  if (!index?.entries || typeof index.entries !== 'object') {
    throw new Error(
      `${normalizedBaseUrl.origin} did not return a Storybook index.`,
    );
  }

  return {
    baseUrl: normalizedBaseUrl.origin,
    entries: Object.entries(index.entries)
      .filter(([, entry]) => entry.type === 'story')
      .map(([id, entry]) => ({id, ...entry})),
  };
}

function matchStories(storybook, query) {
  const entries = storybook.entries.filter((entry) =>
    pathsMatch(query.importPath, entry.importPath),
  );
  const selectedEntries = query.exportNames
    ? query.exportNames.flatMap((exportName) =>
        entries.filter((entry) => entry.exportName === exportName),
      )
    : entries;

  return selectedEntries.map((entry) => ({
    importPath: entry.importPath,
    exportName: entry.exportName,
    id: entry.id,
    managerUrl: `${storybook.baseUrl}/?path=/story/${entry.id}`,
    canvasUrl: `${storybook.baseUrl}/iframe.html?id=${entry.id}&viewMode=story`,
  }));
}

function pathsMatch(requestedPath, indexedPath) {
  const requested = normalizePath(requestedPath);
  const indexed = normalizePath(indexedPath);

  return (
    requested === indexed ||
    requested.endsWith(`/${indexed}`) ||
    indexed.endsWith(`/${requested}`)
  );
}

function normalizePath(value) {
  return value
    .replaceAll('\\', '/')
    .replace(/^\.\//, '')
    .replace(/\/+/g, '/')
    .toLowerCase();
}

function deduplicateMatches(values) {
  return [
    ...new Map(
      values.map((value) => [`${value.canvasUrl}:${value.exportName}`, value]),
    ).values(),
  ];
}
