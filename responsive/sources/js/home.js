RD.clientFnManager.set("runHome", function () {

	/* fix for home variations */
	jQ('#resp-welcome-main-content, #resp-login-main-content').addClass('rd-welcome-main-content');

	var $pageContent = jQ('#resp-welcome-contentTop').closest('table').addClass('rd-page-content');

	/* carousel */

	var $carouselTablet = jQ('<div class="rd-home-carousel-tablet rd-tablet"></div>').prependTo('#resp-welcome-rightCol');
	jQ('.resp-welcome-caraousel-tablet img').appendTo($carouselTablet);

	/* phone hero image */

	var $heroImagePhone = jQ('<div class="rd-home-hero-image-phone rd-phone"></div>').prependTo('#resp-welcome-rightCol');
	jQ('.resp-welcome-caraousel-phone img').appendTo($heroImagePhone);

	/* login box */

	var $loginImgButton = jQ('.login-grey-background input[type=image]');
	$loginImgButton.closest('div').addClass('rd-login-submit-container');
	var $rdLoginBtn = jQ('<input type="button" class="rd-login-submit" value="Log in"/>').insertAfter($loginImgButton);
	$rdLoginBtn.on('click', function () {
		$loginImgButton.click();
	});


	/* offers */

	var $offersContainer = jQ('<div class="rd-offers-container"></div>').insertAfter($pageContent);

	jQ('<div class="rd-offer-header">Ideas for Every Occasion</div>').appendTo($offersContainer);

	var $offerItems = jQ('<div class="rd-offer-items"></div>').appendTo($offersContainer);

	jQ('.resp-welcome-offer1-mobile img, .resp-welcome-offer2-mobile img, .resp-welcome-offer3-mobile img').each(function () {
		var $img = jQ(this),
			$offerItem = jQ('<div class="rd-offer-item"></div>').append($img);

		$offerItem.appendTo($offerItems);
	});

	/* fix for login form */

	if(!jQ('form[name="form1"]').length) {
		jQ('form[name="headerloginfrm"]').attr('action', 'https://qa3.walgreens.com/login_redirect.jsp');
	}
});