

Download the repo
Install dependencies
npm install --save react-bootstrap bootstrap@3
npm install --save react-router
npm install react-router-dom
npm install body-parser
npm install mongodb
npm install express
npm install monk
npm install react-axios  //http requests might not use
npm install --save react-http-request
npm install react-xhr
npm install url
npm install --save async //have multiple queries - wait on result of each other - mongo async helper

//Check out express-sessions for user authenitcation
//also check at passport - aparently better

*Just a general note, if the program every throws an error saying:
Error: Cannot find module <XXX>
just run the command
npm install <XXX>

Run from main directory with: 
npm start 

# Some helpful tutorials
https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb

# Build to 'build' directory (it's ignored by git, see .gitignore)
npm run build

# Start the express.js app
node server


# Mongo Requirements
You must have mongoDB on your computer. 
Make sure you are able to run commands like mongo and mongodb. Check to see if your .bashrc or .bash_profile has the following path defined:

export PATH="$PATH:/usr/local/mongodb/bin"

Make sure that mongod is directed to the data directory in our project folder. User the command:

mongod --dbpath /PATH/TO/DIRECTORY/Leaders/leaders/data

You must have this server open in order for the application to interact with mongo and our database
You can then spawn a mongo terminal using the mongo command.



Check out Nodemon later for restarting server when new content is posted...
https://zellwk.com/blog/crud-express-mongodb/