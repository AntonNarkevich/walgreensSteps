RD.clientFnManager.set("runUpload", function () {
	jQ('html').addClass('rd-htmlupload');

	(function keepTableStyleForDatePopup() {
		function addClasses() {
			var $tableElements = jQ('table, tbody, thead, tfoot, th, tr, td', '.yui-panel-container');

			RD.supp.helpers.remainTableStyleFor($tableElements);
		}

		jQ('#datePickerImg').on('click', addClasses);
	})();

	(function styleButtons() {
		var $uploadBtn = jQ('.resp-htmlupload-uploadimg');

		$uploadBtn.attr('type', 'submit').val('Upload Photos');

		RD.supp.helpers.makeBlueButton($uploadBtn);
	})();

	(function copyrightLinkFix() {
		jQ('.resp-htmlupload-copyright a').attr({
			href: '/walgreens/storepage/storePageId=Copyright+Policy/',
			target: '_blank'
		});
	})();

	(function setInputStyleToDescription() {
		var $textArea = jQ('#albumDesc');

		RD.supp.helpers.styleTextInputs($textArea);
	})();

	(function styleUploadButtons() {
		var $buttons = jQ('input[type="file"]');

		$buttons.wrap('<span class="rd-input-file-wrapper">');
		$buttons.closest('.rd-input-file-wrapper').after('<span class="rd-file-name">');

		RD.supp.helpers.makeGreyButton(jQ('.rd-input-file-wrapper'));

		$buttons.on('change', function () {
			var $fileNameContainer = jQ(this).closest('.rd-input-file-wrapper').siblings('.rd-file-name'),
				fileName = this.files[0].name;

			$fileNameContainer.text(fileName);
		});
	})();
});