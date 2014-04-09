(function () {
	function notResponsiveCondition() {
		return false;
//		return !document.querySelector('.rd-responsive-template');
	}

	function findPageAddressDetails() {
		var radios = document.querySelectorAll('input[type="radio"]');
		var name = "county";
		var arr = [];
		if(radios.length === 3) {
			for(var i = 0; i < radios.length; i++) {
				arr.push(radios[i]);
			}

			return arr.every(function (el) {
				return el.name === name;
			});
		}
	}

	responsify.clientMap = {
		viewport: '',
		bounds: {
			phone: { minWidth: 2, maxWidth: 669 },
			tablet: { minWidth: 670 },
			desktop: { maxWidth: 1 } // required for hiding desktop versions of controls
		},
		controls: [
			'fullSiteLink',
			'menuBlock',
			'sidebar',
			'footerLinks'
		],
		sources: {
			timeout: 40000,
			js: [
				{src: 'capturingResolve.js', callback: 'runCapturingResolve'},
				{src: 'core.js', callback: 'runCore'},
				{src: 'master.js', callback: 'runMaster'},
				{src: 'footer1.js', contentCondition: ['table.new-footer-background'], callback: 'runFooter1'},
				{src: 'footer2.js', contentCondition: ['.swift-old #footer'], callback: 'runFooter2'},
				{src: 'footer-plain.js', contentCondition: ['.resp-footerplain-main'], callback: 'runFooterPlain'},
				{src: 'header1.js', contentCondition: ['#resp-header-menu'], callback: 'runHeader1'},
				{src: 'header2.js', contentCondition: ['.platinum-header'], callback: 'runHeader2'},
				{src: 'header-checkout.js', contentCondition: ['#resp-checkoutHeader-statusBar'], callback: 'runHeaderCheckout'},
				{src: 'home.js', contentCondition: ['.rd-home.rd-home-logged-out'], callback: 'runHome'},
				{src: 'not-responsive-templates.js', customCondition: notResponsiveCondition, callback: 'runNotResponsiveTemplates'},
				{src: 'home-logged-in.js', contentCondition: ['.rd-home:not(.rd-home-logged-out)'], callback: 'runHomeLoggedIn'},
				{src: 'registration.js', urlCondition: ['/registration'], callback: 'runRegistration'},
				{src: 'albums.js', urlCondition: ['/fe/p/Organizer'], callback: 'runAlbums'},
				{src: 'orderPrints.js', urlCondition: ['/reprintsphotoselector'], callback: 'runOrderPrints'},
				{src: 'sharePopup.js', urlCondition: ['/compose', '/sharealbum'], callback: 'runSharePopup'},
				{src: 'dedicatedPrints.js', urlCondition: ['/dedicatedprintspage'], callback: 'runDedicatedPrints'},
				{src: 'checkout-global.js', contentCondition: ['.rd-checkout'], callback: 'runCheckoutGlobal'},
				{src: 'cart.js', contentCondition: ['.rd-cart'], callback: 'runCart'},
				{src: 'emptyCart.js', urlCondition: ['/shoppingcartempty'], callback: 'runEmptyCart'},
				{src: 'checkout-1.js', urlCondition: ['/searchstore_v2', 'updateshipping_v2', 'selectstore_v2'], callback: 'runCheckout-1'},
				{src: 'editshipping.js', urlCondition: ['/editshipping_v2', 'updateshipping_v2'], callback: 'runEditshipping'},
				{src: 'checkout-2.js', contentCondition: ['#resp-payment-sub-header'], callback: 'runCheckout-2'},
				{src: 'checkout-3.js', contentCondition: ['#resp-review-main'], callback: 'runCheckout-3'},
				{src: 'checkout-4.js', contentCondition: ['#resp-confirmation-bottomContent'], callback: 'runCheckout4'},
				{src: 'pick-up-location.js', urlCondition: ['/storelist'], callback: 'runPickupLocation'},
				{src: 'storelist.js', urlCondition: ['/wgstores'], callback: 'runStorelist'},
				{src: 'widgetLogin.js', urlCondition: ['/storewidgetlogin'], callback: 'runWidgetLogin'},
				{src: 'upload.js', contentCondition: ['.rd-htmlupload'], callback: 'runUpload'},
				{src: 'upload-confirm.js', contentCondition: ['.resp-confirmupload-maincontent'], callback: 'runUploadConfirm'},
				{src: 'cards.js', contentCondition: ['.rd-cards-page'], callback: 'runCards'}
			],
			css: [
				{href: '../css/master.css', id: 'rd-master-link'},
				{href: '../css/not-responsive-templates.css', customCondition: notResponsiveCondition, id: 'rd-not-responsive-templates-link'},
				{href: '../css/responsive-templates.css', contentCondition: ['.rd-responsive-template'], id: 'rd-responsive-templates-link'},
				{href: '../css/header1.css', id: 'rd-header1-link', contentCondition: ['#resp-header-menu', '.platinum-header']},
				{href: '../css/header-checkout.css', id: 'rd-header-checkout-link', contentCondition: ['#resp-checkoutHeader-statusBar']},
				{href: '../css/footer1.css', id: 'rd-footer1-link', contentCondition: ['table.new-footer-background', '.swift-old #footer']},
				{href: '../css/footer-plain.css', id: 'rd-footer-plain-link', contentCondition: ['.resp-footerplain-main']},
				{href: '../css/home.css', id: 'rd-home-link', contentCondition: ['.rd-home.rd-home-logged-out']},
				{href: '../css/home-logged-in.css', id: 'rd-home-logged-in-link', contentCondition: ['.rd-home:not(.rd-home-logged-out)']},
				{href: '../css/registration.css', urlCondition: ['/registration']},
				{href: '../css/albums.css', urlCondition: ['/fe/p/Organizer']},
				{href: '../css/photos.css', urlCondition: ['/fe/p/Organizer']},
				{href: '../css/orderPrints.css', urlCondition: ['/reprintsphotoselector']},
				{href: '../css/sharePopup.css', urlCondition: ['/compose', '/sharealbum']},
				{href: '../css/dedicatedPrints.css', urlCondition: ['/dedicatedprintspage']},
				{href: '../css/checkout-global.css', contentCondition: ['.rd-checkout']},
				{href: '../css/cart.css', contentCondition: ['.rd-cart']},
				{href: '../css/emptyCart.css', urlCondition: ['/shoppingcartempty']},
				{href: '../css/checkout-1.css', urlCondition: ['/searchstore_v2', 'updateshipping_v2', 'selectstore_v2']},
				{href: '../css/editshipping.css', urlCondition: ['/editshipping_v2', 'updateshipping_v2']},
				{href: '../css/checkout-2.css', contentCondition: ['#resp-payment-sub-header']},
				{href: '../css/checkout-3.css', contentCondition: ['#resp-review-main']},
				{href: '../css/checkout-4.css', contentCondition: ['#resp-confirmation-bottomContent']},
				{href: '../css/pick-up-location.css', urlCondition: ['/storelist']},
				{href: '../css/storelist.css', urlCondition: ['/wgstores']},
				{href: '../css/upload.css', contentCondition: ['.rd-htmlupload']},
				{href: '../css/upload-confirm.css', contentCondition: ['.resp-confirmupload-maincontent']},
				{href: '../css/addressDetails.css', customCondition: findPageAddressDetails },
				{href: '../css/cards.css', contentCondition: ['.rd-cards-page']}
			]
		}
	};

	(function fixBodySelectors() {
		RD.eventManager.on('domReady', function () {
			var bodyEl = document.querySelector('body');

			// fix for home page logged in, because capturing removes classes from body
			if(document.querySelector('#resp-home-user-alerts')) {
				bodyEl.className = bodyEl.className + ' rd-responsive-template rd-home';
			}

			// fix for cart page
			if(document.querySelector('#resp-cart-header')) {
				bodyEl.className = bodyEl.className + ' rd-responsive-template rd-cart';
			}

			// fix for checkout pages
			if(document.querySelector('.rd-responsive-template')) {
				if(document.querySelector('#continue, #buynowButton, #continueButton')) {
					bodyEl.className = bodyEl.className + ' rd-checkout';
				}
			}

			// fix for upload confirm page
			if(document.querySelector('.resp-confirmupload-maincontent')) {
				bodyEl.className = bodyEl.className + ' rd-responsive-template rd-htmlupload-confirm';
			}
		});
	})();

	(function updateViewport() {
		RD.eventManager.on('domReady', function () {
			responsify.clientMap.viewport = document.querySelector('.rd-responsive-template') ? '' : 'width=device-width, initial-scale=1.0';
		});
	})();
})();