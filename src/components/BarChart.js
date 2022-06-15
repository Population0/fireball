import useD3 from '../Hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import { axisLeft} from 'd3';
import { axisBottom } from 'd3';

function BarChart({dataProp }) {
  const data=dataProp.data;
  console.log(dataProp);
  const BarChartConstants={
    ymax: 1000,
    xmax: 1000,
    leftMargin: 100,
    rightMargin: 100,
    lowerMargin:150
  }
  const x_values=data.map((value)=>value.x);
  const y_values=data.map((value)=>value.y);
  const ref=useD3(
    (svg) => {
      d3.selectAll('svg > g > *').remove();
      const chart = svg.select(".plot-area").append("svg").selectAll(".bar").data(data).enter()
      const y = d3.scaleLinear().domain([0,d3.max(y_values)]).range([BarChartConstants.ymax,0]);
      const x=d3.scaleBand().domain(x_values).range([BarChartConstants.xmax,0]).paddingOuter(0.5).paddingInner(0.3);
      const y_axis=axisLeft(y).ticks (10);
      const x_axis=axisBottom(x).ticks(x_values.length)
      chart.append("g").attr("class","y-axis").attr("transform",`translate(${BarChartConstants.leftMargin}, 0)`).call(y_axis).style("font-size",20);
      chart.append("g").attr("class","x-axis").attr("transform",`translate(${BarChartConstants.leftMargin}, ${BarChartConstants.ymax})`).call(x_axis)
      .selectAll("text").style("font-size",15).style("font-family","Times New Roman").attr("transform",`rotate(-90) translate(-75,-15)`)
      chart.append("rect")
        .attr("class","bar")
        .attr("width",x.bandwidth)
        .attr("height", (d)=>BarChartConstants.ymax-y(d.y!=null?d.y:0))
        .attr("x", (d,i)=>x(d.x)+BarChartConstants.leftMargin)
        .attr("y", (d)=>y(d.y!=null?d.y:0))
        .attr("fill","red");
        chart.append("text").attr("class","title").style("font-size",35).style("font-family","Times New Roman").text(dataProp.title).attr("transform",`translate(${BarChartConstants.leftMargin+BarChartConstants.xmax/2}, ${BarChartConstants.lowerMargin-100})`);
    }, [dataProp]
  );
  return (
    <svg
    ref={ref}
    style={{
      height: BarChartConstants.ymax+BarChartConstants.lowerMargin,
      width: "100%",
      marginRight: "0px",
      marginLeft: "0px",
    }}
    >
      <g className="plot-area" />
    </svg>
  );
}

export default BarChart;