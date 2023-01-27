import {
    scaleLinear,
    scalePoint,
    extent,
    axisLeft,
    axisBottom,
    transition,
    range,
} from 'd3';

export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let xType;
    let xLabel;
    let xChanged;
    let yValue;
    let yType;
    let yLabel;
    let yChanged;
    let productLabel;
    let margin;
    let radius;



    const computeScale = (type, data, value) => {
        let scale;

        switch (type) {
            case 'categorical':
                scale = scalePoint()
                    .domain(data.map(value))
                    .padding(0.2);
                break;
            case 'time':
                scale = scaleTime().domain(
                    extend(data, value)
                );
                break;
            case 'quantitative':
            default:
                scale = scaleLinear().domain(
                    extent(data, value)
                );
                break;
        }
        return scale;

    };

    const my = (selection) => {      

        const x = computeScale(xType, data, xValue).range([margin.left, width - margin.right]);
        const y = computeScale(yType, data, yValue).range([height - margin.bottom, margin.top]);

        const marks = data
            .filter((d) =>
                productLabel === 'All'
                    ? d.product == d.product
                    : d.product == productLabel
            )
            .map((d) => ({
                x: x(xValue(d)),
                y: y(yValue(d)),
            }));

        const t = transition().duration(1000);

        const positionCircles = (circles) => {
            circles
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);
        };

        const initializeRadius = (circles) => {
            circles.attr('r', 0);
        };

        const growRadius = (enter) => {
            enter.transition(t).attr('r', radius);
        };

        const shrinkRadius = (enter) => {
            enter.transition(t).attr('r', 0).remove();
        };

        //X-Axis label
        const xAxisLabel = selection
            .selectAll('.x-label')
            .data([null])
            .join('text')
            .attr('class', 'x-label')
            .text(xLabel)
            .attr('x', width - margin.left * 0.5)
            .attr('y', height - margin.bottom * 1.2)
            .attr('fill', 'grey')
            .attr('opacity', 0.7)
            .attr('text-anchor', 'end');

        if (xChanged) {
            xAxisLabel
                .attr('x', width + margin.left)
                .transition(t)
                .attr('x', width - margin.left * 0.5);

            xChanged = false;
        }

        //Y-Axis label
        const yAxisLabel = selection
            .selectAll('.y-label')
            .data([null])
            .join('text')
            .attr('class', 'y-label')
            .text(yLabel)
            .attr('x', margin.left + 10)
            .attr('y', margin.top * 1.4)
            .attr('fill', 'grey')
            .attr('opacity', 0.7)
            .attr('text-anchor', 'start');

        if (yChanged) {
            yAxisLabel
                .attr('y', 0)
                .transition(t)
                .attr('y', margin.top * 1.4);

            yChanged = false;
        }

        const circles = selection
            .selectAll('circle')
            .data(marks)
            .join(
                (enter) =>
                    enter
                        .append('circle')
                        .call(positionCircles)
                        .call(initializeRadius)
                        .call(growRadius),
                (update) =>
                    update.call((update) =>
                        update
                            .transition(t)
                            .delay((d, i) => i * 10)
                            .call(positionCircles)
                    ),
                (exit) => exit.call(shrinkRadius)
            );

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
            .call(axisLeft(y));

        selection
            .selectAll('.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr(
                'transform',
                `translate(0,${height - margin.bottom})`
            )
            .transition(t)
            .call(axisBottom(x))
            .selectAll('text')
            .attr(
                'transform',
                'translate(15,50)rotate(90)'
            );
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

    my.xValue = function (_) {
        return arguments.length
            ? ((xValue = _), my)
            : xValue;
    };

    my.xType = function (_) {
        return arguments.length
            ? ((xType = _), my)
            : xType;
    };

    my.xLabel = function (_) {
        return arguments.length
            ? ((xLabel = _), my)
            : xLabel;
    };

    my.xChanged = function (_) {
        return arguments.length
            ? ((xChanged = _), my)
            : xChanged;
    };

    my.yValue = function (_) {
        return arguments.length
            ? ((yValue = _), my)
            : yValue;
    };

    my.yType = function (_) {
        return arguments.length
            ? ((yType = _), my)
            : yType;
    };

    my.yLabel = function (_) {
        return arguments.length
            ? ((yLabel = _), my)
            : yLabel;
    };

    my.yChanged = function (_) {
        return arguments.length
            ? ((yChanged = _), my)
            : yChanged;
    };
    my.margin = function (_) {
        return arguments.length
            ? ((margin = _), my)
            : margin;
    };

    my.radius = function (_) {
        return arguments.length
            ? ((radius = +_), my)
            : radius;
    };

    my.productLabel = function (_) {
        return arguments.length
            ? ((productLabel = _), my)
            : productLabel;
    };

    return my;
};
