RD.clientFnManager.set("runHeader2", function () {

	function parseExistingHeader() {
		var model = {};
		model.isLoggedIn = !!jQ('.rd-responsive-template:not(.rd-home-logged-out)').length;
		model.logoLink = jQ('.logo-walnew').attr('href');
		model.subLogoLink = jQ('.logo-platinumnew').attr('href');

		if(model.isLoggedIn) {
			var $myAcLink = jQ('.myaccount-link'),
				$signOutLink = jQ('.logout-link');

			model.myAccountBtn = {
				link: $myAcLink.attr('href'),
				text: $myAcLink.text().trim()
			};

			model.signOutBtn = {
				link: $signOutLink.attr('href'),
				text: $signOutLink.text().trim()
			};
		} else {
			var $registerLink = jQ('#resp-header-accountLinks tr:nth-child(4) a'),
				$signInLink = jQ('#resp-header-accountLinks tr:nth-child(2) a');

			model.registerBtn = {
				link: $registerLink.attr('href'),
				text: $registerLink.text().trim()
			};

			model.signInBtn = {
				link: $signInLink.attr('href'),
				text: $signInLink.text().trim()
			};
		}

		model.cartBtnLink = jQ('.platinum-cart a').attr('href');
		model.cartCount = jQ('span[id$=cartWidgetId]').text().trim();

		var menuItems = [];
		jQ('.headertabs-top > div > div:first-child a').each(function (i) {
			var menuItemObj,
				$link = jQ(this);

			switch(i) {
				case 1:
					menuItemObj = {link: $link.attr('href'), text: 'Books'};
					break;
				case 6:
					menuItemObj = {link: $link.attr('href'), text: 'Gifts'};
					break;
				default:
					menuItemObj = {link: $link.attr('href'), text: $link.text().trim()};
			}

			menuItems.push(menuItemObj);
		});

		model.menuItems = menuItems;

		model.uploadBtn = {
			link: model.isLoggedIn ? '/walgreens/htmlupload?showcopyright=false' : jQ('.plnew-upload').attr('href'),
			text: 'Upload >'
		};

		model.photosBtn = {
			link: model.isLoggedIn ? '/walgreens/fe/p/Organizer' : jQ('.plnew-myphotos').attr('href'),
			text: 'Your Photos >'
		};

		return model;
	}

	function buildMenuPhone() {
		/* menu phone */

		var bounds = RD.boundManager.getBounds(),
			$menuPhoneSource = jQ('.rd-menu-tablet').clone(),
			menublock = RD.controls.menuBlock({
				originalElement: $menuPhoneSource,
				visibleFor: [
					bounds.phone
				],
				animationDuration: 600,
				menuItemIconClass: "icon-plus",
				expendedMenuItemIconClass: "icon-minus",
				lastLevelItemIconClass: "icon-chevron-right",
				parser: function () {
					var structure = [],
						$menuItems = $menuPhoneSource.find('a');

					$menuItems.each(function () {
						var link = jQ(this),
							menuItemObj = { href: link.attr("href"), text: link.text().trim(), items: [] };

						structure.push(menuItemObj);
					});

					return structure;
				},
				managePlace: function ($controlContainer) {
					$controlContainer.insertAfter($menuPhoneSource);
				}
			});

		var sidebar = RD.controls.sidebar({
			originalElement: menublock.$el,
			visibleFor: [
				bounds.phone
			],
			isCloningNeeded: false,
			onCreationStart: function ($control) {
				if($control.length) {
					RD.logger.log("start control creation");
				}
			},
			onCreationComplete: function ($control) {
				if($control.length) {
					RD.logger.log("control was created");
				}
			}
		});

		jQ('.rd-menu-button-phone').on('click', function (e) {
			e.stopPropagation();

			sidebar.toggle();
		});

		jQ('.rd-body-content').on('click', function () {
			sidebar.toggle(false);
		});
	}

	var headerModel = parseExistingHeader(),
		headerTemplate = RD.templates['header1'](headerModel);

	jQ('body').prepend(headerTemplate);

	RD.ajaxWrapper.registerCallBack(/getcartitemcoun/i, function () {
		setTimeout(function () {
			jQ('.rd-cart-count').text(jQ('span[id$=cartWidgetId]').text().trim());
		});
	});

	RD.ajaxWrapper.startListening();

	// promo
	jQ('.resp-header-promoTablet img').appendTo('.rd-header-bottom-promo');
	jQ('.resp-header-promoMobile img').appendTo('.rd-header-bottom-promo');

	//TODO: ssidebar
	buildMenuPhone();

	/* add selectors */
	if(!headerModel.isLoggedIn) {
		jQ('#resp-welcome-header, #resp-login-header').addClass('rd-header');
		jQ('#resp-welcome-header-top, #resp-login-header-top').addClass('rd-header-top');
	} else {
		jQ('#resp-header-logo').closest('table').addClass('rd-header');
	}
});