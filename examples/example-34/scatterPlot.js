import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  symbols,
  symbol,
  scaleOrdinal,
} from 'd3';

export const scatterPlot = () => {
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
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([
        height - margin.bottom,
        margin.top,
      ]); // flip y values 0,0 is top left, top by flipping it becomes left bottom

    const symbolScale = scaleOrdinal()
      .domain(data.map(symbolValue))
      .range(symbols);
    
    const symbolGenerator = symbol().size(size);

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
      .call(axisLeft(y));

    selection
      .append('g')
      .attr(
        'transform',
        `translate(0, ${height - margin.bottom})`
      )
      .call(axisBottom(x));
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
