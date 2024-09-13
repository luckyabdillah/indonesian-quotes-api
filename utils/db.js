require('dotenv').config()
const mongoose = require('mongoose')

let dbUri
let clientOptions

if (process.env.APP_ENV != 'local') {
    dbUri = process.env.DB_URI
    clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }
} else {
    dbUri = process.env.DB_URI_LOCAL
}

try {
    mongoose.connect(dbUri, clientOptions);
} catch (error) {
    console.error(error);
}