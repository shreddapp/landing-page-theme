// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuint');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

function searchSpots (position) {
    $.getJSON("http://local.shredd.io:3000/api/spots/search", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        // latitude: 40.7058254,
        // longitude: -74.1180861
        // latitude: 51.5071713,
        // longitude: -0.1242409
    }, function (data) {
        // console.log(data)
        $('#visitor_spot').empty();
        $('#visitor_spot').html(spotHTML(data));
    });
};

function getLocation (success) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success)
    } else {
        console.log("duh");
    }
};

function spotHTML (spot) {
    city = spot.geocode.city || spot.geocode.administrativeLevels.level1long || spot.geocode.administrativeLevels.level2long;
    return `
    <p>We have located this one for you :</p>
    <ul class="media-list">
        <li class="media">
          <div class="media-left pull-left">
            <img class="media-object img-thumbnail" src="${spot.location.medias[0].images.thumbnail.url}">
          </div>
          <div class="media-body">
            <h4 class="media-heading">${spot.location.name}</h4>
            <p>${city}, ${spot.geocode.country}</p>
          </div>
        </li>
    </ul>
    `;
};
