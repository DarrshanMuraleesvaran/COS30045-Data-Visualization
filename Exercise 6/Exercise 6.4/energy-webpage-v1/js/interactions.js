// ------------------------------------------------------
// EXERCISE 6.4 - INTERACTIONS
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


const createTooltip = function () {

    const tooltip = innerChartS
        .append("g")
        .attr(
            "class",
            "tooltip"
        )
        .style(
            "opacity",
            0
        );


    tooltip
        .append("rect")
        .attr(
            "width",
            tooltipWidth
        )
        .attr(
            "height",
            tooltipHeight
        )
        .attr(
            "rx",
            3
        )
        .attr(
            "ry",
            3
        )
        .attr(
            "fill",
            barColor
        )
        .attr(
            "fill-opacity",
            0.75
        );


    tooltip
        .append("text")
        .text("NA")
        .attr(
            "x",
            tooltipWidth / 2
        )
        .attr(
            "y",
            tooltipHeight / 2 + 2
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .attr(
            "alignment-baseline",
            "middle"
        )
        .attr(
            "fill",
            "white"
        )
        .style(
            "font-weight",
            900
        );

};


const handleMouseEvents = function () {

    innerChartS
        .selectAll(".scatter-point")
        .on("mouseenter", function (event, d) {

            console.log(
                "Mouse entered circle",
                d
            );

            d3
                .select(".tooltip text")
                .text(d.screenSize);

            const cx =
                event.target.getAttribute("cx");

            const cy =
                event.target.getAttribute("cy");

            d3
                .select(this)
                .attr(
                    "opacity",
                    0.9
                );

            d3
                .select(".tooltip")
                .attr(
                    "transform",
                    `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`
                )
                .transition()
                .duration(200)
                .style(
                    "opacity",
                    1
                );

        })
        .on("mouseleave", function (event, d) {

            console.log(
                "Mouse left circle",
                d
            );

            d3
                .select(this)
                .attr(
                    "opacity",
                    0.58
                );

            d3
                .select(".tooltip")
                .style(
                    "opacity",
                    0
                )
                .attr(
                    "transform",
                    "translate(0, 500)"
                );

        });

};
