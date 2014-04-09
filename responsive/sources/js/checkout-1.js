RD.clientFnManager.set("runCheckout-1", function () {

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

	/** phone breakpoint **/
	(function clonePickupInfoLinks() {
		var $table = jQ('#resp-pickupship-location')
			.find('tbody').eq(0)
			.children();
		var l = $table.length;
		var $linksParent = $table.find('a').parent();
		var $tr = jQ("<tr class='rd-clone-store'>").append($linksParent.clone());

		$table.eq(l - 1).before($tr);

		RD.boundManager.applyForOther($linksParent, bounds.phone);
		RD.boundManager.applyFor($tr, bounds.phone);
	})();
	(function cloneShippingInfoLinksMixed() {
		var $table = jQ('#storedUserAddressCont_mixed')
			.find('table').eq(1).find('tr');
		var l = $table.length;
		var $linksParent = $table.find('a').parent();
		var $tr = jQ("<tr class='rd-clone-store'>").append($linksParent.clone());

		$table.eq(l - 1).after($tr);

		RD.boundManager.applyForOther($linksParent, bounds.phone);
		RD.boundManager.applyFor($tr, bounds.phone);
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
	(function preventScrollingWhenPopupIsOpened() {
		function preventAll() {
			return false;
		}

		jQ('#OpacityLayer')
			.on('touchstart', preventAll)
			.on('touchmove', preventAll);
	})();
	(function moveWarning() {
		var $content = jQ('#leftContent');
		$content.before($warningBlock);
	})();
	(function movePopup() {
		var $popup = jQ('#storeWindowDiv');
		var $layer = jQ('#OpacityLayer');
		$layer.after($popup);
	})();
	(function pageEvents() {
		var $iframe = jQ("#storewindow");
		jQ('.w-shadow-topright').on("click", function () {
			$iframe.trigger('load');
		});
		$iframe.on('load', function () {
			if(window.frames.storewindow.location.href !== "about:blank") {
				console.log("***************  iFrame загрузился  *****************");
				jQ('html, body').css({
					"overflow": "hidden",
					"height": "100%",
					"width": "100%"
				});
				(function () {
					/* Prevent Scrolling down. Uses jQuery. */
					jQ(document).on("scroll", function () {
						checkForScroll();
					});
					var checkForScroll = function () {
						var iScroll = jQ(document).scrollTop();
						if(iScroll > 1) {
							// Disable event binding during animation
							jQ(document).off("scroll");
							// Animate page back to top
							jQ("body,html").animate({
									"scrollTop": "0"
								},
								500,
								function () {
									jQ(document).on("scroll", checkForScroll);
								});
						}
					};
				})();

				try {
					if(window.frames.storewindow.__sub_onload) {
						window.frames.storewindow.__sub_onload();
					} else {
						console.log("***************  No method storewindow *****************");
					}
				} catch(e) {
					console.log("******  " + e.name + " - " + e.message);
				}
			}
			if(window.frames.storewindow.location.href === "about:blank") {
				console.log("****** iFrame unload complete ******* ");
				jQ(document).off("scroll");
				jQ('html, body').css({
					"overflow": "",
					"height": "",
					"width": ""
				});
			}
		});
		jQ("#shipmyorderradio").on("click", function () {
			this.scrollIntoView();
		});
	})();

	(function restoreBrokenTags(options) {
		// TODO: kill "\n" simbols in your code and comments this code. in case nothing will break, remove commented code

		var l = options.length,
			$tagContainer,
			$killedTag,
			$containerChildren;

		while(l) {
			l -= 1;
			if(typeof options[l].parent === typeof options[l].tag === "string") {
				console.log('options must be string type');
				return;
			}
			$tagContainer = jQ(options[l].parent);
			$killedTag = jQ(options[l].tag);
			$containerChildren = $tagContainer.children();
			$killedTag.append($containerChildren);
			$tagContainer.append($killedTag);
		}
	})([
			{
				parent: '#shippingContainer',
				tag: '<form name="billingshipping" action="/walgreens/updateshipping_v2/mode=changetoship/" method="POST" onSubmit="preventMultipleSubmits()">'
			}
		]);
});