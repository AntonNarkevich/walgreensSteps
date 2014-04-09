RD.clientFnManager.set("runNotResponsiveTemplates", function () {
	(function manageScaling() {
		function updateScaling($target) {
			if($target.length) {

				$target.addClass('width-auto');

				$target.css({
					'-webkit-transform': 'scale(1)',
					'-webkit-transform-origin': '0 0'
				});

				var windowWidth = jQ(window).width() < 850 ? jQ(window).width() : 850,
					contentWidth = $target.outerWidth(),
					scaleIndex = windowWidth / contentWidth;

				if(scaleIndex < 1) {
					$target.css({
						'-webkit-transform': 'scale(' + scaleIndex + ')',
						'-webkit-transform-origin': '0 0',
						'overflow-x': 'hidden'
					});
				}
				else {
					$target.css({
						'-webkit-transform': 'scale(1)',
						'-webkit-transform-origin': '0 0',
						'overflow-x': 'hidden'
					});
				}

				$target.removeClass('width-auto');
			}
		}

		var $scaleTarget = jQ('.rd-body-content > table');

		jQ(window).resize(function () {
			updateScaling($scaleTarget);
		});

		window.addEventListener("orientationchange", function () {
			updateScaling($scaleTarget);
		});

		updateScaling($scaleTarget);
	})();
});
