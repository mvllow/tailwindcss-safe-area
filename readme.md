# tailwindcss-safe-area

Safe area inset utilities extending margin, padding, and height. The plugin provides base, offset, and or utilities for better adaptability across various scenarios.

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

This plugin extends the padding and margin utilities with three types:

1. **Base Utilities**: The base safe area inset utilities. These include the initial padding and margin utilities with the safe area in consideration. They can be used where you want the element to respect the safe area insets.

2. **Offset Utilities**: These utilities allow you to extend the base safe area inset by a given offset. This can be particularly useful when you want a bit more spacing than the safe area provides, for example in situations where you have a translucent UI over a background image or video and want to ensure important visual content isn't covered.

3. **Or Utilities**: These utilities let you specify a minimum value to use if it's greater than the safe area inset. This can be used when you have certain layout elements that should respect the safe area but should never be smaller than a certain size.

Here are some examples:

### Base utilities

```html
<header class="pt-safe">...</header>

<main class="px-safe">
	<p>ciao</p>
</main>

<footer class="pb-safe">...</footer>
```

### Offset utilities

The offset utilities can be used by appending `-offset-{value}` to the base utility. This applies an additional margin or padding equal to the specified value. For example, if you want to apply a right padding that is equal to the safe area inset plus 4 units of your spacing scale, you can use:

```html
<div class="pr-safe-offset-4">...</div>
```

### Or utilities

The or utilities can be used by appending `-or-{value}` to the base utility. This applies a margin or padding that is the larger of the safe area inset and the specified value. For example, if you want to apply a bottom padding that is the larger of the safe area inset and 8 units of your spacing scale, you can use:

```html
<div class="pb-safe-or-8">...</div>
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
| `min-h-screen-safe, h-screen-safe` | `calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))`<br>`-webkit-fill-available`                                                 |
| `*-safe-offset-{value}`            | `calc(env(safe-area-inset-*) + {value})`                                 |
| `*-safe-or-{value}`                | `max(env(safe-area-inset-*), {value})`                                   |

> Tip: To extend html content behind the safe area, set `viewport-fit=cover`

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

<details><summary><h4> Examples with generated output</h4></summary>

#### Base Utility Example

```html
<header class="pt-safe">...</header>
```

This applies a top padding to the header that is equal to the safe area inset at the top. The generated CSS would be:

```css
.pt-safe {
  padding-top: env(safe-area-inset-top);
}
```

#### Offset Utility Example

```html
<div class="pr-safe-offset-4">...</div>
```

This applies a right padding to the div that is equal to the safe area inset on the right plus 4 units of your spacing scale. Assuming your spacing scale unit is 8px (default in Tailwind CSS), the generated CSS would be:

```css
.pr-safe-offset-4 {
  padding-right: calc(env(safe-area-inset-right) + 1rem);
}
```

#### Or Utility Example

```html
<div class="pb-safe-or-8">...</div>
```

This applies a bottom padding to the div that is the larger of the safe area inset at the bottom and 8 units of your spacing scale. Assuming your spacing scale unit is 8px (default in Tailwind CSS), the generated CSS would be:

```css
.pb-safe-or-8 {
  padding-bottom: max(env(safe-area-inset-bottom), 2rem);
}
```

</details>

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
