'use strict'

const db = require('mongoose')
const Glob = require('glob')
db.Promise = require('bluebird')
let dbConn = null

exports.plugin = {
  async register(server, options) {
    try {
    
      dbConn = await db.createConnection(options.connections.db)
      db.set('debug', true);

      dbConn.on('connected', () => {
        server.log(['mongoose', 'info'], 'dbConn Mongo Database connected')
      })

      dbConn.on('disconnected', () => {
        server.log(['mongoose', 'info'], 'dbConn Mongo Database disconnected')
      })

      // console.log(dbConn);
      server.decorate('server', 'DB', dbConn)

      // process.on('SIGINT', async () => {
      //   await dbConn.close()
      //   server.log(
      //     ['mongoose', 'info'],
      //     'Mongo Database disconnected through app termination'
      //   )
      //   process.exit(0)
      // })

      const models = Glob.sync('server/models/*.js')
      const allModels = [...models]
      allModels.forEach(model => {
        require(`${process.cwd()}/${model}`)
      })

    } catch (err) {
      console.log(err)
      throw err
    }
  },
  mainDbConn() {
    // console.log(dbConn);
    return dbConn
  },

  name: 'mongoose_connector',
  version: require('../../package.json').version

}


