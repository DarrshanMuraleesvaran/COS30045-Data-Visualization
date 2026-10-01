// ------------------------------------------------------
// EXERCISE 6.2 - INTERACTIONS
// ------------------------------------------------------

const populateFilters = function (data) {

    const updateHistogram = function () {

        const activeScreenFilter = filters_screen
            .find(function (filter) {
                return filter.isActive;
            });

        const activeSizeFilter = filters_size
            .find(function (filter) {
                return filter.isActive;
            });

        const updatedData = data
            .filter(function (tv) {
                return (
                    activeScreenFilter.id === "all" ||
                    tv.screenTech === activeScreenFilter.id
                );
            })
            .filter(function (tv) {
                return (
                    activeSizeFilter.id === "all" ||
                    tv.screenSize === activeSizeFilter.id
                );
            });

        const updatedBins =
            binGenerator(updatedData);

        d3
            .selectAll("#histogram .histogram-bar")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
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

        console.log(
            "Filtered TV data:",
            updatedData
        );

    };


    const updateActiveButton = function (
        filters,
        selectedFilter,
        selector
    ) {

        if (!selectedFilter.isActive) {

            filters.forEach(function (filter) {
                filter.isActive =
                    selectedFilter.id === filter.id;
            });

            d3
                .selectAll(selector)
                .classed(
                    "active",
                    function (filter) {
                        return filter.id === selectedFilter.id;
                    }
                );

            updateHistogram();

        }

    };


    d3
        .select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr(
            "type",
            "button"
        )
        .attr(
            "class",
            function (d) {
                return `filter ${d.isActive ? "active" : ""}`;
            }
        )
        .text(function (d) {
            return d.label;
        })
        .on("click", function (event, d) {

            console.log(
                "Clicked screen filter data:",
                d
            );

            updateActiveButton(
                filters_screen,
                d,
                "#filters_screen .filter"
            );

        });


    d3
        .select("#filters_size")
        .selectAll(".filter")
        .data(filters_size)
        .join("button")
        .attr(
            "type",
            "button"
        )
        .attr(
            "class",
            function (d) {
                return `filter ${d.isActive ? "active" : ""}`;
            }
        )
        .text(function (d) {
            return d.label;
        })
        .on("click", function (event, d) {

            console.log(
                "Clicked size filter data:",
                d
            );

            updateActiveButton(
                filters_size,
                d,
                "#filters_size .filter"
            );

        });

};
