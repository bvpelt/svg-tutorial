(function (d3) {
  'use strict';

  const stringTimes = [
     {
      tijdstipRegistratie: '2020-01-01T08:00:00',
      eindRegistratie: null,
      beginGeldigheid: '2020-01-02',
      eindGeldigheid: null,
      value: 'versie 1',
    }
    /*
    {
      tijdstipRegistratie: '2020-01-01T08:00:00',
      eindRegistratie: '2020-02-01T08:00:00',
      beginGeldigheid: '2020-01-02',
      eindGeldigheid: null,
      value: 'versie 1',
    },
    {
      tijdstipRegistratie: '2020-02-01T08:00:00',
      eindRegistratie: null,
      beginGeldigheid: '2020-01-02',
      eindGeldigheid: '2020-02-02',
      value: 'versie 1',
    },
    {
      tijdstipRegistratie: '2020-02-01T08:00:00',
      eindRegistratie: '2020-03-01T08:00:00',
      beginGeldigheid: '2020-02-02',
      eindGeldigheid: null,
      value: 'versie 2',
    },
    {
      tijdstipRegistratie: '2020-03-01T08:00:00',
      eindRegistratie: null,
      beginGeldigheid: '2020-03-02',
      eindGeldigheid: null,
      value: 'versie 2',
    },
    {
      tijdstipRegistratie: '2020-03-01T08:00:00',
      eindRegistratie: null,
      beginGeldigheid: '2020-04-02',
      eindGeldigheid: null,
      value: 'versie 3',
    },
    */
  ];

  var timeTable = [];

  stringTimes.forEach((d) => {
    let timeLine = {};
    timeLine.tijdstipRegistratie = new Date(d.tijdstipRegistratie + 'Z');
    timeLine.eindRegistratie = (timeLine.eindRegistratie !== null) ? new Date(d.eindRegistratie + 'Z') : null;
    timeLine.beginGeldigheid = new Date(d.beginGeldigheid + 'Z');
    timeLine.eindGeldigheid = (timeLine.eindGeldigheid  !== null) ? new Date(d.eindGeldigheid + 'Z'): null;
    timeLine.value = d.value;

    timeTable.push(timeLine);
  });

  const timePlot = () => {
    let width;
    let height;
    let data;
    let xbValue;
    let xeValue;
    let ybValue;
    let yeValue;
    let xMax;
    let yMax;
    let value;
    let margin;

    const my = (selection) => {
      
     
      const x = d3.scaleTime()
        .domain([d3.max(data, xbValue), xMax])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleTime()
        .domain([d3.max(data, ybValue), yMax])
        .range([
          height - margin.bottom,
          margin.top,
        ]);
      
      function checkRegistratieEndDate(date) {
        return (date === null) ? xMax : date;
      }
      
          function checkGeldigheidEndDate(date) {
        return (date === null) ? yMax : date;
      }

      const marks = data.map((d, i) => ({
        x: x(xbValue(d)),
        y: y(ybValue(d)),
        width: x(checkRegistratieEndDate(xeValue(d))) - x(xbValue(d)),
        height: y(checkGeldigheidEndDate(yeValue(d))) - y(ybValue(d)),
      }));

      console.log('data');
      console.log(data);
      console.log('marks');
      console.log(marks);

      /*
      
      https://stackoverflow.com/questions/25284570/add-rectangles-over-dates-d3
      
      svg.selectAll('.time-span-rect')
    .data(data)
    .enter().append('rect')
      .attr('class', 'time-span-rect')
      .attr('x', function(d) { return x(d.start_dt); })
      .attr('y', 0)
      .attr('width', function(d) { return x(d.end_dt) - x(d.start_dt); })
      .attr('height', height);
      
       selection
        .selectAll('rect')
        .data(marks)
        .enter()
        .append('rect')
        .attr('class', 'time-span-rect')
      	.attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
      	.attr('width', (d) => d.width)
        .attr('height', (d) => d.height);
      
      selection
        .selectAll('rect')
        .data(marks)
        .join('rect')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('width', (d) => d.width)
        .attr('height', (d) => d.height);
  */

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

    my.xMax = function (_) {
      return arguments.length
        ? ((xMax = _), my)
        : xMax;
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

    my.yMax = function (_) {
      return arguments.length
        ? ((yMax = _), my)
        : yMax;
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

  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  console.log('timeTable');
  console.log(timeTable);



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
        .xMax(maxX)
        .yMax(maxY)
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

})(d3);
//# sourceMappingURL=bundle.js.map
