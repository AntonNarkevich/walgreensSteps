RD.clientFnManager.set("runCore", function () {
	var testParams = function (objs) {
		if(!objs.each) {
			if(!jQ) {
				console.log("jQuery is not available");
				return false;
			}
			if(objs.nodeType === 1 || objs instanceof window.NodeList) {
				objs = jQ(objs);
				return objs;
			}
			//console.log("Bad arguments were thrown to " + arguments.caller);
			return false;
		} else {
			return objs;
		}

	};
	RD.supp = {
		helpers: {
			/*setInputStyled: function setInputStyled(jQCollection) {
				if(!(jQCollection = testParams(jQCollection))) {
					return;
				}

				jQCollection.each(function (*//*i, elem*//*) {
					var $current = jQ(this);
					if($current.is(":radio") && !$current.hasClass("rd-style-radio")) {
						$current.toggleClass("rd-style-radio");
					}
					if($current.is(":checkbox") && !$current.hasClass("rd-style-checkbox")) {
						$current.toggleClass("rd-style-checkbox");
					}
				});

			},*/
			makeBlueButton: function makeBlueButton(jQCollection) {
				if(!(jQCollection = testParams(jQCollection))) {
					return;
				}
				var l = jQCollection.length;
				while(l) {
					jQCollection.eq(--l).addClass("rd-button rd-blue-button");
				}
			},
			makeGreyButton: function makeGreyButton(jQCollection) {
				if(!(jQCollection = testParams(jQCollection))) {
					return;
				}
				var l = jQCollection.length;
				while(l) {
					jQCollection.eq(--l).addClass("rd-button rd-gray-button");
				}
			},
			styleTextInputs: function styleTextInput(jQCollection) {
				if(!(jQCollection = testParams(jQCollection))) {
					return;
				}
				var l = jQCollection.length;
				while(l) {
					jQCollection.eq(--l).addClass("rd-input rd-text-input");
				}
			},
			wait: function wait(checkCondition, callback, waitingLimit) {
				if(jQ.isFunction(callback) && jQ.isFunction(checkCondition)) {
					RD.logger.log("waiting for some resources", RD.logger.logMsgType.debug);

					var interval = setInterval(function () {
						if(checkCondition()) {
							clearInterval(interval);
							clearTimeout(timeout);
							callback();
						} else {
							RD.logger.log("waiting for some resources", RD.logger.logMsgType.debug);
						}
					}, 300);

					if(waitingLimit) {
						var timeout = setTimeout(function () {
							clearInterval(interval);
							RD.logger.log("waiting limit is reached", RD.logger.logMsgType.error);
						}, waitingLimit);
					}
				}
			},
			reflow: function reflow(timeout) {
				var $reflowContainer = jQ("body");
				var timer = setTimeout(function () {
					$reflowContainer.toggleClass("rd-to-reflow");
					clearTimeout(timer);
				}, timeout);

			},
			remainTableStyleFor: function (jQCollection) {
				if(!(jQCollection = testParams(jQCollection))) {
					return;
				}

				jQCollection.addClass('rd-remain-table-style');
			}
		}
	};


});