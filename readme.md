# tailwindcss-safe-area

Safe area inset utilities extending margin, padding, and height

## Getting started

```sh
npm install --dev tailwindcss-safe-area
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
	theme: {},
	plugins: [require('tailwindcss-safe-area')],
}
```

## Usage

This plugin extends the padding and margin utilities.

Use the `*-safe` utilities:

```html
<header class="pt-safe">...</header>

<main class="px-safe">
	<p>ciao</p>
</main>

<footer class="pb-safe">...</footer>
```

## Provided utilities

| Utilities                          | Styles                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `m-safe, p-safe`                   | `env(safe-area-inset-{top, right, bottom, left})`                        |
| `mx-safe, px-safe`                 | `env(safe-area-inset-{right, left})`                                     |
| `my-safe, py-safe`                 | `env(safe-area-inset-{top, bottom})`                                     |
| `mt-safe, pt-safe`                 | `env(safe-area-inset-top)`                                               |
| `mr-safe, pr-safe`                 | `env(safe-area-inset-right)`                                             |
| `mb-safe, pb-safe`                 | `env(safe-area-inset-bottom)`                                            |
| `ml-safe, pl-safe`                 | `env(safe-area-inset-left)`                                              |
| `min-h-screen-safe, h-screen-safe` | `calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))` |
|                                    | `-webkit-fill-available`                                                 |

> Tip: To extend html content behind the safe area, set `viewport-fit=cover`

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

## Troubleshooting

The `h-screen-safe` and `min-h-screen-safe` utilities may not work as expected on Google Chrome. Add `height: -webkit-fill-available` on parent nodes:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    height: -webkit-fill-available;
  }

  body {
    height: -webkit-fill-available;
  }

  /* If using React, set height on the root div as well */
  #root {
    height: -webkit-fill-available;
  }
}
```
