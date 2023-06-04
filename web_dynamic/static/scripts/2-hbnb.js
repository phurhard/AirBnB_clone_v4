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
});
