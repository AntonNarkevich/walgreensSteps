RD.clientFnManager.set("runAlbums", function () {
	/***Albums page***/

	var pageStates = {
		albums: 'albums',
		photos: 'photos',
		single: 'single'
	};

	var pageStateManager = {
		currentState: null,

		changeState: function (state) {
			if(state !== this.currentState) {

				inLoopHandler.clearLoops();

//				console.log('State is being changed to: ' + state);

				this.currentState = state;

				var callbacksToCall = this.callbacks[state];

				if(!callbacksToCall) {
					return;
				}

				var length = callbacksToCall.length;

				for(var i = 0; i < length; i += 1) {

//					console.log('Callback number ' + i + ' is being invoked for state ' + state);

					callbacksToCall[i].apply();
				}
			}
		},

		resetState: function () {
			this.currentState = null;
//			console.log('State was RESET');
		},

		identifyState: function identifyState() {
			var $albums = jQ('.dal-albums-grid-view-container'),
				$singlePhoto,
				$photos;

			if($albums.length !== 0 && $albums.hasClass('show')) {
				this.changeState(pageStates.albums);
				return;
			}

			$singlePhoto = jQ('.dal-single-asset-row');

			if($singlePhoto.length !== 0 && !$singlePhoto.hasClass('hide')) {
				this.changeState(pageStates.single);
				return;
			}

			$photos = jQ('.dal-picts-grid-view-container');

			if($photos.length !== 0 && !$photos.hasClass('hide')) {
				this.changeState(pageStates.photos);
				return;
			}
		},

		callbacks: {},

		registerCallback: function (state, func) {
			if(!this.callbacks[state]) {
				this.callbacks[state] = [];
			}

//			console.log('Callback to ' + state + ' is being registered');

			this.callbacks[state].push(func);
		},

		startWatching: function () {

//			console.log('Watching is being started');

			document.TIMER = setInterval(jQ.proxy(this.identifyState, this), 100);
		}
	};

	var inLoopHandler = {
		timers: [],
		clearLoops: function () {
			var length = this.timers.length;

			for(var i = 0; i < length; i++) {
				clearInterval(this.timers[i]);
			}

			this.timers = [];
			this.counter = 0;
		},
		counter: 0,
		logState: function () {
			console.log('In loop in run: ' + this.counter);
		}
	};

	function inLoop(func, condition) {
		inLoopHandler.counter += 1;
		return function () {
			var timer;
			if(condition()) {

//				console.log('inLoop: func is being run without set interval');

				func();
			}
			else {
//			console.log('inLoop set interval started');

				timer = setInterval(function () {
					if(condition()) {

//						console.log('inLoop: function is being invoked after few intervals');

						func();
						clearInterval(timer);
					}
				}, 100);

				inLoopHandler.timers.push(timer);
			}
		};
	}


	function once(func, params) {
		var firstCall = true;
		return function () {
			if(firstCall) {
				func(params);
			}

			firstCall = false;

//			console.log('Once called');
		};
	}

//	function zeroTimeout(func) {
//		return function () {
//			setTimeout(func, 0);
//		};
//	}

	function afterRebuildOf(selector, func) {
		var $blockToDisappear = jQ(selector);

//		if ($blockToDisappear.length === 0) {
//			console.log('afterRebuildOf: block not found. Exiting.');
//		}

		function generateFakeClassName() {
			var date = new Date(),
				time = date.getTime(),
				className = 'resp-disappearing-block-' + time;

			return className;
		}

		var className = generateFakeClassName();

//		console.log('afterRebuildOf: Setting fake class name ' + className);

		$blockToDisappear.addClass(className);

		function blockDisappearedCondition() {
			$blockToDisappear = jQ(selector);

			return !$blockToDisappear.hasClass(className);
		}

//		console.log('afterRebuildOf: started smth in loop');
		inLoop(func, blockDisappearedCondition)();
	}

	function moveSideBar() {
		var $sideBar = jQ(".dal-col-left"),
			$mainContent = jQ(".dal-col-right"),
			//Checking whether the side bar is already moved
			$movedSideBar = $mainContent.next();

		if ($movedSideBar.hasClass('.dal-col-left')) {
			return;
		}

		$mainContent.after($sideBar);

//		console.log('Sidebar was moved');
	}

	function moveSideBarCondition() {
		var $sideBar = jQ(".dal-col-left"),
			$mainContent = jQ(".dal-col-right");

		//TODO: test code
//		console.log('SidebarCondition result: ' + ($sideBar.length !== 0 && $mainContent.length !== 0));

		return ($sideBar.length !== 0 && $mainContent.length !== 0);
	}

	function expandFiltersMenu() {
		var $actionBar = jQ('.action-bar'),
			$button = jQ('.resp-expand-filters-button');

		$actionBar.slideToggle(300);
		$button.toggleClass("resp-albums-view-expanded");

//		console.log('menu expanded');
	}

	function appendAlbumsExpandButton() {
		var $actionBar = jQ('.library-actionbar-main-col .action-bar'),
			$libraryActionBar = $actionBar.parent(),
			$albumsGridView = $libraryActionBar.parent(),
			$expandButton = $albumsGridView.find('.resp-expand-filters-button.albums:visible');

		if($expandButton.length !== 0) {
			return;
		}

		$expandButton = jQ('<button />', {text: 'Filter by'});

		$expandButton.addClass('resp-expand-filters-button albums');
		$expandButton.click(expandFiltersMenu);

		$libraryActionBar.before($expandButton);
//		$actionBar.toggle();

//		console.log('adding albums expand button');
	}

	function appendAlbumsExpandButtonCondition() {
		var $actionBar = jQ('.library-actionbar-main-col:visible .action-bar'),
			$libraryActionBar = $actionBar.parent();

		return $libraryActionBar.length !== 0;
	}


	function appendPhotosExpandButton() {
		var $actionBar = jQ('.actionbar-main-panel .action-bar'),
			$libraryActionBar = $actionBar.parent(),
			$expandButton = jQ('.resp-expand-filters-button.photos:visible');

		if($expandButton.length !== 0) {
			return;
		}

		$expandButton = jQ('<button />', {text: 'Filter by'});

		$expandButton.addClass('resp-expand-filters-button photos');
		$expandButton.click(expandFiltersMenu);

		$libraryActionBar.before($expandButton);
//		$actionBar.toggle();

//		console.log('adding photo expand button');
	}

	function appendPhotosExpandButtonCondition() {
		var $actionBar = jQ('.actionbar-main-panel:visible .action-bar'),
			$libraryActionBar = $actionBar.parent();

		return $libraryActionBar.length !== 0;
	}

	function moveShareButton() {
		var $actionBar = jQ('.library-actionbar-main-col .action-bar'),
			$libraryActionBar = $actionBar.parent(),
			$shareButton = jQ('.resp-share-button:visible');

		if($shareButton.length !== 0) {
			return;
		}

		$shareButton = $libraryActionBar.find('span[id$="shareButton"]');

		$shareButton.addClass('resp-share-button');
		$libraryActionBar.before($shareButton);

//		console.log('moving share button');
	}

	function moveShareButtonCondition() {
		var $actionBar = jQ('.library-actionbar-main-col .action-bar'),
			$libraryActionBar = $actionBar.parent(),
			$shareButton = jQ('span[id$="shareButton"]');

		return $libraryActionBar.length !== 0 && $shareButton.length !== 0;
	}

	function setSideBarEvents() {
		var $sideBar = jQ(".dal-col-left"),
			resetState = jQ.proxy(pageStateManager.resetState, pageStateManager);

		$sideBar.on('touchstart', '.tabs>a:not(.active)', function () {
			if(pageStateManager.currentState === pageStates.albums) {
				afterRebuildOf('.libraryactionbar:visible .action-bar', resetState);
			}
		});

		$sideBar.on('touchstart', '.tab-container h5', function () {
			if(pageStateManager.currentState === pageStates.albums) {
				afterRebuildOf('.libraryactionbar:visible .action-bar', resetState);
			}
		});

		$sideBar.on('touchstart', '.albums-div-node>ul>li>a', function () {
			if(pageStateManager.currentState === pageStates.albums) {
				afterRebuildOf('.libraryactionbar:visible .action-bar', resetState);
			}
		});

		$sideBar.on('touchstart', '.albums-div-node>ul>li>ul a', function () {
			if(pageStateManager.currentState === pageStates.photos) {
				afterRebuildOf('.albumactionbar:visible .action-bar', resetState);
			}
		});
	}

	function setSideBarEventsCondition() {
		var $sideBar = jQ(".dal-col-left");

		return $sideBar.length !== 0;
	}

	function removeEditability() {
		var $albumCaption = jQ('.album-caption'),
			$datePicker = jQ('.album-date'),
			$dateDiv = $datePicker.parent();

		$albumCaption.addClass('photos');

		$albumCaption.removeAttr('onclick');
		$dateDiv.removeAttr('onclick');

//		console.log('Editability has been removed');
	}

	function removeEditabilityCondition() {
		var $albumCaption = jQ('.album-caption'),
			$datePicker = jQ('.album-date'),
			$dateDiv = $datePicker.parent();

		return $albumCaption.length !== 0 && $dateDiv !== 0;
	}

	function moveExpressOrder() {
		var $anchor = jQ('.resp-express-order-a:visible'),
			$expressOrder,
			$countDate;

		if($anchor.length !== 0) {
			return;
		}

		$expressOrder = jQ('.express-order');
		$anchor = $expressOrder.find('a');
		$countDate = jQ('.count-date');

		$anchor.addClass('resp-express-order-a');
		$countDate.after($anchor);

//		console.log('express order moved');
	}

	function moveExpressOrderCondition() {
		var $expressOrder = jQ('.express-order'),
			$anchor = $expressOrder.find('a'),
			$countDate = jQ('.count-date');

		return $expressOrder.length !== 0 && $countDate.length !== 0 && $anchor.length !== 0;
	}

	function appendDimmerForSelectTags() {
		var $body = jQ('body'),
			$popup = $body.find('.filter-tab-main-div'),
			$dimmer = jQ('<div/>');

		function removeDimmer() {
			$body.removeClass('resp-dimmer-appended');
			$body.removeClass('resp-scroll-disabled');
			$popup.mouseout();
			$dimmer.remove();
		}

		$dimmer.on('touchmove', removeDimmer);
		$dimmer.on('click', removeDimmer);

		$body.addClass('resp-dimmer-appended');
		$body.addClass('resp-scroll-disabled');


		$dimmer.addClass('resp-dimmer');
		$popup.before($dimmer);
	}

	function appendSelectTagsButton() {
		var $button,
			$statusLine,
			$statusLineWrapper;

		$button = jQ('.resp-select-tags-button');

		if($button.length !== 0) {
			return;
		}

		$statusLine = jQ('span[id$="statusLine"]');
		$statusLineWrapper = $statusLine.parent();
		$statusLineWrapper.addClass('resp-status-line-wrapper');

		$button = jQ('<button />', {
			text: $statusLine.html(),
			click: function () {
				appendDimmerForSelectTags();
				$statusLineWrapper.click();

				var $aTags = jQ('.facetags-panel-div a, .eventags-panel-div a'),
					length = $aTags.length;


				function aClickHandler($checkBox) {
					return function () {
						var $a = jQ(this);

						$checkBox.prop('checked', $a.hasClass('selected'));
					};
				}


				for(var i = 0; i < length; i += 1) {
					var $checkBox = jQ('<input type="checkbox" class="resp-tag-checkbox">'),
						$a = $aTags.eq(i);

					if($a.hasClass('selected')) {
						$checkBox.prop('checked', true);
					}

					$a.click(aClickHandler($checkBox));

					$a.prepend($checkBox);
				}
			}
		});

		$button.addClass('resp-select-tags-button rd-button rd-gray-button');

		$statusLineWrapper.before($button);

//		console.log('appendSelectTagsButton: executed');
	}

	function appendSelectTagsButtonCondition() {
		var $statusLine = jQ('span[id$="statusLine"]:visible');

		return $statusLine.length !== 0;
	}


	function buildPhotoActionBar() {
		var $actionBar = jQ('.resp-action-bar');
		if($actionBar.length !== 0) {
//			console.log('Extra action bar was tried to be appended');
			return;
		}

		var actionBarTemplate = RD.templates['photoActionBar']();
		$actionBar = jQ(actionBarTemplate);

		var $actionBarMainPanel1 = jQ('.actionbar-main-panel1');

		(function bindClicks() {
			function bindClick(originalSelector, responsiveSelector) {
				var $original = jQ(originalSelector),
					$responsive = $actionBar.find(responsiveSelector);

				$responsive.click(function () {
					var element = $original[0];

					if (element.click) {
						element.click();
					}
					else {
						$original.click();
					}
				});
			}

			bindClick('span:first-child a[id$="selectAllAnchor"]', '.resp-select-all');
			bindClick('span:last-child a[id$="unselectAllAnchor"]', '.resp-unselect-all');
			bindClick('.actionbar-main-panel1 .share-icon', '.resp-share');
		})();



		(function appendEditMenuSelect() {
			var $editMenuUl = jQ('.edit-dv-menu ul'),
			//Removing redundant anchors
				$aTags = $editMenuUl.find('li a:not([id*="rotateIconAnchor"])'),
				length = $aTags.length,
				$respEditSelectedSelect = $actionBar.find('.resp-edit-selected-select');

			for(var i = 0; i < length; i += 1) {
				var $option = jQ('<option></option>'),
					$anchor = $aTags.eq(i);

				$option.html($anchor.text());

				$respEditSelectedSelect.append($option);
			}

			$respEditSelectedSelect.change(function () {
				var selectedIndex = $respEditSelectedSelect.prop("selectedIndex");

				$aTags.eq(selectedIndex).click();

				setTimeout(function () {
					$respEditSelectedSelect.prop("selectedIndex", -1);
				}, 0);

			});
		})();

		$actionBarMainPanel1.before($actionBar);

		(function appendSelect() {
			var $editMenuUl = jQ('.order-prints-content ul'),
			//Removing redundant anchors
				$aTags = $editMenuUl.find('li a'),
				length = $aTags.length,
				$respOrderPrintsSelect = $actionBar.find('.resp-order-prints-select');

			for(var i = 0; i < length; i += 1) {
				var $option = jQ('<option></option>'),
					$anchor = $aTags.eq(i);

				$option.html($anchor.text());

				$respOrderPrintsSelect.append($option);
			}

			$respOrderPrintsSelect.change(function () {
				var selectedIndex = $respOrderPrintsSelect.prop("selectedIndex");

				$aTags.eq(selectedIndex).click();

				setTimeout(function () {
					$respOrderPrintsSelect.prop("selectedIndex", -1);
				}, 0);
			});
		})();

		//Selects should be reset to trigger change for all options.
		(function resetSelectAfterAppending() {
			$actionBar.find('.resp-edit-selected-select').prop("selectedIndex", -1);
			$actionBar.find('.resp-order-prints-select').prop("selectedIndex", -1);
		})();
	}

	function buildPhotoActionBarCondition() {
		var $actionBarMainPanel1 = jQ('.actionbar-main-panel1:visible');

		return $actionBarMainPanel1.length !== 0;
	}

	function setLargeImageSize() {
		(function androidFix() {
			//fix for android events related to setLargeImageSize
			window.SF.DAM.Sofi.util.Event.stopEventPropagation = function (ev) {
				if(ev) {
					if(ev.stopPropagation) {
						ev.stopPropagation();
					} else {
						ev.cancelBubble = true;
					}
				}
			};
		})();

		var $largeSizeAnchor = jQ('.photo-large-size-icon');
		$largeSizeAnchor.click();
	}

	function setLargeImageSizeCondition() {
		var $actionBarMainPanel = jQ('.actionbar-main-panel'),
			$actionBar = $actionBarMainPanel.find('.action-bar');

		return $actionBar.length !== 0;
	}

	(function setStateManaget() {
		var moveSidebarWrapped = inLoop(moveSideBar, moveSideBarCondition),
			appendAlbumsExpandButtonWrapped = inLoop(appendAlbumsExpandButton, appendAlbumsExpandButtonCondition),
			appendPhotosExpandButtonWrapped = inLoop(appendPhotosExpandButton, appendPhotosExpandButtonCondition),
			moveShareButtonWrapped = inLoop(moveShareButton, moveShareButtonCondition),
			setSideBarEventsWrapped = once(inLoop(setSideBarEvents, setSideBarEventsCondition)),
			removeEditabilityWrapped = inLoop(removeEditability, removeEditabilityCondition),
			moveExpressOrderWrapped = inLoop(moveExpressOrder, moveExpressOrderCondition),
			buildPhotoActionBarWrapped = inLoop(buildPhotoActionBar, buildPhotoActionBarCondition),
			appendSelectTagsButtonWrapped = inLoop(appendSelectTagsButton, appendSelectTagsButtonCondition),
			setLargeImageSizeWrapped = inLoop(setLargeImageSize, setLargeImageSizeCondition);

		pageStateManager.registerCallback(pageStates.albums, moveSidebarWrapped);
		pageStateManager.registerCallback(pageStates.albums, appendAlbumsExpandButtonWrapped);
		pageStateManager.registerCallback(pageStates.albums, moveShareButtonWrapped);
		pageStateManager.registerCallback(pageStates.albums, setSideBarEventsWrapped);

		pageStateManager.registerCallback(pageStates.photos, appendPhotosExpandButtonWrapped);
		pageStateManager.registerCallback(pageStates.photos, moveSidebarWrapped);
		pageStateManager.registerCallback(pageStates.photos, setSideBarEventsWrapped);
		pageStateManager.registerCallback(pageStates.photos, removeEditabilityWrapped);
		pageStateManager.registerCallback(pageStates.photos, moveExpressOrderWrapped);
		pageStateManager.registerCallback(pageStates.photos, buildPhotoActionBarWrapped);
		pageStateManager.registerCallback(pageStates.photos, appendSelectTagsButtonWrapped);
		pageStateManager.registerCallback(pageStates.photos, setLargeImageSizeWrapped);

		pageStateManager.startWatching();
	})();
});

//		AJAX Requests descriptions

//		ALBUMS
//	walgreens/fe/resources/%7Bacct.albumListResourceUri%7D?accessLevel=owned
//	Albums description

//	walgreens/fe/resources/%7Bacct%7D
//	Gets user information

//	walgreens/getcartitemcount
//	Not always


//		PHOTOS
//	/albumDetail/
//	walgreens/fe/resources/beapi/website/walgreens_us/acct/10109262010/album/10048722010/albumDetail?getAlbumTags=true&getPicOids=true&sortOrder=default&fromIndex=0&itemCount=48
//	Photos and other details for the album (e.g. tags)

//	/productPrice/
//	walgreens/fe/resources/beapi/website/walgreens_us/cobrand/walgreens/pubDate/1376985095000/productPrice?mrch=1000&retailer=WALGREENS
//	Product price 4*6 etc

//	/promotionListResourceUri/
//	walgreens/fe/resources/%7Bacct.promotionListResourceUri%7D
//	Almost empty


//		Waiting for group

//		RD.ajaxWrapper.waitForGroup([
//			RD.ajaxWrapper.registerCallBack(/albumListResourceUri/, function () {
//			}),
//			RD.ajaxWrapper.registerCallBack(/%7Bacct%7D/, function () {
//			}),
//			RD.ajaxWrapper.registerCallBack(/getcartitemcount/, function () {
//			})
//		], function () {
//			moveSideBar();
//		});
