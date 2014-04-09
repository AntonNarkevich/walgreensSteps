RD.clientFnManager.set("runFooterPlain", function () {

	function parseExistingFooter() {
		var model = {};

		model.bottomLinks = '';
		jQ('.resp-footerplain-misclinks a').each(function () {
			var $a = jQ(this).clone();

			$a.text($a.text().trim());

			model.bottomLinks += $a[0].outerHTML;
		});

		model.copyrights = jQ('.resp-footerplain-copyrightmsg span').text().trim();

		return model;
	}

	var footerModel = parseExistingFooter(),
		footerTemplate = RD.templates['footer-plain'](footerModel);

	jQ('.resp-footerplain-main').after(footerTemplate);

	/* full site link */
	RD.controls.fullSiteLink({
		fullSiteLinkHtml: '<a>View Full Site</a>',
		managePlace: function ($controlContainer) {
			var $copyRightsLinks = jQ('.rd-footer-bottom-links');
			$controlContainer.prependTo($copyRightsLinks);
		}
	});
});