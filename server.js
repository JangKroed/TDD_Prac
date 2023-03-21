const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT | 5000);
console.log(`Runnig on port ${process.env.PORT | 5000}`);
