import { max, select } from 'd3';
import { timeTable } from './data';
import { timePlot } from './timePlot';
import { menu } from './menu';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('#timeplot')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const menuContainer = select('body')
  .append('div')
  .attr('class', 'menu-container');

const yMenu = menuContainer.append('div');



/*
const drawGraph = async () => {
  svg.call(
    timePlot()
      .width(width)
      .height(height)
      .data(timeTable)
      .xbValue((d) => d.tijdstipRegistratie)
      .xeValue((d) => d.eindRegistratie)
      .xLabel('Registratie ->')
      .ybValue((d) => d.beginGeldigheid)
      .yeValue((d) => d.eindGeldigheid)
      .yLabel('Geldigheid ->')
      .value((d) => d.value)
      .margin({
        top: 20,
        right: 20,
        bottom: 150,
        left: 140,
      })
  );
};

drawGraph();
*/

const drawData = async () => {

  const options = [
    {
      value: 'geldigheid',
      text: 'Geldigheid ->',
      type: 'time',
    },
    {
      value: 'inwerking',
      text: 'InWerking ->',
      type: 'time',
    },
  ];

  const columnToType = new Map(
    options.map(({ value, type }) => [
      value,
      type,
    ])
  );

  const getType = (column) =>
    columnToType.get(column);

  const plot = timePlot()
    .width(width)
    .height(height)
    .data(timeTable)
    .xbValue((d) => d.tijdstipRegistratie)
    .xeValue((d) => d.eindRegistratie)
    .xLabel('Registratie ->')

    .ybValue((d) => d.beginGeldigheid)
    .yeValue((d) => d.eindGeldigheid)
    .yLabel('Geldigheid ->')
    .value((d) => d.value)
    .margin({
      top: 20,
      right: 20,
      bottom: 150,
      left: 140,
    });

  svg.call(plot);

  yMenu.call(
    menu()
      .id('y-menu')
      .labelText('Y:')
      .options(options)
      .on('change', (column) => {
        //console.log(column);
        const varName = column[1];
        const labelName = column[0];

        plot
//          .yValue((d) => d[varName])

          .ybValue((d) => d.beginGeldigheid)
          .yeValue((d) => d.eindGeldigheid)

          .yLabel(labelName)
          .yChanged(true)
          .yType(getType(varName));
        svg.call(plot);
      })
  );

};

drawData();