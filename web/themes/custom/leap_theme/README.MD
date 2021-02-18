# LEAP Theme

- [Prerequisites](#prerequisites)
- [Building the theme](#building the theme)
- [Overrides](#overrides)
- [References](#references)

## Prerequisites
- [nvm]
- [npm]
- [Gulp]
- [Sass]

## Building the theme

`npm install`

If you encounter `Error: Node Sass does not yet support your current environment` you may have to run `npm rebuild node-sass`.

`npm run theme:build` for one-time theme building.

`npm run theme:watch` to build and start a watcher.

## Overrides

Details of folder structure, framework overrides may go here.

## Updating Bootstrap (for Bootstrap-based themes)

Download and extract the **latest** version of [Bootstrap Framework Source Files] into `bootstrap` folder.

**WARNING:** Do not modify files inside `bootstrap` to allow easy upgrades in the future.

## References
- [nvm]
- [npm]
- [Gulp]
- [Sass]
- [Bootstrap Framework]
- [Bootstrap Framework Source Files]

[nvm]: https://github.com/nvm-sh/nvm
[npm]: https://npmjs.com
[Gulp]: https://gulpjs.com/
[Sass]: http://sass-lang.com
[Bootstrap Framework]: https://getbootstrap.com/
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap-sass
