// ------------------------------------------------------
// EXERCISE 6.1 - SHARED CONSTANTS
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


const binGenerator = d3
    .bin()
    .value(function (d) {
        return d.energyConsumption;
    });
