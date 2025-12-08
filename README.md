# tailwindcss-safe-area

Tailwind CSS utilities for safe areas.

## Features

- **Responsive safe area utilities** tailored for margin, padding, height and position
- **Flexible spacing helpers** using `offset` and `or` variants that adapt to safe areas
- **Modern CSS support** including [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) and [scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)

## Getting started

### For Tailwind CSS v4

```sh
npm install tailwindcss-safe-area
```

Import the CSS plugin directly in your main CSS file:

```css
@import "tailwindcss";
@import "tailwindcss-safe-area";
```

_Note: we use `@import` above rather than `@plugin`_

### For Tailwind CSS v3

```sh
# Latest version with v3 support
npm install tailwindcss-safe-area@0.8.0
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
	theme: {},
	plugins: [require("tailwindcss-safe-area")],
};
```

## Usage

To extend content behind the safe area, add or append `viewport-fit=cover` to your viewport meta tag:

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

### Base utilities

Handle safe area margin, padding, height and position:

```html
<header class="pt-safe">...</header>
<main class="px-safe">...</main>
<footer class="pb-safe">...</footer>
```

### Offset utilities

Extend base utilities with an additional offset:

```html
<div class="pr-safe-offset-4">...</div>
```

This adds right padding equal to the safe area plus `4`.

### Or utilities

Apply a minimum value while respecting the safe area:

```html
<div class="pb-safe-or-8">...</div>
```

This adds bottom padding equal to the larger of the safe area or `8`.

## Available utilities

### Margin and padding

- `m-safe`, `mx-safe`, `my-safe`, `ms-safe`, `me-safe`
- `mt-safe`, `mr-safe`, `mb-safe`, `ml-safe`
- `p-safe`, `px-safe`, `py-safe`, `ps-safe`, `pe-safe`
- `pt-safe`, `pr-safe`, `pb-safe`, `pl-safe`

**With variants:**

- Add `-offset-{value}` for additional spacing (e.g. `pt-safe-offset-4`)
- Add `-or-{value}` for minimum values (e.g. `pb-safe-or-8`)

### Scroll margin and padding

Same as margin/padding utilities, prefixed with `scroll-`:

- `scroll-m-safe`, `scroll-mx-safe`, `scroll-my-safe`, etc.
- `scroll-p-safe`, `scroll-px-safe`, `scroll-py-safe`, etc.

### Height

**Screen utilities:**

- `h-screen-safe`, `min-h-screen-safe`, `max-h-screen-safe`

**Viewport utilities:**

- `h-vh-safe`, `h-dvh-safe`, `h-svh-safe`, `h-lvh-safe`
- `min-h-vh-safe`, `min-h-dvh-safe`, `min-h-svh-safe`, `min-h-lvh-safe`
- `max-h-vh-safe`, `max-h-dvh-safe`, `max-h-svh-safe`, `max-h-lvh-safe`

**`-webkit-fill-available` utilities:**

- `h-fill-safe`, `min-h-fill-safe`, `max-h-fill-safe`

### Position

- `inset-safe`, `inset-x-safe`, `inset-y-safe`
- `start-safe`, `end-safe`
- `top-safe`, `right-safe`, `bottom-safe`, `left-safe`

**With variants:**

- Add `-offset-{value}` for additional spacing (e.g., `top-safe-offset-4`)
- Add `-or-{value}` for minimum values (e.g., `inset-safe-or-8`)

### Border

- `border-safe`, `border-x-safe`, `border-y-safe`
- `border-s-safe`, `border-e-safe`
- `border-t-safe`, `border-r-safe`, `border-b-safe`, `border-l-safe`

**With variants:**

- Add `-offset-{value}` for additional spacing (e.g., `border-t-safe-offset-4`)
- Add `-or-{value}` for minimum values (e.g., `border-safe-or-8`)

### Enable/disable safe area

- `safe`, `safe-x`, `safe-y`
- `safe-t`, `safe-r`, `safe-b`, `safe-l`
- `safe-none`, `safe-x-none`, `safe-y-none`
- `safe-t-none`, `safe-r-none`, `safe-b-none`, `safe-l-none`
