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
// EXERCISE 5.1 - VERTICAL BAR CHART WITH AXES
// ------------------------------------------------------

const barChart =
    document.getElementById("bar-chart");


if (barChart) {

    d3.csv("data/screenTechEnergy.csv")
        .then(function (data) {

            const energyColumn =
                "Mean(Labelled energy consumption (kWh/year))";


            data.forEach(function (d) {

                d.Energy_Consumption =
                    +d[energyColumn];

                d.Screen_Tech =
                    d.Screen_Tech.toUpperCase();

            });


            data.sort(function (a, b) {

                return d3.descending(
                    a.Energy_Consumption,
                    b.Energy_Consumption
                );

            });


            console.log(
                "Screen type energy consumption:",
                data
            );


            drawBarChart(data);

        })

        .catch(function (error) {

            console.error(
                "Error loading screenTechEnergy.csv:",
                error
            );

        });

}


const drawBarChart = function (data) {

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


    d3.select("#bar-chart")
        .html("");


    const svg = d3
        .select("#bar-chart")
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
            "bar-chart-svg",
            true
        );


    const innerChart = svg
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    const xScale = d3
        .scaleBand()
        .domain(
            data.map(function (d) {
                return d.Screen_Tech;
            })
        )
        .range([
            0,
            innerWidth
        ])
        .padding(0.1);


    const yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(
                data,
                function (d) {
                    return d.Energy_Consumption;
                }
            )
        ])
        .nice()
        .range([
            innerHeight,
            0
        ]);


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
        .call(
            d3.axisBottom(xScale)
        );


    innerChart
        .append("g")
        .attr(
            "class",
            "y-axis"
        )
        .call(
            d3.axisLeft(yScale)
                .ticks(6)
        );


    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr(
            "class",
            "bar"
        )
        .attr(
            "x",
            function (d) {
                return xScale(d.Screen_Tech);
            }
        )
        .attr(
            "y",
            function (d) {
                return yScale(d.Energy_Consumption);
            }
        )
        .attr(
            "width",
            xScale.bandwidth()
        )
        .attr(
            "height",
            function (d) {
                return (
                    innerHeight -
                    yScale(d.Energy_Consumption)
                );
            }
        );


    innerChart
        .selectAll(".value-label")
        .data(data)
        .join("text")
        .attr(
            "class",
            "value-label"
        )
        .attr(
            "x",
            function (d) {
                return (
                    xScale(d.Screen_Tech) +
                    xScale.bandwidth() / 2
                );
            }
        )
        .attr(
            "y",
            function (d) {
                return (
                    yScale(d.Energy_Consumption) -
                    8
                );
            }
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(function (d) {
            return (
                d3.format(".0f")(d.Energy_Consumption) +
                " kWh"
            );
        });


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
            "Energy Consumption (kWh)"
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
            "Screen Type"
        );

};
