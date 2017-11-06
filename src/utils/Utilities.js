//This is my library to handle cookie related things (CANT figure out SEPERATE JS FILES at the moment)


module.exports = {
//This should probably be moved to another js file and then imported, since will probably be needed a lot
//moake a cookieHandler.js file - better structure
//Check to see if the user is logged in, then generate page content based on it's value
getCookie: function(cname) {
//function getCookie(cname) {
  //console.log("Looking in cookie for: "+cname);
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          var str = c.substring(name.length, c.length);
          //console.log("found it: "+str);
            return str;
        }
    }
    //console.log("Did not find it");
    return "";
},

//Might just have to move this outside of this component, stand alone function?
//This wont last for long, eventually do an indidvidal modular function. This is too custom for this stage of the app. Or make it so we pass it an array/dictionary to update the cookie fields
//write to the actual cookie
updateCookie: function(convertedData) {
//export function updateCookie(convertedData){
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000)); //expires in 1 day  [days * hours * minutes * seconds * milli secs]
    var expires = "expires="+ d.toUTCString();
    document.cookie = "userID=" + convertedData.userID;
    document.cookie = "firstname=" + convertedData.firstName;
    document.cookie = "lastname=" + convertedData.lastName;
    document.cookie = "username=" + convertedData.username;
    document.cookie = "email=" + convertedData.email ;
    document.cookie = "city=" + convertedData.city ;
    document.cookie = "state=" + convertedData.state ;
    document.cookie = "country=" + convertedData.country ;
    //document.cookie = "password=" + convertedData.password ;
    document.cookie = "loggedin=true";
    document.cookie = expires;
    document.cookie = "path=/";
}
}