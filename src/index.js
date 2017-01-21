
import path from 'path';

export default class WatchFilter {

  constructor(config) {
    config = config || {};

    this._projectDirectory = config.projectDirectory;
    if (this._projectDirectory === undefined) {
      throw new Error('projectDirectory must be defined');
    }

    // folder excludes
    config.folderExcludes = config.folderExcludes || [];
    this._folderExcludes = config.folderExcludes.map(function(string) {
      return new RegExp(string);
    });

    // file excludes
    config.fileExcludes = config.fileExcludes || [];
    this._fileExcludes = config.fileExcludes.map(function(string) {
      return new RegExp(string);
    });

    // bind `this` context
    this.filter = this.filter.bind(this);
  }

  /**
   * Filter function used by https://github.com/mikeal/watch
   */
  filter(f, stat) {
    var file = this._parseRelativePath(f);
    if (stat.isDirectory() && (
        this._isExcludedDirectory(file))
    ) {
      return false;
    } else if (stat.isFile() && (
        this._isExcludedFile(file))
    ) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Returns a new stirng of path relative to project root
   */
  _parseRelativePath(f) {
    return f.replace(this._projectDirectory, '');
  }

  /**
   * Indicates if directory is excluded from watch
   */
  _isExcludedDirectory(directory) {
    for (var i=0; i<this._folderExcludes.length; i++) {
      if (this._folderExcludes[i].test(directory)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Indicates if file is excluded from watch
   */
  _isExcludedFile(file) {
    for (var i=0; i<this._fileExcludes.length; i++) {
      if (this._fileExcludes[i].test(file)) {
        return true;
        break;
      }
    }
    return false;
  }

}
