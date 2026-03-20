import {joinPathFragments, normalizePath, workspaceRoot} from '@nx/devkit';
import {relative} from 'path';

function getRelativeCwd(): string {
  const normalizedRoot = normalizePath(workspaceRoot);
  const cwd = normalizePath(process.env.INIT_CWD ?? '').startsWith(
    normalizedRoot,
  )
    ? process.env.INIT_CWD!
    : process.cwd();
  return normalizePath(relative(workspaceRoot, cwd));
}

/**
 * Resolves a user-provided path to a workspace-relative path,
 * accounting for the working directory (e.g., WebStorm's cwd option
 * in the Nx Generate UI sets INIT_CWD).
 *
 * If the path already starts with the cwd prefix, it's returned as-is.
 * Otherwise the cwd is prepended.
 */
export function resolvePath(path: string): string {
  const normalized = normalizePath(path.replace(/^\.\//, ''));
  const relativeCwd = getRelativeCwd();
  if (!relativeCwd || normalized.startsWith(`${relativeCwd}/`)) {
    return normalized;
  }
  return joinPathFragments(relativeCwd, normalized);
}
