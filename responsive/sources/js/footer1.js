RD.clientFnManager.set("runFooter1", function () {

	function parseExistingFooter() {
		var model = {};

		model.bottomLinks = '';
		jQ('#resp-footer-Copyrights a').each(function () {
			var $a = jQ(this).clone();

			$a.text($a.text().trim());

			model.bottomLinks += $a[0].outerHTML;
		});

		model.copyrights = jQ('#resp-footer-Copyrights tr:last-child span').text().trim();

		return model;
	}

	function buildFooterLinks() {
		var bounds = RD.boundManager.getBounds();

		RD.controls.footerLinks({
			visibleFor: [
				bounds.phone,
				bounds.tablet
			],
			menuItemIconClass: "icon-chevron-right",
			expendedMenuItemIconClass: "icon-chevron-right",
			parser: function () {
				var structure = [];

				function parseBlock($block) {
					function getMainItemText() {
						return $block.find('.footer-head-txt').text().trim();
					}

					function getSubItems() {
						var items = [];
						$block.find('a.new-footerblack').each(function () {
							var $link = jQ(this),
								menuItemObj = { href: $link.attr("href"), text: $link.text().trim() };

							items.push(menuItemObj);
						});

						return items;
					}

					return {title: getMainItemText(), links: getSubItems()};
				}

				structure.push(parseBlock(jQ('#resp-footer-PhotoProducts')));
				structure.push(parseBlock(jQ('#resp-footer-OurServices')));
				structure.push(parseBlock(jQ('#resp-footer-Pricing')));
				structure.push(parseBlock(jQ('#resp-footer-PhotoHelp')));
				structure.push(parseBlock(jQ('#resp-footer-OrderInformation')));
				structure.push(parseBlock(jQ('#resp-footer-CompanyInformation')));
				structure.push({title: 'RECEIVE SPECIAL OFFERS BY EMAIL', links: []});

				return structure;
			},
			managePlace: function ($controlContainer) {
				$controlContainer.appendTo('.rd-footer-links-wrapper');
			}
		});
	}

	var footerModel = parseExistingFooter(),
		footerTemplate = RD.templates['footer1'](footerModel);

	jQ('body').append(footerTemplate);

	// search block
	var $searchInput = jQ('#googleSrhQuery');
	if($searchInput.length) {
		jQ('body').addClass('rd-search-exist');
		$searchInput.appendTo('.rd-footer-search-text-box');
	}
	var $searchBtn = jQ('#searchNow').appendTo('.rd-footer-search-button').text('Search');

	$searchInput.keyup(function (e) {
		if(e.keyCode === 13) {
			$searchBtn.click();
		}
	});

	buildFooterLinks();

	/* Sign up now link */
	jQ('<br/>').insertBefore('.rd-footer-links > nav:last-child h1 i');
	jQ('#resp-footer-EmailOffers a').clone().insertBefore('.rd-footer-links > nav:last-child h1 i');

	/* full site link */
	RD.controls.fullSiteLink({
		fullSiteLinkHtml: '<a>View Full Site</a>',
		managePlace: function ($controlContainer) {
			var $copyRightsLinks = jQ('.rd-footer-bottom-links');
			$controlContainer.prependTo($copyRightsLinks);
		}
	});
});