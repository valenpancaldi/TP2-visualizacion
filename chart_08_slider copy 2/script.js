let chart
let data
let valuesDomainX
let valuesDomainY

let selectElement = d3.select('#input')
selectElement.on('input', event => {
  let yearSelected = event.target.value
  changeValueInput(yearSelected)
  createChart(yearSelected)
})

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart
  let initYear = selectElement.attr('value')
  //valuesDomainX = [d3.min(data, d => d.nacionalidad), d3.max(data, d => d.nacionalidad)]
  //valuesDomainX = [d3.min(data, d => d.nacionalidad), d3.max(data, d => d.nacionalidad)]
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
        //shape: 'genero',
        //symbol: "status",
        fillOpacity: 0.5,
        r: 'mision_hs',
        title: 'nombre',
      }),
    ],
    color: {
      //scheme:'reds',
      domain: ['femenino', 'masculino'],
      range:['red','blue'],
      legend: true,
      className: 'legend-clusters',
    },
    x: {
      domain: valuesDomainX,
      label: 'Nacionalidad',
    },
    y: {
      domain: valuesDomainY,
      label: 'Edad',
      ticks:4,
      //nice: true,
      //tickCount: Math.floor((valuesDomainY[1] - valuesDomainY[0]) / 2) + 1, //calcula el número de ticks basado en el rango deseado
    },
    r: {
      range:[1,40],
      legend:true,
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