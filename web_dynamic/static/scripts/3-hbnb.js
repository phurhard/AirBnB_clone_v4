$(document).ready(function () {
  const amenities = {};

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
	  url: 'http://0.0.0.0:5001/api/v1/places_search',
	  method: 'POST',
	  headers: {
		  'Content-Type': 'application/json'
	  },
	  data: JSON.stringify({}),
	  success: function(res) {
		  //Creates the places from here
		  console.log(res);
		  $.each(res, function(index, object){
			  //start of dynamically created places
			  
			  let article = $('<article></article>');// creates an article element
			  let title_box = $('<div></div>').addClass('title_box');
			  let h2 = $('<h2></h2>');
			  let priceByNight = $('<div></div>').addClass('price_by_night');
			  let information = $('<div></div>').addClass('information');
			  let maxGuest = $('<div></div>').addClass('max_guest');
			  let numberRooms = $('<div></div>').addClass('number_rooms');
			  let numberBathrooms = $('<div></div>').addClass('number_bathrooms');
			  let Description = $('<div></div>').addClass('description');
			  //ADDING THE CONTENTS
			  Description.text(object.description);
			  numberBathrooms.text(object.number_bathrooms);
			  numberRooms.text(object.number_rooms);
			  maxGuest.text(object.max_guest);
			  priceByNight.text(object.price_by_night);
			  h2.text(object.name);

			  /* Adding them together*/
			  information.append(maxGuest, numberRooms, numberBathrooms);
			  title_box.append(h2, priceByNight)

			  article.append(title_box, information, description);
			  $('section.places').append(article);
		  });
	  },
	  error: function(xhr, textStatus, errorThrown) {
		  console.log(xhr.status + ': ' + textStatus);
	  }
  });
});
