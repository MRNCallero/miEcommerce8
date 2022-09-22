const express = require('express');
require('dotenv').config();
const userRoutes = require('./api/routes/userRoutes');
const userController = require('./api/controllers/userController');
const productsRoutes = require('./api/routes/productRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const pictureRoutes = require('./api/routes/pictureRoutes')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');


//PUERTO
const PORT = 8080;

const app = express();


app.use(express.json());
app.use(cors())

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/v1', (req,res) => {res.send(`<h1>Server funcionando en el puerto ${PORT} </h1>`)})
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/carts',cartRoutes);
app.use('/api/v1/pictures',pictureRoutes);

app.post('/api/v1/login', userController.loginUsuario);

app.get('*',res.status(404).json({ok:false,
    msg:"Ruta incorrecta"}));




app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto ' + PORT);})
