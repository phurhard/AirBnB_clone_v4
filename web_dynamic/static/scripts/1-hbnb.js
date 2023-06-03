let amenities = {};
$(document).ready(function() {
	$('li input[data-id]').click(function(){
		let value = $(this).attr('data-id');
		let name = $(this).attr('data-name');
		amenities.name = value;
	})
	let h4 = $('div.amenities h4');
	$.each(amenities, function(i, amenity) {
		h4.append(amenity);
	});

});
