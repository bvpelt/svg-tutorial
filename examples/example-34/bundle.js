(function (d3) {
  'use strict';

  const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let symbolValue;
    let margin;
    let size;

    const my = (selection) => {
      // determine x axis
      // domain - functional data must map to range - pixels on screen
      const x = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([
          height - margin.bottom,
          margin.top,
        ]); // flip y values 0,0 is top left, top by flipping it becomes left bottom

      const symbolScale = d3.scaleOrdinal()
        .domain(data.map(symbolValue))
        .range(d3.symbols);
      
      const symbolGenerator = d3.symbol().size(size);

      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
        pahtD: symbolGenerator.type(symbolScale(symbolValue(d)))(),
      }));
      
      selection
        .selectAll('path')
        .data(marks)
        .join('path')      
        .attr('d', (d) => d.pahtD)
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      ;

      selection
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(y));

      selection
        .append('g')
        .attr(
          'transform',
          `translate(0, ${height - margin.bottom})`
        )
        .call(d3.axisBottom(x));
    };

    /*
    long format
    
    my.width = function(value) {    // arguments is defined
      if (!arguments.length) return width;
      width = value;
      return my;
    };  
    */

    my.width = function (_) {
      return arguments.length
        ? ((width = +_), my)
        : width;
    };

    my.height = function (_) {
      return arguments.length
        ? ((height = +_), my)
        : height;
    };

    my.data = function (_) {
      return arguments.length
        ? ((data = _), my)
        : data;
    };

    my.xValue = function (_) {
      return arguments.length
        ? ((xValue = _), my)
        : xValue;
    };

    my.yValue = function (_) {
      return arguments.length
        ? ((yValue = _), my)
        : yValue;
    };

    my.symbolValue = function (_) {
      return arguments.length
        ? ((symbolValue = _), my)
        : symbolValue;
    };

    my.margin = function (_) {
      return arguments.length
        ? ((margin = _), my)
        : margin;
    };

    my.size = function (_) {
      return arguments.length
        ? ((size = +_), my)
        : size;
    };

    return my;
  };

  const csvUrl = [
    'https://gist.githubusercontent.com/', // host
    'curran/', // user
    'a08a1080b88344b0c8a7/', // gist id
    'raw/',
    '0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/', // commit
    'iris.csv', // file name
  ].join('');

  // convert strings to numbers
  const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
  };

  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Generic
  const main = async () => {
    svg.call(
      scatterPlot()
        .width(width)
        .height(height)
        .data(await d3.csv(csvUrl, parseRow))
        .xValue((d) => d.petal_width)
        .yValue((d) => d.sepal_length)
      	.symbolValue((d) => d.species)
        .margin({
          top: 20,
          right: 20,
          bottom: 40,
          left: 50,
        })
        .size(1)
    );
  };

  main();

})(d3);
//# sourceMappingURL=bundle.js.map
