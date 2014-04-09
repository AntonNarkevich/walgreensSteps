RD.clientFnManager.set("runCheckout-2", function () {

	(function addClassToInputCoverTable() {
		jQ('#resp-ccinfo-address2').closest('table').addClass('input-cover');
	})();

	function appendInputItemCovers() {
		var $curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-ccinfo-name').appendTo($curr_cover);
		jQ('#resp-ccinfo-cardholdername').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-ccinfo-address1').appendTo($curr_cover);
		jQ('#resp-ccinfo-address1holder').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-ccinfo-address2').appendTo($curr_cover);
		jQ('#resp-ccinfo-address2holder').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-payment-cc-city-label').appendTo($curr_cover);
		jQ('#resp-payment-cc-city').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-payment-cc-state-label').appendTo($curr_cover);
		jQ('#resp-payment-cc-state').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-payment-cc-zip-label').appendTo($curr_cover);
		jQ('#resp-payment-cc-zip').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-ccinfo-cc').appendTo($curr_cover);
		jQ('#resp-ccinfo-ccholder').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item block-elem"></div>');
		jQ('.input-cover>tbody').append($curr_cover);


		jQ('#resp-ccinfo-exp').appendTo($curr_cover);
		jQ('#resp-ccinfo-expholder').appendTo($curr_cover);

		$curr_cover = jQ('<div class="input-item"></div>');
		jQ('.input-cover>tbody').append($curr_cover);

		jQ('#resp-ccinfo-savecc').appendTo($curr_cover);
	}

	var checkInterval = setInterval(function () {
		if(jQ('#resp-ccinfo-address2').length) {
			appendInputItemCovers();
			clearInterval(checkInterval);
		}
	}, 100);

	(function addClearBlock() {
		jQ('.contentMaintd, .orange-header').append('<div class="clear"></div>');
		jQ('a.sprite-CAC.CAC-btn-apply').addClass('rd-button rd-gray-button').html("Apply").parent().append('<div class="clear"></div>');
		jQ('.rtModule-headerText').parent().append('<div class="clear"></div>');
	})();

	(function replacePopup() {
		jQ('#resp-payment-options .checkoutNotification').prependTo(jQ('#creditCardDiv').parent());
	})();

	//Add Event Listener to radio buttons
	var giftCardInterval,
		$giftCardButton = jQ('input[value="giftCard"]');

	function checkGiftCardInput() {
		if(!$giftCardButton.is(':checked')) {
			doRadioButtonToggle();
			clearInterval(giftCardInterval);
		}
	}

	//display estiminate block
	jQ('.smallItalicText').closest('tr').addClass('rd-estiminated-block');

	function doRadioButtonToggle() {
		var $curr_radio_button = null;
		jQ('.orange-header').find('input:radio').each(function () {
			$curr_radio_button = jQ(this);
			if($curr_radio_button.is(':checked')) {
				$curr_radio_button.closest('.orange-header').removeClass('rd-content-hidden');
				jQ(document).scrollTop($curr_radio_button.position().top);

				if($curr_radio_button.attr('value') === "giftCard") {
					giftCardInterval = setInterval(checkGiftCardInput, 100);
				}

			}
			else {
				$curr_radio_button.closest('.orange-header').addClass('rd-content-hidden');
				$curr_radio_button.removeAttr('checked');
			}
		});
	}

	jQ('.orange-header input[type="radio"]').change(doRadioButtonToggle);

	doRadioButtonToggle();

	//Show hidden tables
	jQ('.orange-header').closest('table').css("display", "block");

	(function giftCardPopup() {
		var $tableElements = jQ('#dynGifCardWindow table, #dynGifCardWindow tbody, #dynGifCardWindow thead, #dynGifCardWindow tfoot, #dynGifCardWindow th, #dynGifCardWindow tr, #dynGifCardWindow td');

		RD.supp.helpers.remainTableStyleFor($tableElements);
	})();

	(function securityCodePopup() {
		function addTableClasses() {
			var $tableElements = jQ('#securityCodeLayer table, #securityCodeLayer tbody, #securityCodeLayer thead, #securityCodeLayer tfoot, #securityCodeLayer th, #securityCodeLayer tr, #securityCodeLayer td');

			RD.supp.helpers.remainTableStyleFor($tableElements);
		}

		jQ('#Divprepaidcardserialno1').on('click', '#errPinId1 a', function () {
			//push at the end of call stack
			setTimeout(function () {
				addTableClasses();
			});
		});
	})();

});