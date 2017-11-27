//General utilities functions for the server

module.exports = {

    //Generate a new token to assign to a user 
    //This happens after signing up, logging in, or if the user's token ever does not match the one in the database he will be prompted to log back in
    //*** Down the line... check to make sure token isn't already assigned. 1 in a million+ chance that actually happens but would be good to finx down the road.
    generateToken: function() {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var length = 80; 
        var result = '';
        for (var i = length; i > 0; --i) 
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },


    //Chop up the query strings, given the name of the page so it can be removed and the arguements can be passed back
    ///connectto/3?username=andrewrot&password=1fivesive
    /*parseQuery: function(request, nameOfPage){
        console.log("API URL: "+ req.url );
        let uri = request;

        uri =  uri.replace("/"+nameOfPage+"/", ''); //remove the name of the page
        let params[];
        let paramsCollector[];

        params = uri.split('&');//break into [#, username=XXX&password=XXX]

        for(int i = 0; i < params.length; i++){
            //split up each segment by their equal
            let collectedValues[] = params[i].split('=');
            paramsCollector.add(collectedValues[1]);
        }

        if(paramsCollector == null)
            throw "error";

        reutrn paramsCollector;

    }*/

}