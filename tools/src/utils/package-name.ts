/**
 * Derives a package name from a project path.
 *
 * Package name = `@lair/` + kebab-joined path segments after `libs/`:
 * - `libs/ui-kit` -> `@lair/ui-kit`
 * - `libs/shared/util` -> `@lair/shared-util`
 * - `libs/features/payroll/common` -> `@lair/features-payroll-common`
 */
export function derivePackageName(projectPath: string): string {
  const segments = projectPath.replace(/\\/g, '/').split('/');
  const libsIndex = segments.indexOf('libs');
  const nameSegments =
    libsIndex !== -1 ? segments.slice(libsIndex + 1) : segments;
  return `@lair/${nameSegments.join('-')}`;
}
