let chart;
let data;
let valuesDomainX;
let valuesDomainY;

let selectElement = d3.select('#input')
selectElement.on('input', event => {
  let yearSelected = event.target.value
  changeValueInput(yearSelected)
  createChart(yearSelected)
})

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart
  let initYear = selectElement.attr('value')
  valuesDomainY = [d3.min(data, d => d.edad_mision), d3.max(data, d => d.edad_mision)]
  changeValueInput(initYear)
  createChart(initYear)
})

function changeValueInput(value) {
  const resultado = document.querySelector('#value-input')
  resultado.textContent = value
}



function createChart(yearSelected) {
  let dataFilter = data.filter(d => d.anio_mision == yearSelected)
  chart = Plot.plot({
    grid: true,
    line: true,
    nice: true,
    zero: false,
    marginBottom:45,
    marginTop:30,
    height: 500,
    width: 500,
    marks: [
      Plot.dot(dataFilter, {
        x: 'nacionalidad',
        y: 'edad_mision',
        fill: 'genero',
        fillOpacity: 0.5,
        r: 'mision_hs',
        title: 'nombre',
      }),
    ],
    color: {
      domain: ['femenino', 'masculino'],
      range:['red','blue'],
      legend: true,
      className: 'legend-clusters',
    },
    x: {
      label: 'Nacionalidad',
    },
    y: {
      domain: valuesDomainY,
      label: 'Edad',
      ticks: 4,
    },
    r: {
      domain: [d3.min(dataFilter, d => d.mision_hs), d3.max(dataFilter, d => d.mision_hs)],
      range: [1, 40],
      legend: true,
    },
  })

  /* Agrega un título a la leyenda x d3 */
  d3.select(chart)
    .select('.legend-clusters')
    .insert('h4', 'span')
    .attr('class', 'legend-title')
    .text('Genero: ')
    .classed('legend-title')

  d3.select('#chart figure').remove()
  d3.select('#chart').append(() => chart)
}