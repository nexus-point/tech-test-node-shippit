import * as path from 'path'
import { Sequelize } from 'sequelize'

const env = process.env.NODE_ENV ?? 'development'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(path.join(__dirname, '/../../../config.json'))[env]

const sequelize =
  config.url !== null
    ? new Sequelize(config.database, config.username, config.password, config)
    : new Sequelize(config.url, config)

export { Sequelize, sequelize }
