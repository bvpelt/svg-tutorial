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
  const data = range(15).map((d) => ({
    x: d * 60 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 220,
  }));

  //  const circles = svg
  //    .selectAll('circle')
  //    .data(data);

  //  const circlesEnter = circles  // enter new d3 elements -> dom
  //    .enter()
  //    .append('circle')
  //    .attr('r', 20);

  //  circles.merge(circlesEnter)   // update dom elements + only first time merge
  //    .attr('cx', (d) => d.x)
  //    .attr('cy', (d) => d.y);

  const circles = svg
    .selectAll('circle')
    .data(data)
    .join('circle')          // newer api sets
    .attr('r', 20)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y);
  t = (t + 0.01) % speed;
}, speed);
