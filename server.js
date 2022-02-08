const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const ApiProductos = require('./api/Productos.js')
const ApiMensajes = require('./api/Mensajes.js')
const productos = new ApiProductos()
const mensajes = new ApiMensajes('mensajes.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async (socket) => {
    console.log('Usuario conectado !!!!!!!!!')

    // PRODUCTOS
    socket.emit('productos', productos.getAll())

    socket.on('actualizar', producto => {
        productos.save(producto)
        io.sockets.emit('productos', productos.getAll())
    })
    
    // MENSAJES
    socket.emit('mensajes', await mensajes.getAll())

    socket.on('mensajeNuevo', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.save(mensaje)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
})

// httpServer.listen(8080, () => {
//     console.log('servidor listo 8080');
// })
const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
