RD.clientFnManager.set("runCheckout-3", function () {

	(function addClearBlock() {
		jQ('#resp-review-pageTitle, #resp-review-buttonsTop').append('<div class="clear"></div>');
		jQ('#resp-review-bottom').append('<div class="clear"></div>');
		jQ('#resp-review-paymentInfo, tr[class*="-tax"], tr[class*="-shipping"], tr[class*="-total"]').after('<div class="clear"></div>');

		jQ('.resp-review-gft-shipping, .resp-review-gft-tax, .resp-review-gft-total, #resp-review-bottom, #resp-review-phoneEdit').after('<div class="clear"></div>');

		jQ('#pleasewaitText').before('<div class="clear"></div>');
	})();

	//Add class to orange button
	jQ('#buynowButton, #buynowButton1, #buynowButtonError, #buynowButtonError1').addClass('rd-button rd-orange-button').html('SUBMIT ORDER');

	//Add class to friends phone link parent
	jQ('#resp-review-pickupInfo>td>table:nth-of-type(3) td>a').parent().addClass('resp-friends-phone-link-cover');

	//Add class to Have a Coupon block
	jQ('a[href*="#applycoupon"]').closest('tr').addClass('resp-have-coupon-block');

	//Append orange buttons to one container
	var $orange_button_cover = jQ('#buynowButton').parent();
	jQ('#buynowButtonError').appendTo($orange_button_cover);

	$orange_button_cover = jQ('#buynowButton1').parent();
	jQ('#buynowButtonError1').appendTo($orange_button_cover);

	//Add transfer blocks
	jQ('#resp-pickup-time>br').after('<div class="transfer-block"></div>');

	(function splitPickupInformationIntoBlocks() {
		jQ('#resp-review-pickupOverview>tbody>tr:first-child').addClass('pickup-day-block');
		jQ('#resp-pickup-time').appendTo('.pickup-day-block');

		jQ('#resp-review-pickupOverview>tbody>tr:nth-child(2)').addClass('pickup-store-block');
		jQ('#resp-pickup-store').prependTo('.pickup-store-block');
		jQ('#resp-pickup-hours').appendTo('.pickup-store-block');

		jQ('#resp-review-pickupOverview>tbody>tr:nth-child(3)').addClass('pickup-payment-block');
		jQ('#resp-pickup-payment').appendTo('.pickup-payment-block');
	})();

	//replace Your print description block
	jQ('#resp-review-orderMsg').prependTo('#resp-review-osm');

	//Replace Pickup table blocks ----------------------------------------------

	//Replace wrong link

	var $link_cover = jQ('.resp-review-rep-total');
	$link_cover.find('a').parent().appendTo( $link_cover.closest('table').find('td[class*="-img"]+td') );

	function stylizeCheckoutInformation($information_item) {
		$information_item.children().each( function() {
			var $curr_elem = jQ(this);
			if( $curr_elem.attr("class") || $curr_elem.children().children().length ) {
				//Header
				var $curr_elem_header;
				if( $curr_elem.attr("class") && $curr_elem.attr("class").indexOf("-productcell")+1 ) {
					$curr_elem_header = $curr_elem.parent();
					$curr_elem = $curr_elem.closest('table').parent();
				}
				else {
					$curr_elem_header = $curr_elem.find('table[class*="header"]');
				}


				if( $curr_elem_header.length ) {
					$curr_elem_header.addClass("rd-information-header");
					$curr_elem_header.find('td[class*="-productcell"]').after('<div class="right-table-cover"></div>');
					$curr_elem_header.find('.price-cell, .qty-cell, .total-cell').appendTo($curr_elem_header.find('.right-table-cover'));
				}

				//Total
			}
			else {
				$curr_elem.addClass("rd-hidden-block");
			}

		});
	}

	( function stylizeContent() {
		//Content
		jQ('td[class*="-img"]+td>table>tbody').addClass("rd-review-cover").each( function() {
			var $curr_elem_content = jQ(this);
			$curr_elem_content.find('tr').each( function() {
				var $curr_elem_description = jQ( this );
				if( $curr_elem_description.attr("class") ) {
					$curr_elem_description.addClass("rd-content-description-item");

					if( $curr_elem_description.find('td[class*="-cell"]').length ) {
						$curr_elem_description.append('<div class="right-table-cover"></div>');
						$curr_elem_description.find('.price-cell, .qty-cell, .total-cell').appendTo($curr_elem_description.find('.right-table-cover'));
					}
				}
				else {
					$curr_elem_description.addClass("rd-hidden-block");
				}
			} );
		} );
	} )();

	( function findCheckoutInformationBlocks() {
		jQ('#resp-review-shipProductsList>td>table>tbody>tr>td>table>tbody, ' +
			'#resp-review-pickupProductsList>td>table>tbody>tr>td>table>tbody').each( function() {
			var $curr_table = jQ(this);
			$curr_table.children().each( function() {
				var $curr_elem = jQ(this);
				if( $curr_elem.attr("class") || $curr_elem.children().children().length ) {
					$curr_elem.addClass("rd-checkout-information-item");
					stylizeCheckoutInformation($curr_elem);
				}
				else {
					$curr_elem.addClass("rd-hidden-block");
				}
			} );
		} );
	} )();

	//END ----------------------------------------------------------------------

});
