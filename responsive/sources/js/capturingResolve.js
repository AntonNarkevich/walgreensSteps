RD.clientFnManager.set("runCapturingResolve", function () {

	var $tabletImgs = jQ('.rd-target-tablet img, img.rd-target-tablet'),
		$phoneImgs = jQ('.rd-target-phone img, img.rd-target-phone'),
		bounds = RD.boundManager.getBounds(),
		currentBound = RD.boundManager.getCurrentBound();

	/* walgreens specific */

	var wgTabletImagesSelectors = [
		".resp-header-promoTablet img",
		".resp-welcome-caraousel-tablet img",
		"[class*=resp-welcome-offer] img"
	].join(",");

	var wgPhoneImagesSelectors = [
		".resp-header-promoMobile img",
		".resp-welcome-caraousel-phone img",
		"[class*=resp-welcome-offer] img"
	].join(",");

	var wgTabletImages = jQ(wgTabletImagesSelectors);
	$tabletImgs = $tabletImgs.add(wgTabletImages);

	var wgPhoneImages = jQ(wgPhoneImagesSelectors);
	$phoneImgs = $phoneImgs.add(wgPhoneImages);

	function revertCommonImgs() {
		var imgs = jQ("img"),
			mobileImgs = $tabletImgs.add($phoneImgs);

		imgs.each(function () {
			var isExists = false,
				img = this;

			mobileImgs.each(function () {
				var mobileImg = this;
				if(img === mobileImg) {
					isExists = true;
					return false;
				}
			});

			if(!isExists) {
				var ogImage = img.getAttribute("old-src");
				if(ogImage) {
					img.setAttribute("src", ogImage);
				}
			}
		});
	}

	function changeSrc(curBound) {
		if(curBound === bounds.phone) {
			$phoneImgs.each(function () {
				var $img = jQ(this);
				if($img.attr('old-src')) {
					$img.attr('src', $img.attr('old-src'));
				}
			});
		} else {
			$tabletImgs.each(function () {
				var $img = jQ(this);
				if($img.attr('old-src')) {
					$img.attr('src', $img.attr('old-src'));
				}
			});
		}
	}

	revertCommonImgs();

	RD.boundManager.applyFor($tabletImgs, bounds.tablet);
	RD.boundManager.applyFor($phoneImgs, bounds.phone);
	changeSrc(currentBound);

	RD.eventManager.on('boundChange', function (e) {
		changeSrc(e.curBound);
	});
});
