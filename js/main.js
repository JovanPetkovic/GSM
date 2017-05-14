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

	var textlist = {
		cacheDom: function() {
			this.$textlist = $('.tekstovi');
			this.$li = this.$textlist.find('li');
			console.log(this.$textlist);
		},

		switchText: function(numOfText,speed){
			var num = (numOfText+1)%this.$li.length;
			if(!num)
				num=this.$li.length;
			var $text1 = this.$textlist.find('.text'+numOfText);
			var $text2 = this.$textlist.find('.text'+num);

			$text1.fadeOut(speed, function(){
				$text1.addClass('hidden');
				$text2.fadeIn(speed, function(){
					$text2.removeClass('hidden');
				})
			});
		}
	}

	textlist.cacheDom();

	function startSlider() {
		interval = setInterval(function(){
			$slideContainer.animate({'margin-left': '-='+width}
				,animationSpeed, function() {
					if(++currentSlide === $slides.length){
						currentSlide = 1;
						$slideContainer.css('margin-left', 0);
					}
				});
			textlist.switchText(currentSlide,animationSpeed/2);
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
