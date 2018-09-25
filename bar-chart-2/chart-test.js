var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
 11, 12, 15, 20, 18, 17, 16, 18, 23, 25, ];

// Width and height
let w = 600;
let h = 250;
let barPadding = 1;

let xScale = d3.scale.ordinal()
               .domain(d3.range(dataset.length))
               .rangeRoundBands([0, w], 0.05)

let yScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d){ return d;})])
               .range([0, h])

console.log(xScale(1));

//====height of the svg element====//
let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i){
     return xScale(i);
   })
   .attr("y", function(d){
     return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d){
     return yScale(d);
   })
   .attr("fill", function(d) {
     return "rgb(0, 0, " + (d * 10) + ")";
   })


svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d){
    return d;
  })
  .attr("x", function(d, i){
    return xScale(i) + 14;
  })
  .attr("y", function(d) {
    return h - yScale(d) + 14;
  })
  .attr("class", "axis-labels")

  // Page 138 (continue)
