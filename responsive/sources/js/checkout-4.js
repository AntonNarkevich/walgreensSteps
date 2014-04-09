RD.clientFnManager.set("runCheckout4", function () {

	var $checkoutContent = jQ('.rd-header-checkout-desktop').next('tr').addClass('rd-checkout-content contentMaintd');

	$checkoutContent.children('td:nth-child(2)').children('table:first-child').addClass('rd-main-content');

	/* Pickup order */
	jQ('#resp-receipt-pickup-time').appendTo('#resp-receipt-pickup-date');
	jQ('#resp-receipt-pickup-24hrs').appendTo('#resp-receipt-pickup-store');

	(function addTotalTaxSelectors() {
		var $repTotal = jQ('.resp-review-rep-total,' +
				' .resp-review-gft-total,' +
				' .resp-review-pol-total,' +
				' .resp-review-pos-total'),
			$totalTr = $repTotal.find('tr'),
			$tax = $repTotal.prev();

		$tax.addClass('resp-tax');
		$totalTr.addClass('resp-total-tr');

		$totalTr.children(':last-child').addClass('resp-total-value');
		$totalTr.children(':nth-child(2)').addClass('resp-total-heading');
		$totalTr.children(':first-child').addClass('resp-total-order-number');
	})();

	(function detectSpacers() {
		var $images = jQ('table.resp-review-rep-product img,' +
				' table.resp-review-pol-product img,' +
				' table.resp-review-pos-product img'),
		//Trying to identify spacers.
			$spacerImages = $images.filter(function () {
				return jQ(this).attr('src').match(/spacer/) !== null;
			});

		$spacerImages.closest('td').addClass('resp-spacer');
	})();
});