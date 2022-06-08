const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors')
const routes  = require('./routes');
const models = require('./models');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname + "/.";


const port = process.env.PORT || 3001;

app.set('port',port);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', routes);

// force: true will drop the table if it already exists

models.sequelize.sync({ force: false })
.then(() => {
  console.log('Drop and Resync with { force: true }');
})
.catch(err => console.log('Error by models : ' + err)) 

app.listen(app.get('port'),()=>{
    console.log('Server Started',port);
});
