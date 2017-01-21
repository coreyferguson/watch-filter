
import { expect, sinon } from '../support/test-utils';
import instance, { WatchFilter } from '../../src/index';

describe('WatchFilter unit test', function() {

  const sandbox = sinon.sandbox.create();

  afterEach(function() {
    sandbox.restore();
  });

  it('testing the constructor', function() {
    expect(new WatchFilter()._myName).to.be.eql('world');
    expect(new WatchFilter('corey')._myName).to.eql('corey');
  });

  it('using sinon', function() {
    // replace console.log with a spy we can question later
    const spy = sandbox.stub(console, 'log');
    instance.sayHello();
    expect(spy).to.be.calledOnce;
  });

  it('handling promises', function() {
    const beforeMs = new Date().getTime();
    // be sure to return your promise chain
    return instance.timeout(10).then(() => {
      const afterMs = new Date().getTime();
      expect(afterMs - beforeMs)
        .to.be.above(9)
        .and.to.be.below(15);
    });
  });

  it('using chai-as-promised', function() {
    return Promise.all([
      expect(instance.fulfill()).to.eventually.eql('yay'),
      expect(instance.reject()).to.eventually.be.rejectedWith(/boo/)
    ]);
  });

});
