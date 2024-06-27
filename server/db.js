const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:BSRwY4ZIF2Px@ep-crimson-frost-a1i93kjl-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})