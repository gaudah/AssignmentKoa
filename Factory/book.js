var Prod_Fun =  require('./prod.js');
var Cust =  require('../Model/customer.js');

var Prod =  require('../Model/product.js');

exports.validCustUpdate = (ctx,next) => {

 return Cust.update( {$and:[{"cid":ctx.request.body.cid},{"isBooked":false}]},{ $set: { isBooked: true }})
  .exec().then((dog) => {
 return Prod_Fun.getProdDetails(ctx,next)
        }).catch((err) => {
        return { err: err };

        });
}





