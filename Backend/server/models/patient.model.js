const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelName = "Patient";

const dbConn = require("@plugins/mongoose.plugin").plugin.mainDbConn();

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  diseases: [
    {
      diseaseName: {
        type: String,
        required: true,
      },
      medicines: [{ medicineName: String }],
    },
  ],
});

exports.Schema = dbConn.model(modelName,patientSchema)