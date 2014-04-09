RD.clientFnManager.set("runDedicatedPrints", function () {
	var bounds = RD.boundManager.getBounds();

	(function addClasses() {
		jQ('form[name="frmDedicatedprintspage"]>table.body-back-image:nth-child(1)>tbody>tr:nth-child(4)>td[align="center"]:nth-child(1)>table:first-child').addClass('dedicatedprintspage-content');
		jQ('table[id*="PRD_TOTAL_PRINT"]').addClass('rd-print-container');
		jQ('[id^="PRD_NAME"]').addClass('rd-print-name');
		jQ('input[id*="reprint_4x6"]').closest('table').addClass('rd-print-sizes');
		jQ('input[id*="qty_poster;11x14"]').closest('table').addClass('rd-poster-sizes');
		jQ('.rd-poster-sizes > tbody > tr:first-child').addClass('rd-poster-label');

		jQ('[id^="MORE_SIZE"]').addClass("more-size-container");
		jQ('[id^="PRD_TOTAL_PRINT"]').find("tbody>tr>td>a").closest("td").addClass("a-cover");
		jQ('[id^="qty_WGUltimateValuePack"]').closest('tr').addClass("rd-qty-ultimate");
		jQ('[id^="qty_poster;24x36"]').closest('td').addClass("rd-qty-24x36");

		jQ('table[id^="PRD_IMG_NAME"]').addClass("prd-table-cover");
		jQ('a[id^="MORE_TEXT"]').addClass("rd-more-sizes-link");
	})();

	/* crazy hack for correct updating total price */
	var originalUpdateTotalPrice = window.updateTotalPrice;
	window.updateTotalPrice = function () {
		originalUpdateTotalPrice();
		jQ('#totalPrice1').text(jQ('#totalPrice1').text());
	};

	(function replacePrintsTotal() {
		var $bottom_button_cover = jQ('<div class="bottom-btn-cover"></div>');
		$bottom_button_cover.appendTo('.dedicatedprintspage-content');
		jQ('div#resp-dedicatedPrints-printsTotal').addClass("dedicated_prints_total").appendTo($bottom_button_cover);

		jQ('td#resp-dedicatedPrints-cancelBottom').closest('table').addClass("dedicatedt_prints_cancel_buttons_cont").appendTo($bottom_button_cover);
		jQ('td#resp-dedicatedPrints-printSummary td#resp-dedicatedPrints-cancelBottom').attr("id", "new_resp-dedicatedPrints-cancelBottom");
	})();

	(function appendTextToLinksAndStyles() {
		jQ('td#resp-dedicatedPrints-topButtons a.sprite-h.btn-addmorephotos').html("Add More Photos").addClass("rd-button rd-gray-button");
		jQ('td#resp-dedicatedPrints-topButtons a.sprite-h.btn-addtocart').html("Add to Cart").addClass("rd-button rd-blue-button");

		jQ('.dedicatedt_prints_cancel_buttons_cont a.sprite-h.btn-addmorephotos').html("Add More Photos").addClass("rd-button rd-gray-button");
		jQ('.dedicatedt_prints_cancel_buttons_cont a.sprite-h.btn-addtocart').html("Add to Cart").addClass("rd-button rd-blue-button");

	})();

	(function addPrintSizesElementTransfer() {
		jQ('#resp-dedicatedPrints-printSizes>table>tbody>tr:nth-child(2)>td span, #resp-dedicatedPrints-printType tbody>tr:first-child>td:nth-child(2)>span').each(function () {
			if (jQ(this).next('input').length) {
				jQ('<span class="transfer"></span>').insertAfter(this);
			}
		});
	})();

	(function reorderSizesFields() {
		jQ('.rd-print-container').each(function () {
			var $printContainer = jQ(this),
				$moreSizesWrapper = jQ('.more-size-container', $printContainer),
				$moreSizes = $moreSizesWrapper.children('table').children('tbody'),
				$qtyWallet = jQ('input[id*="qty_Wallet"]', $printContainer).closest('tr').addClass('rd-qty-wallet');

			$qtyWallet.prependTo($moreSizes);
			jQ('.rd-poster-sizes > tbody > tr', $printContainer).prependTo($moreSizes);
			jQ('.rd-qty-24x36', $printContainer).insertBefore($qtyWallet);
		});
	})();


	var elements = "";
	(function fixElementsHeight() {
		jQ('#resp-dedicatedPrints-printSummaryModule>table>tbody>tr i').closest('td').addClass("height-fix");

		jQ('#resp-dedicatedPrints-note').css("height", "auto");

		elements = '#resp-dedicatedPrints-printType tbody>tr>td:last-child,' +
			'#resp-dedicatedPrints-printSizes,' +
			'#resp-dedicatedPrints-note, #resp-dedicatedPrints-printInfo';

//		jQ(elements).each(function () {
//			var $toggled_elem = jQ(this);
//			$toggled_elem.attr("fixedheight", $toggled_elem.outerHeight());
//
//			var bounds = RD.boundManager.getBounds();
//
//			if(bounds.phone === RD.boundManager.getCurrentBound()) {
//				doToggle($toggled_elem);
//			}
//		});
	})();


	function doToggle($target, open) {
		if (open === undefined) {
			$target.slideToggle(300);
		} else if (open) {
			$target.slideDown(300);
		} else {
			$target.slideUp(300);
		}

		checkChevronButton();
	}

	function checkChevronButton() {
		jQ('#resp-dedicatedPrints-printDetails .toggle-btn').each( function() {
			if (jQ(this).hasClass("active")) { //active
				jQ(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
			}
			else {
				jQ(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
			}
		} );
	}

	(function addToggleBtns() {
		jQ('#resp-dedicatedPrints-pricingModule>div, #resp-dedicatedPrints-printSummaryModule>div').addClass("toggle-btn-cover").append('<span class="toggle-btn"></span>').find('.toggle-btn').click(function () {
			if (jQ(this).hasClass("active")) {
				jQ(this).removeClass("active");
			}
			else {
				jQ(this).addClass("active");
			}

			doToggle(jQ(this).closest('div').next('table'));
		});

		elements = '#resp-dedicatedPrints-printType>table>tbody>tr:first-child>td:first-child,' +
			'#resp-dedicatedPrints-entireOrder>table>tbody>tr:first-child>td:first-child,' +
			'#individualPrintsDiv>table>tbody>tr:first-child>td';

		jQ(elements).addClass("toggle-btn-cover").append('<span class="toggle-btn"></span>');

		var $printTypeToggleContainer = jQ('#resp-dedicatedPrints-printType .toggle-btn-cover + td'),
			$entireOrderToggleContainer = jQ('#resp-dedicatedPrints-printSizes'),
			$individualPrintsToggleContainer = jQ('#resp-dedicatedPrints-note, #resp-dedicatedPrints-printInfo'),
			$toggleHeaders = jQ('#resp-dedicatedPrints-printDetails .toggle-btn');

		/* Choose print finish */
		jQ('#resp-dedicatedPrints-printType .toggle-btn').click(function () {
			$toggleHeaders.not(this).removeClass('active');
			jQ(this).toggleClass("active");

			doToggle($printTypeToggleContainer);
			doToggle($entireOrderToggleContainer, false);
			doToggle($individualPrintsToggleContainer, false);
		});

		/* Entire order */
		jQ('#resp-dedicatedPrints-entireOrder .toggle-btn').click(function () {
			$toggleHeaders.not(this).removeClass('active');
			jQ(this).toggleClass("active");

			doToggle($entireOrderToggleContainer);
			doToggle($printTypeToggleContainer, false);
			doToggle($individualPrintsToggleContainer, false);
		});

		/* Individual Prints and Enlargements */
		jQ('#individualPrintsDiv .toggle-btn').click(function () {
			$toggleHeaders.not(this).removeClass('active');
			jQ(this).toggleClass("active");

			doToggle($individualPrintsToggleContainer);
			doToggle($printTypeToggleContainer, false);
			doToggle($entireOrderToggleContainer, false);
		});

		if (RD.boundManager.getCurrentBound() === bounds.phone) {
			jQ('#resp-dedicatedPrints-printType .toggle-btn').click();
		}

		checkChevronButton();

		jQ('.more-size-container').css('display', 'none');
	})();

	(function findAllIndividualPrintsDivDescription() {

		elements = '#resp-dedicatedPrints-printType>table>tbody>tr:nth-child(2),' +
			'#resp-dedicatedPrints-entireOrder>table>tbody>tr:nth-child(2),' +
			'#individualPrintsDiv>table>tbody>tr:nth-child(2)';

		jQ(elements).addClass("individual-prints-div-desc-cover");

	})();

	RD.eventManager.on('boundChange', function (obj) {
		if (obj.curBound === bounds.phone) {
			elements = '#resp-dedicatedPrints-printSummaryModule>table, #resp-dedicatedPrints-pricingModule>table,' +
				'#resp-dedicatedPrints-printType tbody>tr>td:last-child,' +
				'#resp-dedicatedPrints-entireOrder>table>tbody>tr:last-child, #resp-dedicatedPrints-printSizes,' +
				'#resp-dedicatedPrints-note, #resp-dedicatedPrints-printInfo,' +
				'[id^="MORE_SIZE"]';
			jQ(elements).each(function () {
				jQ(this).addClass("toggled").css("display", "none");
			});
			jQ('a[id^="MORE_TEXT"]').text("More Sizes");

			jQ('.toggle-btn.active').removeClass("active");

			(function openChoosePrintFinishByDefault() {
				//Only if it's not expanded
				var $button = jQ('#resp-dedicatedPrints-printType .toggle-btn:visible:not(.active)');

				$button.click();
			})();
		}
		else if (obj.curBound === bounds.tablet) {
			elements = '#resp-dedicatedPrints-printSummaryModule>table, #resp-dedicatedPrints-pricingModule>table,' +
				'#resp-dedicatedPrints-printType tbody>tr>td:last-child,' +
				'#resp-dedicatedPrints-entireOrder>table>tbody>tr:last-child, #resp-dedicatedPrints-printSizes,' +
				'#resp-dedicatedPrints-note, #resp-dedicatedPrints-printInfo';
			//jQ(elements).addClass("toggled");
			jQ(elements).each(function () {
				//doToggle(jQ(this));
				jQ(this).css("display", "block");
			});
		}
	});

	var $td_element = null;
	(function killEmptyBlocks() {
		jQ('[id^="PRD_TOTAL_PRINT"]').find('td').each(function () {
			$td_element = jQ(this);
			if (!$td_element.html()) {
				$td_element.addClass("hide");
			}
		});
	})();


	(function moreSizeFix() {
		jQ('.more-size-container+div a').closest("div").append('<div class="more-size-border-bottom-line"></div>');
	})();

	(function changeMoreSizeText() {
		function changeText(linkEl) {
			if (linkEl.innerHTML === 'Fewer Sizes') {
				linkEl.innerHTML = 'Less Sizes';
			}
		}

		var $links = jQ('.rd-more-sizes-link');

		$links.each(function () {
			changeText(this);
		});

		$links.on('click', function () {
			var that = this;
			setTimeout(function () {
				changeText(that);
			});
		});
	})();
});