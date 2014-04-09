RD.clientFnManager.set("runOrderPrints", function () {
	//LeftNavigation
//	var $leftnav = jQ('.leftnav .dijitTreeContainer');

	//DropDown
	var $dropdown_container = jQ('<div id="dropdown-container"><select id="dropdown-album"></select><select id="dropdown-album-year"></select></div>');
	var $order_prints_container = jQ('div#resp-reprintPhotoSelector-upload-albums+div');
	$order_prints_container.prepend($dropdown_container);

	//DropDown Albums
	var $album_span = [];

	var target_id;

	function formatToId(text) {
		var res = text.replace('\'', "").trim();
		res = res.replace(' ', "-");
		return res;
	}

	function albumCallback() {
		target_id = jQ('#dropdown-album').val();
		if(target_id) {
			target_id = formatToId(target_id);

			var $target_elem = document.getElementById(target_id);
			var event = document.createEvent('HTMLEvents');
			event.initEvent('click', true, true);
			$target_elem.dispatchEvent(event);

			getYears();
		}

	}

	//Dropdown album items
	function getYears() {
		var $target_parent = jQ("#" + target_id);
		if($target_parent) {
			$target_parent = $target_parent.closest('div');
			jQ('#dropdown-album-year').html("");

			jQ($target_parent).find('span[dojoattachpoint="labelNode"].dijitTreeContent.digitTreeYearNode').each(function () {
				var text = jQ(this).text();
				jQ('#dropdown-album-year').append('<option>' + text + '</option>');
				jQ(this).attr("id", target_id + "-" + formatToId(text));
			});
		}
	}

	function itemCallback() {
		var val = jQ('#dropdown-album-year').val();
		val = target_id + "-" + formatToId(val);
		var $target_elem = document.getElementById(val);
		var event = document.createEvent('HTMLEvents');
		event.initEvent('click', true, true);
		$target_elem.dispatchEvent(event);

	}

	//Wait for ajax
	function isIndexOfFacebook(val) {
		return val.indexOf("Facebook") + 1;
	}

	function populateFirstdropDown() {
		jQ('.dijitTreeNode.dijitTreeExpandLeaf.dijitTreeChildrenNo.dijitTreeIsRoot span[role="treeitem"]:nth-child(2)').each(function () {
			var $span = jQ(this),
				text = $span.text();

			if(text && !isIndexOfFacebook(text)) {
				if(!$album_span[formatToId(text)]) {
					$span.attr("id", formatToId(text));
					$album_span[formatToId(text)] = true;

					var $elem = document.createElement('option');
					jQ($elem).text(text);

					jQ('#dropdown-album').append($elem);
				}
			}
		});

		albumCallback();
		jQ('#destContainer div:first').html("Selected Photos");
	}

	jQ('#dropdown-album').change(albumCallback);
	jQ('#dropdown-album-year').change(itemCallback);

	var dropdown;

	dropdown = setInterval(function () {
		if(jQ('.dijitTreeNode.dijitTreeExpandLeaf.dijitTreeChildrenNo.dijitTreeIsRoot span[role="treeitem"]:nth-child(2)').length) {
			populateFirstdropDown();
			clearInterval(dropdown);
		}
	}, 100);

	//Popup "No thanks" button click
	var popoup_finder_interval;
	function clickPopupButton() {
		var $popoup_button = jQ('#collageitupsellmugframe').contents().find('img[alt*="No thanks"]').closest('a').attr('id', 'rd-no-thanks-button');
		if( $popoup_button.length ) {
			var iFrame = document.getElementById("collageitupsellmugframe");
			var iFrameDocument = iFrame.contentDocument || iFrame.contentWindow.document;

			$popoup_button = iFrameDocument.getElementById("rd-no-thanks-button");

			var event = document.createEvent('HTMLEvents');
			event.initEvent('click', true, true);
			$popoup_button.dispatchEvent(event);

			clearInterval(popoup_finder_interval);
		}
	}
	popoup_finder_interval = setInterval( clickPopupButton, 100);
	//END ----------------------------------------------------------------

	//Order Prints header
	jQ('#resp-reprintPhotoSelector-orderPrints').html('Order prints');
	jQ('#resp-reprintPhotoSelector-chooseTop a').append('<span class="rd-button rd-blue-button">Choose Sizes and Quantities</span>');
	jQ('#resp-reprintPhotoSelector-chooseBottom a').append('<span  class="rd-button rd-blue-button">Choose Sizes and Quantities</span>');

	/* remove all link */
	jQ('body').on('click', '[dojoattachpoint="removeAllNode"]', function () {
		jQ(window).scrollTop(0);
	});
});