let chart
d3.csv('astronautas.csv', d3.autoType).then(data => {
  chart = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: "mision_hs",
        y: "edad_mision",
        fill: "ocupacion",
        fillOpacity: 0.4,
        r: "eva_mision_hs",
        title: "ocupacion",
      }),
      Plot.frame(),
    ],
    grid: true,
    nice: true,
    zero: true,
    width: 1300,
    height: 450,
    r: { range: [5, 15] },
    facet: {
      data: data,
      x: 'ocupacion',
    },
    x: { ticks: 3 },
  })
  d3.select('#chart').append(() => chart)
})
