
var path = require('path');
var WatchFilter = require('../babel/index').default;
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
