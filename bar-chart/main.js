fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    let gdpValue = data.data.map((d) => d[1]);
    let gdpDate = data.data.map((d) => new Date(d[0]));
    let gdpDateString = data.data.map((d) => d[0]);
    const w = 750;
    const h = 400;
    const svg = d3
      .select("#visHolder")
      .append("svg")
      .attr("width", w + 100)
      .attr("height", h + 50);

    // SCALES
    const xScale = d3
      .scaleTime()
      .domain([d3.min(gdpDate), d3.max(gdpDate)])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdpValue)])
      .range([h, 0]);

    // AXES
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    svg
      .append("g")
      .attr("transform", "translate(50,400)")
      .call(xAxis)
      .attr("id", "x-axis");

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", `translate(50, 0)`);
    // BARS
    svg
      .selectAll("rect")
      .data(gdpValue)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => {
        return 50 + xScale(gdpDate[i]);
      })
      .attr("y", (d) => yScale(d))
      .attr("width", w / gdpValue.length)
      .attr("height", (d) => h - yScale(d))
      .style("fill", "#33adff")
      .attr("data-date", (d, i) => gdpDateString[i])
      .attr("data-gdp", (d) => d);
  });
