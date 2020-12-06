
const mongoose=require('mongoose');

mongoose.connect(process.env.BD||'mongodb://localhost/tiendita',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(db => console.log('base de datos conectada')).catch(err => console.log(err));