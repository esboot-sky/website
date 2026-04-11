---
sidebar_position: 0
---

# Entry Files

## Matching Rule

ESBoot treats `*.entry.{tsx,ts}` files under the active platform root as page entries.

### SP Mode

In `SP`, the root is simply `src`:

```plaintext
src/
  ├── home.entry.tsx
  ├── about.entry.tsx
  └── ...
```

### MP Mode

In `MP`, the root depends on `platform` and `pageType`.

For example, if your `.env` contains:

```sh
ESBOOT_PLATFORM=mobile
ESBOOT_PAGE_TYPE=native
```

then ESBoot will resolve entries under `src/platforms/mobile/_native`.

### URL Mapping

If you have `home.entry.tsx`, the browser route becomes something like `http://localhost:8001/home.html`.

You can customize matching with:

- `ESBOOT_CONTENT_PATH`
- `ESBOOT_CONTENT_PATTERN`
- `ESBOOT_CONTENT_IGNORE`

See [Environment Variables](./environment-variables) for details.

## Page Metadata

Entry files can export metadata such as `title`, `template`, or `langJsonPicker`.

### Basic Example

```tsx
const HomePage = () => {
  return <div>Home Page</div>;
};

export default {
  title: 'Home',
};
```

### Supported Fields

#### title

Page title. Default: `filename | ESBoot APP`.

#### template

Selects the HTML template.

Defaults:

- `SP`: `config/template/index.html`
- `MP`: `config/{platform}/template/index.html`

#### name

The unique resource name for the page. Defaults to the filename.

#### langJsonPicker

An array of i18n key prefixes to load selectively.

```tsx
export default {
  langJsonPicker: ['common', 'home.title', 'home.description'],
};
```

#### urlParams

Additional query parameters appended to the page URL.

```tsx
export default {
  urlParams: '?a=1&b=2',
};
```

## More

To learn about page rendering capabilities such as `SSG` and future `SSR`, continue with [Rendering](./rendering).
