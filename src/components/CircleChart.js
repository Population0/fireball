import useD3 from '../Hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import { axisLeft} from 'd3';

function CircleChart({ data }) {

  return (
    <svg
    ref={useD3(
      (svg) => {
        const circles = svg.select(".plot-area").append("svg").selectAll(".bar").data(data).enter()
        const y = d3.scaleLinear().domain([d3.max(data),0]).range([500,0]);
        const x=d3.scaleBand().domain(data).range([0,500]).paddingOuter(0.5).paddingInner(0.3);
        const y_axis=axisLeft(y).ticks (10);
        circles.append("g").attr("transform",`translate(900, 10)`).call(y_axis).style("font-size",20)
        circles
        .append("rect")
          .attr("class","bar")
          .attr("width",x.bandwidth)
          .attr("height", (d)=>y(d!=null?d:0))
          .attr("x", (d,i)=>x(d)+1000)
          .attr("y", (d)=>500-y(d!=null?d:0))
          .attr("fill","pink");
      }
    )}
    style={{
      height: 550,
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