import { select } from 'd3'; // look for browser global d3 instead of file

import something, { somethingElse } from "./something.js";

console.log('Greetings ' + something + ' ' + somethingElse); 
            
console.log('d3 select: ', select);