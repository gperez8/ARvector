
angular.module('app')
	.controller('modelGenerateCtrl', ($scope) => {
		$scope.hola = "hola mundo";
		
		var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {klass: THREE.OrbitControls}
    });
    if (mathbox.fallback) throw "WebGL not supported"

    var three = mathbox.three;
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
	
	// 1. determine where the camera is looking at...
	
	// setting proxy:true allows interactive controls to override base position
	var camera = mathbox.camera( { proxy: true, position: [0, 0, 3] } );

	// 2. coordinate system that contains...
	
	// save the view as a variable to simplify accessing it later
    var view = mathbox.cartesian( {range: [[-6.28, 6.28], [-2, 2]], scale: [2,1]} );

	// axes
	var xAxis = view.axis( {axis: 1, width: 8, detail: 40, color:"red"} );
	var yAxis = view.axis( {axis: 2, width: 8, detail: 40, color:"green"} );
	
	// grid
	var grid = view.grid( {width: 2, divideX: 20, divideY: 10, opacity:0.25} );
	
	// 3. geometric data represented via...
	
	// the interval function will create a 1D array of data sampled between the view bounds
	var graphData = view.interval({
        expr: function (emit, x, i, t)
		{
          emit( x, Math.sin(x) );
        },
		// width is the number of data points to generate; higher numbers = higher resolution
        width: 256,	
		// channels indicate the dimensionality of the output (set to 2 for a 2D graph)
        channels: 2,
    });
	
	// 4. choice of shape to draw it as...
	
    var graphView = view.line( {width: 4, color: "blue"} );
	
	// alternatively, to view the data as points
    // view.point( {size: 6, color: "blue"});
	});