RD.clientFnManager.set("runCheckoutGlobal", function () {
	var $pageWrapper = jQ('.body-back-image');

	(function setPageClasses() {
		/** TODO: remove this function when classes will be exported to html code  **/
		var setClasses = function (jQCollection) {
			var $current;
			var l = jQCollection.length;
			while(l) {
				$current = jQCollection.eq(--l);
				if($current.find(".contentMaintd").length) {
					$current.addClass("rd-checkout-content");
				}
				if($current.find(".resp-footerplain-main").length) {
					$current.addClass("rd-checkout-footer");
				}
			}
		};
		var $wrapperChildren = $pageWrapper.eq(0).children();

		if($wrapperChildren.length === 1 && $wrapperChildren[0].nodeName === "TBODY") {
			$wrapperChildren = $wrapperChildren.children();
			setClasses($wrapperChildren);
		} else {
			setClasses($wrapperChildren);
		}

		jQ('html').addClass('rd-checkout');
	})();

	(function applyGlobalStylesOnButtons() {
		var $backButtons = $pageWrapper.find(".CAC-btn-back");
		var $continueButtons = $pageWrapper.find(".CAC-btn-continue");
		var $findLocation = $pageWrapper.find("#resp-pickup-findPickupButton");

		(function () {
			// TODO: remove this function when text will be exported to HTML
			$backButtons.text("Back");
			$continueButtons.text("Continue");
			$findLocation.text("Find a Pickup Location");
		})();

		RD.supp.helpers.makeBlueButton($continueButtons);
		RD.supp.helpers.makeGreyButton($backButtons);
		RD.supp.helpers.makeGreyButton($findLocation);
	})();
	(function applyGlobalStylesOnTextInputs() {
		var $adressInputs = $pageWrapper.find("input:text");

		RD.supp.helpers.styleTextInputs($adressInputs);
	})();

	(function createCallByPhoneLink() {
		var $node = jQ("#resp-osm-needHelp").find('.rtCoulmnUL').find("li").eq(1),
			$nodeClone = $node.clone(),
			$nodeText = $node.text(),
			telephoneNumber = $nodeText.slice($nodeText.indexOf("("));

		/*If the number is recognized nonetheless we will replace the <a> with a <span>*/
		(function removeLink() {
			var $recognizedLink = $nodeClone.find('a');
			if ($recognizedLink.length !== 0) {
				var $span = jQ('<span></span>').html($recognizedLink.html());
				$recognizedLink.after($span);
				$recognizedLink.remove();
			}
		})();

		$nodeText = $nodeText.slice(0, $nodeText.indexOf("("));
		$node.html($nodeText + "<a class='rd-call-by-phone' href='tel:" + telephoneNumber + "'>" + telephoneNumber + "</a>");

		$node.addClass('resp-mobile-view-number');
		$nodeClone.addClass('resp-tablet-view-number');
		$node.after($nodeClone);
	})();
});