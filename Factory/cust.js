var Cust =  require('../Model/customer.js');

/**
 * List Custs
 */
exports.list = (req, h) => {
  return Cust.find({}).exec().then((dog) => {

    return { customers: dog };

  }).catch((err) => {

    return { err: err };

  });
}


exports.getCustById = (req, h) => {

  return Cust.findOne({"cid":req.params.id}).exec().then((dog) => {
    if(!dog) return { message: 'Cust not Found' };

    return { customer: dog };

  }).catch((err) => {

    return { err: err };

  });
}




exports.insertCust = (req, h) => {

 var myData = new Cust(req.payload)

  return myData.save().then((dog) => {

     return { message: "cust inserted successfully", customer: dog };

  }).catch((err) => {

    return { err: err };

  });
}



//Update Cust by firstName
exports.updateCust = (req,h) => {
return Cust
    .findOneAndUpdate(
      {
        firstName: req.params.id // search query
      },
      {
        firstName: 'Nakul' // field:values to update
      },
      {
        new: true, // return updated doc
        runValidators: true // validate before update
      }).exec().then((dog) => {
	 return { customer: dog };
        }).catch((err) => {

        return { err: err };

        });
}


exports.deleteCust = (req,h) => {
 return Cust.remove({ firstName: req.params.id }).exec().then((dog) => {
         return { customer: dog };
        }).catch((err) => {

        return { err: err };

        });
}





