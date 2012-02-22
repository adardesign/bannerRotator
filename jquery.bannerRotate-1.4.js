// bannerRotate, Version 1.4
// Copyright (c) Oct 3, 2010 adardesign.com
// bannerRotate is freely distributable under the terms of an MIT-style license
// This means you are free to use the code, but please leave this copyright notice intact
// Added relToSrc performance....
(function ($) {
	$.fn.bannerRotate = function (opt) {
		var defaults = {
			speed: 500,
			secSpeed: 500,
			interval: 4000,
			shouldHoverSwitch: false,
			builedNav: function (a) {
				var i = 0,
					container = $("<div class='controlsContainer'>").hide(),
					navElements = "";
				for (i = 0; i < a; i++) {
					navElements += "<a href='#'>";
				}
				container.html(navElements);
				return container;
			},
			stopAnimation: function (b) {
				b.stop(true, true);
			},
			stopInterval: function (interv) {
				if (!interv) {
					return;
				}
				window.clearInterval(interv);
			},
			stopTimeout: function (timeOut) {
				if (!timeOut) {
					return;
				}
				window.clearTimeout(timeOut);
			},
			addHoverUsability: {
				active: true,
				getMiliseconds: function () {
					return new Date().getTime();
				},
				timeLapsed: function (initTime) {
					var timeNow = this.getMiliseconds();
					return timeNow - initTime;
				}
			}
		},
			options = $.extend(defaults, opt);
		return this.each(function (i, el) {
			// EB added Dec 22 2010, in case of 1 banner only
			if ($(this).children().length > 1) {
				var bannerContainer = $(el),
					banners = bannerContainer.children(),
					bannersLength = banners.length,
                    relToSrced,
					relToSrc = function (init) {
						if (relToSrced) {
							return false;
						}
						var rel,
							img,
							innerRelToSrc = function(collection){
								collection.each(function(){
									var jThis = $(this);
										if(jThis.is("a")){
											rel = jThis.attr("rel") 
											rel && jThis.css("background-image", rel)	
										}else{
											// if its a img itself
											if(jThis.is("img")){
												img = jThis;
											}else{
												img = jThis.find("img");
											}
											rel =  img.attr("rel");
											rel && img.attr("src", rel)	
										}
								})
						}
						if(init){
							innerRelToSrc(banners.eq(0))
							return	
						}else{
							innerRelToSrc(banners.slice(1))
							relToSrced = true;
	
						}
						
					},
					sourceFirst = relToSrc(true),
					bannerNav = bannerContainer.append((options.builedNav(bannersLength).fadeIn(options.secSpeed))).find(".controlsContainer a"),
					next = 1,
					last = 0,
					indexOfClicked,
					updateValues = function (clicked) {
						if (clicked) {
							last = indexOfClicked;
							next = (last + 1) % bannersLength;
						} else {
							last = next;
							next = (next + 1) % bannersLength;
						}
					},
					initTime = 0,
					fadeIntervalID, newSchedFadeInterval, newSschedcallDoFade, fadeTimeout,
					fadeInterval = function () {
						if (options.addHoverUsability.active) {
							do{
								initTime = options.addHoverUsability.getMiliseconds();
							} while (0);
						}
						banners.eq(next).fadeIn(options.speed);
						banners.eq(last).fadeOut(options.speed);
						bannerNav.eq(last).removeClass("active");
						bannerNav.eq(next).addClass("active");
						updateValues();
					},
					schedFadeInterval = function () {
						fadeIntervalID = setInterval(fadeInterval, options.interval);
					};

					// prevents children elements to trigger mouseout from rotating banner
					//TODO: figure out why jQuery 1.4.3 doesnt respond when false passed in as the callback
					banners.children().bind("mouseover", function (e) {
						e.preventDefault();
					});
				bannerContainer.hover(function () {
					options.stopInterval(fadeIntervalID);
					options.stopAnimation(banners);
				}, function () {
					if (options.addHoverUsability.active) {
						if (newSchedFadeInterval) {
							options.stopTimeout(newSchedFadeInterval);
							options.stopTimeout(newSschedcallDoFade);
						}
						var timeLapsed = options.addHoverUsability.timeLapsed(initTime);
						if (timeLapsed >= options.interval) {
							schedFadeInterval();
							fadeInterval();
						} else {
							newSchedFadeInterval = setTimeout(fadeInterval, options.interval - timeLapsed);
							newSschedcallDoFade = setTimeout(schedFadeInterval, (options.interval - timeLapsed) + options.speed);
						}
					} else {
						schedFadeInterval();
					}
				})
				// delegate (to boost performance)
				.find(".controlsContainer").delegate("a", "click", function () {
					!relToSrced && relToSrc(false);
					var clickedNav = $(this);
					if (clickedNav.hasClass("active")) {
						return false;
					};
					clickedNav.siblings().removeClass("active");
					clickedNav.addClass("active");
					indexOfClicked = bannerNav.index(clickedNav);
					banners.eq(last).fadeOut(options.secSpeed);
					banners.eq(indexOfClicked).fadeIn(options.secSpeed, function () {
						banners.eq(indexOfClicked).css("opacity", 1);
					});
					if (options.addHoverUsability.active) {
						initTime = options.addHoverUsability.getMiliseconds();
					}
					updateValues(true);
					return false;
				}).delegate("a", "mouseover", function () {
					if (options.shouldHoverSwitch) {
						$(this).click();
					}
				});
			}

			// init things to do
			bannerNav.eq(0).addClass("active");
			banners.not(":eq(0)").hide();
			schedFadeInterval();
                         setTimeout(function(){relToSrc()}, options.interval / 2);
			if (options.addHoverUsability.active) {
				do {
					initTime = options.addHoverUsability.getMiliseconds();
				} while (0);
			}
		});
	};
})(jQuery);