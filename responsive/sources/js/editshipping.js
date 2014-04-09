RD.clientFnManager.set("runEditshipping", function () {

	var bounds = RD.boundManager.getBounds();

	var $pageWrapper = jQ('.body-back-image');
	var $warningBlock = jQ('#warning');

	(function createTitlesForShippingInfo() {
		var $table = $pageWrapper.find("#resp-shipping-fields-ship");
		var $mixedTable = $pageWrapper.find("#resp-shipping-fields-mixed");

		var modifyTable = function ($_table) {
			var $titles = $_table.find('tr').eq(8).children();
			var $inputs = $_table.find('tr').eq(9).children();
			var titlesLength = $titles.length;
			var $placeLocation;

			while(titlesLength) {
				titlesLength -= 1;
				if((titlesLength % 2)) {
					continue;
				}

				$placeLocation = $inputs.eq(titlesLength);

				if($placeLocation.find(".rd-adress-titles").length) {
					continue;
				}
				$placeLocation.prepend("<div class='rd-adress-titles'>" + $titles.eq(titlesLength).html() + "</div>");
			}
		};

		if($table.length) {
			modifyTable($table);
		}
		if($mixedTable.length) {
			modifyTable($mixedTable);
		}

	})();
	/* checkout global footer */
	(function createCallByPhoneLink() {
		var $node = jQ("#resp-osm-needHelp").find('.rtCoulmnUL').find("li").eq(1);
		var $nodeText = $node.text();
		var telephoneNumber = $nodeText.slice($nodeText.indexOf("("));

		$nodeText = $nodeText.slice(0, $nodeText.indexOf("("));
		$node.html($nodeText + "<a class='rd-call-by-phone' href='tel:" + telephoneNumber + "'>" + telephoneNumber + "</a>");

	})();


	(function cloneShippingInfoLinks() {
		var $table = jQ('#storedUserAddressCont_ship')
			.find('table').eq(1).find('tr');
		var l = $table.length;
		var $linksParent = $table.find('a').parent();
		var $tr = jQ("<tr class='rd-clone-store'>").append($linksParent.clone());

		$table.eq(l - 1).after($tr);

		RD.boundManager.applyForOther($linksParent, bounds.phone);
		RD.boundManager.applyFor($tr, bounds.phone);
	})();

	(function moveWarning() {
		var $content = jQ('#leftContent');
		$content.before($warningBlock);
	})();
	(function setClassOnTable() {
		jQ('div.pickuppage-selection-container').children().each(function () {
			if((jQ(this).find('select').length === 3) || jQ(this).find('td.pickuppage-selection-container').length && this.tagName === "TABLE") {
				jQ(this).addClass('rd-shipping-method');
				console.log(jQ(this));
			}
		});

		(function fixFooterId() {
			var $checkoutFooter = jQ('#resp-osm-orderSummary').parent();
			if($checkoutFooter.attr("id") !== "rightContent") {
				$checkoutFooter.attr("id", "rightContent");
			}
		})();

		/* some hiden field */
		RD.supp.helpers.makeGreyButton(jQ(".btn-yes").text("Yes"));
		/* some hiden field end */

	})();


});