// ------------------------------------------------------
// EXERCISE 5.3 - DONUT CHART
// ------------------------------------------------------

const donutChart =
    document.getElementById("donut-chart");


if (donutChart) {

    d3.csv("data/Data_exercise 5.3.csv")
        .then(function (data) {

            data.forEach(function (d) {

                d.Count =
                    +d.Count;

            });


            console.log(
                "TV models by screen size category:",
                data
            );


            drawDonutChart(data);

        })

        .catch(function (error) {

            console.error(
                "Error loading Data_exercise 5.3.csv:",
                error
            );

        });

}


const drawDonutChart = function (data) {

    const width = 760;
    const height = 430;
    const radius =
        Math.min(width, height) / 2 - 35;


    d3.select("#donut-chart")
        .html("");


    const color = d3
        .scaleOrdinal()
        .domain(
            data.map(function (d) {
                return d.Screensize_Category;
            })
        )
        .range(d3.schemeSet2);


    const pie = d3
        .pie()
        .value(function (d) {
            return d.Count;
        })
        .sort(null);


    const arcGenerator = d3
        .arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);


    const svg = d3
        .select("#donut-chart")
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
            "donut-chart-svg",
            true
        );


    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width / 2}, ${height / 2})`
        );


    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr(
            "class",
            "donut-slice"
        )
        .attr(
            "d",
            arcGenerator
        )
        .attr(
            "fill",
            function (d) {
                return color(d.data.Screensize_Category);
            }
        )
        .attr(
            "stroke",
            "white"
        )
        .attr(
            "stroke-width",
            2
        );


    innerChart
        .selectAll(".donut-label")
        .data(pie(data))
        .join("text")
        .attr(
            "class",
            "donut-label"
        )
        .attr(
            "transform",
            function (d) {
                return `translate(${arcGenerator.centroid(d)})`;
            }
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .attr(
            "dy",
            "0.35em"
        )
        .text(function (d) {
            return d.data.Screensize_Category;
        });

};
