import { React, useRef, useEffect,useState } from "react";
import "./Chartpie.scss";
const d3 = require("d3");

export function Chartpie({ rooms }) {
  const chartref = useRef(null);
  
  useEffect(() => {
    let data = rooms.map((r) => {
      let { unit, value } = r.powerUsage;
      let label = r.name + ":" + unit + String(value);

      return { label: label, count: value };
    });

    if (rooms && chartref.current) {
      let svg = d3.select(chartref.current);

      let width = 450;
      let height = 450;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.

      svg.attr("width", width).attr("height", height);

      let radius = Math.min(width, height) / 2;
      let g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // set the color scale
      let color = d3.scaleOrdinal(d3.schemeCategory10);

      // Compute the position of each group on the pie:
      let pie = d3.pie().value(function (d) {
        return d.count;
      });

      let arc = d3
        .arc()
        .outerRadius(radius - radius / 4)
        .innerRadius(0);

      let arcs = g
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g");
      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d) {
          return color(d.data.label);
        });

        // Labels
      arcs.append("text")
        .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.data.label;
        });
      svg
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 70) + "," + 20 + ")")
        .append("text")
        .text("Power Usage - Today")
        .attr("class", "title");

      // Remove old D3 elements
      svg.exit().remove();
    }


  }, [chartref.current]);


  return (<div id ="chart"> 
    <svg width={400} height={200} ref={chartref} />
  </div>);
}


