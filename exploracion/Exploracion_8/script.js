d3.csv('astronautas.csv', d3.autoType).then(data => {
  let chart = Plot.plot({
    width: 1000,
    height: 300,
    line: true,
    nice: true,
    zero: true,
    grid: true,
    marks: [
      Plot.dot(data, {
        x: 'mision_hs',
        y: 'nacionalidad',
        fillOpacity: 0.6,
        symbol: 'square',
      }),
    ],
  })
  d3.select('#chart').append(() => chart)
})
