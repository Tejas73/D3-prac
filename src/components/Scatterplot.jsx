import React, { useState } from "react";
import * as d3 from "d3";
import { useDataScatter } from "../hook/useData";
import { ScatterAxisBottom } from "../utils/AxisBottom";
import { ScatterAxisLeft } from "../utils/AxisLeft";
import { ScatterMarks } from "../utils/Marks";
import DropMenu from "../utility/DropMenu";
import ColorLegend from "./ColorLegend";

const Scatterplot = () => {
  const data = useDataScatter();
  const [hoveredValue, setHoveredValue] = useState(null);

  const initialXOption = { value: "sepal_length", label: 'Sepal Length' }
  const [selectedXOption, setSelectedXOption] = useState(initialXOption);
  const xValue = (d) => d[selectedXOption.value];
  const xAxisLabel = selectedXOption.label + "(cm)";

  const initialYOption = { value: "sepal_width", label: 'Sepal Width' }
  const [selectedYOption, setSelectedYOption] = useState(initialYOption);
  const yValue = (d) => d[selectedYOption.value];
  const yAxisLabel = selectedYOption.label + "(cm)";

  const colorValue = d => d.species;
  const colorLegendLabel = 'Species';

  if (!data) {
    return <h1>Loading...</h1>
  }

  const options = [
    { value: "sepal_length", label: 'Sepal Length' },
    { value: "sepal_width", label: 'Sepal Width' },
    { value: "petal_length", label: 'Petal Length' },
    { value: "petal_width", label: 'Petal Width' },
    { value: "species", label: 'Species' }
  ]
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 200, bottom: 65, left: 100 };

  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 50;

  const SIformat = d3.format(".1f");
  const xAxisTickFormat = (tickValue) => SIformat(tickValue).replace("G", "B");

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = d3.scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A '])

  const filteredData = data.filter(d => hoveredValue === colorValue(d));

  return (
    <div>

      <div>
        <span style={{ fontSize: 25, color: "#635F5D" }}>X</span>
        <DropMenu
          options={options}
          selectedOption={selectedXOption}
          onSelectedOptionChange={setSelectedXOption}
        />
        <span style={{ fontSize: 25, color: "#635F5D" }}>Y</span>
        <DropMenu
          options={options}
          selectedOption={selectedYOption}
          onSelectedOptionChange={setSelectedYOption}
        />
      </div>

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <ScatterAxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <ScatterAxisLeft yScale={yScale} innerWidth={innerWidth} />

          <text
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {yAxisLabel}
          </text>

          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            style={{ fontSize: 30, fill: "#635F5D" }}
          >
            {xAxisLabel}
          </text>
          <g transform={`translate(${innerWidth + 70},35 )`}>
            <text
              x={35}
              y={-25}
              textAnchor="middle"
              style={{ fontSize: 25, fill: "#635F5D" }}
            >
              {colorLegendLabel}
            </text>
            <ColorLegend
              tickSpacing={20}
              tickSize={9}
              tickTextOffset={20}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
            />
          </g>
          <g opacity={hoveredValue ? 0.2 : 1}>
            <ScatterMarks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              toolTipFormat={xAxisTickFormat}
            />
          </g>
          <ScatterMarks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            toolTipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
