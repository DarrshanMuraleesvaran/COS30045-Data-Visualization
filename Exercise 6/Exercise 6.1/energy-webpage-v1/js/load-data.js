// ------------------------------------------------------
// EXERCISE 6.1 - LOAD TV DATA
// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    d3.csv("data/W6_TVdata.csv", function (d) {

        return {
            brand: d.brand,
            model: d.model,
            screenSize: +d.screenSize,
            screenTech: d.screenTech,
            energyConsumption: +d.energyConsumption,
            star: +d.star
        };

    })
        .then(function (data) {

            console.log(
                "Loaded TV data:",
                data
            );

            drawHistogram(data);
            populateFilters(data);

        })

        .catch(function (error) {

            console.error(
                "Error loading the CSV file:",
                error
            );

        });

});
