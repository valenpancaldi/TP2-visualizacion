d3.csv('astronautas.csv', d3.autoType).then(data => {
  let chart = Plot.plot({
    marks: [
      Plot.barY(data, {
        x: 'nacionalidad',
        y: 'mision_hs',
        fill: 'status',
        sort: 'status',
        title: d => d.status + '\n' + d.mision_hs,
      }),
    ],
    marginLeft: 60,
    width: 1200,
  })
  d3.select('#chart').append(() => chart)
})
