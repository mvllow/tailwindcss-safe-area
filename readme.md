# tailwindcss-safe-area

Safe area inset utilities using the existing padding/margin syntax

## Getting started

```sh
npm install --dev tailwindcss-safe-area
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-safe-area'),
    // ...
  ],
}
```

## Usage

This plugin extends the padding and margin utilities.

Use the `*-safe` utilities:

```html
<header class="pt-safe">
  <h1>Ciao!</h1>
</header>

<main class="pb-safe">
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate itaque blanditiis eum
    aperiam velit eaque aliquam, ex harum quisquam. Et consequuntur ipsa accusamus provident quae
    magni, earum suscipit laboriosam aperiam!
  </p>
</main>
```

## Provided utilities

| Utilities          | Styles                                            |
| ------------------ | ------------------------------------------------- |
| `m-safe, p-safe`   | `env(safe-area-inset-{top, right, bottom, left})` |
| `mx-safe, px-safe` | `env(safe-area-inset-{right, left})`              |
| `my-safe, py-safe` | `env(safe-area-inset-{top, bottom})`              |
| `mt-safe, pt-safe` | `env(safe-area-inset-top)`                        |
| `mr-safe, pr-safe` | `env(safe-area-inset-right)`                      |
| `mb-safe, pb-safe` | `env(safe-area-inset-bottom)`                     |
| `ml-safe, pl-safe` | `env(safe-area-inset-left)`                       |
