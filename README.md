
# watch-filter

## Summary

[Watch](https://github.com/mikeal/watch) filter for excluding files and folders by regular expressions.

## Install

```bash
npm install --save-dev watch watch-filter
```

## Usage

**`package.json`:**:

```json
{
  "scripts": {
    "test": "...",
    "watchTest": "node_modules/.bin/watch 'npm test' --filter=config/watch-filter.js"
  }
}
```

**`config/watch-filter.js`:**

```javascript
var path = require('path');
var WatchFilter = require('watch-filter').default;
const watchFilter = new WatchFilter({

  projectDirectory: path.join(__dirname, '..'),

  folderExcludes: [
    '^node_modules',
    '^.git',
    '^coverage'
  ],

  fileExcludes: [
    '^config/watch-filter.json$',
    '^package.json$'
  ]

});
module.exports = watchFilter.filter;
```

## Contribution

Contribution documentation can be found [here](CONTRIBUTE.md).
