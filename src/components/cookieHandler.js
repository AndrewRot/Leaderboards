
//This should probably be moved to another js file and then imported, since will probably be needed a lot
//moake a cookieHandler.js file - better structure
//Check to see if the user is logged in, then generate page content based on it's value
function getCookie(cname) {
	//console.log("Looking in cookie for: "+cname);
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        	var str = c.substring(name.length, c.length);
        	//console.log("found it: "+str);
            return str;
        }
    }
    //console.log("Did not find it");
    return "";
}
