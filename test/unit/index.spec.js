
import { expect, sinon } from '../support/test-utils';
import WatchFilter from '../../src/index';

describe('WatchFilter unit test', function() {

  const sandbox = sinon.sandbox.create();

  afterEach(function() {
    sandbox.restore();
  });

  it('construction without required `projectDirectory` option', function() {
    expect(() => new WatchFilter()).to.throw(Error);
  });

  it('default construction', function() {
    const watchFilter = new WatchFilter({
      projectDirectory: '/home/corey'
    });
    expect(watchFilter._folderExcludes).to.eql([]);
    expect(watchFilter._fileExcludes).to.eql([]);
  });

  it('construct folder excludes', function() {
    const watchFilter = new WatchFilter({
      projectDirectory: '/home/corey',
      folderExcludes: [
        '^node_modules'
      ]
    });
    expect(watchFilter._folderExcludes).to.eql([/^node_modules/g]);
    expect(watchFilter._isExcludedDirectory('src')).to.be.false;
    expect(watchFilter._isExcludedDirectory('node_modules')).to.be.true;
  });

  it('construct file excludes', function() {
    const watchFilter = new WatchFilter({
      projectDirectory: '/home/corey',
      fileExcludes: [
        '^\\.gitignore$'
      ]
    });
    expect(watchFilter._fileExcludes).to.eql([/^\.gitignore$/g]);
    expect(watchFilter._isExcludedFile('src/index.js')).to.be.false;
    expect(watchFilter._isExcludedFile('.gitignore')).to.be.true;
  });

  it('filter directory', function() {
    const watchFilter = new WatchFilter({
      projectDirectory: '/home/corey',
      folderExcludes: [
        'node_modules'
      ]
    });
    let shouldBeWatched = watchFilter.filter('/home/corey/node_modules', {
      isDirectory: () => true,
      isFile: () => false
    });
    expect(shouldBeWatched).to.be.false;
    shouldBeWatched = watchFilter.filter('/home/corey/.git', {
      isDirectory: () => true,
      isFile: () => false
    });
    expect(shouldBeWatched).to.be.true;
  });

  it('filter file', function() {
    const watchFilter = new WatchFilter({
      projectDirectory: '/home/corey',
      fileExcludes: [
        '.gitignore'
      ]
    });
    let shouldBeWatched = watchFilter.filter('/home/corey/node_modules', {
      isDirectory: () => true,
      isFile: () => false
    });
    expect(shouldBeWatched).to.be.true;
    shouldBeWatched = watchFilter.filter('/home/corey/.gitignore', {
      isDirectory: () => false,
      isFile: () => true
    });
    expect(shouldBeWatched).to.be.false;
  });

});
