// ------------------------------------------------------
// EXERCISE 6.3 - SCATTERPLOT
// ------------------------------------------------------

const drawScatterplot = function (data) {

    d3.select("#scatterplot")
        .html("");


    const svg = d3
        .select("#scatterplot")
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
            "scatterplot-svg",
            true
        );


    innerChartS = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    xScaleS
        .domain([
            0,
            d3.max(
                data,
                function (d) {
                    return d.star;
                }
            )
        ])
        .nice()
        .range([
            0,
            innerWidth
        ]);


    yScaleS
        .domain([
            0,
            d3.max(
                data,
                function (d) {
                    return d.energyConsumption;
                }
            )
        ])
        .nice()
        .range([
            innerHeight,
            0
        ]);


    colorScale
        .domain([
            "LED",
            "LCD",
            "OLED"
        ])
        .range([
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c"
        ]);


    innerChartS
        .append("g")
        .attr(
            "class",
            "grid-lines"
        )
        .call(
            d3.axisLeft(yScaleS)
                .ticks(7)
                .tickSize(-innerWidth)
                .tickFormat("")
        );


    innerChartS
        .selectAll(".scatter-point")
        .data(data)
        .join("circle")
        .attr(
            "class",
            "scatter-point"
        )
        .attr(
            "r",
            5
        )
        .attr(
            "cx",
            function (d) {
                return xScaleS(d.star);
            }
        )
        .attr(
            "cy",
            function (d) {
                return yScaleS(d.energyConsumption);
            }
        )
        .attr(
            "fill",
            function (d) {
                return colorScale(d.screenTech);
            }
        )
        .attr(
            "opacity",
            0.58
        );


    innerChartS
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
            d3.axisBottom(xScaleS)
                .ticks(8)
        );


    innerChartS
        .append("g")
        .attr(
            "class",
            "y-axis"
        )
        .call(
            d3.axisLeft(yScaleS)
                .ticks(7)
                .tickFormat(d3.format(","))
        );


    innerChartS
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
            "Labelled Energy Consumption (kWh/year)"
        );


    innerChartS
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
            "Star Rating"
        );


    const legend = svg
        .append("g")
        .attr(
            "class",
            "scatter-legend"
        )
        .attr(
            "transform",
            `translate(${width - 120}, ${margin.top})`
        );


    colorScale
        .domain()
        .forEach(function (screenTech, i) {

            const legendRow = legend
                .append("g")
                .attr(
                    "transform",
                    `translate(0, ${i * 24})`
                );

            legendRow
                .append("rect")
                .attr(
                    "width",
                    12
                )
                .attr(
                    "height",
                    12
                )
                .attr(
                    "fill",
                    colorScale(screenTech)
                );

            legendRow
                .append("text")
                .attr(
                    "x",
                    22
                )
                .attr(
                    "y",
                    10
                )
                .attr(
                    "text-anchor",
                    "start"
                )
                .style(
                    "alignment-baseline",
                    "middle"
                )
                .text(screenTech);

        });

};
