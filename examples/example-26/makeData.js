import { range } from 'd3';

function red(t) {
  const red = 125 + Math.sin(t) * 125;
  
  return red;
}

function green(t) {
  const green = 125 + Math.sin(2*t) * 125;
  
  return green;
}


function blue(t) {
  const blue = 125 + Math.sin(t/2) * 125;
  
  return blue;
}

export function makeData(n, t) {
   const data = range(n).map((d) => ({
    x: d * 60 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 220,
    r: 20 + Math.sin(d * 0.5 + 6*2) * 10,
    fill: `rgb(${red(t)},${green(t)},${blue(t)})`
  }));
  
  return data;
};
