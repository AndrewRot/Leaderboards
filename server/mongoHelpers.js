  



//perform a count on the current users and then return that +1 -not implementedyet
  function getNewUserID() {
    var accounts = db.collection('accounts');
	  
	  //In order to query a mongo db, we need to create a Promise 
	  var p1 = new Promise(function(resolve, reject) {
	      accounts.save( { userid: userid, first: first, last: last, username: username, email:email, password:password, city:city, zip:zip, state:state, country:country}); //alternatively use insert instead of save for none persistance
	      resolve("successful insert");   
	  });
	  p1.then(function(response) {
	    //console.log(response);
	    //send back data
	    //res.end("end");
	  }, function(reason) {
	    //console.log("fail: "+reason); // Error!
	  });
  }



