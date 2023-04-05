d3.csv("astronautas.csv", d3.autoType).then(data => {
  
  var cant_nacio = d3.rollup(data, v => v.length, d => d.nacionalidad)
  console.log(cant_nacio)
  var data2 = Array.from(cant_nacio).map(([key, value]) => {
      return {
          'nacionalidad': key,
          'cantidad': value 
      }
    })

  var chart= Plot.plot({
    x: {
      label: "",
      padding: -1
    },
    y: {
      label: "Cantidad",
      grid: true,
      
    },
  
    width:1800,
    height: 850,
    marginLeft: 70 ,
    marginRight: 150,

    style:{
      fontSize: 20,
     },
    
    marks: [
      Plot.ruleX(data2, {
        x: 'nacionalidad',
        y: 'cantidad',
        strokeWidth: 3,
    }),
     
      Plot.ruleY([0]),
      Plot.barY(data2, {x: "nacionalidad", y: "frequency",insetLeft: 0.5 ,insetRight: 0.5}),
      Plot.dot(data2, {
        x: 'nacionalidad', 
        y: 'cantidad', 
        fill: 'white', 
        r:5
      }),
        
    ]
    
  })
  d3.select('#chart').append(() => chart)
})


