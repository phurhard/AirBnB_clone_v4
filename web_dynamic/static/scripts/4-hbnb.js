$(document).ready(function () {
  const amenities = {};
	const amenityID = [];
  // AMENITIES LISTING
  $('input[data-id]').click(function () {
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      amenities[dataId] = dataName;
    } else {
      delete amenities[dataId];
    }
    const amenityList = [];
    $.each(amenities, function (dataid, dataname) {
      amenityList.push(dataname);
	amenityID.push(dataid);
    });
    $('div.amenities h4').text(amenityList.join(', '));
  });

  // API REQUESTING
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, statusText) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

	//NEW ENDPOINT FOR PLACES
$.ajax({
    url:  'http://0.0.0.0:5001/api/v1/places_search/,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({})
  })
  .done(function(data) {
    const placesSection = $('section.places');
    placesSection.empty(); // Clear existing places
    
    data.forEach(function(place) {
      const article = $('<article></article>');
	const title_box = $('<div></div>').addClass('title_box');
      const title = $('<h2></h2>').text(place.name);
      const price = $('<div class="price_by_night"></div>').text(`${place.price_by_night}`);
      title_box.append(title, price);
      const information = $('<div></div>').addClass('information');
      const maxGuests = $('<div class="max_guest">').text(`${place.max_guest}`);
      const numRooms = $('<div class="number_rooms">').text(`${place.number_rooms}`);
      const numBathrooms = $('<div class="number_bathrooms">').text(`${place.number_bathrooms}`);
      
      information.append(maxGuests, numRooms, numBathrooms);
      
      article.append(title, price, information);
      
      placesSection.append(article);
    });
  })
  .fail(function(error) {
    console.log('Error:', error);
  });
}
// on button click
$('button').click(function(){
$.ajax({
    url:  'http://0.0.0.0:5001/api/v1/places_search/,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({'Amenity':amenityID});
  });

});
});
