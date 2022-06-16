import useD3 from '../Hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import "./Tooltip.css"

function CircleDiagram({ dataProp }) {
    const data = dataProp.data;
    console.log(dataProp);

    const constants = {
        ymax: 1000,
        xmax: window.screen.availWidth,
        leftMargin: 200,
        rightMargin: 200,
        lowerMargin: 150,
        radius: (window.screen.availWidth)/(data.length*3)
    }

    const workflowResults = {
        Unexecuted: 0,
        Success: 1,
        Failure: 2
    }

    const resultHandler = (d) => {
        if (d === workflowResults.Success) {
            return "lightgreen";
        } else if (d === workflowResults.Unexecuted) {
            return "grey";
        } else {
            return "salmon"
        }
    }

    const drawLine = (x, y, length, chartSpace) => {
        chartSpace.append("defs").append("marker").attr("id","arrowhead")
        .attr("markerWidth",5)
        .attr("markerHeight",3)
        .attr("refx",0)
        .attr("refY",0)
        .attr("orient","auto").attr('viewBox','-5 -5 10 10').append("path").attr("d",'M 0,0 m -5,-5 L 5,0 L -5,5 Z').attr("fill","black")
        chartSpace.append("line")
            .style("stroke", "black")
            .style("stroke-width", 10)
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x + length)
            .attr("y2", y)
            .attr("marker-end","url(#arrowhead)")
    }


    const ref = useD3(
        (svg) => {
            d3.selectAll('svg > g > *').remove();
            const chart = svg.select(".plot-area").append("svg")
            let i = 0;
            while (i < data.length - 1) {
                drawLine(constants.leftMargin * 2 + constants.radius+(i * (constants.radius * 3)), constants.ymax / 2, constants.radius-15, chart);
                i++;
            }
            const tooltip = chart.append('div')
            .append("rect")
            .attr('class','tooltip')
            .attr("x",100)
            .attr("y",100)
            .attr("width",100)
            .attr("height",100)
            .attr("fill","black")
        

            chart.selectAll(".circle").data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => constants.leftMargin * 2 + (i * (constants.radius * 3)))
            .attr("cy", constants.ymax / 2)
            .attr("fill", (d) => resultHandler(d))
            .attr("fill-opacity", .70)
            .attr("stroke",(d) => resultHandler(d))
            .attr("stroke-width",1.5)
            .attr("stroke-opacity",100)
            .attr("r", constants.radius)
            .on("mouseover", (d)=> {
                //console.log(d);
                tooltip.attr("x",d.offsetX);
                tooltip.attr("y",d.offsetY);
            });

        }, [dataProp]);


    return (
        <svg
            ref={ref}
            style={{
                height: constants.ymax + constants.lowerMargin,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <div class-name="tooltip"/>
            <g className="plot-area" />

        </svg>
    );


}
export default CircleDiagram; 
