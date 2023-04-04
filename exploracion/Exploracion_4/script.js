d3.csv("astronautas.csv", d3.autoType).then((data) => {
  let chart = Plot.plot({
    marks: [Plot.dot(data, { x: "mision_hs", y: "edad_mision", r: "eva_mision_hs" })],
    r: { range: [5, 30] },
    nice: true,
    line: true,
    grid: true,
    zero: true,
  });
  d3.select("#chart").append(() => chart);
});
