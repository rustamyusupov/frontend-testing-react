const path = require('path');
const fastify = require('fastify');
const Pug = require('pug');
const pointOfView = require('point-of-view');
const fastifyStatic = require('fastify-static');
const fatifyReverseRoutes = require('fastify-reverse-routes');
const fastifyMethodOverride = require('fastify-method-override');
const fastifyFormbody = require('fastify-formbody');
const qs = require('qs');
const _ = require('lodash');

const { generateData } = require('./lib/index.js');
const addRoutes = require('./routes.js');

const registerPlugins = (app) => {
  app
    .register(fatifyReverseRoutes.plugin)
    .register(fastifyFormbody, { parser: qs.parse })
    .register(fastifyStatic, {
      root: path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist'),
      prefix: '/assets/',
    })
    .register(pointOfView, {
      engine: {
        pug: Pug,
      },
      includeViewExtension: true,
      templates: path.join(__dirname, '..', 'server', 'views'),
      defaultContext: {
        route: (...args) => app.reverse(...args),
        _,
      },
    })
    .register(fastifyMethodOverride);
};

module.exports = () => {
  const app = fastify({
    logger: true,
  });

  registerPlugins(app);
  addRoutes(app, generateData());

  return app;
};
