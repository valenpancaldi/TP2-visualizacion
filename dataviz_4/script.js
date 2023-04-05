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
<<<<<<< HEAD
      label: "",
      padding: -1
=======
      label: "Pais",
      padding: -1,
      labelOffset: 35,
>>>>>>> 0359ce849041e0b271eb72e5216a12fbbc9842fc
    },
    y: {
      label: "Cantidad",
      grid: true,
    },
    width:1800,
    height: 800,
    marginLeft: 70 ,
    marginRight: 150,

    style:{
      fontSize: 24,
     },
    
    marks: [
      Plot.ruleX(data2, {
        x: 'nacionalidad',
        y: 'cantidad',
        strokeWidth: 3,
    }),
    Plot.text(data2, {
      x: "nacionalidad",
      y: "cantidad",
<<<<<<< HEAD
      text: d=> d.cantidad,
      dx:+15,
      }),
=======
      text: d =>  d.cantidad,
      fontSize: 12,
      dy: -10,
    }),
>>>>>>> 0359ce849041e0b271eb72e5216a12fbbc9842fc
    
      Plot.ruleY([0]),
      Plot.barY(data2, {x: "nacionalidad", y: "frequency",insetLeft: 0.5 ,insetRight: 0.5}),
      Plot.dot(data2, {
        x: 'nacionalidad', 
        y: 'cantidad', 
        fill: 'white', 
        r:4
      }),
        
    ]
    
  })
  d3.select('#chart').append(() => chart)
})


