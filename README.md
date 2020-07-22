# babel-plugin-prepend [![Build Status](https://travis-ci.org/marcospont/babel-plugin-prepend.svg?branch=master)](https://travis-ci.org/marcospont/babel-plugin-prepend)

> Babel plugin that allows a statement to be prepended on files during the transformation.


## Install

With [npm](https://npmjs.org/package/babel-plugin-prepend) do:

```
npm i babel-plugin-prepend --D
```


## Usage

The plugin accepts 2 options:

* prepend: mandatory option that needs to contain the statement to be prepended during transformation
* accept: a filter function to accept or deny transformation on files based on the file name

The prepend option needs to contain **1 single statement**.

If the accept option is not needed, the plugin can be added to .babelrc as follows:

```json
{
  "plugins": [
    [
      "prepend",
      {
        "prepend": "var a = 1;"
      }
    ]
  ]
}
```

If the 'accept' option is needed, then the plugin needs to be added to babel.config.js as follows:

```js
{
  plugins: [
    [
      prepend,
      {
        prepend: 'var a = 1;',
        accept: function(filename) {
          return true;
        }
      }
    ]
  ]
}
```


## Example

### Input

```js
var b = 2;
```

### Output

```js
var a = 1;
var b = 2;
```


## Contributing

Feel free to submit pull requests. When adding anything new, please remember to update the tests file.


## License

MIT © [Marcos Pont](https://github.com/marcospont)