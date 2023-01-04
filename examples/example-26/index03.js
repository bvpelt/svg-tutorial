import { select, range } from 'd3';

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
  const data = range(n).map((d) => ({
    x: d * 60 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 220,
    r: 20 + Math.sin(d * 0.5 + 6*2) * 10
  }));

  const circles = svg
    .selectAll('circle')
    .data(data)
    .join('circle')          // newer api sets
    .attr('r', (d) => d.r)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y);
  
  t = (t + 0.01) % speed;
}, speed);
