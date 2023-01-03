import { select } from 'd3';
import { range } from 'd3';
import { symbol, symbols } from 'd3';

console.log(select);

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const nh = height / 20;
const nv = width / 20;

svg
  .append('g')
  .selectAll('rect') // no rects available
  .data(range(nh)) // use data array
  .join('rect')
  .attr('y', (d) => d * 20)
  .attr('width', width)
  .attr('height', 10)
  .attr('mask', 'url(#mask-1)');

svg
  .append('g')
  .selectAll('rect') // no rects available
  .data(range(nv)) // use data array
  .join('rect')
  .attr('x', (d) => d * 20)
  .attr('width', 10)
  .attr('height', height)
  .attr('mask', 'url(#mask-2)');

const renderMask = (selection, id, inverted) => {
  const mask = selection
    .append('mask')
    .attr('id', id); 

  mask
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', inverted ? 'black' : 'white');

//  const g = mask
//    .append('g')
//    .attr(
//      'transform',
//      `translate(${width / 2},${height / 2})`
//    );
  
  mask.selectAll('g')
    .data(range(symbols.length))
  	.join((enter) => 
          enter
          .append('g')
          .attr('transform', (d) => `translate(${d*125 + 100},${height/2})`)
          .append('path')
  				.attr('d', (d) => symbol(symbols[d], 8000)())
  				.attr('fill', inverted ? 'white' : 'black')
  );
  

  //    .append('path')
  //    .attr('d', symbol(symbols[1], 100000)())
  //    .attr('fill', inverted ? 'black' : 'white');
};

//renderMask(svg, 'mask-1', false);
//renderMask(svg, 'mask-2', true);

svg
  .call(renderMask, 'mask-1', false)
  .call(renderMask, 'mask-2', true);

//const mask2 = svg
//  .append('mask')
//  .attr('id', 'mask-2');
//
//mask2
//  .append('rect')
//  .attr('width', width)
//  .attr('height', height)
//  .attr('fill', 'white');
//
//mask2
//  .append('g')
//	.attr('transform', `translate(${width/2},${height/2})`)
//  .append('path')
//  .attr('d', symbol(symbols[1], 100000)())
//  .attr('fill', 'black');
