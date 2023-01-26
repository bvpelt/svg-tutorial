import {
  geoPath,
  geoMercator,
  json,
  select,
  zoom,  
} from 'd3';
import { feature } from 'topojson-client';

const width = window.innerWidth;
const height = window.innerHeight;

const projection = geoMercator()
  .center([0, 54])
  .scale(3000)
  .rotate([0, 0]);

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const geoGenerator = geoPath().projection(projection);

const ggem = svg.append('g').attr('class', 'gemeente');
const gprov = svg.append('g').attr('class', 'provincie');
const gland = svg.append('g').attr('class', 'land');

json("Gemeentegrenzen.json").then(function (geojson) {

  projection.fitSize([width, height], geojson); // adjust the projection to the features

  select('.gemeente')
    .selectAll('.gemeente')
    .data(geojson.features)
    .join('path')
    .attr('d', geoGenerator);
}
);


json("Provinciegrenzen.json").then(function (geojson) {

  projection.fitSize([width, height], geojson); // adjust the projection to the features

  select('.provincie')
    .selectAll('.provincie')
    .data(geojson.features)
    .join('path')
    .attr('d', geoGenerator);
});


json("Landsgrens.json").then(function (geojson) {

  projection.fitSize([width, height], geojson); // adjust the projection to the features

  select('.land')
    .selectAll('.land')
    .data(geojson.features)
    .join('path')
    .attr('d', geoGenerator);
});

var zoomf = zoom()
  .scaleExtent([1, 18])
  .on('zoom', function (event) {
    ggem.selectAll('path').attr(
      'transform',
      event.transform
    );
    ggem.selectAll('circle').attr(
      'transform',
      event.transform
    );
    ggem.selectAll('text').attr(
      'transform',
      event.transform
    );

    gprov.selectAll('path').attr(
      'transform',
      event.transform
    );
    gprov.selectAll('circle').attr(
      'transform',
      event.transform
    );
    gprov.selectAll('text').attr(
      'transform',
      event.transform
    );

    gland.selectAll('path').attr(
      'transform',
      event.transform
    );
    gland.selectAll('circle').attr(
      'transform',
      event.transform
    );
    gland.selectAll('text').attr(
      'transform',
      event.transform
    );
  });

svg.call(zoomf);
