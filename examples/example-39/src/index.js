import {
  csv, select, groupSort, sum, group
} from 'd3';


import { BarChart } from './barchart';


const width = window.innerWidth;
const height = window.innerHeight;

/*
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
*/

const csvbedrijven = "cbs_bedrijven.csv";
const csvbedrijfcode = "bedrijfsoort.csv";

const parseBedrijven = (d) => {
  d.id = d.id;
  d.bedrijf = d.bedrijf;
  d.perioden = d.perioden;
  d.p1 = +d.p1;
  d.p2 = +d.p2;
  d.p3_5 = +d.p3_5;
  d.p5_10 = +d.p5_10;
  d.p10_20 = +d.p10_20;
  d.p20_50 = +d.p20_50;
  d.p50_100 = +d.p50_100;
  d.p100 = +d.p100;
  d.p0_50 = +d.p0_50;
  d.p0_250 = +d.p0_250;
  d.natpers = +d.natpers;
  d.rechtpers = +d.rechtpers;

  return d;
};

const parseBedrijfsoort = (d) => {
  d.code = d.code;
  d.bedrijf = d.bedrijf;

  return d;
};



const drawData = async () => {

  const bedrijven = await csv(csvbedrijven, parseBedrijven);
  console.log('bedrijven');
  console.log(bedrijven);

  const bedrijfcode = await csv(csvbedrijfcode, parseBedrijfsoort);
  console.log('bedrijfcode');
  console.log(bedrijfcode);

  const bedrijvenGroup = group(bedrijven, d => d.bedrijf);
  console.log('bedrijvenGroup');
  console.log(bedrijvenGroup);

  function addData(dataArray) {
    let total = 0;
    dataArray.forEach(d => total = total + d.p1);
    return total;
  };

  const bedrijvenStat = bedrijvenGroup.forEach(element => {
    console.log('element: ' + element.key + ' ' + element.value);
  }
    );

  console.log('bedrijvenStat');
  console.log(bedrijvenStat);

  const chart = BarChart(bedrijven, {
    x: d => d.bedrijf,
    y: d => d.frequency,
    xDomain: groupSort(bedrijven, ([d]) => -d.frequency, d => d.letter), // sort by descending frequency
    yFormat: "d",
    yLabel: "↑ Frequency",
    width,
    height: 500,
    color: "steelblue"
  });
};

drawData();


