var dataset = [
 [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
 [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
 ];


// Dimensions of the SVG
let w = 500;
let h = 300;
let padding = 30;

// Selected the SVG and appending as part of the body
var svg = d3.select("body")
 .append("svg")
 .attr("width", w)
 .attr("height", h);

// Create a dynmaic x and y scale
let xScale = d3.scaleLinear()
              .domain([0, d3.max(dataset, function(d){ return d[0];})])
              .range([padding, w - padding * 2])

let yScale = d3.scaleLinear()
             .domain([0, d3.max(dataset, function(d){ return d[1];})])
             .range([h - padding, padding])

// Create radius of each point in scatterplot
let rScale = d3.scaleLinear()
             .domain([0, d3.max(dataset, function(d){ return d[1];})])
             .range([2,5])

// Map the points to the scale on the chart
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d){
     return xScale(d[0]);
   })
   .attr("cy", function(d){
     return yScale(d[1]);
   })
   .attr("r", function(d){
     return rScale(d[1]);
   });

// Add data labels
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d){
    return "[" + d[0] + "," + d[1] + "]";
  })
  .attr("x", function(d){
    return xScale(d[0]);
  })
  .attr("y", function(d){
    return yScale(d[1]);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("fill", "#333");


// Add the x and y axes
let xAxis = d3.axisBottom(xScale)
              .ticks(5);

let yAxis = d3.axisLeft(yScale)
              .ticks(4);

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate("+ (padding) + ",0)")
   .call(yAxis);
