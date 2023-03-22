d3.csv("astronautas.csv", d3.autoType).then((data) => {
  let dataNA = data.filter( d => d.nacionalidad)
  let dataSum = sumMisionHsPorAnio(dataNA);
  let dataUS = sumMisionHsPorAnio(dataNA.filter(d => d.nacionalidad === "EE.UU."));
  let dataUSSR = sumMisionHsPorAnio(dataNA.filter(d => d.nacionalidad === "U.S.S.R/Rusia"));
  createChart(dataSum, dataUS, dataUSSR);
});

function sumMisionHsPorAnio(data) {
  const groupedData = d3.group(data, d => d.anio_mision);
  const sumData = Array.from(groupedData, ([anio_mision, datos]) => ({
    anio_mision,
    mision_hs_sum: d3.sum(datos, d => d.mision_hs)
  }));
  return sumData;
}

function createChart(data, dataUS, dataUSSR){
  let chart = Plot.plot({
    height:500,
    width:600,
    marginLeft:50,
    marginBottom:55,
    line:true,
    color:{
      legend:true
    },
    x:{
      domain:[d3.min(data, (d) => d.anio_mision)-1,d3.max(data, (d) => d.anio_mision)+1],
      ticks:11,  
    },
    y:{
      ticks:7,
      grid:true,
    },
    marks: [
      Plot.areaY(data, {
        x: "anio_mision", 
        y2: "mision_hs_sum", 
        //z: "nacionalidad",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(data, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        //z: "nacionalidad",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        color:{
          legend:true
        },
        strokeWidth: 1.5
      }),
      Plot.areaY(dataUS, {
        x: "anio_mision", 
        y2: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision', 
        fill: "red",
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(dataUS, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        stroke: "red",
        color:{
          legend:true
        },
        strokeWidth: 1.5
      }),
      Plot.areaY(dataUSSR, {
        x: "anio_mision", 
        y2: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision', 
        fill: "green",
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(dataUSSR, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        color:{
          legend:true
        },
        stroke: "green",
        strokeWidth: 1.5
      })
    ],
  });
  
  // Agregar el título encima del gráfico
  d3.select("#chart")
    .append("div")
    .attr("class", "chart-title")
    .text("Horas de Misión por Año");
  
  d3.select("#chart").append(() => chart);

  
};