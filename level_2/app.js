var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3
.tip()
.attr('class', 'd3-tip')
.offset([80, -60])
.html(function(d) {
return (
    d.state + '<br> Disability: ' + d.disabilityRate +' %'+ '<br> Limited Activity: ' + d.limitedActivityRate + ' %'
)
});

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv('./data/data.csv', function(error, data) {
  if (error) throw error;
  var disabilityRates = data.map(data => data.disabilityRate);
  var activityRates = data.map(data => data.limitedActivityRate);
  var stateAbbr = data.map(data => data.abbr);
  var asthmaRates = data.map(data => data.asthmaRate);
  var collegeRates = data.map(data => data.collegeEducationRate);
  var homeOwnRates = data.map(data => data.homeOwnRate);
  var oldAgeRate = data.map(data => data.age55to64Rate);
  console.log('disabilityRate', disabilityRates);
  console.log('limitedActivityRate', activityRates);
  console.log('abbr', stateAbbr);
  console.log('asthma', asthmaRates);
  console.log('college', collegeRates);
  console.log('homeOwner', homeOwnRates);
  console.log('oldAge', oldAgeRate);

  data.forEach(function(d) {
    d.disabilityRate = +d.disabilityRate;
    d.limitedActivityRate = +d.limitedActivityRate;
    d.asthmaRate = +d.asthmaRate;
    d.collegeEducationRate = +d.collegeEducationRate;
    d.homeOwnRate = +d.homeOwnRate;
    d.age55to64Rate = +d.age55to64Rate;
  });

  x.domain(d3.extent(data, function(d) { return d.disabilityRate; })).nice();
  y.domain(d3.extent(data, function(d) { return d.limitedActivityRate; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width/2)
      .attr("y", 25 )
      .style("text-anchor", "middle")
      .style('stroke', '#000')
      .text("Disability Rate (%)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "translate("+ (width-width-30) +","+(height/2)+")rotate(-90)")
      .style("text-anchor", "middle")
      .style('stroke', '#000')
      .text("Limited Activity Rate (%)")

  svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 10.5)
      .attr("cx", function(d) { return x(d.disabilityRate); })
      .attr("cy", function(d) { return y(d.limitedActivityRate); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("text", function(d) { return d.abbr; })
      .style("fill", "#00aa88")
  
  svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) { return d.abbr; })
      .attr("x", function(d) { return x(d.disabilityRate); })
      .attr("y", function(d) { return y(d.limitedActivityRate); })
      .attr("font-size", "6px")
      .attr("fill", "white")
      .style("text-anchor", "middle");

});
