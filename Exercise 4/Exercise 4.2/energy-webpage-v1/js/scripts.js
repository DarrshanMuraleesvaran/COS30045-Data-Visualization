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
// EXERCISES 4.4 - 4.7
// ------------------------------------------------------

const brandChart =
    document.getElementById("brand-chart");


if (brandChart) {

    d3.csv("data/tvBrandCount.csv")
        .then(function (data) {


            // --------------------------------------------------
            // CONVERT COUNT VALUES TO NUMBERS
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
            // SORT DATA FROM HIGHEST TO LOWEST
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
            // KEEP TOP 10 BRANDS
            // --------------------------------------------------

            const top10 =
                data.slice(0, 10);


            console.log(
                "Top 10 brands:",
                top10
            );



            // --------------------------------------------------
            // CHART DIMENSIONS
            // --------------------------------------------------

            const width = 600;
            const height = 520;


            const margin = {

                top: 40,

                right: 60,

                bottom: 70,

                // Extra space for the brand labels
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
            // CLEAR OLD CHART
            // --------------------------------------------------

            d3.select("#brand-chart")
                .html("");



            // --------------------------------------------------
            // CREATE SVG
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
                    `translate(
                        ${margin.left},
                        ${margin.top + chartHeight}
                    )`
                )

                .call(

                    d3.axisBottom(xScale)

                        .ticks(6)

                        .tickSize(
                            -chartHeight
                        )

                        .tickFormat("")

                );



            // ==================================================
            // EXERCISE 4.7
            // GROUP EACH BAR AND ITS LABELS TOGETHER
            // ==================================================

            const barAndLabel = svg

                .selectAll(".bar-group")

                .data(top10)

                .join("g")

                .attr(
                    "class",
                    "bar-group"
                )

                .attr(
                    "transform",
                    function (d) {

                        return (
                            "translate(0," +
                            yScale(d.Brand_Reg) +
                            ")"
                        );

                    }
                );



            // --------------------------------------------------
            // STEP 3
            // ADD RECTANGLES TO EACH GROUP
            // --------------------------------------------------

            barAndLabel

                .append("rect")

                .attr(
                    "class",
                    "bar"
                )

                // Leave room on left for brand labels
                .attr(
                    "x",
                    margin.left
                )

                // y-position now comes from the group
                .attr(
                    "y",
                    0
                )

                // Count converted to pixel width
                .attr(
                    "width",
                    function (d) {

                        return xScale(
                            d["Count(SoldIn)"]
                        );

                    }
                )

                // Band scale controls bar thickness
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
            // STEP 4
            // ADD BRAND/CATEGORY LABEL
            // --------------------------------------------------

            barAndLabel

                .append("text")

                .text(
                    function (d) {

                        return d.Brand_Reg;

                    }
                )

                .attr(
                    "class",
                    "brand-label"
                )

                .attr(
                    "x",
                    margin.left - 10
                )

                .attr(
                    "y",
                    yScale.bandwidth() / 2
                )

                .attr(
                    "text-anchor",
                    "end"
                )

                .attr(
                    "dominant-baseline",
                    "middle"
                )

                .style(
                    "font-size",
                    "13px"
                );



            // --------------------------------------------------
            // STEP 5
            // ADD COUNT VALUE LABEL
            // --------------------------------------------------

            barAndLabel

                .append("text")

                .text(
                    function (d) {

                        return d3.format(",")(
                            d["Count(SoldIn)"]
                        );

                    }
                )

                .attr(
                    "class",
                    "value-label"
                )

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
                    yScale.bandwidth() / 2
                )

                .attr(
                    "text-anchor",
                    "start"
                )

                .attr(
                    "dominant-baseline",
                    "middle"
                )

                .style(
                    "font-size",
                    "13px"
                );



            // --------------------------------------------------
            // X AXIS
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
            // X AXIS TITLE
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



        })

        .catch(function (error) {

            console.error(
                "Error loading tvBrandCount.csv:",
                error
            );

        });

}