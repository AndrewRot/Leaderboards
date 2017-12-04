import React, { Component } from 'react';
import './css/SignUpBody.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import FacebookButton from './FacebookButton.react'; 
//import UploadImage from './UploadImage.react.js'; ** Or we will pull this image from Facebook after we set up authentication
import Cookies from 'universal-cookie';


import $ from 'jquery';


function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}


//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class SignUpBody extends Component {

  
  constructor(props) {
    super(props);
    //function bindings
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //fields
    this.state = {
      isLoggedIn: false, 
      first: '',
      last: '',
      username: '',
      email: '',
      password: '',
      city: 'Boston', //Must initialize these for now, because if they dont change them, these values are never updated
      zip: '',
      state: 'MA',
      country: 'United States',
    };
  }

  //Write methods for this component here
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //alert('Information submitted: ' + this.state.first + ' '+ this.state.username + ', '+ this.state.username + ', '+ this.state.email);
    const first = this.state.first;
    const last = this.state.last;
    const user = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const city = this.state.city;
    const zip = this.state.zip;
    const state = this.state.state;
    const country = this.state.country;

    //Successful posts and gets with jquery!
    $.post("http://localhost:9000/signup",{first: first, last: last, username: user, email: email, password: password, city: city, zip: zip, state: state, country: country}, function(data, status){
        alert("Response from server was ["+status+"] and the data:  " + data);
        alert("Sign up success: "+data);


        //convert response to js object
        const convertedData = JSON.parse(data);
        console.log("Token: "+convertedData[0].token);

        //write to our cookie!
        updateCookie(convertedData[0]); //not working properly
        window.location="/Browse"; //reroute user to browse leaderboards -
    });

  //***** Update this later so that it goes to the second page of sign up stuff

    event.preventDefault();
  }


  validateForm() {
    let x = this.state;
    return x.first.length > 0 && x.last.length > 0 && x.username.length > 0 && x.email.length > 0 && x.zip.length > 0;
  }

  componentWillMount() {
    console.log("Init page");
    //window.checkLoginState();
      const token = getCookie("token");
      const userID = getCookie("userID");

      $.get("http://localhost:9000/confirmSignedIn",{token: token, userID: userID}, (data, status) => {
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);

          //convert response to js object
          /*const convertedData = JSON.parse(data);
          console.log("Found data for : "+ convertedData.username);

          //write to our cookie!
          updateCookie(convertedData);
          console.log(document.cookie);

          //Updating component state values
          this.setState({first: convertedData.first});
          this.setState({last: convertedData.last});
          this.setState({username: convertedData.username});
          this.setState({email: convertedData.email});
          this.setState({boards: convertedData.boards}); //this might not be OK - might wanna just save boards in the cookie
*/
          if(status == 302) {
              console.log("PLEASE LOG IN");
              window.location = data;
          } else if(status == 200) {
              console.log("All set! *** FILL in state vars here");
              //window.location="/User/";
          }
      });
  }


  render() {
    
    const isLoggedIn = this.state.isLoggedIn;

    //poplate the 50 states array for menu rop down
    let stateList = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
    let countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
    ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
    ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
    ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
    ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
    ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
    ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
    ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
    ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
    ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
    ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
    ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
    ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
    ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
    ,"Yemen","Zambia","Zimbabwe"];

    //Update this later on to update when you select the state
    let cityList = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

    return (
      <div>
        <h1>Sign up for Leaderboards!</h1>

        <div
        class="fb-login-button"
        data-max-rows="1"
        data-size="large"
        data-button-type="continue_with"
        data-onlogin="checkLoginState();"
        ></div>


        <form onSubmit={this.handleSubmit } class="form"  >
                
          <FormGroup controlId="first" bsSize="large" >
            <ControlLabel>First Name</ControlLabel>
            <FormControl autoFocus name="first" type="text" value={this.state.first} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="last" bsSize="large" >
            <ControlLabel>Last Name</ControlLabel>
            <FormControl autoFocus name="last" type="text" value={this.state.last} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="username" bsSize="large" >
            <ControlLabel>Username</ControlLabel>
            <FormControl autoFocus name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="email" bsSize="large" >
            <ControlLabel>Email</ControlLabel>
            <FormControl autoFocus name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} name="password" type="password" />
          </FormGroup>


          <hr />
          <h2> Location </h2>

          <FormGroup controlId="zip" bsSize="large" >
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl autoFocus name="zip" type="text" value={this.state.zip} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="city" bsSize="large" >
            <ControlLabel>City</ControlLabel>
            <FormControl componentClass="select" name="city"  value={this.state.city} onChange={this.handleChange}>
            {cityList.map(function(name){
              return <option value={name}>{name}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="state" bsSize="large" >
            <ControlLabel>State</ControlLabel>
            <FormControl componentClass="select" name="state"  value={this.state.state} onChange={this.handleChange}>
            {stateList.map(function(name){
              return <option value={name}>{name}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="country" bsSize="large" >
            <ControlLabel>Country</ControlLabel>
            <FormControl componentClass="select" name="country"  value={this.state.country} onChange={this.handleChange}>
            {countryList.map(function(name){
              return <option value={name}>{name}</option>
              })}
            </FormControl>
          </FormGroup>

          <hr />
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit" >
            Sign Up!
          </Button>
        </form>

      </div>
    );
  

  }
}

//*** Not setting the new userID in the cookie
//ER_DUP_ENTRY: Duplicate entry '5-4' for key 'PRIMARY'

function getCookie(cname) {
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
}


//write to the actual cookie
function updateCookie(convertedData) {
    const cookies = new Cookies();
    cookies.set('userID', convertedData.userID, { path: '/' });
    cookies.set('firstname', convertedData.firstname, { path: '/' });
    cookies.set('lastname', convertedData.lastname, { path: '/' });
    cookies.set('username', convertedData.username, { path: '/' });
    cookies.set('email', convertedData.email.replace(/%40/i, '@'), { path: '/' });
    cookies.set('city', convertedData.city.replace(/%20/i, ' '), { path: '/' });
    cookies.set('state', convertedData.state.replace(/%20/i, ' '), { path: '/' });
    cookies.set('country', convertedData.country.replace(/%20/i, ' '), { path: '/' });
    cookies.set('token', convertedData.token, { path: '/' });
    cookies.set('loggedin', true, { path: '/' });

    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000)); //expires in 1 day  [days * hours * minutes * seconds * milli secs]
    var expires = d.toUTCString();
    cookies.set('expires', expires, { path: '/' });

    console.log(document.cookie);
}

export default SignUpBody;



/*

<UploadImage /> -change this to //https://css-tricks.com/image-upload-manipulation-react/



        <div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="true" data-auto-logout-link="true" data-use-continue-as="true" scope="public_profile,email" data-onlogin="checkLoginState();"></div>


          <form onSubmit={this.handleSubmit}>
          <label>
            First Name: 
            <input type="text" name="first" first={this.state.first} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Last Name: 
            <input type="text" name="last" last={this.state.last} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Username: 
            <input type="text" name="username" username={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            email: 
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            password: 
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" name="Submit" />
        </form>
*/
