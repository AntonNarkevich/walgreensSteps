RD.clientFnManager.set("runUploadConfirm", function () {
	jQ('html, body').addClass('rd-htmlupload-confirm');

	jQ('#resp-checkoutHeader-statusBar').closest('td').attr('id', 'header');

	// append pictures into the same container
	jQ('.resp-confirmupload-img').appendTo('.resp-confirmupload-picturelist:nth-child(2)');

	var $button = jQ('.resp-confirmupload-nextaction a');
	$button.html('See Entire Album');
	RD.supp.helpers.makeBlueButton($button);
});