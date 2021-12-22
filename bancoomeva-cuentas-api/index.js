const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const {notFound, errorHandler} = require('./middleware/errorHandler');
const sequelize = require('./dbConnection');

const estadoSolicitudRoute = require('./routes/estados-solicitudes');
const estadoCuentaRoute = require('./routes/estados-cuentas');
const respuestaRoute = require('./routes/respuestas');
const tipoDocumentoRoute = require('./routes/tipos-documentos');
const tipoMovimientoRoute = require('./routes/tipos-movimientos');
const tipoUsuarioRoute = require('./routes/tipos-usuarios');
const usuarioRoute = require('./routes/usuarios');
const cuentaRoute = require('./routes/cuentas');
const solicitudRoute = require('./routes/solicitudes');
const reclamoRoute = require('./routes/reclamos');
const movimientoRoute = require('./routes/movimientos');

const app = express()

// CORS
app.use(cors({credentials: true, origin: true}));

const sync = async () => await sequelize.sync({alter: false});
sync();

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({status: "API is running"});
});

app.use('/api/usuario', usuarioRoute);
app.use('/api/estado-solicitud', estadoSolicitudRoute);
app.use('/api/estado-cuenta', estadoCuentaRoute);
app.use('/api/respuesta', respuestaRoute);
app.use('/api/tipo-documento', tipoDocumentoRoute);
app.use('/api/tipo-movimiento', tipoMovimientoRoute);
app.use('/api/tipo-usuario', tipoUsuarioRoute);
app.use('/api/cuenta', cuentaRoute);
app.use('/api/solicitud', solicitudRoute);
app.use('/api/reclamo', reclamoRoute);
app.use('/api/movimiento', movimientoRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:8080`);
});
