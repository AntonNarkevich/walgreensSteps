RD.clientFnManager.set("runHomeLoggedIn", function () {

	/* albums titles */

	jQ('#resp-home-album-list > tbody > tr:nth-child(4) a').each(function (i) {
		var $link = jQ(this).clone();

		$link.appendTo('#resp-home-album-list > tbody > tr:nth-child(3) > td:nth-child(' + (2 * i + 1) + ')');
	});

	var $albumsContainer = jQ('#albumTabs').closest('table').addClass('rd-albums-container');

	$albumsContainer.parent().closest('table').addClass('rd-home-main-container');

	/* buttons */

	jQ('.uploadnewphotos-btn').closest('table').addClass('rd-buttons-container');
	jQ('.uploadnewphotos-btn').addClass('rd-button').addClass('rd-gray-button').text('Upload New Photos').attr('href', '/walgreens/htmlupload?showcopyright=false');
	jQ('.importfromfb-btn').addClass('rd-button').addClass('rd-gray-button').text('Import from Facebook');
	jQ('.orderphotos-btn').addClass('rd-button').addClass('rd-blue-button').text('Order Prints');

	/* promos */

	var $promos = jQ('<div class="rd-home-promos"></div>').insertAfter('#resp-home-usefulLinks');
	jQ('[id^=div_photologgedin]').each(function () {
		var $promo = jQ(this);

		$promo.find('script').remove();
		$promo.appendTo($promos);
	});

	/* useful links */

	jQ('#resp-home-usefulLinks > tbody > tr:nth-child(3) > td br').replaceWith(' ');

	/* ideas block */

	$promos.next('table').addClass('rd-ideas');

	/* nowrap fix */
	jQ('[nowrap]').removeAttr('nowrap');
});