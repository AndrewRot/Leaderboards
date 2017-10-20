// server/index.js
'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});


//This was taken from old project... may not use
//This must point to your home directory, express will traverse this directory
//to look for files and serve them upon request
//app.use(express.static(path.join(__dirname, '../')));