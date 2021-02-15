# tailwindcss-safe-area

A plugin that provides utilities for adding env(safe-area-inset-{top,right,bottom,left})

## Installation

Install the plugin from npm:

```sh
# Using npm
npm install tailwindcss-safe-area

# Using Yarn
yarn add tailwindcss-safe-area
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

> Shares the same api as margin (`m`) & padding (`p`)
> Examples: `m-safe` `px-safe` `pb-safe`

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
