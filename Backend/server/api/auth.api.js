const userModel = require("@models/user.model").Schema;

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

// const formValidator = require("@validator/form.validator");

module.exports = {
  // Create user

  createUser: {
    // validate: formValidator.createPatientValidation,
    pre: [
      {
        assign: "createUser",
        method: async (request, h) => {
          try {
            const { firstName, lastName, email, password } = request.payload;

            // Check if user with the same email already exists

            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
              return h
                .response({ error: "User with this email already exists" })
                .code(400);
            }

            // create new user

            const user = new userModel({
              firstName,
              lastName,
              email,
              password,
            });
            await user.save();
            return h
              .response({ message: "User created successfully" })
              .code(201);
          } catch (error) {
            return h.response({ error: error.message }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.createUser).code(200);
    },
  },

  // User login

  userLogin: {
    // validate: formValidator.getPatientValidation,
    pre: [
      {
        assign: "userLogin",
        method: async (request, h) => {
          const { email, password } = request.payload;
          try {
            // Check if user exists
            const user = await userModel.findOne({ email });
            // console.log(user);
            if (!user) {
              return h
                .response({ message: "Invalid email or password" })
                .code(500);
            }
            // Validate password

            // const validPassword = await bcrypt.compare(password, User.password);

            if (user.password !== password) {
              return h
                .response({ message: "Invalid email or password" })
                .code(500);
            }

            // Create and return JWT token

            const token = jwt.sign({ email: user.email }, "secretKey");
            return { token };
          } catch (error) {
            return h.response({ message: "Internal server error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.userLogin).code(200);
    },
  },
};
