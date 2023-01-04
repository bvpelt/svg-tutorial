export function vizData(selection, data) {
  const barWidth = 20;
  selection
    .selectAll('circle')
    .data(data)
    .join('circle') // newer api sets
    .attr('r', (d) => d.r)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('fill', (d) => d.fill);
  
  selection
  .selectAll('line')
  .data(data)
  .join('line')
  .attr('x1', (d,i) => (i === 0 ? d.x : data[i-1].x))
  .attr('y1', (d,i) => (i === 0 ? d.y : data[i-1].y))
  .attr('x2', (d) => d.x)
  .attr('y2', (d) => d.y)  
  .attr('stroke', (d) => d.fill)
  .attr('stroke-width', barWidth)
  ;
  
  selection
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', (d) => d.x-barWidth/2)
  .attr('y',  0)
  .attr('rx', 20)
  .attr('width', barWidth)
  .attr('height', (d) => d.y)
  .attr('fill', (d) => d.fill)
  ;
}
