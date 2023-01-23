import { csv, select } from 'd3';
import { scatterPlot } from './scatterPlot';
import { menu } from './menu';

const csvUrl =
  'https://raw.githubusercontent.com/bvpelt/svg-tutorial/main/examples/example-32/karbonhydrate.csv';
//koolhydraten,vet,kcal,product,eenheid

const parseRow = (d) => {
  d.koolhydraten = +d.koolhydraten;
  d.vet = +d.vet;
  d.kcal = +d.kcal;
  d.product = d.product.trim();
  d.eenheid = d.eenheid.trim();
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const menuContainer = select('body')
  .append('div')
  .attr('class', 'menu-container');

const xMenu = menuContainer.append('div');
const yMenu = menuContainer.append('div');
const productMenu = menuContainer.append('div');

const drawData = async () => {
  const options = [
    {
      value: 'koolhydraten',
      text: 'Koolhydraten',
      type: 'quantitative',
    },
    {
      value: 'vet',
      text: 'Vet',
      type: 'quantitative',
    },
    //    {
    //      value: 'vet > 50',
    //      text: 'Vet > 50',
    //      type: 'quantitative',
    //    },
    {
      value: 'kcal',
      text: 'Kcal',
      type: 'quantitative',
    },
    {
      value: 'eenheid',
      text: 'Eenheid',
      type: 'categorical',
    },
  ];

  const result = await csv(csvUrl, parseRow);

  const productValues = [];
  productValues.push({
    value: 'All',
    text: 'All',
  });


  result.forEach((data) => {
    productValues.push({
      value: data.product.trim(),
      text: data.product.trim(),
    });
  });

  const columnToType = new Map(
    options.map(({ value, type }) => [
      value,
      type,
    ])
  );

  const getType = (column) =>
    columnToType.get(column);

  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(result)
    .xValue((d) => d.koolhydraten)
    .xType(getType('koolhydraten'))
    .xLabel('Koolhydraten')
    .yValue((d) => d.koolhydraten)
    .productLabel('All')
    .yType(getType('koolhydraten'))
    .yLabel('Koolhydraten')
    .margin({
      top: 50,
      right: 50,
      bottom: 130,
      left: 120,
    })
    .radius(5);

  svg.call(plot);

  xMenu.call(
    menu()
      .id('x-menu')
      .labelText('X:')
      .options(options)
      .on('change', (column) => {

        const varName = column[1];
        const labelName = column[0];
        console.log('varName: ' + varName + ' labelName: ' + labelName);
        console.log('xType: ' + getType(varName));
        plot
          .xValue((d) => d[varName])
          .xLabel(labelName)
          .xChanged(true)
          .xType(getType(varName));
        svg.call(plot);
      })
  );

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
          .yValue((d) => d[varName])
          .yLabel(labelName)
          .yChanged(true)
          .yType(getType(varName));
        svg.call(plot);
      })
  );

  productMenu.call(
    menu()
      .id('product-menu')
      .labelText('Product:')
      .options(productValues)
      .on('change', (column) => {
        //console.log(column);
        const varName = column[1];
        const labelName = column[0];

        plot.productLabel(labelName);
        svg.call(plot);
      })
  );
};

drawData();
