RD.clientFnManager.set("runHeaderCheckout", function () {

	(function addClasses() {
		var $pageWrapper = jQ('.body-back-image:not(#resp-footer-main) > tbody');

		// go through tr elements
		$pageWrapper.children().each(function () {
			var $tr = jQ(this);

			if($tr.find("#wgnewLogo").length) {
				$tr.addClass("rd-header-checkout-desktop");
			}

			return false;
		});
	})();


	function parseExistingHeader() {
		var model = {};

		model.topLogoHref = jQ('#walgreenLink').attr('href');
		model.bottomLogoHref = jQ('#walgreensPhotoLink').attr('href');

		var additionalImg = jQ('#wgnewLogo').closest('tr').find('img');
		model.additionalImg = additionalImg.length ? additionalImg[0].outerHTML : '';

		return model;
	}

	var headerModel = parseExistingHeader(),
		headerTemplate = RD.templates['header-checkout'](headerModel);

	jQ('body').prepend(headerTemplate);
});