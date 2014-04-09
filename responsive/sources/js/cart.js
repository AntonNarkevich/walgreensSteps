RD.clientFnManager.set("runCart", function () {
	//The page con
	(function remainTableStyles() {
		jQ('body').addClass('resp-remain-table-styles');
	})();

	//Have to set them manually
	(function addSelectors() {
		jQ('#resp-cart-header').parent().addClass('resp-content-td')
			.parent().addClass('resp-content-tr');

		jQ('#resp-cart-main-content-left').closest('table').addClass('resp-content-table');

		jQ('#continueShoppingbutton').closest('tr').addClass('resp-buttons-tr');

		jQ('#resp-cart-bottom-content-right').closest('table').addClass('resp-total-table');


		jQ('input[id^="couponcode"]').closest('div').addClass('resp-cupon-div')
			.closest('tr').addClass('resp-cupon-tr')
			.prev('tr').addClass('resp-add-cupon-label');

		jQ('.osmCoupon img').closest('div').addClass('resp-coupon-delete-div');

		(function needHelpSelectors() {
			var $helpOptions = jQ('#resp-cartosm-needhelp>tbody>tr ul'),
				$callHelp = $helpOptions.find('li').filter(function () {
					return jQ(this).html().match(/Call/);
				});

			$helpOptions.closest('tr').addClass('resp-help-options-tr');
			$callHelp.addClass('resp-call-help');
		})();

		jQ('#resp-cart-buttons-bottom').closest('td').addClass('resp-bottom-buttons-td');

		jQ('.credit-item').closest('td').addClass('credit-item-td');
	})();

//	To use common styles from master.css
	(function addClassesToButtons() {
		var $continueButton = jQ('span[id^="continueShoppingbutton"]'),
			$checkoutButton = jQ('span[id^="checkoutbutton"]');


		$continueButton.addClass('rd-button rd-gray-button resp-continue-shopping');
		$continueButton.html('Continue Shopping');

		$checkoutButton.addClass('rd-button rd-blue-button resp-check-button');
		$checkoutButton.html('Proceed to Checkout');
	})();

	(function fixTable() {
		var $descriptions = jQ('.newcart-description');

		$descriptions.after('<td class="resp-width-auto-td">&nbsp;</td>');
	})();

	//We're using floating for the top menu. So blocks should go in the reverse order.
	(function replaceHeadings() {
		var $listHeader = jQ('#newcart-list-header'),
			$price = $listHeader.find('div:nth-child(2)').addClass('resp-price'),
			$quantity = $listHeader.find('div:nth-child(3)').addClass('resp-quantity'),
			$total = $listHeader.find('div:nth-child(4)').addClass('resp-total');

		$listHeader.append($total);
		$listHeader.append($quantity);
		$listHeader.append($price);
	})();

	(function moveEmptyCart() {
		var $emptyCart = jQ('#resp-cart-bottom-content-left>div'),
			$orderSummary = jQ('#resp-cartosm-ordersummary');

		$emptyCart.addClass('resp-empty-cart');

		$orderSummary.before($emptyCart);
	})();

	(function alignAcdProduct() {
		var $acd = jQ('.resp-cart-acd-product'),
			$checkBox = $acd.find('input[type="checkbox"]');

		if (!$checkBox.is(':checked')) {
			$acd.addClass('resp-acd-unchecked');
		}
	})();

	//Fixing ugly script connected with the bottom buttons.
	(function swapButtons() {
		var $bottomButtons = jQ('#resp-cart-buttons-bottom'),
			$whiteButton = $bottomButtons.children('a:not(:first-child)'),
			$blueButtons = $bottomButtons.children().filter(function () {
				return this !== $whiteButton[0];
			});

		$whiteButton.addClass('resp-white-button');
		$blueButtons.addClass('resp-blue-button');

		$bottomButtons.prepend($whiteButton);
	})();

	(function setReflowOnResize() {
		var $orderSummary = jQ('#resp-cartosm-ordersummary .resp-cupon-div');

		jQ(window).resize(function () {
			$orderSummary.css('font-size', '15.01px');
			setTimeout(function () {
				$orderSummary.css('font-size', '15px');
			}, 1);
		});
	})();

	//Have to avoid collspan=2 and append another one td.
	(function fixAcdProduct() {
		var $cartPrice = jQ('.resp-cart-acd-product .cart_price.reprint_cd_list');

		$cartPrice.removeAttr('colspan');
		$cartPrice.before('<td></td>');
	})();

	(function fixDashedLines() {
		var $list = jQ('.newcart-list'),
			$items = $list.find('.newcart-item');

		$items.last().addClass('resp-last-item');
	})();


	//Not all the spacers have classnames. So I have to use this kind of script
	(function removeSpacers() {
		var $images = jQ('.newcart-product-description>table>tbody>tr>td>img:only-child'),
		//Trying to identify spacers.
			$spacerImages = $images.filter(function () {
				return jQ(this).attr('src').match(/spacer/) !== null;
			});

		$spacerImages.closest('td').addClass('resp-spacer');
	})();

//	Dmitry's conde
	(function createCallByPhoneLink() {
		var $node = jQ(".resp-call-help"),
			$nodeClone = $node.clone(),
			$nodeText = $node.text(),
			telephoneNumber = $nodeText.slice($nodeText.indexOf("("));

		$nodeText = $nodeText.slice(0, $nodeText.indexOf("("));
		$node.html($nodeText + "<a class='rd-call-by-phone' href='tel:" + telephoneNumber + "'>" + telephoneNumber + "</a>");

		$node.addClass('resp-mobile-view-number');
		$nodeClone.addClass('resp-tablet-view-number');
		$node.after($nodeClone);
	})();
});