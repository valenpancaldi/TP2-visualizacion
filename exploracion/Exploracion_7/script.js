d3.csv("astronautas.csv", d3.autoType).then((data) => {
  createChart(data);
});

function createChart(data) {
  let chart = Plot.plot({
    height: 300,
    line: true,
    zero: true,
    marks: [
      Plot.dot(data, {
        x: "mision_hs",
        y: "ocupacion",
        fill: "#666af0",
        symbol:"ocupacion"
      }),
    ],
    symbol: {
      legend: true,
    },
    x: {
      grid: true,
    },
  });
  d3.select("#chart").append(() => chart);
}
