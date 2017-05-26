'use strict'

$(function() {

	var width = 1100;
	var animationSpeed = 3000;
	var pause = 5000;
	var currentSlide = 1;

	var $slider = $('#slider');
	var $slideContainer = $('.slides', $slider)
	var $slides = $('.slide', $slider);
	var $vesti = $('.vesti');
	var interval;
	var $menuBtn = $('#menu');
	var menu = {
		init: function(){
			this.cacheDom();
			this.showMenu();
			this.hideMenu();
		},

		cacheDom: function(){
			this.$menuButton = $('#menu');
			this.$menu = $('.menuslide');
			this.$exitButton = this.$menu.find('#exit');
		},

		showMenu: function(){
			var $page = $('#initialpage');
			var menus = this.$menu;
			var btn = this.$menuButton;
			var ebtn = this.$exitButton;
			this.$menuButton.on('click', slideMenu);
			function slideMenu(){
				btn.prop('disabled', true);
				menus.animate({'margin-left': '+=' +1500},1000,function(){$page.hide();});
				ebtn.prop('disabled', false);
			}
		},

		hideMenu: function() {
			var $page = $('#initialpage');
			var menus = this.$menu;
			var btn = this.$menuButton;
			var ebtn = this.$exitButton;
			this.$exitButton.on('click', slideMenu1);

			function slideMenu1(){
				$page.show();
				ebtn.prop('disabled', true);
				menus.animate({'margin-left': '+=' +(-1500)},1000,function(){});
				btn.prop('disabled', false);
			}
		},
	}

	menu.init();

	function startSlider() {
		interval = setInterval(function(){
			$slideContainer.animate({'margin-left': '-='+width}
				,animationSpeed, function() {
					if(++currentSlide === $slides.length){
						currentSlide = 1;
						$slideContainer.css('margin-left', 0);
					}
				});
			var nextSlide= (currentSlide + 1)%4;
			if (!nextSlide){
				nextSlide=4;
			}
			$slider.find('#slide' + currentSlide).fadeOut(animationSpeed/2,function(){
				$slider.find('#slide' + nextSlide).fadeIn(animationSpeed/2);
			});
			
		}, pause);
	}
	
	function pauseSlider() {
		clearInterval(interval);
	}
	$vesti
		.on('mouseenter', function() {
			pauseSlider();
		})
		.on('mouseleave', function(){
			startSlider();
		});

	startSlider();
});
