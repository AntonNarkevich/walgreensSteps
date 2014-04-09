RD.clientFnManager.set("runRegistration", function () {
	var $rdPageTitleTr = jQ('.contentMaintd > table >tbody >tr:nth-child(2)>td:first-child > table > tbody > tr:nth-child(3)').addClass('rd-page-title-tr'),
		$pageTitleOrig = $rdPageTitleTr.find('img'),
		$yourInfo = jQ('.yourinfobg'),
		$accInfo = jQ('.actinfobg'),
		$emailPref = jQ('.emailprefbg'),
		$continueBtn = jQ('.contentMaintd > table >tbody >tr:nth-child(2)>td:first-child > table > tbody > tr:last-child input[type=image]');

	jQ('<span class="rd-page-title">Create Your Walgreens Account</span>').insertAfter($pageTitleOrig);
	jQ('<span class="rd-your-info-title">Your Information</span>').appendTo($yourInfo.children('div:first-child'));
	jQ('<span class="rd-acc-info-title">Account Information</span>').appendTo($accInfo.children('div:first-child'));
	jQ('<span class="rd-email-preferences-title">E-mail Preferences</span>').appendTo($emailPref.children('div:first-child'));

	$continueBtn.addClass('rd-button').addClass('rd-blue-button').attr('type', 'submit').val('Continue');

	// capturing fix
	jQ('[name=regForm]').append(jQ('.contentMaintd'));
});
