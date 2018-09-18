var Koa = require('koa')
var Router = require('koa-router');
const userController = require('./Controller/controllerHapi.js');

var bodyParser = require('koa-bodyparser');
var send = require('koa-send')

const mongoose = require('mongoose');

const connString = 'mongodb://localhost:27017/aishu';
mongoose.connect(connString, { /*config: { autoIndex: false }*/ });


mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + connString);
});


mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});


mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});


var app = new Koa();
var router = new Router();

app.use(bodyParser());
app
    .use(router.routes())
    .use(router.allowedMethods());
app.use(async (ctx) => {
    await send(ctx, ctx.path, { root: __dirname + '/View/saleUI.html' });
})

/*
// This must come after last app.use()
var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);


// Socket.io
io.on('connection', function(socket){
    console.log("New User connected")
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
*/

router
    .get('/', async (ctx, next) => {
       // await send(ctx, ctx.path, { root: __dirname + '/View/saleUI.html' });
        await send(ctx, '/View/saleUI.html');
    })


router
    .get('/hello', (ctx, next) => {
        ctx.body = 'Hello World!';
    })


router.get("/getProds",  (ctx,next) => {
    return userController.getProds(ctx,next).then(i => {
        ctx.body = i

    })

});

router.get("/GetAllUpdatedProd",  (ctx,next) => {
    return userController.getUpdatedProds(ctx,next).then(i => {
        ctx.body = i

    })
   //return userController.
});

router.post("/bookCustProd/",  (ctx,next) => {

    console.log(ctx.request.body.cid)
    console.log(ctx.request.body.pid)

    return userController.bookCustProd(ctx,next).then(i => {
        console.log(i)
        ctx.body = i

    })

});


/*
var redis = require('socket.io-redis');

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

io.adapter(redis({ host: 'localhost', port: 6379 }));
*/



app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});