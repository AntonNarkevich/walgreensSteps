RD.clientFnManager.set("runStorelist", function () {

	var bounds = RD.boundManager.getBounds();
	(function colorButtons() {
		RD.supp.helpers.wait(
			function () {
				if(jQ('span.btn-chooselocation').length) {
					return true;
				} else {
					if(window.parent.__sub_onload) {
						window.parent.__sub_onload();
					} else {
						return false;
					}
				}
			},
			function applyGlobalStylesOnButtons() {
				var $chooseLocationButtons = jQ('span.btn-chooselocation');
				(function () {
					// TODO: remove this function when text will be exported to HTML
					$chooseLocationButtons.each(
						function () {
							jQ(this).text("Choose this location");
							RD.supp.helpers.makeGreyButton(this);
						});
				})();

				modifyLayout();
			},
			15000);
	})();
	function modifyLayout() {
		var $content = jQ('#wgstoreslist').children();
		var l = $content.length;

		var $current;

		var $where, $first, $second, $note, _this;

		for(var i = 0; i < l; i++) {
			if(i % 2 === 0) {
				$current = $content.eq(i)
					.children().eq(0)
					.children().eq(2);
				$where = $current.children().eq(0).find('tbody');
				$first = $current.children().eq(1).addClass('rd-old-store-adress')
					.clone().toggleClass('rd-old-store-adress');
				$second = $current.children().eq(3).addClass('rd-old-store-location')
					.clone().toggleClass('rd-old-store-location');

				_this = $current.parent().children().eq(4).addClass('rd-old-note');
				_this.find('span.storelocator-trianglealert').prepend('<span class="rd-alert-background"></span>');
				$note = _this.clone().toggleClass('rd-old-note rd-note');


				var $firstClone = $first;
				var $secondClone = $second;

				$firstClone = jQ("<tr class='tr-store-adress'>").append($firstClone);
				$secondClone = jQ("<tr class='tr-store-location'>").append($secondClone);

				$where.append($firstClone);
				$where.append($secondClone);
				$where.append($note);

				RD.boundManager.applyFor($firstClone, bounds.phone);
				RD.boundManager.applyFor($secondClone, bounds.phone);

			}
		}
	}

	( function checkoutButtonFix() {
		function fixCheckoutButtonBug() {
			var debugInterval = setInterval( function() {
				if( !jQ('span.rd-button.rd-gray-button').length ) {
					jQ('#wgstoreslist #left>span').addClass("sprite-h btn-chooselocation rd-button rd-gray-button").text("Choose this location");
					modifyLayout();

					clearInterval(debugInterval);
					clearTimeout(debugTimeout);
				}
			}, 100 );

			var debugTimeout = setTimeout( function() { clearInterval(debugInterval); }, 10000 );
		}

		if( jQ('span.rd-button.rd-gray-button').length ) {
			fixCheckoutButtonBug();
		}
		else {
			var searchForElements = setInterval(  function() {
				if(jQ('span.rd-button.rd-gray-button').length) {
					fixCheckoutButtonBug();
					clearInterval(searchForElements);
				}
			}, 100);
		}
	} )();
});