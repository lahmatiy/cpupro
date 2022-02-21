## next

- Added support for Chromium Developer Tools profile format (Trace Event Format)
- Added flame chart
- Fixed time deltas processing
- Fixed module path processing
- Fixed total time computation for areas, packages, modules and functions
- Reworked aggregations for areas, packages, modules and functions

## 0.1.1 (2022-02-07)

- Added missed `bin` field
- Renamed profile recording method `end()` into `profileEnd()` for less confussion
- Fixed a crash in viewer when an element in `nodes` doesn't contain a `children` field, e.g. when DevTools protocol is used
- Fixed file module path normalization in viewer
- Removed modification of `startTime` and `endTime` in recorded profile
- Exposed `createReport()` method

## 0.1.0 (2022-02-07)

- Initial release