# @k9o/extension-client — Changelog

## 1.5.0 (unreleased)

### Changed

- The package is renamed from `@k9o/extensions` to `@k9o/extension-client`, so its name says its job: calling an installed extension by slug. `k9o.extension(slug)` in `@k9o/core` is unchanged. The runtime package for writing an extension is `@k9o/extension-runtime`.

### Removed

- The `cairn` binding, its `./cairn` import and the `CairnExtension` type. The extension it described has been retired. `ExtensionSlug` is now `"paperless"`.

### Changed

- README and package description rewritten to describe what the package contains.
