RD.clientFnManager.set("runEmptyCart", function () {
	//If this is a "There are no items in your cart" variation, mark the "body" tag.
	(function detectNoImgVariation() {
		var $body = jQ('body'),
			$bodyBackImage = $body.find('table.body-back-image'),
			$contentWrapper = $bodyBackImage.parent(),
			$specialImgs = $contentWrapper.find('img[usemap="#play_with_photos_Map"]');

		if ($specialImgs.length !== 0) {
			$body.addClass('resp-no-img-variation');
			$contentWrapper.addClass('resp-no-img-variation-wrapper');
		}
	})();
});