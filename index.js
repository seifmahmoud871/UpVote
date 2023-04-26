import express from 'express'
import * as dotenv from 'dotenv'
import initApp from './src/app.router.js';
const app = express()
dotenv.config();
const port = 8000 || 5000

initApp(app,express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))