import {
  scaleTime,
  axisLeft,
  axisBottom,
  min,
  max,
  select,
  selectAll,
  timeFormat
} from 'd3';

export const timePlot = () => {
  let width;
  let height;
  let data;
  let xbValue;
  let xeValue;
  let xLabel;
  let ybValue;
  let yeValue;
  let yLabel;
  let value;
  let margin;

  const my = (selection) => {
    // date function
    // - check dates
    // - addDate - for not yet ended periods
    //
    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }

    function addDate(d, numberdays) {
      let rtime = new Date(d);

      return new Date(
        rtime.getTime() +
        numberdays * 24 * 60 * 60 * 1000
      );
    }

    const dateTimeFormat = timeFormat('%Y-%m-%d %H:%M:%S');
    const dateFormat = timeFormat('%Y-%m-%d');

    // determine maximum values for registrie/geldigheid of dataset
    const tempxMax = max(data, (d) =>
      isValidDate(d.eindRegistratie)
        ? d.eindRegistratie
        : d.tijdstipRegistratie
    );

    const tempyMax = max(data, (d) =>
      isValidDate(d.eindGeldigheid)
        ? d.eindGeldigheid
        : d.beginGeldigheid
    );

    // determine maximum values for the graph
    // for not yet defined eindregistratie/eindgeldigheid use temporary maximum and add 7 days
    const extraDays = 7;
    const xMax = addDate(tempxMax, extraDays);
    const yMax = addDate(tempyMax, extraDays);

    // Generate temporary data set with adjusted maximum for eindregistratie/eindgeldighei
    const tmarks = data.map((d) => ({
      beginGeldigheid: d.beginGeldigheid,
      eindGeldigheid: isValidDate(
        d.eindGeldigheid
      )
        ? d.eindGeldigheid
        : yMax,
      tijdstipRegistratie: d.tijdstipRegistratie,
      eindRegistratie: isValidDate(
        d.eindRegistratie
      )
        ? d.eindRegistratie
        : xMax,
      value: d.value,
    }));

    // Define x/y scales
    const x = scaleTime()
      .domain([
        min(tmarks, xbValue),
        max(tmarks, xeValue),
      ])
      .range([margin.left, width - margin.right]);

    const y = scaleTime()
      .domain([
        min(tmarks, ybValue),
        max(tmarks, yeValue),
      ])
      .range([
        height - margin.bottom,
        margin.top,
      ]);

    // Generate dataset for visualisation
    // especially calculate width/height of timeboxes
    const marks = tmarks.map((d, i) => ({
      x: x(xbValue(d)),
      y: y(yeValue(d)),
      tijdstipRegistratie: xbValue(d),
      eindRegistratie: xeValue(d),
      beginGeldigheid: ybValue(d),
      eindGeldigheid: yeValue(d),
      value: value(d),
      width: x(xeValue(d)) - x(xbValue(d)),
      height: y(ybValue(d)) - y(yeValue(d)),
    }));

    // create a tooltip
    // ref https://d3-graph-gallery.com/graph/interactivity_tooltip.html#mostbasic
    // https://stackoverflow.com/questions/65134858/d3-mouse-is-not-a-function
    //
    var tooltip = select('#timeplot')
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
          dateFormat(d.eindGeldigheid)
        )
        .style('left', event.pageX + 5 + 'px')
        .style('top', event.pageY + 5 + 'px');
    };

    let mouseleave = function (event, d) {
      tooltip.style('opacity', 0);
      select(this)
        .style('fill', 'none')
        .style('opacity', 0.8);
    };

    // Draw the graph
    selection
      .selectAll('rect')
      .data(marks)
      .join('rect')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    selection
      .append('g')
      .attr('class', 'y-axis')
      .attr(
        'transform',
        `translate(${margin.left},0)`
      )
      .call(axisLeft(y)
        .tickFormat(timeFormat('%Y-%m')));

    selection
      .append('g')
      .attr('class', 'x-axis')
      .attr(
        'transform',
        `translate(0, ${height - margin.bottom})`
      )
      .call(axisBottom(x)
        .tickFormat(timeFormat('%Y-%m'))
      )
      
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)");

    selection
      .selectAll('text.x-axis-label')
      .data([null]) // single element
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', `${width / 2}`)
      .attr('y', `${height - 10}`)
      .style('text-anchor', 'middle')
      .text(xLabel);

    selection
      .selectAll('text.y-axis-label')
      .data([null]) // single element
      .join('text')
      .attr('class', 'y-axis-label')
      .attr(
        'transform',
        `translate(30,${height / 2})rotate(-90)`)
      .style('text-anchor', 'middle')
      .text(yLabel)
      ;
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

  my.xbValue = function (_) {
    return arguments.length
      ? ((xbValue = _), my)
      : xbValue;
  };

  my.xeValue = function (_) {
    return arguments.length
      ? ((xeValue = _), my)
      : xeValue;
  };

  my.xLabel = function (_) {
    return arguments.length
      ? ((xLabel = _), my)
      : xLabel;
  };

  my.ybValue = function (_) {
    return arguments.length
      ? ((ybValue = _), my)
      : ybValue;
  };

  my.yeValue = function (_) {
    return arguments.length
      ? ((yeValue = _), my)
      : yeValue;
  };

  my.yLabel = function (_) {
    return arguments.length
      ? ((yLabel = _), my)
      : yLabel;
  };

  my.margin = function (_) {
    return arguments.length
      ? ((margin = _), my)
      : margin;
  };

  my.xWidth = function (_) {
    return arguments.length
      ? ((xWidth = _), my)
      : xWidth;
  };

  my.yHeight = function (_) {
    return arguments.length
      ? ((yHeight = _), my)
      : yHeight;
  };

  my.value = function (_) {
    return arguments.length
      ? ((value = _), my)
      : value;
  };

  return my;
};
