import { max, select } from 'd3';
import { timeTable } from './data';
import { timePlot } from './timePlot';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('#timeplot')
  .append('svg')
  .attr('width', width)
  .attr('height', height);


const drawGraph = async () => {
  svg.call(
    timePlot()
      .width(width)
      .height(height)
      .data(timeTable)
      .xbValue((d) => d.tijdstipRegistratie)
      .xeValue((d) => d.eindRegistratie)
      .ybValue((d) => d.beginGeldigheid)
      .yeValue((d) => d.eindGeldigheid)
      .value((d) => d.value)
      .margin({
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
      })
  );
};

drawGraph();
