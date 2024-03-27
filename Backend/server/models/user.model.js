const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelName = "User";

const dbConn = require("@plugins/mongoose.plugin").plugin.mainDbConn();

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      }
});

exports.Schema = dbConn.model(modelName,userSchema)