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
let xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d){ return d[0];})])
            .range([padding, w - padding * 2])

let yScale = d3.scale.linear()
           .domain([0, d3.max(dataset, function(d){ return d[1];})])
           .range([h - padding, padding])

// Create radius of each point in scatterplot
let rScale = d3.scale.linear()
           .domain([2, 2])
           .range([2, 2])

// Map the points to the scale on the chart
svg.append("g") //Create new g
 .attr("id", "circles") //Assign ID of 'circles'
 .attr("clip-path", "url(#chart-area)") //Add reference to clipPath
 .selectAll("circle") //Continue as before…
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
.attr("class", "data-points")

// Add the x and y axes
let xAxis = d3.svg.axis()
             .scale(xScale)
             .orient("bottom")
             .ticks(5);


let yAxis = d3.svg.axis()
             .scale(yScale)
             .orient("left")
             .ticks(5);


svg.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + (h - padding) + ")")
 .call(xAxis);

svg.append("g")
 .attr("class", "y axis")
 .attr("transform", "translate("+ (padding) + ",0)")
 .call(yAxis);


// Define clip path

//Define clipping path
svg.append("clipPath") //Make a new clipPath
.attr("id", "chart-area") //Assign an ID
.append("rect") //Within the clipPath, create a new rect
.attr("x", padding) //Set rect's position and size…
.attr("y", padding)
.attr("width", w - padding * 3)
.attr("height", h - padding * 2);


d3.select("p")
    .on("click", function() {

     let maxValue = 600;
     let numValues = dataset.length; //Count original length of dataset
     dataset = []; //Initialize empty array
     for (var i = 0; i < numValues; i++) { //Loop numValues times
        var newNumber1 = Math.floor(Math.random() * maxValue);
        var newNumber2 = Math.floor(Math.random() * maxValue); //New random integer (0-24)
        dataset.push([newNumber1, newNumber2]); //Add new number to array
     }

    console.log(dataset);

     let xScale = d3.scale.linear()
                   .domain([0, d3.max(dataset, function(d){ return d[0];})])
                   .range([padding, w - padding * 2])

     let yScale = d3.scale.linear()
                  .domain([0, d3.max(dataset, function(d){ return d[1];})])
                  .range([h - padding, padding])

     // Create radius of each point in scatterplot
     let rScale = d3.scale.linear()
                  .domain([2,2])
                  .range([2,2])


    // Refresh x and y axes
    let xAxis = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(10);


    let yAxis = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(10);

     //Update x-axis
   svg.select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis);
   //Update y-axis
   svg.select(".y.axis")
      .transition()
      .duration(1000)
      .call(yAxis);

   // Update all points
   svg.selectAll("circle")
      .data(dataset)
      .transition()
      .duration(1000)
      .ease("cubic-in-out")
      .each("start", function() { // <-- Executes at start of transition
          d3.select(this)
         .attr("fill", "black")
         .style("stroke", "red")
         .attr("stroke-width", 2)
         .attr("r", 5);
      })
      .attr("cx", function(d){
        return xScale(d[0]);
      })
      .attr("cy", function(d){
        return yScale(d[1]);
      })
      .attr("r", function(d){
        return rScale(d[1]);
      })
      .each("end", function() { // <-- Executes at start of transition
          d3.select(this)
          .transition() // <-- New!
          .duration(1000) // <-- New!
         .attr("fill", "black")
         .style("stroke", "black")
         .attr("r", 2);
      });

    svg.selectAll("text")
      .data(dataset)
      .transition() // <-- This is new,
      .duration(1000)
      .ease("cubic-in-out")
      .text(function(d){
        return "[" + d[0] + "," + d[1] + "]";
      })
      .attr("x", function(d){
        return xScale(d[0]);
      })
      .attr("y", function(d){
        return yScale(d[1]);
      })
      .attr("class", "data-points")

});

  // Page 138 (continue)
