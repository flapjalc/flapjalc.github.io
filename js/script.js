$(document).ready(function(){
	//фиксируем меню сверху
	if ( $(window).scrollTop() >= 148 ) $('.main_menu').addClass("fixed");
	else $('.main_menu').removeClass("fixed");
    $(window).on({
        scroll: function(){
            if ( $(window).scrollTop() >= 148 ) $('.main_menu').addClass("fixed");
            else $('.main_menu').removeClass("fixed");
        }
    });
	//Открытие попап окна fancybox
    $('.popup').fancybox({
        scrolling: 'visible',
		padding: 0, 
		helpers: {overlay: {locked: false}}
    });
	$('.main_slider.flexslider').flexslider({
		animation: "slide",
		directionNav: true,
		prevText: "",
		nextText: "",
		controlNav: false
	});
	$('.apart_slider.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
		prevText: "",
		nextText: "",
		controlNav: "thumbnails"
	});
	//slider новости
	$(function() {
		var jcarousel = $('.jcarousel');
		jcarousel
		.jcarousel({
			wrap: 'null'
		});
		$('.jcarousel-control-prev')
		.jcarouselControl({
			target: '-=1'
		});
		$('.jcarousel-control-next')
		.jcarouselControl({
			target: '+=1'
		});
	});
	//tabs переключатель
	$('.js-tab').click(function (){
		if(!$(this).hasClass('active')){
			var curPar = $(this).parent();
			var curAttr = $(this).attr('tab');
			$(curPar).children('.js-tab').removeClass('active');
			$(this).addClass('active');
			$(curPar).next().children('.js-wrap_tab').removeClass('active').each(function (){
				if($(this).attr('tab') == curAttr) $(this).addClass('active');
			});
		}
	});
	$('.js-tab_out').click(function (){
		var curPar = $('.tab_object .tabs_box');
		var curAttr = $(this).attr('tab');
		$(curPar).children('.js-tab').removeClass('active').each(function (){
			if($(this).attr('tab') == curAttr) $(this).addClass('active');
		});
		$(curPar).next().children('.js-wrap_tab').removeClass('active').each(function (){
			if($(this).attr('tab') == curAttr) $(this).addClass('active');
		});
	});
	//checkbox
	$('.js-inp_chkbx').click(function (){
		$(this).parent().toggleClass('active');
	});
    $('.form_box').click(function(){$('.error').removeClass('error');});
});
