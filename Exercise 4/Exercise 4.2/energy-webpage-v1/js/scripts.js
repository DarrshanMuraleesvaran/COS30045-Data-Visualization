const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = question.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});


// ------------------------------------------------------
// ENERGY CALCULATOR
// ------------------------------------------------------

const calculateButton = document.getElementById("calculate-btn");

if (calculateButton) {

    calculateButton.addEventListener("click", function () {

        const power = parseFloat(
            document.getElementById("power").value
        );

        const hours = parseFloat(
            document.getElementById("hours").value
        );

        const price = parseFloat(
            document.getElementById("price").value
        );

        const message =
            document.getElementById("calculator-message");


        if (
            isNaN(power) ||
            isNaN(hours) ||
            isNaN(price) ||
            power <= 0 ||
            hours < 0 ||
            hours > 24 ||
            price < 0
        ) {

            message.textContent =
                "Please enter valid values. Hours used must be between 0 and 24.";

            return;
        }


        message.textContent = "";


        const dailyEnergy =
            (power / 1000) * hours;

        const monthlyEnergy =
            dailyEnergy * 30;

        const yearlyEnergy =
            dailyEnergy * 365;


        const pricePerKWh =
            price / 100;

        const monthlyCost =
            monthlyEnergy * pricePerKWh;


        document.getElementById(
            "daily-energy"
        ).textContent =
            dailyEnergy.toFixed(2);


        document.getElementById(
            "monthly-energy"
        ).textContent =
            monthlyEnergy.toFixed(2);


        document.getElementById(
            "yearly-energy"
        ).textContent =
            yearlyEnergy.toFixed(2);


        document.getElementById(
            "monthly-cost"
        ).textContent =
            monthlyCost.toFixed(2);
    });
}



// ------------------------------------------------------
// D3 BAR CHART - TV BRAND COUNT
// EXERCISE 4.4 / 4.5 / 4.6
// ------------------------------------------------------

const brandChart =
    document.getElementById("brand-chart");


if (brandChart) {

    d3.csv("data/tvBrandCount.csv")
        .then(function (data) {


            // --------------------------------------------------
            // CONVERT CSV COUNT VALUES TO NUMBERS
            // --------------------------------------------------

            data.forEach(function (d) {

                d["Count(SoldIn)"] =
                    +d["Count(SoldIn)"];

            });



            // --------------------------------------------------
            // EXERCISE 4.4 - DATA CHECKS
            // --------------------------------------------------

            console.log(
                "Number of rows:",
                data.length
            );


            console.log(
                "Maximum count:",
                d3.max(
                    data,
                    function (d) {
                        return d["Count(SoldIn)"];
                    }
                )
            );


            console.log(
                "Minimum count:",
                d3.min(
                    data,
                    function (d) {
                        return d["Count(SoldIn)"];
                    }
                )
            );


            console.log(
                "Extent:",
                d3.extent(
                    data,
                    function (d) {
                        return d["Count(SoldIn)"];
                    }
                )
            );



            // --------------------------------------------------
            // SORT HIGHEST TO LOWEST
            // --------------------------------------------------

            data.sort(function (a, b) {

                return d3.descending(
                    a["Count(SoldIn)"],
                    b["Count(SoldIn)"]
                );

            });


            console.log(
                "Sorted data:",
                data
            );



            // --------------------------------------------------
            // KEEP TOP 10 TV BRANDS
            // --------------------------------------------------

            const top10 =
                data.slice(0, 10);


            console.log(
                "Top 10 brands:",
                top10
            );



            // --------------------------------------------------
            // EXERCISE 4.6 - CHART DIMENSIONS
            //
            // The chart is deliberately constrained so that
            // scales are required to fit the data.
            // --------------------------------------------------

            const width = 600;
            const height = 520;


            const margin = {
                top: 40,
                right: 50,
                bottom: 70,
                left: 150
            };


            const chartWidth =
                width -
                margin.left -
                margin.right;


            const chartHeight =
                height -
                margin.top -
                margin.bottom;



            // --------------------------------------------------
            // CLEAR EXISTING CHART
            // --------------------------------------------------

            d3.select("#brand-chart")
                .html("");



            // --------------------------------------------------
            // CREATE RESPONSIVE SVG
            // --------------------------------------------------

            const svg = d3
                .select("#brand-chart")
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
                    "brand-chart-svg",
                    true
                );



            // --------------------------------------------------
            // EXERCISE 4.6
            // LINEAR SCALE FOR COUNT DATA
            //
            // DOMAIN = data values
            // RANGE  = available pixels
            // --------------------------------------------------

            const xScale = d3
                .scaleLinear()

                .domain([
                    0,
                    1200
                ])

                .range([
                    0,
                    chartWidth
                ]);



            // --------------------------------------------------
            // EXERCISE 4.6
            // BAND SCALE FOR BRAND CATEGORIES
            //
            // Each brand receives its own section
            // of the available vertical space.
            // --------------------------------------------------

            const yScale = d3
                .scaleBand()

                .domain(
                    top10.map(
                        function (d) {
                            return d.Brand_Reg;
                        }
                    )
                )

                .range([
                    margin.top,
                    margin.top + chartHeight
                ])

                .padding(0.18);



            // --------------------------------------------------
            // GRIDLINES
            // --------------------------------------------------

            svg.append("g")

                .attr(
                    "class",
                    "grid-lines"
                )

                .attr(
                    "transform",
                    `translate(${margin.left},
                    ${margin.top + chartHeight})`
                )

                .call(

                    d3.axisBottom(xScale)

                        .ticks(6)

                        .tickSize(
                            -chartHeight
                        )

                        .tickFormat("")

                );



            // --------------------------------------------------
            // DRAW BARS
            //
            // Lecturer's Exercise 4.6 method:
            //
            // width  -> xScale(count)
            // height -> yScale.bandwidth()
            // y      -> yScale(brand)
            // --------------------------------------------------

            svg.selectAll(".bar")

                .data(top10)

                .join("rect")

                .attr(
                    "class",
                    "bar"
                )


                // Start bars after the brand labels
                .attr(
                    "x",
                    margin.left
                )


                // Position each category using scaleBand
                .attr(
                    "y",
                    function (d) {
                        return yScale(
                            d.Brand_Reg
                        );
                    }
                )


                // Numerical count mapped to pixel width
                .attr(
                    "width",
                    function (d) {
                        return xScale(
                            d["Count(SoldIn)"]
                        );
                    }
                )


                // Bar thickness calculated by scaleBand
                .attr(
                    "height",
                    yScale.bandwidth()
                )


                .attr(
                    "rx",
                    4
                )

                .attr(
                    "ry",
                    4
                )

                .attr(
                    "fill",
                    "#d79a1e"
                );



            // --------------------------------------------------
            // VALUE LABELS
            // --------------------------------------------------

            svg.selectAll(".value-label")

                .data(top10)

                .join("text")

                .attr(
                    "class",
                    "value-label"
                )


                // Place count just after the end of each bar
                .attr(
                    "x",
                    function (d) {

                        return (
                            margin.left +
                            xScale(
                                d["Count(SoldIn)"]
                            ) +
                            8
                        );

                    }
                )


                .attr(
                    "y",
                    function (d) {

                        return (
                            yScale(
                                d.Brand_Reg
                            ) +
                            yScale.bandwidth() / 2
                        );

                    }
                )


                .attr(
                    "dominant-baseline",
                    "middle"
                )


                .attr(
                    "text-anchor",
                    "start"
                )


                .text(
                    function (d) {

                        return d3.format(",")(
                            d["Count(SoldIn)"]
                        );

                    }
                );



            // --------------------------------------------------
            // X AXIS - TV COUNT
            // --------------------------------------------------

            svg.append("g")

                .attr(
                    "class",
                    "x-axis"
                )

                .attr(
                    "transform",
                    `translate(
                        ${margin.left},
                        ${margin.top + chartHeight}
                    )`
                )

                .call(

                    d3.axisBottom(
                        xScale
                    )

                    .ticks(6)

                    .tickFormat(
                        d3.format(",")
                    )

                );



            // --------------------------------------------------
            // Y AXIS - TV BRANDS
            // --------------------------------------------------

            svg.append("g")

                .attr(
                    "class",
                    "y-axis"
                )

                .attr(
                    "transform",
                    `translate(${margin.left},0)`
                )

                .call(
                    d3.axisLeft(
                        yScale
                    )
                );



            // --------------------------------------------------
            // X AXIS LABEL
            // --------------------------------------------------

            svg.append("text")

                .attr(
                    "class",
                    "axis-title"
                )

                .attr(
                    "x",
                    margin.left +
                    chartWidth / 2
                )

                .attr(
                    "y",
                    height - 20
                )

                .attr(
                    "text-anchor",
                    "middle"
                )

                .text(
                    "Number of television records"
                );



            // --------------------------------------------------
            // Y AXIS LABEL
            // --------------------------------------------------

            svg.append("text")

                .attr(
                    "class",
                    "axis-title"
                )

                .attr(
                    "transform",
                    "rotate(-90)"
                )

                .attr(
                    "x",
                    -(margin.top + chartHeight / 2)
                )

                .attr(
                    "y",
                    22
                )

                .attr(
                    "text-anchor",
                    "middle"
                )

                .text(
                    "TV Brand"
                );



        })

        .catch(function (error) {

            console.error(
                "Error loading tvBrandCount.csv:",
                error
            );

        });

}