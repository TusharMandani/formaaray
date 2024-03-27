const patientModel = require("@models/patient.model").Schema;

const formValidator = require("@validator/form.validator");

module.exports = {
  // Create Patient

  createPatient: {
    validate: formValidator.createPatientValidation,
    pre: [
      {
        assign: "createPatient",
        method: async (request, h) => {
          try {
            const patient = new patientModel(request.payload);
            // console.log(patient);
            await patient.save();
            return h
              .response({ message: "Patient info saved successfully!" })
              .code(201);
          } catch (error) {
            return h.response({ message: "Internal server error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.createPatient).code(200);
    },
  },

  // Get Patient detail

  getPatient: {
  validate:formValidator.getPatientValidation,
    pre: [
      {
        assign: "getPatient",
        method: async (request, h) => {
          try {
            const patientData = await patientModel.find({});
            return h.response(patientData).code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.getPatient).code(200);
    },
  },

  // Edit patient data

  editPatient: {
    validate:formValidator.editPatientValidation,
    pre: [
      {
        assign: "editPatient",
        method: async (request, h) => {
          try {
            const patientId = request.params.id;
            const updateData = request.payload;

            const updatedPatient = await patientModel.findByIdAndUpdate(
              patientId,
              updateData,
              { new: true }
            );

            if (!updatedPatient) {
              return h.response({ error: "Patient data not found!" }).code(404);
            }
            return h
              .response({ message: "Patient data updated successfully" })
              .code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.editPatient).code(200);
    },
  },
  // Delete patient data

  deletePatient: {
  validate:formValidator.deletePatientValidation,

    pre: [
      {
        assign: "deletepatient",
        method: async (request, h) => {
          try {
            const patientId = request.params.id;
            const deletepatient = await patientModel.findByIdAndDelete(
              patientId
            );

            if (!deletepatient) {
              return h.response({ error: "PatientData not deleted!" });
            }
            return h.response({ message: "PatientData deleted successfully!" });
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deletepatient).code(200);
    },
  },
};
