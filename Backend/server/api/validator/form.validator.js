const Joi = require('joi');

// for create

const patientSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().required(),
  diseases: Joi.array().items(Joi.object({
    diseaseName: Joi.string().required(),
    medicines: Joi.array().items(Joi.object({
      medicineName: Joi.string()
    }))
  }))
});

const createPatientValidation = {
  payload: patientSchema
};


// for get

const getPatientValidation = {};

// for edit

const editPatientSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  sex: Joi.string(),
  diseases: Joi.array().items(Joi.object({
    diseaseName: Joi.string(),
    medicines: Joi.array().items(Joi.object({
      medicineName: Joi.string()
    }))
  }))
});

const editPatientValidation = {
  payload: editPatientSchema
};

// for delet


const deletePatientValidation = {
  params: Joi.object({
    id: Joi.string().required()
  })
};


module.exports = {
    createPatientValidation,
    getPatientValidation,
    editPatientValidation,
    deletePatientValidation
  
  };

