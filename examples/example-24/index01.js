import { select } from 'd3';
import { range } from 'd3';

console.log(select);

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// split data and visualisation
/// generate data
//const n = height/2;
//const marks = [];
//for (let i = 0; i < n; i++) {
//  marks.push({
//    y: i * 20,
//    width: width,
//    height: 10,
//    mask: 'url(#circle-mask)'
//  });
//}

/// visualisation of data
//svg
//  .selectAll('rect') // no rects available
//  .data(marks)       // use data array
//  .join('rect')
//  .attr('y', (d) => d.y)
//  .attr('width', (d) => d.width)
//  .attr('height', (d) => d.height)
//  .attr('mask', (d) => d.mask)
//;

// combined

const nh = height / 20;
const nv = width / 20;
//console.log(range(n));

/// visualisation of data
svg
  .selectAll('rect#horizontal') // no rects available
  .data(range(nh)) // use data array
  .join('rect')
  .attr('y', (d) => d * 20)
  .attr('width', width)
  .attr('height', 10)
  .attr('class', 'horizontal')
  .attr('mask', 'url(#circle-mask)');

svg
  .selectAll('rect#vertical') // no rects available
  .data(range(nv)) // use data array
  .join('rect')
  .attr('x', (d) => d * 20)
  .attr('width', 10)
  .attr('height', height)
  .attr('class', 'vertical')
  .attr('mask', 'url(#circle-mask-2)');

const mask = svg
  .append('mask')
  .attr('id', 'circle-mask');
mask
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'black');

mask
  .append('circle')
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('r', 200)
  .attr('fill', 'white');

const mask2 = svg
  .append('mask')
  .attr('id', 'circle-mask-2');
mask2
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'white');

mask2
  .append('circle')
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('r', 200)
  .attr('fill', 'black');
