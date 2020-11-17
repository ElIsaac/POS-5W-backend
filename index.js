const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./bd')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/cajero'));
app.use(require('./routes/admin'));
app.use(require('./routes/usuarios'));

app.listen(app.get('port'), ()=>{
    console.log("servidor en puerto: ",app.get('port'));
})