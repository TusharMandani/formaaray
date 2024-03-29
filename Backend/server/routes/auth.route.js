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
            tags: ["api", "register user"],
            description: "user registration form",
            notes: "user data saved",
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
            tags: ["api", "login"],
            description: "login form",
            notes: "user login form",
            // validate: API.getPatient.validate,
            pre: API.userLogin.pre,
            handler: API.userLogin.handler,
          },
        },

        // Reset password

        {
          method: "POST",
          path: "/resetpassword",
          config: {
            // auth: 'auth',
            plugins: {
              // policies:['log.policy'],
            },
            tags: ["api", "reset password"],
            description: "reset password form",
            notes: "user reset password",
            // validate: API.createPatient.validate,
            pre: API.resetPassword.pre,
            handler: API.resetPassword.handler,
          },
        },
      ]);
    },
    version: require("../../package.json").version,
    name: "auth-routes",
  },
};
