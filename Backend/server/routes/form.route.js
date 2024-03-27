// const formAPI = require('../api/form.api');

// const formRoute = [
//     {
//         method:'POST',
//         path:'/patient',
//         handler:formAPI.createPatient
//     },
//     {
//         method:'GET',
//         path:'/patient/data',
//         handler:formAPI.getData
//     },
//     {
//         method:"DELETE",
//         path:'/patient/{id}',
//         handler:formAPI.deleteDate
//     },
//     {
//         method:"PUT",
//         path:'/patient/{id}',
//         handler:formAPI.editData
//     }
// ]

// module.exports = formRoute;

'use strict';

const Joi = require('joi');
// Never take constants here
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/form.api')
            server.route([

                 // Create Patient

                {
                    method: 'POST',
                    path: '/patient',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'patient'],
                        description: 'patient form',
                        notes: 'patient information get',
                        validate: API.createPatient.validate,
                        pre: API.createPatient.pre,
                        handler: API.createPatient.handler
                    }
                },

                // Get patient information

                {
                    method: 'GET',
                    path: '/patient',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'patient'],
                        description: 'patient form',
                        notes: 'patient information get',
                        validate: API.getPatient.validate,
                        pre: API.getPatient.pre,
                        handler: API.getPatient.handler
                    }
                },
            // Edit patient information
               {
                method:'PUT',
                path:'/patient/{id}',
                config: {
                    // auth: 'auth',
                    plugins:{
                        // policies:['log.policy'],
                    },
                    tags: ['api', 'patient'],
                    description: 'patient form',
                    notes: 'patient information get',
                    validate: API.editPatient.validate,
                    pre: API.editPatient.pre,
                    handler: API.editPatient.handler
                }
               },
           // Delet patient information
               {
                method:'DELETE',
                path:'/patient/{id}',
                config: {
                    // auth: 'auth',
                    plugins:{
                        // policies:['log.policy'],
                    },
                    tags: ['api', 'patient'],
                    description: 'patient form',
                    notes: 'patient information get',
                    validate: API.deletePatient.validate,
                    pre: API.deletePatient.pre,
                    handler: API.deletePatient.handler
                }
               }
               


            ])
        },
        version: require('../../package.json').version,
        name : 'patient-routes'
    }
}