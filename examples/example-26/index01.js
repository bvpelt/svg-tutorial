import { select, range } from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body') // d3 selection
  .append('svg')
  .attr('width', width)
  .attr('height', height);

//
// tight coupling of visualisation and data
//
const data = range(15);
const x = (d) => d * 60 + 50;
svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 20)
  // .attr('cx', 400)
  // .attr('cx', (d) => d * 60 + 50)
	.attr('cx', x)
  .attr('cy', (d) => 250 + Math.sin(d * 0.5) * 220);
