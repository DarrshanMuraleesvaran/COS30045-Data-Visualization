// ------------------------------------------------------
// EXERCISE 5.2 - SCATTER PLOT AND LINE CHART
// ------------------------------------------------------

const lineChart =
    document.getElementById("line-chart");


if (lineChart) {

    d3.csv("data/ARE_Spot_Prices.csv")
        .then(function (data) {

            data.forEach(function (d) {

                d.year =
                    +d.Year;

                d.averagePrice =
                    +d["Average Price (notTas-Snowy)"];

            });


            console.log(
                "Average electricity spot prices:",
                data.map(function (d) {
                    return {
                        year: d.year,
                        averagePrice: d.averagePrice
                    };
                })
            );


            drawLineChart(data);

        })

        .catch(function (error) {

            console.error(
                "Error loading ARE_Spot_Prices.csv:",
                error
            );

        });

}


const drawLineChart = function (data) {

    const margin = {
        top: 45,
        right: 35,
        bottom: 65,
        left: 65
    };

    const width = 760;
    const height = 430;

    const innerWidth =
        width -
        margin.left -
        margin.right;

    const innerHeight =
        height -
        margin.top -
        margin.bottom;


    d3.select("#line-chart")
        .html("");


    const svg = d3
        .select("#line-chart")
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
            "line-chart-svg",
            true
        );


    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    const xScale = d3
        .scaleLinear()
        .domain(
            d3.extent(
                data,
                function (d) {
                    return d.year;
                }
            )
        )
        .range([
            0,
            innerWidth
        ]);


    const yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(
                data,
                function (d) {
                    return d.averagePrice;
                }
            )
        ])
        .nice()
        .range([
            innerHeight,
            0
        ]);


    const bottomAxis = d3
        .axisBottom(xScale)
        .tickFormat(
            d3.format("d")
        );

    const leftAxis = d3
        .axisLeft(yScale);


    innerChart
        .append("g")
        .attr(
            "class",
            "grid-lines"
        )
        .call(
            d3.axisLeft(yScale)
                .ticks(6)
                .tickSize(-innerWidth)
                .tickFormat("")
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
        .call(bottomAxis);


    innerChart
        .append("g")
        .attr(
            "class",
            "y-axis"
        )
        .call(leftAxis);


    const lineGenerator = d3
        .line()
        .x(function (d) {
            return xScale(d.year);
        })
        .y(function (d) {
            return yScale(d.averagePrice);
        });


    innerChart
        .append("path")
        .attr(
            "class",
            "average-price-line"
        )
        .attr(
            "d",
            lineGenerator(data)
        );


    innerChart
        .selectAll(".price-point")
        .data(data)
        .join("circle")
        .attr(
            "class",
            "price-point"
        )
        .attr(
            "r",
            4
        )
        .attr(
            "cx",
            function (d) {
                return xScale(d.year);
            }
        )
        .attr(
            "cy",
            function (d) {
                return yScale(d.averagePrice);
            }
        );


    innerChart
        .append("text")
        .attr(
            "class",
            "axis-title y-axis-title"
        )
        .attr(
            "x",
            -margin.left
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
            "Average Price ($ per mWh)"
        );


    innerChart
        .append("text")
        .attr(
            "class",
            "axis-title"
        )
        .attr(
            "x",
            innerWidth / 2
        )
        .attr(
            "y",
            innerHeight + 48
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(
            "Year"
        );


    innerChart
        .append("text")
        .attr(
            "class",
            "line-label"
        )
        .attr(
            "x",
            innerWidth - 4
        )
        .attr(
            "y",
            yScale(data[data.length - 1].averagePrice) - 10
        )
        .attr(
            "text-anchor",
            "end"
        )
        .text(
            "Average Price"
        );

};
