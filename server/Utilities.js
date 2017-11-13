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

}