const Koa = require('koa');
const staticServer = require('koa-static');

var Router = require('koa-router');
const userController = require('./Controller/controllerHapi.js');

var bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');

const connString = 'mongodb://localhost:27017/aishu';
mongoose.connect(connString, { useNewUrlParser: true });


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

app.use(staticServer('public'));
const server = app.listen(3000, function() {
    console.log('Koa is listening:', server.address());
});

const sio = require('socket.io');
const io = new sio(server);

io.on('connection', socket => {
    console.log(`new connection: ${socket.id}`);
    router.get("/GetAllUpdatedProd",  (ctx,next) => {
        return userController.getUpdatedProds(ctx,next).then(i => {
            io.sockets.emit('new_message', {
                bookqty: `${i.split(",")[0]}`,
                remainingqty: `${i.split(",")[1]}`,
                updatedat: `${i.split(",")[2]}`
            });

            ctx.body = 'Emitted!';
        })

    });
});


router
    .get('/hello', (ctx, next) => {
        ctx.body = 'Hello World!';
    })


router.get("/getProds",  (ctx,next) => {
    return userController.getProds(ctx,next).then(i => {
        ctx.body = i

    })

});


router.post("/bookCustProd/",  (ctx,next) => {

    console.log(ctx.request.body.cid)
    console.log(ctx.request.body.pid)

    return userController.bookCustProd(ctx, next).then(i => {
        console.log(i)
        ctx.body = i

    })

})




