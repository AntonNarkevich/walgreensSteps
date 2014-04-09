RD.clientFnManager.set("runSharePopup", function () {

	//Popup fix ------------------------
	(function fixPopup() {
		(function fixImages() {
			jQ('a#emailDiv').html('Share with an email');//change image to text
			jQ('a#linkDiv').html('Share with a link');//change image to text
			jQ('a#shareGigyadiv').html('Share too...');//change image to text
		})();

		jQ('div#shareWithLink').closest('tr').addClass("main-cont");
		if (jQ('a#emailDiv').length === 0) {
			jQ('tr.main-cont').addClass("multiple");
		}
		else {
			jQ('tr.main-cont').removeClass("multiple");
		}

		jQ('a#emailDiv').closest('tr').addClass("share-cont");
		jQ('a#emailDiv').closest('td').addClass("share-btn-cont");
		jQ('a#linkDiv').closest('td').addClass("share-btn-cont");
		jQ('a#shareGigyadiv').closest('td').addClass("share-btn-cont");

		(function fixButttons() {
			jQ('#changebutton a').html("Share Album");//Share Album button
			jQ('#changebuttontodim').html("Share Album");
		})();

	})();

});