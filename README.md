# esm-pkg

> Find all dependent packages with an ESM output.

This is typically used for the combination of webpack and babel-loader because webpack can recognize the ESM version of a package and we had to manually include those modules into babel-loader to get them transformed.

With esm-pkg, this can be easier and we don't have to manually add new packages to the `include` whitelist even the depedencies are updated with another package supporting ESM.

## Usage

```shell
~ npm i -D esm-pkg
```

We can use esm-pkg in `webpack.config.js` like this:

```js
const esmPkg = require('esm-pkg')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// ...
module.exports = {
  // Other configs...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          ...esmPkg(__dirname).map(pkg => resolve(`node_modules/${pkg}`))
        ]
      }
    ]
  }
}
```

## Options

You can specify the second param as the option object:

```js
esmPkg(__dirname, {
  moduleFields: ['module']
})
```

* `moduleFields`

  If the corresponding key is found in a package's `package.json` file, we'll assume it supports ESM output. Default value: `['module', 'jsnext:main']`.

## License

[MIT](./LICENSE).
