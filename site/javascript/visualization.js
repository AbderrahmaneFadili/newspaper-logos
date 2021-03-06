function largeNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

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
			.classed('category-europe', function(key) { return data[key].continent == 'Europe'; })
			.classed('category-asia', function(key) { return data[key].continent == 'Asia'; })
			.classed('category-northamerica', function(key) { return data[key].continent == 'North America'; })
			.classed('category-southamerica', function(key) { return data[key].continent == 'South America'; })
			.classed('category-color-black', function(key) { return data[key].color == 'black'; })
			.classed('category-color-red', function(key) { return data[key].color == 'red'; })
			.classed('category-color-blue', function(key) { return data[key].color == 'blue'; })
			.classed('category-color-rest', function(key) { return data[key].color == 'green' || data[key].color == 'yellow'; })
			.attr('data-order-readers', function(key) { return data[key].readers; })
			.attr('data-order-founded', function(key) { return data[key].founded; })
			.append('div')
			.classed('image', true)
			.attr('style', function(key) { 
				return 'background-image: url(image/'+data[key].image+')'; 
			})
			.on("click", function(key) {
						$( ".info--welcome" ).hide();
						
						$('.newspaper.active').removeClass('active');
						d3.select(this.parentNode).classed('active', true);
						
			            d3.select(".info").style('display', 'inline');
			            d3.select(".info--name").html(function() { return data[key].name; });
			            d3.select(".info--founded").html(function() { return data[key].founded; });
			            d3.select(".info--readers").html(function() { return largeNumber(data[key].readers); });
			            d3.select(".info--continent").html(function() { return data[key].continent; });
			            d3.select(".info--country").html(function() { return data[key].country; });
			            d3.select(".info--image").attr('style', function() { 
							return 'background-image: url(image/'+data[key].image+')'; 
						});
			        });

		// figure
		// 	.append('div')
		// 	.classed('name', true)
		// 	.text(function(key) { return data[key].name; });
			
		$('#container').mixItUp({
			selectors: {
				target: '.newspaper'
			},
			load: {
				sort: 'random'
			},
			controls: {
				/*toggleFilterButtons: true*/
			},
			animation: {
				duration: 1000,
				easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
			}
		});

	});

});