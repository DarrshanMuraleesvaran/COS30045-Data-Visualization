// ------------------------------------------------------
// EXERCISE 6.4 - SHARED CONSTANTS
// ------------------------------------------------------

const margin = {
    top: 40,
    right: 30,
    bottom: 70,
    left: 70
};

const width = 900;
const height = 430;

const innerWidth =
    width -
    margin.left -
    margin.right;

const innerHeight =
    height -
    margin.top -
    margin.bottom;


const barColor =
    "#606464";

const bodyBackgroundColor =
    "#fffaf0";


const xScale =
    d3.scaleLinear();

const yScale =
    d3.scaleLinear();


let innerChartS;

const tooltipWidth =
    65;

const tooltipHeight =
    32;

const xScaleS =
    d3.scaleLinear();

const yScaleS =
    d3.scaleLinear();

const colorScale =
    d3.scaleOrdinal();


const binGenerator = d3
    .bin()
    .value(function (d) {
        return d.energyConsumption;
    });


const filters_screen = [
    {
        id: "all",
        label: "All",
        isActive: true
    },
    {
        id: "LED",
        label: "LED",
        isActive: false
    },
    {
        id: "LCD",
        label: "LCD",
        isActive: false
    },
    {
        id: "OLED",
        label: "OLED",
        isActive: false
    }
];


const filters_size = [
    {
        id: "all",
        label: "All Sizes",
        isActive: true
    },
    {
        id: 24,
        label: "24\"",
        isActive: false
    },
    {
        id: 32,
        label: "32\"",
        isActive: false
    },
    {
        id: 55,
        label: "55\"",
        isActive: false
    },
    {
        id: 65,
        label: "65\"",
        isActive: false
    },
    {
        id: 98,
        label: "98\"",
        isActive: false
    }
];
