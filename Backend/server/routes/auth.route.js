"use strict";

const Joi = require("joi");
// Never take constants here
module.exports = {
  plugin: {
    async register(server, option) {
      const API = require("@api/auth.api");
      server.route([
        // Create User

        {
          method: "POST",
          path: "/register",
          config: {
            // auth: 'auth',
            plugins: {
              // policies:['log.policy'],
            },
            tags: ["api", "patient"],
            description: "patient form",
            notes: "patient information get",
            // validate: API.createPatient.validate,
            pre: API.createUser.pre,
            handler: API.createUser.handler,
          },
        },

        // User login

        {
          method: "Post",
          path: "/login",
          config: {
            // auth: 'auth',
            plugins: {
              // policies:['log.policy'],
            },
            tags: ["api", "patient"],
            description: "patient form",
            notes: "patient information get",
            // validate: API.getPatient.validate,
            pre: API.userLogin.pre,
            handler: API.userLogin.handler,
          },
        },
      ]);
    },
    version: require("../../package.json").version,
    name: "auth-routes",
  },
};
