import { select, range } from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body') // d3 selection
  .append('svg')
  .attr('width', width)
  .attr('height', height);

//
// loose coupling
//
const data = range(15).map((d) => ({
  x: d * 60 + 50,
  y: 250 + Math.sin(d * 0.5) * 220,
}));

svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 20)
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y);
