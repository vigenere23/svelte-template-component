![Build](https://github.com/vigenere23/gabio-design-svelte/workflows/Build/badge.svg)
![NPM publish](https://github.com/vigenere23/gabio-design-svelte/workflows/NPM%20publish/badge.svg)
[![npm version](https://badge.fury.io/js/%40gabio%2Fdesign-svelte.svg)](https://badge.fury.io/js/%40gabio%2Fdesign-svelte)

# [@gabio/design-svelte](https://www.npmjs.com/package/@gabio/design-svelte)

☠️ A killer Svelte design library!

## Installation

```
yarn add @gabio/design-svelte
```

## Prerequisites

- A Typescript Svelte 3.x app created from [the official template](https://github.com/sveltejs/template) (plus some tweaks, see <https://github.com/sveltejs/component-template/issues/29#issuecomment-704292134>)
- SCSS support with postcss setup

For a working App setup, you can inspire yourself from mine : <https://github.com/vigenere23/gabio-web-svelte>

## Documentation

> Will be completed soon

## Preparation

In order to use all the features this package offers, you'll need to do some more steps.

### Icons

The `GioIcon` component uses the [font-awesome](https://fontawesome.com/icons?d=gallery) icon library. You can decide to use either the free or premium version, or you can even create an adapter to provide _your own icons_. It will always look for icons that have been registered in the `IconRegistry` static class.

#### Using the `IconRegistry`

In order to make icons available by their name, you need to first register them with the `IconRegistry.registerIcons()`. This should be done at the app's startup, most probably in your `main`, `index` or `entry` file.

This method accepts a dictionnary of `name: IconDefinition` with the later provided by the font-awesome libreary itself. Its interface looks like this :

```
export interface IconDefinition extends IconLookup {
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    IconPathData // svgPathData
  ];
}
```

#### Usage example

```ts
// main.ts

import App from './App.svelte'

import { FaIconRegistry } from '@gabio/design-svelte/src/lib/faicon-registry'
import { faHome, faCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faBehance } from '@fortawesome/free-brands-svg-icons'

FaIconRegistry.registerIcons({
  faHome,
  faCode,
  faGithub,
  faBehance
})

const app = new App({
  target: document.getElementById('app')
})

export default app
```

#### Optimizing the use of font-awesome icons

With the above example, your bundler will likely bundle the entire stack of icons provided by the two libraries. To optimize your bundle size, you should import each icon individually.

```ts
import { FaIconRegistry } from '@gabio/design-svelte/src/lib/faicon-registry'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faBehance } from '@fortawesome/free-brands-svg-icons/faBehance'

FaIconRegistry.registerIcons({
  faHome,
  faCode,
  faGithub,
  faBehance
})
```

### Code blocks

The `GioCodeBlock` component uses [`prismjs`](https://prismjs.com/) under the hood to tokenize code texts into stylable html. For optimization reasons, it does not use the npm package, but rather a minified custom build that supports the most popular languages. These include :

- C, C#, C++
- Java
- Python
- Ruby
- Javascript, Typescript
- Bash, Shell
- Markdown
- HTML, CSS
- ...and more

If you would like to see more languages added, please create an issue. Future plans are to provide an interface to supply your own build of `prism`.

#### Styling code blocks

This library offers an adapted version of the popular (and beautiful) [One Dark theme](https://atom.io/themes/one-dark-ui) by Atom. The style source (in SCSS) is offered [here](./src/styles/code-themes/one-dark-prism.scss).

To apply a style, simply import it in your `App.svelte` component **as global rules**.

```html
<style lang="scss" global>
  @import '@gabio/design-svelte/src/styles/reset';
  @import '@gabio/design-svelte/src/styles/code-themes/one-dark-prism';
</style>
```

### Markdown transpiler

The library provides a `GioSvelteMarkdownParser` for parsing markdown content to this library's components. It also works marvelously with the [@gabio/markdown-parser](https://www.npmjs.com/package/@gabio/markdown-transpiler). Give it a try!

## Enjoy!

This project was made by Gabriel St-Pierre ([@vigenere23](https://github.com/vigenere23)) as an open source design library. I hope it can inspire you or make you better understand the Svelte ecosystem!
