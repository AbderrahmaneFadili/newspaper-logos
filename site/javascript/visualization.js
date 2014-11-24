$(document).ready(function() {
	d3.json("data.json", function(data) {
		
			
		var canvas = d3.select('#container');
		
		var figure = canvas
			.selectAll('figure.newspaper')
			.data(Object.keys(data))
			.enter()
			.append('figure');
		figure
			.classed('newspaper', true)
			.attr('data-order-readers', function(key) { return data[key].readers; })
			.append('div')
			.classed('image', true)
			.attr('style', function(key) { return 'background-image: url(image/'+data[key].image+')' });
		figure
			.append('div')
			.classed('name', true)
			.text(function(key) { return data[key].name; });
			
		
		$('#container').mixItUp({
			selectors: {
				target: '.newspaper'
			},
			load: {
				sort: 'order-readers:desc'
			},
			animation: {
				duration: 1000,
				easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
			}
		});

	});

});