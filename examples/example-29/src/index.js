import { select } from 'd3';
import { vizData } from './vizData.js';
import { makeData } from './makeData.js';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body') // d3 selection
  .append('svg')
  .attr('width', width)
  .attr('height', height);

//
// loose coupling + animation
//

let t = 0;
const speed = 1000/60;
setInterval(() => {
  const n = 10 + Math.sin(t) * 5;
  const data = makeData(n,t);

  // vizData(svg, data);
  svg.call(vizData, data); 
  
  t = (t + 0.01) % speed;
}, speed);
