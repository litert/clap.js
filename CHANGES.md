# Changes Logs

[Dep:LRT.Core]: https://github.com/litert/core.js

## v1.2.1

- config(deps): updated the development deps.
- config(deps): replaced exception with "@litert/exception".
- config(project): use prepublishOnly hook instead of prepare.

## v1.2.0

- Use the counter as the output of flags.

## v1.1.0

- Fixed: Removed the extra blank lines for empty segments.
- Added: Arguments limitation for each commands.
- Replaced: Switched to ESLint instead of the deprecated TSLint.

## v1.0.1

- Fixed: The trailing arguments after `--` should be wrapped by quotes.

## v1.0.0

- Upgraded [`@litert/core`][Dep:LRT.Core] to the v1.0.x.
- Refactored the APIs, for more easier usage.
- Added unlimited commands supports.

## v0.2.2

- Upgraded [`@litert/core`][Dep:LRT.Core] to the v0.6.0.

## v0.2.1

- Upgraded [`@litert/core`][Dep:LRT.Core] to the v0.3.x.
- Upgraded TypeScript to the v2.7.x.

## v0.2.0

- Now allows that only options input without commands in command mode.

## v0.1.1

- Update the dependencies.

## v0.1.0

- Restructured the exposed interfaces.
- Added LICENSING in comments for every file.
- Added comments for source code.
- Added documents in simplified Chinese.
- Updated dependency [`@litert/core`][Dep:LRT.Core] to **0.1.1** version.
- Fixed bug: Compacted shortnames doesn't work.
