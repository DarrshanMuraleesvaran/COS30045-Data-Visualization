// ------------------------------------------------------
// EXERCISE 6.1 - HISTOGRAM
// ------------------------------------------------------

const drawHistogram = function (data) {

    d3.select("#histogram")
        .html("");


    const svg = d3
        .select("#histogram")
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )
        .attr(
            "preserveAspectRatio",
            "xMidYMid meet"
        )
        .classed(
            "histogram-svg",
            true
        );


    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    const bins =
        binGenerator(data);

    console.log(
        "Histogram bins:",
        bins
    );


    const minEng =
        bins[0].x0;

    const maxEng =
        bins[bins.length - 1].x1;

    const binsMaxLength = d3
        .max(
            bins,
            function (d) {
                return d.length;
            }
        );

    console.log(
        "minEng:",
        minEng,
        "maxEng:",
        maxEng,
        "binsMaxLength:",
        binsMaxLength
    );


    xScale
        .domain([
            minEng,
            maxEng
        ])
        .range([
            0,
            innerWidth
        ]);

    yScale
        .domain([
            0,
            binsMaxLength
        ])
        .range([
            innerHeight,
            0
        ])
        .nice();


    innerChart
        .append("g")
        .attr(
            "class",
            "grid-lines"
        )
        .call(
            d3.axisLeft(yScale)
                .ticks(7)
                .tickSize(-innerWidth)
                .tickFormat("")
        );


    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr(
            "class",
            "histogram-bar"
        )
        .attr(
            "x",
            function (d) {
                return xScale(d.x0);
            }
        )
        .attr(
            "y",
            function (d) {
                return yScale(d.length);
            }
        )
        .attr(
            "width",
            function (d) {
                return Math.max(
                    0,
                    xScale(d.x1) - xScale(d.x0)
                );
            }
        )
        .attr(
            "height",
            function (d) {
                return innerHeight - yScale(d.length);
            }
        );


    innerChart
        .append("g")
        .attr(
            "class",
            "x-axis"
        )
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(
            d3.axisBottom(xScale)
                .tickFormat(d3.format(","))
        );


    innerChart
        .append("g")
        .attr(
            "class",
            "y-axis"
        )
        .call(
            d3.axisLeft(yScale)
                .ticks(7)
                .tickFormat(d3.format(","))
        );


    innerChart
        .append("text")
        .attr(
            "class",
            "axis-title"
        )
        .attr(
            "x",
            0
        )
        .attr(
            "y",
            -16
        )
        .attr(
            "text-anchor",
            "start"
        )
        .text(
            "Frequency"
        );


    innerChart
        .append("text")
        .attr(
            "class",
            "axis-title"
        )
        .attr(
            "x",
            innerWidth
        )
        .attr(
            "y",
            innerHeight + 55
        )
        .attr(
            "text-anchor",
            "end"
        )
        .text(
            "Labelled Energy Consumption (kWh/year)"
        );

};
