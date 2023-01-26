import {
  geoPath,
  geoMercator,
  json,
  select,
  zoom,
  csv,
} from 'd3';
import { feature } from 'topojson-client';

const width = window.innerWidth;
const height = window.innerHeight;

var projection = geoMercator()
  .center([0, 5])
  .scale(150)
  .rotate([0, 0]);

var svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var path = geoPath().projection(projection);

var g = svg.append('g');

// load and display the World
json('world-110m2.json').then(function (
  topology
) {
  console.log('topology: ' + topology);
  g.selectAll('path')
    .data(
      feature(
        topology,
        topology.objects.countries
      ).features
    )
    .enter()
    .append('path')
    .attr('d', path);

  csv('cities.csv').then(function (data) {
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('a')
      .attr('xlink:href', function (d) {
        return (
          'https://www.google.com/search?q=' +
          d.city
        );
      })
      .append('circle')
      .attr('cx', function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr('cy', function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr('r', 5)
      .style('fill', 'red');

    g.selectAll('text')
      .data(data)
      .enter()
      .append('text') // append text
      .attr('x', function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr('y', function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr('dy', -7) // set y position of bottom of text
      .style('fill', 'black') // fill the text with the colour black
      .attr('text-anchor', 'middle') // set anchor y justification
      .text(function (d) {
        return d.city;
      }); // define the text to display
  });
});

var zoomf = zoom()
  .scaleExtent([1, 14])
  .on('zoom', function (event) {
    g.selectAll('path').attr(
      'transform',
      event.transform
    );
    g.selectAll('circle').attr(
      'transform',
      event.transform
    );
    g.selectAll('text').attr(
      'transform',
      event.transform
    );
  });

svg.call(zoomf);
