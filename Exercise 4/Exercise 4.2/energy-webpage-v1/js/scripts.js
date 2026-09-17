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


const calculateButton = document.getElementById("calculate-btn");

if (calculateButton) {
    calculateButton.addEventListener("click", function () {
        const power = parseFloat(document.getElementById("power").value);
        const hours = parseFloat(document.getElementById("hours").value);
        const price = parseFloat(document.getElementById("price").value);

        const message = document.getElementById("calculator-message");

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

        const dailyEnergy = (power / 1000) * hours;
        const monthlyEnergy = dailyEnergy * 30;
        const yearlyEnergy = dailyEnergy * 365;

        const pricePerKWh = price / 100;
        const monthlyCost = monthlyEnergy * pricePerKWh;

        document.getElementById("daily-energy").textContent =
            dailyEnergy.toFixed(2);

        document.getElementById("monthly-energy").textContent =
            monthlyEnergy.toFixed(2);

        document.getElementById("yearly-energy").textContent =
            yearlyEnergy.toFixed(2);

        document.getElementById("monthly-cost").textContent =
            monthlyCost.toFixed(2);
    });
}


// ------------------------------------------------------
// D3 BAR CHART - TV BRAND COUNT
// ------------------------------------------------------

const brandChart = document.getElementById("brand-chart");

if (brandChart) {

    d3.csv("data/tvBrandCount.csv").then(function (data) {

        // Convert Count(SoldIn) from string to number
        data.forEach(function (d) {
            d["Count(SoldIn)"] = +d["Count(SoldIn)"];
        });


        // --------------------------------------------------
        // EXERCISE 4.4 - DATA CHECKS
        // --------------------------------------------------

        console.log("Number of rows:", data.length);

        console.log(
            "Maximum count:",
            d3.max(data, function (d) {
                return d["Count(SoldIn)"];
            })
        );

        console.log(
            "Minimum count:",
            d3.min(data, function (d) {
                return d["Count(SoldIn)"];
            })
        );

        console.log(
            "Extent:",
            d3.extent(data, function (d) {
                return d["Count(SoldIn)"];
            })
        );


        // Sort data from highest count to lowest count
        data.sort(function (a, b) {
            return d3.descending(
                a["Count(SoldIn)"],
                b["Count(SoldIn)"]
            );
        });

        console.log("Sorted data:", data);


        // Keep only the top 10 brands for the chart
        const top10 = data.slice(0, 10);

        console.log("Top 10 brands:", top10);


        // --------------------------------------------------
        // CHART DIMENSIONS
        // --------------------------------------------------

        const width = 1100;
        const height = 650;

        const margin = {
            top: 60,
            right: 40,
            bottom: 130,
            left: 90
        };


        // Clear existing chart before drawing
        d3.select("#brand-chart").html("");


        // --------------------------------------------------
        // CREATE SVG
        // --------------------------------------------------

        const svg = d3
            .select("#brand-chart")
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .classed("brand-chart-svg", true);


        // --------------------------------------------------
        // X SCALE
        // --------------------------------------------------

        const xScale = d3
            .scaleBand()
            .domain(
                top10.map(function (d) {
                    return d.Brand_Reg;
                })
            )
            .range([
                margin.left,
                width - margin.right
            ])
            .padding(0.22);


        // --------------------------------------------------
        // Y SCALE
        // --------------------------------------------------

        const yMax = d3.max(top10, function (d) {
            return d["Count(SoldIn)"];
        });

        const yScale = d3
            .scaleLinear()
            .domain([
                0,
                yMax
            ])
            .nice()
            .range([
                height - margin.bottom,
                margin.top
            ]);


        // --------------------------------------------------
        // GRIDLINES
        // --------------------------------------------------

        svg.append("g")
            .attr("class", "grid-lines")
            .attr(
                "transform",
                `translate(${margin.left},0)`
            )
            .call(
                d3.axisLeft(yScale)
                    .ticks(8)
                    .tickSize(
                        -(width - margin.left - margin.right)
                    )
                    .tickFormat("")
            );


        // --------------------------------------------------
        // BARS
        // --------------------------------------------------

        svg.selectAll(".bar")
            .data(top10)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xScale(d.Brand_Reg);
            })
            .attr("y", function (d) {
                return yScale(d["Count(SoldIn)"]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return (
                    height -
                    margin.bottom -
                    yScale(d["Count(SoldIn)"])
                );
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "#d79a1e");


        // --------------------------------------------------
        // VALUE LABELS ABOVE BARS
        // --------------------------------------------------

        svg.selectAll(".value-label")
            .data(top10)
            .enter()
            .append("text")
            .attr("class", "value-label")
            .attr("x", function (d) {
                return (
                    xScale(d.Brand_Reg) +
                    xScale.bandwidth() / 2
                );
            })
            .attr("y", function (d) {
                return (
                    yScale(d["Count(SoldIn)"]) - 10
                );
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d3.format(",")(
                    d["Count(SoldIn)"]
                );
            });


        // --------------------------------------------------
        // X AXIS
        // --------------------------------------------------

        svg.append("g")
            .attr("class", "x-axis")
            .attr(
                "transform",
                `translate(0,${height - margin.bottom})`
            )
            .call(
                d3.axisBottom(xScale)
            )
            .selectAll("text")
            .attr(
                "transform",
                "rotate(-35)"
            )
            .style(
                "text-anchor",
                "end"
            );


        // --------------------------------------------------
        // Y AXIS
        // --------------------------------------------------

        svg.append("g")
            .attr("class", "y-axis")
            .attr(
                "transform",
                `translate(${margin.left},0)`
            )
            .call(
                d3.axisLeft(yScale)
                    .ticks(8)
                    .tickFormat(
                        d3.format(",")
                    )
            );


        // --------------------------------------------------
        // Y AXIS LABEL
        // --------------------------------------------------

        svg.append("text")
            .attr("class", "axis-title")
            .attr(
                "transform",
                "rotate(-90)"
            )
            .attr(
                "x",
                -(height / 2)
            )
            .attr(
                "y",
                25
            )
            .attr(
                "text-anchor",
                "middle"
            )
            .text(
                "Number of television records"
            );


        // --------------------------------------------------
        // X AXIS LABEL
        // --------------------------------------------------

        svg.append("text")
            .attr("class", "axis-title")
            .attr(
                "x",
                width / 2
            )
            .attr(
                "y",
                height - 25
            )
            .attr(
                "text-anchor",
                "middle"
            )
            .text(
                "TV Brand"
            );

    }).catch(function (error) {

        console.error(
            "Error loading tvBrandCount.csv:",
            error
        );

    });
}