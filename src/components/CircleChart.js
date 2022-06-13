import useD3 from '../Hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function CircleChart({ data }) {

  return (
    <svg
    ref={useD3(
      (svg) => {
        const circles = svg.select(".plot-area").append("svg").selectAll(".bar").data(data).enter()
        const y = d3.scaleLinear().domain([0,d3.max(data)]).range([0,200]);
        const x=d3.scaleBand().domain(data).range([0,2300]).paddingOuter(0.5).paddingInner(0.3);
        circles
        .append("rect")
          .attr("class","bar")
          .attr("width",x.bandwidth)
          .attr("height", (d)=>y(d!=null?d:0))
          .attr("x", (d,i)=>x(d)+10)
          .attr("y", (d)=>200-y(d!=null?d:0))
          .attr("fill","pink");
      }
    )}
    style={{
      height: 200,
      width: "100%",
      marginRight: "0px",
      marginLeft: "0px",
    }}
    >
      <g className="plot-area" />
    </svg>
  );
}

export default CircleChart;