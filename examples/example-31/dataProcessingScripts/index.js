const { json } = require('stream/consumers');
const clone = require('./clone');
const knife = require('./knife');
const jsons = require('./json');
const combine = require('./combine');


// Clone the repositories
console.log('Cloning')
clone();

// Convert to kniveSV file
console.log('Converting to kniveSV')
knife();

// Convert to JSON files
console.log('Converting to JSON')
jsons();

// Combine the output files
console.log('Combining output files')
combine();