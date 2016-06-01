module.exports.config = {
  framework: 'jasmine2',
  multiCapabilities: [{
    'browserName': 'chrome'
  }],
  directConnect: true,
  specs: ['../app/e2e/*.test.ts'],
  baseUrl: 'http://localhost:3001/',
  useAllAngular2AppRoots: true,
  jasmineNodeOpts: {defaultTimeoutInterval: (1000 * 5)}
};