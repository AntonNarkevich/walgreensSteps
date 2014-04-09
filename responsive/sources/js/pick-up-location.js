RD.clientFnManager.set("runPickupLocation", function () {

	(function applyGlobalStylesOnButtons() {
		var $nextButton = jQ('span.btn-next');
		var $previousButton = jQ('.btn-previous');
		(function () {
			// TODO: remove this function when text will be exported to HTML
			$nextButton.html("Next <i class='rd-next'>&gt;</i>");
			$previousButton.html("<i class='rd-previous'>&lt;</i> Previous");
		})();

		RD.supp.helpers.makeBlueButton($nextButton.add($previousButton));
	})();
	(function pageEvents() {
		jQ("iframe").on('load', function () {
			console.log('pickUpLocation popup');
			console.log("***************  inner iFrame onload event triggered  *****************");
			try {
				if(window.__sub_onload) {
					window.__sub_onload();
				} else {
					console.log("***************  No method storewindow *****************");
				}
			} catch(e) {
				console.log("******  " + e.name + " - " + e.message);
			}
		});

	})();
});