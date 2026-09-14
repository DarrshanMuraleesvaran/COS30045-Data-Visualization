// Step 2: Change the style of an HTML element
d3.select("h1")
  .style("color", "green");


// Step 3: Append a paragraph to the D3 demo section
d3.select(".d3-demo")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");


// Step 4: Append a rectangle to the SVG
d3.select("#d3-demo-svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");