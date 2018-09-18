
var findAndUpdateProd =  require('./findAndUpdateProd.js');
var Cust =  require('../Model/customer.js');

exports.isValidCustUpdateProd = (ctx,next) => {
return Cust.findOne(
    // query
    {cid:ctx.request.body.cid,isBooked:true},

    {cid: true},

).exec().then(data => {

        if(data && data !== 'null' && data !== 'undefined')
          return {customer: "isBooked is already true so can't allow same cust for sale"}//res.send("isBooked is already true so can't allow same cust for sale")
        else
        {

return Cust.findOne(
    // query
    {cid:ctx.request.body.cid,isBooked:false},

    {cid: true},

        ).exec().then(data => {

	if(data && data !== 'null' && data !== 'undefined')
           return findAndUpdateProd.findAndUpdateProd(ctx,next)
        else
               {
		console.log("data"+data)
                return {customer:"Invalid cid entered..No cid exist in database"}
		}

  })
  .catch(err => {
     return { err: err };
    })
}

})
}


