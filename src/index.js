
// This is the `main` NPM class to be transcoded into `babel/index.js`

// Export the class to enable test of constructor
export class WatchFilter {

  constructor(myName) {
    this._myName = myName || 'world';
  }

  sayHello() {
    console.log(`Hello ${this._myName}`);
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fulfill() {
    return Promise.resolve('yay');
  }

  reject() {
    return Promise.reject(new Error('boo'));
  }

}

// Export a singleton instance
// This makes stubbing functions easy in tests.
const instance = new WatchFilter();
export default instance;
