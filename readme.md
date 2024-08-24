# tailwindcss-safe-area

Tailwind CSS utilities for safe areas.

## Features

- **Responsive safe area utilities** tailored for margin, padding, height and position
- **Flexible spacing helpers** to extend safe areas or ensure content remains unobstructed with offset and minimum value variants
- **Modern CSS support**, including `inline-start`, `inline-end`, `scroll-margin`, `scroll-padding` and more to handle modern layouts

## Getting started

```sh
npm install --dev tailwindcss-safe-area
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

Handle safe area margin, padding, height and position.

```html
<header class="pt-safe">...</header>
<main class="px-safe">...</main>
<footer class="pb-safe">...</footer>
```

### Offset utilities

Extend base utilities with an additional offset.

```html
<div class="pr-safe-offset-4">...</div>
```

This adds right padding equal to the safe area plus `4`.

### Or utilities

Apply a minimum value while respecting the safe area.

```html
<div class="pb-safe-or-8">...</div>
```

This adds bottom padding equal to the larger of the safe area or `8`.

## Generated styles

### Margin

```css
.m-safe {
	margin-top: env(safe-area-inset-top);
	margin-right: env(safe-area-inset-right);
	margin-bottom: env(safe-area-inset-bottom);
	margin-left: env(safe-area-inset-left);
}
.mx-safe {
	margin-right: env(safe-area-inset-right);
	margin-left: env(safe-area-inset-left);
}
.my-safe {
	margin-top: env(safe-area-inset-top);
	margin-bottom: env(safe-area-inset-bottom);
}
.ms-safe {
	margin-inline-start: env(safe-area-inset-left);
}
.me-safe {
	margin-inline-end: env(safe-area-inset-left);
}
.mt-safe {
	margin-top: env(safe-area-inset-top);
}
.mr-safe {
	margin-right: env(safe-area-inset-right);
}
.mb-safe {
	margin-bottom: env(safe-area-inset-bottom);
}
.ml-safe {
	margin-left: env(safe-area-inset-left);
}
```

### Scroll margin

Same as [margin](#margin), prefixed with `scroll-`.

### Padding

```css
.p-safe {
	padding-top: env(safe-area-inset-top);
	padding-right: env(safe-area-inset-right);
	padding-bottom: env(safe-area-inset-bottom);
	padding-left: env(safe-area-inset-left);
}
.px-safe {
	padding-right: env(safe-area-inset-right);
	padding-left: env(safe-area-inset-left);
}
.py-safe {
	padding-top: env(safe-area-inset-top);
	padding-bottom: env(safe-area-inset-bottom);
}
.ps-safe {
	padding-inline-start: env(safe-area-inset-left);
}
.pe-safe {
	padding-inline-end: env(safe-area-inset-left);
}
.pt-safe {
	padding-top: env(safe-area-inset-top);
}
.pr-safe {
	padding-right: env(safe-area-inset-right);
}
.pb-safe {
	padding-bottom: env(safe-area-inset-bottom);
}
.pl-safe {
	padding-left: env(safe-area-inset-left);
}
```

### Scroll padding

Same as [padding](#padding), prefixed with `scroll-`.

### Height

```css
.min-h-screen-safe {
	min-height: calc(
		100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom))
	);
	min-height: -webkit-fill-available;
}
.max-h-screen-safe {
	max-height: calc(
		100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom))
	);
	max-height: -webkit-fill-available;
}
.h-screen-safe {
	height: calc(
		100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom))
	);
	height: -webkit-fill-available;
}
```

### Position

```css
.inset-safe: {
	top: env(safe-area-inset-top);
	right: env(safe-area-inset-right);
	bottom: env(safe-area-inset-bottom);
	left: env(safe-area-inset-left);
}
.inset-x-safe: {
	right: env(safe-area-inset-right);
	left: env(safe-area-inset-left);
}
.inset-y-safe: {
	top: env(safe-area-inset-top);
	bottom: env(safe-area-inset-bottom);
}
.start-safe: {
	inset-inline-start: env(safe-area-inset-left);
}
.end-safe: {
	inset-inline-end: env(safe-area-inset-left);
}
.top-safe: {
	top: env(safe-area-inset-top);
}
.right-safe: {
	right: env(safe-area-inset-right);
}
.bottom-safe: {
	bottom: env(safe-area-inset-bottom);
}
.left-safe: {
	left: env(safe-area-inset-left);
}
```

### Variants

Spacing-based utiltiies can be augmented with either `-offset-{value}` or `-or-{value}` suffixes.

For example, using Tailwind's default spacing scale:

```css
.mr-safe-offset-8 {
	margin-right: calc(env(safe-area-inset-right) + 2rem);
}
.pb-safe-or-20 {
	padding-bottom: max(env(safe-area-inset-right), 5rem);
}
```

## Troubleshooting

The height utilities may not always work as expected. Add the following global CSS for the correct behaviour:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	html,
	body,
	#root {
		height: -webkit-fill-available;
	}
}
```
