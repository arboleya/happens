var name = 'arboleya:happens';

Package.describe({
  name: name,
  version: '0.6.0',
  summary: 'Super simple and tiny javascript event system',
  git: 'https://github.com/arboleya/happens',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.export('Happens');
  api.addFiles(['index.js', 'meteor.js']);
});

Package.onTest(function (api) {
  api.use(name);
  api.use('tinytest');
  api.addFiles('test/meteor.js');
});