import {
  scaleTime,
  axisLeft,
  axisBottom,
  min,
  max,
  select,
  selectAll,
  timeFormat,
  transition
} from 'd3';

export const timePlot = () => {
  let width;
  let height;
  let data;
  let xStartValue;
  let xEindValue;
  let xLabel;
  let xMax;
  let yStartValue;
  let yEindValue;
  let yLabel;
  let yMax;
  let getColor;
  let yChanged;
  let yType;
  let value;
  let margin;


  var tooltip = selectAll('#timeplot')
    .data([null])
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('position', 'absolute')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('z-index', '100');


  const my = (selection) => {

    const t = transition().duration(1000);

    const dateTimeFormat = timeFormat('%Y-%m-%d %H:%M:%S');
    const dateFormat = timeFormat('%Y-%m-%d');


    // Define x/y scales
    const x = scaleTime()
      .domain([
        min(data, xStartValue),
        max(data, xEindValue),
      ])
      .range([margin.left, width - margin.right]);

    const y = scaleTime()
      .domain([
        min(data, yStartValue),
        max(data, yEindValue),
      ])
      .range([height - margin.bottom, margin.top]);

    // create a tooltip
    // ref https://d3-graph-gallery.com/graph/interactivity_tooltip.html#mostbasic
    // https://stackoverflow.com/questions/65134858/d3-mouse-is-not-a-function
    //

    // mouse event handlers for the tooltips
    let mouseover = function (event, d) {
      tooltip.style('opacity', 1);
      select(this)
        .style('fill', 'red')
        .style('opacity', 1);
    };

    let mousemove = function (event, d) {
      tooltip
        .html(
          'value: ' +
          d.value +
          '<br/>' +
          ' beginreg: ' +
          dateTimeFormat(d.tijdstipRegistratie) +
          '<br/>' +
          ' eindreg: ' +
          dateTimeFormat(d.eindRegistratie) +
          '<br/>' +
          ' begingeld: ' +
          dateFormat(d.beginGeldigheid) +
          '<br/>' +
          ' eindgeld: ' +
          dateFormat(d.eindGeldigheid) +
          '<br/>' +
          ' begininwerk: ' +
          dateFormat(d.beginInwerking) +
          '<br/>' +
          ' eindinwerk: ' +
          dateFormat(d.eindInwerking)
        )
        .style('left', event.pageX + 5 + 'px')
        .style('top', event.pageY + 5 + 'px');
    };

    let mouseleave = function (event, d) {
      tooltip.style('opacity', 0);
      select(this)
        .style('fill', getColor(d))
        .style('opacity', 0.8);
    };

    // Draw the graph
    const deltaX = (d) => {
      return x(xEindValue(d)) - x(xStartValue(d));
    }

    const deltaY = (d) => {
      return y(yStartValue(d)) - y(yEindValue(d));
    }

    const positionRects = (rects) => {
      rects
        .attr('x', (d) => x(xStartValue(d)))
        .attr('y', (d) => y(yEindValue(d)))
        .attr('fill', 'none')
        ;
    };

    const initializeRects = (rects) => {
      rects
        .attr('width', 1)
        .attr('height', 1)
        ;
    };

    const growRects = (rects) => {
      rects.transition(t)
        .attr('width', (d) => deltaX(d))
        .attr('height', (d) => deltaY(d))
        .attr('fill', (d) => getColor(d))
        ;
    };

    const shrinkRects = (rects) => {
      rects.transition(t)
        .attr('width', 1)
        .attr('height', 1)
        // reset mouse handlers
        .on('mouseover', null)
        .on('mousemove', null)
        .on('mouseleave', null)
        .remove();
    };

    const rects = selection
      .selectAll('rect')
      .data(data)
      .join(
        (enter) =>
          enter
            .append('rect')
            .call(positionRects)
            .call(initializeRects)
            .call(growRects),
        (update) =>
          update
            .call((update) =>
              update
                .transition(t)
                .delay((d) => 750)
                .call(positionRects)
                .call(growRects)
            ),
        (exit) => exit.call(shrinkRects)
      )
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    // Y Axis    
    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr(
        'transform',
        `translate(${margin.left},0)`
      )
      .transition(t)
      .call(axisLeft(y)
        .tickFormat(timeFormat('%Y-%m-%d'))
        .tickValues(data.map(function (d) { return new Date(yStartValue(d)) })));

    selection
      .selectAll('text.y-axis-label')
      .data([null]) // single element
      .join('text')
      .attr('class', 'y-axis-label')
      .attr(
        'transform',
        `translate(30,${height / 2})rotate(-90)`)
      .style('text-anchor', 'middle')
      .transition(t)
      .text(yLabel)
      ;

    // X Axis
    selection
      .append('g')
      .attr('class', 'x-axis')
      .attr(
        'transform',
        `translate(0, ${height - margin.bottom})`
      )
      .call(axisBottom(x)
        .tickFormat(timeFormat('%Y-%m-%d'))
        .tickValues(data.map(function (d) { return new Date(xStartValue(d)) })))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", `translate(3, 140)rotate(90)`);

    selection
      .selectAll('text.x-axis-label')
      .data([null]) // single element
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', `${width / 2}`)
      .attr('y', `${height - 10}`)
      .style('text-anchor', 'middle')
      .text(xLabel)
  };

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

  my.xStartValue = function (_) {
    return arguments.length
      ? ((xStartValue = _), my)
      : xStartValue;
  };

  my.xEindValue = function (_) {
    return arguments.length
      ? ((xEindValue = _), my)
      : xEindValue;
  };

  my.xLabel = function (_) {
    return arguments.length
      ? ((xLabel = _), my)
      : xLabel;
  };

  my.xMax = function (_) {
    return arguments.length
      ? ((xMax = _), my)
      : xMax;
  };

  my.yStartValue = function (_) {
    return arguments.length
      ? ((yStartValue = _), my)
      : yStartValue;
  };

  my.yEindValue = function (_) {
    return arguments.length
      ? ((yEindValue = _), my)
      : yEindValue;
  };

  my.yLabel = function (_) {
    return arguments.length
      ? ((yLabel = _), my)
      : yLabel;
  };

  my.yMax = function (_) {
    return arguments.length
      ? ((yMax = _), my)
      : yMax;
  };

  my.getColor = function (_) {
    return arguments.length
      ? ((getColor = _), my)
      : getColor;
  };


  my.yChanged = function (_) {
    return arguments.length
      ? ((yChanged = _), my)
      : yChanged;
  };

  my.yType = function (_) {
    return arguments.length
      ? ((yType = _), my)
      : yType;
  };

  my.margin = function (_) {
    return arguments.length
      ? ((margin = _), my)
      : margin;
  };

  my.value = function (_) {
    return arguments.length
      ? ((value = _), my)
      : value;
  };

  return my;
};
