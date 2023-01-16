(function (d3) {
  'use strict';

  const csvUrl = "https://raw.githubusercontent.com/bvpelt/svg-tutorial/main/examples/example-33/karbonhydrate.csv";
    // in csvfile: koolhydraten,vet,kcal,product,eenheid
    
    const parseRow = (d) => {
      d.koolhydraten = +d.koolhydraten;
      d.vet = +d.vet;
      d.kcal = +d.kcal;        
      return d;
    };
    
    const xValue = (d) => d.kcal;
    const yValue = (d) => d.koolhydraten;
    const margin = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 50,
    };
    const radius = 5;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const main = async () => {
      const data = await d3.csv(csvUrl, parseRow);

      const x = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([height - margin.bottom, margin.top]);

      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
      }));

      svg
        .selectAll('circle')
        .data(marks)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', radius);

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      svg
        .append('g')
        .attr(
          'transform',
          `translate(0,${height - margin.bottom})`
        )
        .call(d3.axisBottom(x));
    };
    //main();

    module.exports=main;

})(d3);
//# sourceMappingURL=bundle.js.map
