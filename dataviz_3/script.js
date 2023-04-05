d3.csv('astronautas.csv', d3.autoType).then(data => {
 
    var cant_ocu = d3.rollup(data, v => v.length, d => d.ocupacion)
    console.log(cant_ocu)
    var data2 = Array.from(cant_ocu).map(([key, value]) => {
        return {
            'ocupacion': key,
            'cantidad': value
        }
    })
    console.log(data2);
    var chart = Plot.plot({
        marks: [
        Plot.barX(data2, {y: 'ocupacion',x: 'cantidad',}),
        Plot.text(data2, {x: "cantidad", y: "ocupacion", text: d => (d.cantidad), dx:+15}),
        ],
        y: {
            domain: d3.sort(data2, (a, b) => d3.descending(a.cantidad, b.cantidad)).map(d => d.ocupacion),
            label: ""
            },

        x: {
            label:"",
            axis: null,
        },
        height: 200,
        marginLeft: 270,
        marginRight: 25,
        
        style:{
         fontSize: 20,
        }
    })
    
    d3.select('#chart').append(() => chart)
})





