import { select } from 'd3';
import { timeTable } from './data';
import { timePlot } from './timePlot';
import { menu } from './menu';
import { dataProcessing } from './dataproces';

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

const drawData = async () => {

  const processedTimeTable = dataProcessing(timeTable);

  const options = [
    {
      value: 'geldigheid',
      text: 'Geldigheid',
      type: 'time',
    },
    {
      value: 'inwerking',
      text: 'InWerking',
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
    .data(processedTimeTable.data)
    .xStartValue((d) => d.tijdstipRegistratie)
    .xEindValue((d) => d.eindRegistratie)
    .xLabel('registratie')
    .xMax(processedTimeTable.maxRegistratie)
    .yStartValue((d) => d.beginGeldigheid)
    .yEindValue((d) => d.eindGeldigheid)
    .yLabel('geldigheid')
    .yMax(processedTimeTable.maxGeldigheid)
    .getColor((d) => d.colors.geldigheidColor)
    .value((d) => d.value)
    .margin({
      top: 50,
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
      .on('change', (yaxis) => {
        plot
          .yStartValue(((yaxis === 'geldigheid') ? (d) => d.beginGeldigheid : (d) => d.beginInwerking))
          .yEindValue(((yaxis === 'geldigheid') ? (d) => d.eindGeldigheid : (d) => d.eindInwerking))
          .yMax(((yaxis === 'geldigheid') ? processedTimeTable.maxGeldigheid : processedTimeTable.maxInwerking))
          .getColor(((yaxis === 'geldigheid') ? (d) => d.colors.geldigheidColor : (d) => d.colors.inWerkingColor))
          .yLabel(yaxis)
          .yChanged(true)
          .yType(getType(yaxis));
        svg.call(plot);
      })
  );

};

drawData();