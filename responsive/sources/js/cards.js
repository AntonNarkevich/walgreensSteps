/*global RD, jQ*/
RD.clientFnManager.set("runCards", function () {
	'use strict';

	(function addSelectors() {
		jQ('.rd-body-content > table').addClass('rd-content-wrapper');

		/*Content blocks without classes*/
		jQ('.store-tiles-table > tbody > tr:nth-child(2) > .store-tile-cell > div > div').addClass('rd-new-x-mas');
		jQ('.store-tiles-table > tbody > tr:nth-child(3) > .store-tile-cell').addClass('rd-50-off');
		jQ('.body-back-image > tbody > tr:first-child').addClass('rd-25-off');
		jQ('.store-tiles-table > tbody > tr:nth-child(5) > .store-tile-cell').addClass('rd-card-types');
		jQ('.store-tiles-table > tbody > tr').slice(5, 11).addClass('rd-card-type-row');

		/*Spacing tr tags without classes*/
		jQ('.store-tiles-table').closest('tr').siblings('tr').addClass('rd-spacer-tr');
		jQ('.body-back-image > tbody > tr:last-child > td:first-child').addClass('rd-spacer-tr');
		jQ('.body-back-image > tbody > tr:nth-child(3) > td:last-child').addClass('rd-spacer-tr');
		jQ('.body-back-image > tbody > tr:nth-child(2)').addClass('rd-spacer-tr');
		jQ('.body-back-image > tbody > tr:nth-child(3) > td:first-child').addClass('rd-spacer-tr');
		jQ('.body-back-image > tbody > tr:nth-child(3) > td > img').addClass('rd-spacer-tr');

		jQ('.store-tiles-table > tbody > tr:last-child > .store-tile-cell > div').addClass('rd-photo-card-info');
		jQ('.body-back-image > tbody > tr:last-child').addClass('rd-mobile-apps');
	}());

	(function buildNavigation() {
		function getMenuSections() {
			var $tdTags = jQ('.menu-items-table > tbody > tr');

			//Will contain menu structure
			//[{heading: '', items: [link, link, link]},{},{}]
			var menuSections = [];
			var curSectionIndex = -1;

			//Going through all the trs.
			$tdTags.each(function (index, tdTag) {
				var $tdTag = jQ(tdTag);

				//If current tr contains heading
				var $headingCell = $tdTag.find('.menu-item-header-cell');
				if ($headingCell.length !== 0) {
					menuSections.push({heading: '', items: []});
					curSectionIndex += 1;

					menuSections[curSectionIndex].heading = $headingCell.html();
				}

				//If current tr contains menu link
				var $menuItemLink = $tdTag.find('.menu-item-link');
				if ($menuItemLink.length !== 0) {
					menuSections[curSectionIndex].items.push($menuItemLink);
				}
			});

			return menuSections;
		}

		var menuSections = getMenuSections();

		var $contentWrapper = jQ('.rd-content-wrapper');
		var $responsiveMenu = jQ('<div class="rd-resp-menu"></div>');

		jQ.each(menuSections, function (index, sectionData) {
			var $section = jQ('<div class="rd-section"></div>');
			var $heading = jQ('<span class="rd-heading"></span>');
			var $links = jQ('<div class="rd-links"></div>');

			$heading.html(sectionData.heading);
			$section.append($heading);

			jQ.each(sectionData.items, function (index, link) {
				var $link = jQ(link);

				$links.append($link.clone());
			});
			$section.append($links);

			$responsiveMenu.append($section);
		});

		$contentWrapper.prepend($responsiveMenu);
	}());
});