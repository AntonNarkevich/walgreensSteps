RD.clientFnManager.set("runMaster", function () {
	(function detectIOs() {
		var isIos = (RD.deviceManager.deviceInfo.os === RD.deviceManager.deviceOsType.iOs);

		if (isIos) {
			jQ('body').addClass('rd-ios');
		}
	})();

	/* prevent login popup on phones */
	(function manageloginPopup() {
		function addClasses() {
			var $tableElements = jQ('#mainDiv_storeWidgetLayer table, #mainDiv_storeWidgetLayer tbody, #mainDiv_storeWidgetLayer thead, #mainDiv_storeWidgetLayer tfoot, #mainDiv_storeWidgetLayer th, #mainDiv_storeWidgetLayer tr, #mainDiv_storeWidgetLayer td');

			RD.supp.helpers.remainTableStyleFor($tableElements);
		}

		function changeBehavior(bound) {
			if (bound === RD.boundManager.getBounds().phone) {
				jQ('.rd-walgreennewupload, .rd-walgreennewmyphotos').attr({
					href: '/walgreens/storewidgetlogin/',
					target: '_blank'
				});
			} else {
				var originalOpenLogin = window.openLogin;
				window.openLogin = function (url) {
					originalOpenLogin(url);
					addClasses();
				};
			}
		}

		setTimeout(function () {
			changeBehavior(RD.boundManager.getCurrentBound());
		});
	})();

	/* open credits in new window */
	(function blockCreditPopup() {
		jQ('a[href="javascript:showCreditsDiv()"]').attr({
			href: '/walgreens/viewcredits/',
			target: '_blank'
		});
	})();

//	/* redirect user to mobile version of page */
//	(function redirectToMobileVersion() {
//		if(jQ('.rd-responsive-template-redirect').length) {
//			var bounds = RD.boundManager.getBounds(),
//				curBound = RD.boundManager.getCurrentBound(),
//				tabletSuffix = '_tablet',
//				phoneSuffix = '_mobile';
//
//			switch(curBound) {
//				case bounds.tablet:
//					if(location.href.indexOf(tabletSuffix) === -1) {
//						location.href = location.href + tabletSuffix;
//					}
//					break;
//				case bounds.phone:
//					if(location.href.indexOf(phoneSuffix) === -1) {
//						location.href = location.href + phoneSuffix;
//					}
//					break;
//				default:
//					break;
//			}
//		}
//	})();

	/* swap links to mobile pages */
	(function swapLinksToMobile() {
		setTimeout(function () {
			var bounds = RD.boundManager.getBounds(),
				tabletSuffix = '_tablet',
				phoneSuffix = '_mobile';

			function updateLinks(bound) {
				var $linksToSwap = jQ('a[href*="storePageId="]'),
					suffix;

				switch (bound) {
					case bounds.tablet:
						suffix = tabletSuffix;
						break;
					case bounds.phone:
						suffix = phoneSuffix;
						break;
					default:
						break;
				}

				if (suffix) {
					$linksToSwap.each(function () {
						var $link = jQ(this);

						if (!$link.attr('desktop-href')) {
							// remove last '/'
							var href = $link.attr('href').replace(/\/$/, '');

							$link.attr('desktop-href', href);
						}

						$link.attr('href', $link.attr('desktop-href') + suffix);
					});
				}

				console.log('Links has been replaced');
			}

			RD.eventManager.on('boundChange', function (obj) {
				console.log('Bound change fired');
				updateLinks(obj.curBound);
			});

			updateLinks(RD.boundManager.getCurrentBound());
		});
	})();

	// affected page
	// http://us2.wgstg8.qa.snapfish.com/walgreens/imageedit/AlbumID=10054793007/PictureID=10402758007/PictureIDList=10402758007/
	(function fixForImageCropper() {
		var $cropPanel = jQ('#cropPane');
		if ($cropPanel.length) {
			/* 5thfinger responsive moves content left to 3000px */
			if (jQ('#cropper1masked').position().left < 2000) {
				jQ('span[id^="cropper1"]', $cropPanel).css('left', '+=3000');
			}
		}
	})();
});