//© ООО Сео-Гранд seo-grand.ru
(function ($) {
    'use strict';
    $(function () {
        var $counter = $('.b-counter');
        if ($counter.length) {
            $.each($counter, function () {
                var counter = new CounterClock($(this));
                counter.init();
            });
        }

    });

    var lastVisit = $.cookie('last-visit'),
        today = new Date().getDay();

    function CounterClock($el) {
        this.$el = $el;
        this.counter = 'counter_' + $el.data('counter');
        this.period = $el.data('period') * 1000 * 60;
        this.start = $el.data('start');
    }

    CounterClock.prototype = {
        constructor: CounterClock,
        init: function () {
            this.playCounter();
        },
        playCounter: function () {
            var self = this,
                startAmount = this.getStartNumber(),
                $clock = this.$el.FlipClock(startAmount, {
                    clockFace: 'Counter'
                });

            setTimeout(function () {
                setInterval(function () {
                    $clock.decrement();
                    $.cookie(self.counter, $clock.getTime().time, {path: '/'});
                }, self.period);
            });
        },
        getStartNumber: function () {
            /*Показываем раз в день*/
            //console.log(lastVisit);
            //console.log(today);
            if (lastVisit && (lastVisit == today)) {
                return $.cookie(this.counter);
            } else {
                $.cookie('last-visit', today, {path: '/'});
                $.cookie(this.counter, this.start, {path: '/'});
            }
            return this.start;
        }
    }

})(jQuery);

(function ($) {
    'use strict';
    $(function () {
        var $derevo = $('.b-derevo');
        if (!$derevo.length) {
            return false;
        }
        var $rama_result = $derevo.find('.b-derevo__cants').find('.b-derevo__cant'),
            $ru4ka_result = $derevo.find('.b-derevo__result__ru4ki').find('.b-derevo__result__ru4ka'),
            $footer_rama = $derevo.find('.b-derevo__calc__text').find('.js-derevo-rama-text'),
            $footer_ru4ka = $derevo.find('.b-derevo__calc__text').find('.js-derevo-ru4ka-text');


        var $rama_color = $derevo.find('.b-derevo__okna'),
            $input_rama = $derevo.find('.input-okno');
        $rama_color.on('click', '.b-derevo__okna__option', function (e) {
            var $this = $(e.currentTarget);
            $this.addClass('active').siblings().removeClass('active');
            var myRama_id = $this.data('id'),
                myRama_text = $this.data('text');
            var $myRama = $rama_result.filter('.js-cant-' + myRama_id);
            $myRama.addClass('active').siblings().removeClass('active');
            $footer_rama.html(myRama_text);
            $input_rama.val(myRama_text);
        });

        var $ru4ka_color = $derevo.find('.b-derevo__ru4ki'),
            $input_ru4ka = $derevo.find('.input-ru4ka');
        $ru4ka_color.on('click', '.b-derevo__ru4ki__option', function (e) {
            var $this = $(e.currentTarget);
            $this.addClass('active').siblings().removeClass('active');
            var myRu4ka_id = $this.data('id'),
                myRu4ka_text = $this.data('text');
            var $myRu4ka = $ru4ka_result.filter('.js-ru4ka-' + myRu4ka_id);
            $myRu4ka.addClass('active').siblings().removeClass('active');
            $footer_ru4ka.html(myRu4ka_text);
            $input_ru4ka.val(myRu4ka_text);
        });

        //init
        $rama_color.find('.b-derevo__okna__option.active').trigger('click');
        $ru4ka_color.find('.b-derevo__ru4ki__option.active').trigger('click');


    });
})(jQuery);

window.$win = $(window);

(function ($) {
    var $fixPanel = $('.b-fly');
    if (!$fixPanel.length) {
        return false;
    }

    $win.load(function () {
        var fixPanel = new FixedPanel($fixPanel);
        fixPanel.init();
    });

    function FixedPanel($el) {
        this.$el = $el;
        this.height = $el.outerHeight();
    }

    FixedPanel.prototype = {
        constructor: FixedPanel,
        init: function () {
            this.getCheckPoints();
            this.bindEvents();
        },
        getCheckPoints: function () {
            this.topPoint = 900;
            this.bottomPoint = $('.footer').position().top - 1500;
        },
        bindEvents: function () {
            $win.scroll($.proxy(function () {
                var curPoint = $win.scrollTop();
                this.bottomPoint = $('.footer').position().top - 1500;//fix баги
                if (this.bottomPoint > curPoint && curPoint > this.topPoint) {
                    this.showPanel();
                } else {
                    this.hidePanel();
                }
            }, this))
        },
        showPanel: function () {
            this.$el.css('right', 0);
        },
        hidePanel: function () {
            this.$el.css('right', -this.height);
        }
    }
})(jQuery);
(function ($) {
    'use strict';
    $(function () {
        var $osteklenie = $('.b-osteklenie');

        function Changer($el) {
            this.$el = $el;
            this.$pics = $el.find('.b-osteklenie__otdelka__pic');
            this.$opts = $el.find('.b-osteklenie__options');
        }

        Changer.prototype = {
            constructor: Changer,
            init: function () {
                this.bindEvents();
                this.defaultActions();
            },
            bindEvents: function () {
                var self = this;
                this.$opts.on('click', '.b-osteklenie__option', function (e) {
                    var $this = $(e.currentTarget),
                        myBlockName = '.pic-ot-' + $this.data('id'),
                        $myBlock = self.$pics.filter(myBlockName);

                    $this.addClass('active').siblings().removeClass('active');
                    $myBlock.addClass('active').siblings().removeClass('active');
                })
            },
            defaultActions: function () {
                this.$opts.find('.b-osteklenie__option').filter('.active').trigger('click');
            }
        };

        if ($osteklenie.length) {
            var $btns = $osteklenie.find('.b-osteklenie__btn'),
                $bxSlider = $osteklenie.find('.b-osteklenie__slider');

            $bxSlider.bxSlider({
                pager: false,
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                onSlideAfter: function ($slide) {
                    $btns.filter("#" + $slide.data('btn')).addClass('active').siblings().removeClass('active');
                }
            });

            $btns.on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $bxSlider.goToSlide($this.data('slide') - 1);
                }
            });

            var $sliderItems = $bxSlider.find('.b-slider__item');

            $.each($sliderItems, function () {
                var $this = $(this),
                    changer = new Changer($this);

                changer.init();
            });


        }


    })
})(jQuery);


(function ($) {
    'use strict';
    $(function () {
        var $otdelka = $('.b-otdelka');
        if ($otdelka.length) {
            var $pic_blocks = $otdelka.find('.b-otdelka__pic');
            $otdelka.on('click', '.b-otdelka__item', function (e) {
                var $this = $(e.currentTarget);
                $this.addClass('active').siblings().removeClass('active');
                var myBlock_name = $this.data('pic'),
                    $myBlock = $pic_blocks.filter('#' + myBlock_name);
                $myBlock.siblings().hide().removeClass('active');
                $myBlock.fadeIn(300, function () {
                    $myBlock.addClass('active');
                });

            });

            //init
            $otdelka.find('.b-otdelka__item').trigger('click');
        }
    })
})(jQuery);
window.$win = $(window);

(function ($) {
    var $fixPanel = $('.b-up');
    if (!$fixPanel.length) {
        return false;
    }

    $win.load(function () {
        var fixPanel = new FixedPanel($fixPanel);
        fixPanel.init();
    });

    function FixedPanel($el) {
        this.$el = $el;
        this.width = $el.outerWidth();
    }

    FixedPanel.prototype = {
        constructor: FixedPanel,
        init: function () {
            this.getCheckPoints();
            this.bindEvents();
        },
        getCheckPoints: function () {
            this.topPoint = 900;
            this.bottomPoint = $('.footer').position().top - 1500;
        },
        bindEvents: function () {
            $win.scroll($.proxy(function () {
                var curPoint = $win.scrollTop();
                this.bottomPoint = $('.footer').position().top - 1500;//fix баги
                if (this.bottomPoint > curPoint && curPoint > this.topPoint) {
                    this.showPanel();
                } else {
                    this.hidePanel();
                }
            }, this))
        },
        showPanel: function () {
            this.$el.css('left', 0);
        },
        hidePanel: function () {
            this.$el.css('left', -this.width);
        }
    }
})(jQuery);
/**
 * Created by Natali on 20.02.16.
 */
(function ($) {

    //
    $(window).load(function () {
        var $bxsliders = $('.bxslider');
        if ($bxsliders.length) {
            $.each($bxsliders, function () {
                var $this = $(this);

                $this.bxSlider(
                    {
                        auto: true,
                        pause: 6000,
                        autoHover: true,
                        mode: "horizontal",
                        controls: true,
                        pager: false,
                        pagerCustom: false,
                        adaptiveHeight: true,
                        startSlide: 0,
                        onSliderLoad: function () {
                            $this.find('.bxslider__block').css('opacity', 1);
                        }

                    })
            })
        }
    });
})(jQuery);
//Про балконы
jQuery(document).ready(function () {
    var $calc = $('.b-calc');
    if (!$calc.length) {
        return false;
    }

    if (!$calc.hasClass('b-calc__balcons')) {
        return false;
    }

    var $btnForm = $calc.find('.b-calc__btn');
    /*$form_input = $('#want-cheaper').find('input[name=comagic]');
     $btnForm.on('click',function(){
     $form_input.val('Калькулятор');
     });*/

    var discount = (1 - $calc.data('discount') / 100);

    var $options = $calc.find('.tabletipokna'),
        picture = document.images.okno_img;
    $options.on('click', '.b-tipokna__item__balc', function (e) {
        var $this = $(e.currentTarget),
            myPicNumber = $this.data('pic'),
            picPath = '/img/calc/balcons/balc-' + myPicNumber + '.png';
        $this.addClass('actok').siblings().removeClass('actok');
        picture.src = picPath;
    });


    /*Параметры для калькулятора балконов*/
    //допуски и цена м2
    shir_balk_min = 50;
    shir_balk_max = 120;
    vysota_balk_min = 50;
    vysota_balk_max = 200;

    stoim_balk = 3550;


//СКИДКА процент скидки
    skidka = 0.1;

//ПРЕМИУМ	процент наценки
    premium = 1 + 0.3; // 0.3 редактируемое значение


//ПОДОКОННИК и ОТЛИВ за м
    podokonnik = 400;

//МОНТАЖНЫЕ РАБОТЫ за м2
    montazhrab = 1200;


//КОЭФФИЦИЕНТ К СТОИМОСТИ ОКОН
    koeffits = 1;

//ВАША ЭКОНОМИЯ
    vashaeconomiya = 0.3; // 0.3 - это 30%

//РАССРОЧКА. количество месяцев
    rassrochkames = 8;


    /*Дополнительные параметры*/

    //задаем первоначальные минимальные и максимальные значения ширины и высоты
    minsliderhor = shir_balk_min * 5;
    maxsliderhor = shir_balk_max * 5;
    minsliderver = vysota_balk_min;
    maxsliderver = vysota_balk_max;

    //объявляем переменные
    tipbalk = 4; //задаем тип окна
    shirinafin = 0;
    costfin = 0; // стоимость финальная
    rassrochka = 0; // стоимость рассрочки
    block_econom_text = 0;
    block_econom_bg = 0;
    CostverES = 0;
    CosthorES = 0;
    stoim = stoim_balk; // присваиваем стоимость из прайса
    skidka = 1 - skidka;

    //chekoksys = 0; // оконная система 0- эконом, 1 -премиум
    chekpodokonnik = 0; // подоконник, отлив  0- нет, 1 -да
    chekmontazhrab = 0; // монтажные работы  0- нет, 1 -да


    jQuery("#sliderhor").slider({
        animate: true,
        min: minsliderhor,
        max: maxsliderhor,
        value: minsliderhor,
        stop: function (event, ui) {
            jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
            change_price();
        }
    });

    jQuery("#sliderver").slider({
        orientation: "vertical",
        animate: true,
        min: minsliderver,
        max: maxsliderver,
        value: 110,
        stop: function (event, ui) {
            jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
            change_price();
        }
    });


    $('#Costhor').val(minsliderhor);
    $('#Costver').val(110);


    change_price();

    function change_price() {


        costfin = $('#Costhor').val() * $('#Costver').val() * stoim / 10000;
        shirinafin = parseInt($('#Costhor').val());

        costfin = costfin * koeffits * skidka;

        if (chekpodokonnik == 1) {
            costfin = costfin + podokonnik * shirinafin * 0.01;
        }
        if (chekmontazhrab == 1) {
            costfin = costfin + montazhrab * shirinafin * $('#Costver').val() * 0.0001;
        }
        costfin = Math.round(costfin * discount); // округляем до целого(уменьшаем на 5%)
        $('.costfin').html(cute_number(costfin)); // выводим финальную стоимость


        block_econom_bg = costfin * vashaeconomiya;
        block_econom_bg = Math.round(block_econom_bg); // округляем до целого
        $('.block_econom_bg').html(cute_number(block_econom_bg));

        block_econom_text = costfin + block_econom_bg;
        block_econom_text = Math.round(block_econom_text); // округляем до целого
        $('.block_econom_text').html(cute_number(block_econom_text));


        //расчитываем рассрочку
        rassrochka = costfin / rassrochkames;
        rassrochka = Math.round(rassrochka); // округляем до целого
        $('.rassrochka').html(cute_number(rassrochka)); // выводим финальную стоимость


        CostverES = $('#Costver').val();
        $('#CostverES').val(CostverES + " см");
        CosthorES = $('#Costhor').val();
        $('#CosthorES').val(CosthorES + " см");
    }

    //Обработка выбора типа балкона
    $options.find('.tipbalk1').on('click', function () {
        tipbalk = 1; //задаем тип окна

        minsliderhor = shir_balk_min * 3;
        maxsliderhor = shir_balk_max * 3;

        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });


        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    $options.find('.tipbalk2').on('click', function () {

        tipbalk = 2; //задаем тип окна
        minsliderhor = shir_balk_min * 4;
        maxsliderhor = shir_balk_max * 4;

        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    $options.find('.tipbalk3').on('click', function () {

        tipbalk = 3; //задаем тип окна
        minsliderhor = shir_balk_min * 4;
        maxsliderhor = shir_balk_max * 4;


        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    $options.find('.tipbalk4').on('click', function () {

        tipbalk = 4; //задаем тип окна
        minsliderhor = shir_balk_min * 5;
        maxsliderhor = shir_balk_max * 5;

        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();

    });

    $options.find('.tipbalk5').on('click', function () {
        tipbalk = 5; //задаем тип окна
        minsliderhor = shir_balk_min * 5;
        maxsliderhor = shir_balk_max * 5;


        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    $options.find('.tipbalk6').on('click', function () {
        tipbalk = 6; //задаем тип окна
        minsliderhor = shir_balk_min * 5;
        maxsliderhor = shir_balk_max * 5;

        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    $options.find('.tipbalk7').on('click', function () {

        tipbalk = 7; //задаем тип окна
        minsliderhor = shir_balk_min * 7;
        maxsliderhor = shir_balk_max * 7;


        minsliderver = vysota_balk_min;
        maxsliderver = vysota_balk_max;

        $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер


        $('#Costver').val(110);

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });

        stoim = stoim_balk; // присваиваем стоимость из прайса

        change_price();
    });

    //Отливы, подоконник и монтаж
    var $switchers = $calc.find('.basechek'),
        $switch_podok = $switchers.find('.basechek__switch__pod'),
        $switch_montaj = $switchers.find('.basechek__switch__mon');


    function change_position($this, bool) {
        var $text = $this.find('.basechek__text'),
            $circle = $this.find('.basechek__circle');
        if (bool) {
            $text.fadeOut(300, function () {
                $text.html('нет').css({
                    left: '50px'
                }).fadeIn(300);
            });
            $circle.animate({
                'left': '3px'
            }, 500)
        } else {
            $text.fadeOut(300, function () {
                $text.html('да').css({
                    left: '17px'
                }).fadeIn(300);
            });
            $circle.animate({
                'left': '59px'
            }, 500)
        }
    }

    $switch_podok.on('click', function () {
        var $this = $(this);
        if ($this.hasClass('i-switch-yes')) {
            $this.removeClass('i-switch-yes').addClass('i-switch-no');
            change_position($this, 1);
            chekpodokonnik = 0;
        } else {
            $this.removeClass('i-switch-no').addClass('i-switch-yes');
            chekpodokonnik = 1;
            change_position($this, 0);
        }
        change_price();
    });

    $switch_montaj.on('click', function () {
        var $this = $(this);
        if ($this.hasClass('i-switch-yes')) {
            $this.removeClass('i-switch-yes').addClass('i-switch-no');
            chekmontazhrab = 0;
            change_position($this, 1);
        } else {
            $this.removeClass('i-switch-no').addClass('i-switch-yes');
            chekmontazhrab = 1;
            change_position($this, 0);
        }
        change_price();
    });

    // фильтрация ввода в поля только цифр
    jQuery('input#Costver').keypress(function (event) {
        var key, keyChar;
        if (!event) var event = window.event;
        if (event.keyCode) key = event.keyCode;
        else if (event.which) key = event.which;
        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
        keyChar = String.fromCharCode(key);
        if (!/\d/.test(keyChar))    return false;
    });

    jQuery('input#Costhor').keypress(function (event) {
        var key, keyChar;
        if (!event) var event = window.event;
        if (event.keyCode) key = event.keyCode;
        else if (event.which) key = event.which;
        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
        keyChar = String.fromCharCode(key);
        if (!/\d/.test(keyChar))    return false;
    });


// передаем значение введенное пользователем вручную
    jQuery("input#Costhor").change(function () {
        var value2 = jQuery("input#Costhor").val();
        if (value2 > maxsliderhor) {
            value2 = maxsliderhor;
            jQuery("input#Costhor").val(maxsliderhor)
        }
        if (value2 < minsliderhor) {
            value2 = minsliderhor;
            jQuery("input#Costhor").val(minsliderhor)
        }
        jQuery("#sliderhor").slider("value", value2);
        change_price();
    });


    jQuery("input#Costver").change(function (val) {

        var value2 = $(this).val();
        console.log(value2);
        if (value2 > maxsliderver) {
            value2 = maxsliderver;
            jQuery("input#Costver").val(maxsliderver)
        }
        if (value2 < minsliderver) {
            value2 = minsliderver;
            jQuery("input#Costver").val(minsliderver)
        }
        jQuery("#sliderver").slider("value", value2);
        change_price();
    });

    //init
    $options.find('.b-tipokna__item__balc').filter('.item-start').trigger('click');
});
(function ($) {

    $(function () {
        var $calc = $('.b-calc');
        if (!$calc.length) {
            return false;
        }

        if ($calc.hasClass('b-calc__balcons')) {
            return false;
        }

        var $btnForm = $calc.find('.b-calc__btn');
        /*$form_input = $('#want-cheaper').find('input[name=comagic]');
         $btnForm.on('click',function(){
         $form_input.val('Калькулятор');
         });*/

        var discount = (1 - $calc.data('discount') / 100);


        //ПВХ Дверь балконная
        shir_dver_min = 50;
        shir_dver_max = 110;
        vysota_dver_min = 170;
        vysota_dver_max = 230;
        stoim_dver = 6000;


//ПВХ Дверь балконная двухстворчатая
        shir_dver2_min = 100;
        shir_dver2_max = 220;
        vysota_dver2_min = 170;
        vysota_dver2_max = 230;
        stoim_dver2 = 6000;


//ОКНО ГЛУХОЕ
        shir_oknogluh_min = 40;
        shir_oknogluh_max = 130;
        vysota_oknogluh_min = 40;
        vysota_oknogluh_max = 220;
        stoim_oknogluh = 2700;


//ОКНО ПОВОРОТНО – ОТКИДНОЕ
        shir_oknopovorototkid_min = 45;
        shir_oknopovorototkid_max = 125;
        vysota_oknopovorototkid_min = 50;
        vysota_oknopovorototkid_max = 230;
        stoim_oknopovorototkid = 6500;


//ОКНО ПОВОРОТНОЕ
        shir_oknopovorot_min = 45;
        shir_oknopovorot_max = 130;
        vysota_oknopovorot_min = 45;
        vysota_oknopovorot_max = 225;
        stoim_oknopovorot = 6000;


//СКИДКА процент скидки
        skidka = 0.1;

//ПОДОКОННИК и ОТЛИВ за м
        podokonnik = 400;

//МОНТАЖНЫЕ РАБОТЫ за м2
        montazhrab = 1200;

//КОЭФФИЦИЕНТ К СТОИМОСТИ ОКОН
        koeffits = 1;

//ВАША ЭКОНОМИЯ
        vashaeconomiya = 0.4; // 0.4 - это 40%

//РАССРОЧКА. количество месяцев
        rassrochkames = 8;

        $(".tipokna1").hover(function () {
                $(".popok1").css({'display': ''});
            },
            function () {
                $(".popok1").css({'display': 'none'});
            });

        $(".popok1").hover(function () {
                $(".popok1").css({'display': ''});
            },
            function () {
                $(".popok1").css({'display': 'none'});
            });


        $(".tipokna2").hover(function () {
                $(".popok2").css({'display': ''});
            },
            function () {
                $(".popok2").css({'display': 'none'});
            });

        $(".popok2").hover(function () {
                $(".popok2").css({'display': ''});
            },
            function () {
                $(".popok2").css({'display': 'none'});
            });


        $(".tipokna3").hover(function () {
                $(".popok3").css({'display': ''});
            },
            function () {
                $(".popok3").css({'display': 'none'});
            });

        $(".popok3").hover(function () {
                $(".popok3").css({'display': ''});
            },
            function () {
                $(".popok3").css({'display': 'none'});
            });


        $(".tipokna4").hover(function () {
                $(".popok4").css({'display': ''});
            },
            function () {
                $(".popok4").css({'display': 'none'});
            });


        $(".popok4").hover(function () {
                $(".popok4").css({'display': ''});
            },
            function () {
                $(".popok4").css({'display': 'none'});
            });


//задаем первоначальные минимальные и максимальные значения ширины и высоты
        minsliderhor = shir_oknogluh_min * 2;
        maxsliderhor = shir_oknopovorototkid_max * 2;
        minsliderver = vysota_oknogluh_min;
        maxsliderver = vysota_oknogluh_max;

//объявляем переменные
        tipokna = 21; //задаем тип окна
        costfin = 0; // стоимость финальная
        rassrochka = 0; // стоимость рассрочки
        block_econom_text = 0;
        block_econom_bg = 0;
        CostverES = 0;
        CosthorES = 0;
        stoim1 = stoim_oknopovorototkid; // присваиваем стоимость из прайса
        stoim2 = stoim_oknogluh;
        stoim3 = 0;
        stoim4 = 0;
        skidka = 1 - skidka;

        chekpodokonnik = 0; // подоконник, отлив  0- нет, 1 -да
        chekmontazhrab = 0; // монтажные работы  0- нет, 1 -да


        var $tiponkaOptions = $('.b-tipokna__options'),
            $oknaImg = $('.oknofull'),
            $tipokna1 = $('.tipokna1'),
            $tipokna2 = $('.tipokna2'),
            $tipokna3 = $('.tipokna3'),
            $tipokna4 = $('.tipokna4');

        jQuery("#sliderhor").slider({
            animate: true,
            min: minsliderhor,
            max: maxsliderhor,
            value: minsliderhor,
            stop: function (event, ui) {
                jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                change_price();
            }
        });

        jQuery("#sliderver").slider({
            orientation: "vertical",
            animate: true,
            min: minsliderver,
            max: maxsliderver,
            value: 110,
            stop: function (event, ui) {
                jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                change_price();
            }
        });


        $('#Costhor').val(minsliderhor);
        $('#Costver').val(110);


        change_price();


        function change_price() {


            if (tipokna == 41) {
                costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;
            }
            if (tipokna == 42) {
                costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;
            }
            if (tipokna == 11) {
                costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;
            }
            if (tipokna == 12) {
                costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;
            }

            if (tipokna == 13) {
                costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;
            }


            if (tipokna == 21) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim2 / 10000;
            }

            if (tipokna == 22) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim2 / 10000;
            }

            if (tipokna == 23) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim2 / 10000;
            }

            if (tipokna == 24) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.5 * stoim2 / 10000;
            }

            if (tipokna == 31) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim2 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim3 / 10000;
            }

            if (tipokna == 32) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim2 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim3 / 10000;
            }

            if (tipokna == 33) {
                costfin = $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim1 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim2 / 10000 + $('#Costhor').val() * $('#Costver').val() * 0.333333 * stoim3 / 10000;
            }


            costfin = costfin * koeffits * skidka;


            if (chekpodokonnik == 1) {
                costfin = costfin + podokonnik * $('#Costhor').val() * 0.01;
            }
            if (chekmontazhrab == 1) {
                costfin = costfin + montazhrab * $('#Costhor').val() * $('#Costver').val() * 0.0001;
            }
            costfin = Math.round(costfin * discount); // округляем до целого (уменьшаем на 5%)
            $('.costfin').html(cute_number(costfin)); // выводим финальную стоимость


            block_econom_bg = costfin * vashaeconomiya;
            block_econom_bg = Math.round(block_econom_bg); // округляем до целого
            $('.block_econom_bg').html(cute_number(block_econom_bg));

            block_econom_text = costfin + block_econom_bg;
            block_econom_text = Math.round(block_econom_text); // округляем до целого
            $('.block_econom_text').html(cute_number(block_econom_text));


            //расчитываем рассрочку
            rassrochka = costfin / rassrochkames;
            rassrochka = Math.round(rassrochka); // округляем до целого
            $('.rassrochka').html(cute_number(rassrochka)); // выводим финальную стоимость

            CostverES = $('#Costver').val()
            $('#CostverES').val(CostverES);
            CosthorES = $('#Costhor').val()
            $('#CosthorES').val(CosthorES);

        }	// конец  change_price()


// расчет ПВХ Дверь балконная
        $tiponkaOptions.find(".ok4_1").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-4-1.png" >');
            $tipokna4.attr('class', 'b-tipokna__item tipokna4 ok4_1 actok').siblings().removeClass('actok');
            tipokna = 41; //задаем тип окна
            minsliderhor = shir_dver_min;
            maxsliderhor = shir_dver_max;
            minsliderver = vysota_dver_min;
            maxsliderver = vysota_dver_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(minsliderver);

            jQuery("#sliderhor").slider({
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor,
                stop: function (event, ui) {
                    jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value"));
                    change_price();
                },
                slide: function (event, ui) {
                    /*
                     jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value",0));
                     jQuery("input#Costhor").val(jQuery("#sliderhor").slider("value",1));
                     */
                }
            });

            jQuery("#sliderver").slider({
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: minsliderver,
                stop: function (event, ui) {
                    jQuery("input#Costver").val(jQuery("#sliderver").slider("value"));
                    change_price();
                },
                slide: function (event, ui) {
                    /*jQuery("input#Costver").val(jQuery("#sliderver").slider("value",0));
                     jQuery("input#Costver").val(jQuery("#sliderver").slider("value",1));*/

                }
            });

            stoim1 = stoim_dver; // присваиваем стоимость из прайса
            stoim2 = 0;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ Дверь балконная


//ПВХ Дверь балконная двухстворчатая
        $tiponkaOptions.find(".ok4_2").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-4-2.png" >');
            $tipokna4.attr('class', 'b-tipokna__item tipokna4 ok4_2 actok').siblings().removeClass('actok');
            tipokna = 42; //задаем тип окна
            minsliderhor = shir_dver2_min;
            maxsliderhor = shir_dver2_max;
            minsliderver = vysota_dver2_min;
            maxsliderver = vysota_dver2_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(minsliderver);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: minsliderver
            });

            stoim1 = stoim_dver2; // присваиваем стоимость из прайса
            stoim2 = 0;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ Дверь балконная	двухстворчатая


//ПВХ ОКНО ГЛУХОЕ
        $tiponkaOptions.find(".ok1_1").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-1-1.png" >');
            $tipokna1.attr('class', 'b-tipokna__item tipokna1 ok1_1 actok').siblings().removeClass('actok');
            tipokna = 11; //задаем тип окна
            minsliderhor = shir_oknogluh_min;
            maxsliderhor = shir_oknogluh_max;
            minsliderver = vysota_oknogluh_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknogluh; // присваиваем стоимость из прайса
            stoim2 = 0;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО ГЛУХОЕ


//ПВХ ОКНО ПОВОРОТНОЕ
        $tiponkaOptions.find(".ok1_2").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-1-2.png" >');
            $tipokna1.attr('class', 'b-tipokna__item tipokna1 ok1_2 actok').siblings().removeClass('actok');
            tipokna = 12; //задаем тип окна
            minsliderhor = shir_oknopovorot_min;
            maxsliderhor = shir_oknopovorot_max;
            minsliderver = vysota_oknopovorot_min;
            maxsliderver = vysota_oknopovorot_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorot; // присваиваем стоимость из прайса
            stoim2 = 0;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО ПОВОРОТНОЕ


//ПВХ ОКНО ПОВОРОТНО – ОТКИДНОЕ
        $tiponkaOptions.find(".ok1_3").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-1-3.png" >');
            $tipokna1.attr('class', 'b-tipokna__item tipokna1 ok1_3 actok').siblings().removeClass('actok');
            tipokna = 13; //задаем тип окна
            minsliderhor = shir_oknopovorototkid_min;
            maxsliderhor = shir_oknopovorototkid_max;
            minsliderver = vysota_oknopovorototkid_min;
            maxsliderver = vysota_oknopovorototkid_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorototkid; // присваиваем стоимость из прайса
            stoim2 = 0;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО ПОВОРОТНО – ОТКИДНОЕ


//ПВХ ОКНО Глухое и ПОВОРОТНОЕ
        $tiponkaOptions.find(".ok2_1").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-2-1.png" >');
            $tipokna2.attr('class', 'b-tipokna__item tipokna2 ok2_1 actok').siblings().removeClass('actok');
            tipokna = 21; //задаем тип окна
            minsliderhor = shir_oknogluh_min * 2;
            maxsliderhor = shir_oknopovorot_max * 2;
            minsliderver = vysota_oknogluh_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorot; // присваиваем стоимость из прайса
            stoim2 = stoim_oknogluh;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО Глухое и ПОВОРОТНОЕ


//ПВХ ОКНО Глухое и ПОВОРОТНО – ОТКИДНОЕ
        $tiponkaOptions.find(".ok2_2").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-2-2.png" >');
            $tipokna2.attr('class', 'b-tipokna__item tipokna2 ok2_2 actok').siblings().removeClass('actok');
            tipokna = 22; //задаем тип окна
            minsliderhor = shir_oknogluh_min * 2;
            maxsliderhor = shir_oknopovorototkid_max * 2;
            minsliderver = vysota_oknogluh_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorototkid; // присваиваем стоимость из прайса
            stoim2 = stoim_oknogluh;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО Глухое и ПОВОРОТНО – ОТКИДНОЕ


//ПВХ ОКНО Поворотное и ПОВОРОТНОЕ – ПОВОРОТНОЕ
        $tiponkaOptions.find(".ok2_3").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-2-3.png" >');
            $tipokna2.attr('class', 'b-tipokna__item tipokna2 ok2_3 actok').siblings().removeClass('actok');
            tipokna = 23; //задаем тип окна
            minsliderhor = shir_oknopovorot_min * 2;
            maxsliderhor = shir_oknopovorot_max * 2;
            minsliderver = vysota_oknopovorot_min;
            maxsliderver = vysota_oknopovorot_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorot; // присваиваем стоимость из прайса
            stoim2 = stoim_oknopovorot;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО поворотное и ПОВОРОТНОЕ – ПОВОРОТНОЕ


//ПВХ ОКНО Поворотное и ПОВОРОТНО – ОТКИДНОЕ
        $tiponkaOptions.find(".ok2_4").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-2-4.png" >');
            $tipokna2.attr('class', 'b-tipokna__item tipokna2 ok2_4 actok').siblings().removeClass('actok');
            tipokna = 24; //задаем тип окна
            minsliderhor = shir_oknopovorototkid_min * 2;
            maxsliderhor = shir_oknopovorototkid_max * 2;
            minsliderver = vysota_oknopovorot_min;
            maxsliderver = vysota_oknopovorot_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorototkid; // присваиваем стоимость из прайса
            stoim2 = stoim_oknopovorot;
            stoim3 = 0;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО поворотное и ПОВОРОТНО – ОТКИДНОЕ


//ПВХ ОКНО Глухое и ПОВОРОТНОЕ  и глухое
        $tiponkaOptions.find(".ok3_1").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-3-1.png" >');
            $tipokna3.attr('class', 'b-tipokna__item tipokna3 ok3_1 actok').siblings().removeClass('actok');
            tipokna = 31; //задаем тип окна
            minsliderhor = shir_oknopovorot_min * 3;
            maxsliderhor = shir_oknopovorot_max * 3;

            if (maxsliderhor > 300) {
                maxsliderhor = 300;
            }


            minsliderver = vysota_oknopovorot_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknogluh; // присваиваем стоимость из прайса
            stoim2 = stoim_oknopovorot;
            stoim3 = stoim_oknogluh;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО Глухое и ПОВОРОТНОЕ  и глухое


//ПВХ ОКНО Глухое и ПОВОРОТНОЕ  и ПОВОРОТНОЕ
        $tiponkaOptions.find(".ok3_2").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-3-2.png" >');
            $tipokna3.attr('class', 'b-tipokna__item tipokna3 ok3_2 actok').siblings().removeClass('actok');
            tipokna = 32; //задаем тип окна
            minsliderhor = shir_oknopovorot_min * 3;
            maxsliderhor = shir_oknopovorot_max * 3;

            if (maxsliderhor > 300) {
                maxsliderhor = 300;
            }


            minsliderver = vysota_oknopovorot_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorot; // присваиваем стоимость из прайса
            stoim2 = stoim_oknopovorot;
            stoim3 = stoim_oknogluh;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО Глухое и ПОВОРОТНОЕ  и ПОВОРОТНОЕ


//ПВХ ОКНО ПОВОРОТНОЕ и Глухое и ПОВОРОТНО – ОТКИДНОЕ
        $tiponkaOptions.find(".ok3_3").click(function () {
            $oknaImg.html('<img src="/img/calc/okno/okno-3-3.png" >');
            $tipokna3.attr('class', 'b-tipokna__item tipokna3 ok3_3 actok').siblings().removeClass('actok');
            tipokna = 33; //задаем тип окна
            minsliderhor = shir_oknopovorototkid_min * 3;
            maxsliderhor = shir_oknopovorototkid_max * 3;

            if (maxsliderhor > 300) {
                maxsliderhor = 300;
            }


            minsliderver = vysota_oknopovorototkid_min;
            maxsliderver = vysota_oknogluh_max;
            $('#Costhor').val(minsliderhor); // подставляем значения максимума и минимума на слайдер
            $('#Costver').val(110);

            jQuery("#sliderhor").slider("option", {
                animate: true,
                min: minsliderhor,
                max: maxsliderhor,
                value: minsliderhor
            });

            jQuery("#sliderver").slider("option", {
                orientation: "vertical",
                animate: true,
                min: minsliderver,
                max: maxsliderver,
                value: 110
            });

            stoim1 = stoim_oknopovorot; // присваиваем стоимость из прайса
            stoim2 = stoim_oknopovorototkid;
            stoim3 = stoim_oknogluh;
            stoim4 = 0;
            change_price();

        });
//конец расчета ПВХ ОКНО ПОВОРОТНОЕ и Глухое и ПОВОРОТНО – ОТКИДНОЕ


        var $switchers = $('.basechek'),
            $switch_podok = $switchers.find('.basechek__switch__pod'),
            $switch_montaj = $switchers.find('.basechek__switch__mon');

        function change_position($this, bool) {
            var $text = $this.find('.basechek__text'),
                $circle = $this.find('.basechek__circle');
            if (bool) {
                $text.fadeOut(300, function () {
                    $text.html('нет').css({
                        left: '50px'
                    }).fadeIn(300);
                });
                $circle.animate({
                    'left': '3px'
                }, 500)
            } else {
                $text.fadeOut(300, function () {
                    $text.html('да').css({
                        left: '17px'
                    }).fadeIn(300);
                });
                $circle.animate({
                    'left': '59px'
                }, 500)
            }
        }

        $switch_podok.on('click', function () {
            var $this = $(this);
            if ($this.hasClass('i-switch-yes')) {
                $this.removeClass('i-switch-yes').addClass('i-switch-no');
                change_position($this, 1);
                chekpodokonnik = 0;
            } else {
                $this.removeClass('i-switch-no').addClass('i-switch-yes');
                chekpodokonnik = 1;
                change_position($this, 0);
            }
            change_price();
        });

        $switch_montaj.on('click', function () {
            var $this = $(this);
            if ($this.hasClass('i-switch-yes')) {
                $this.removeClass('i-switch-yes').addClass('i-switch-no');
                chekmontazhrab = 0;
                change_position($this, 1);
            } else {
                $this.removeClass('i-switch-no').addClass('i-switch-yes');
                chekmontazhrab = 1;
                change_position($this, 0);
            }
            change_price();
        });

// фильтрация ввода в поля только цифр
        jQuery('input#Costver').keypress(function (event) {
            var key, keyChar;
            if (!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if (event.which) key = event.which;

            if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
            keyChar = String.fromCharCode(key);

            if (!/\d/.test(keyChar))    return false;

        });


        jQuery('input#Costhor').keypress(function (event) {
            var key, keyChar;
            if (!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if (event.which) key = event.which;

            if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
            keyChar = String.fromCharCode(key);

            if (!/\d/.test(keyChar))    return false;

        });


// передаем значение введенное пользователем вручную
        jQuery("input#Costhor").change(function () {
            var value2 = jQuery("input#Costhor").val();
            if (value2 > maxsliderhor) {
                value2 = maxsliderhor;
                jQuery("input#Costhor").val(maxsliderhor)
            }
            if (value2 < minsliderhor) {
                value2 = minsliderhor;
                jQuery("input#Costhor").val(minsliderhor)
            }
            jQuery("#sliderhor").slider("value", value2);
            change_price();
        });

        jQuery("input#Costver").change(function () {
            var value2 = jQuery("input#Costver").val();
            if (value2 > maxsliderver) {
                value2 = maxsliderver;
                jQuery("input#Costver").val(maxsliderver)
            }
            if (value2 < minsliderver) {
                value2 = minsliderver;
                jQuery("input#Costver").val(minsliderver)
            }
            jQuery("#sliderver").slider("value", value2);
            change_price();
        });
    });
})(jQuery);


function cute_number(number) {
    var number_str = String(number),
        length = number_str.length;

    if (length > 3 && length < 7) {
        var pos = length - 3,
            first_part = number_str.substring(0, pos),
            second_part = number_str.substring(pos);
        result = first_part + ' ' + second_part;
    } else if (length > 6 && length < 10) {
        var pos1 = length - 6,
            pos2 = length - 3,
            first_part = number_str.substring(0, pos1),
            second_part = number_str.substring(pos1, pos2),
            third_part = number_str.substring(pos2);
        result = first_part + ' ' + second_part + ' ' + third_part;
    } else {
        result = number;
    }

    return result;
}


(function ($) {
    $(function () {
        var $forms = $('form');


        $.each($forms, function () {
            var form = new FormValidate($(this));
            form.init();
        });


        var $formOK = $('.b-form__ok');
        if ($formOK.length && !$(".b-form__ok__wrap").hasClass("hided")) {
            var $btnClose = $formOK.find('.i-close');
            $btnClose.on('click', function () {
                $formOK.parent('.b-form__ok__wrap').hide();
            });
            setTimeout(function () {
                $btnClose.trigger('click');
            }, 5000)
        }

    });

    var validators = {
        'e-mail': /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
        'phone': /^\+?\d{6,}$/
    };

    function FormValidate($el) {
        this.$el = $el;
        this.$submit = $el.find('button');
        /*Для comagic*/
        //this.message = this.$el.find('input[name=comagic]').val();
    }


    FormValidate.prototype = {
        constructor: FormValidate,
        init: function () {
            this.getAllFields();
            this.bindEvents();
            this.iCanAddFile();
            this.addMask();
        },
        getAllFields: function () {
            this.$fields = this.$el.find('.form-group');
            this.$fieldsToValid = this.$fields.find('[data-validation]').add(this.$el.find('textarea[data-validation]'));
        },
        bindEvents: function () {
            this.$submit.on('click', $.proxy(function (e) {
                e.preventDefault();
                if (this.validate()) {
                    $.cookie('form_sended', 'yes', {path: '/'});
					this.$el.trigger('submit');
                    //this.addPreloader();
                    //this.comagicGo();
                }
            }, this));
        },
        validate: function () {
            var result = true;
            $.each(this.$fieldsToValid, function () {
                var $this = $(this),
                    value = $this.val(),
                    validType = $this.data('validation');

                switch (validType) {
                    case 'number': {
                        checkNumber();
                        break;
                    }
                    case 'required': {
                        checkRequired();
                        break;
                    }
                    default:
                        checkString();
                        break;
                }


                function checkNumber() {
                    if (!Number(value) || value < 0 || value > 99) {
                        fieldInvalid();
                        return false;
                    }

                    $this.removeClass('invalid');
                }

                function checkRequired() {
                    if (value.length) {
                        $this.removeClass('invalid');
                    } else {
                        fieldInvalid();
                    }
                }

                function checkString() {
                    if (validators[validType].test(value)) {
                        $this.removeClass('invalid');
                    } else {
                        fieldInvalid();
                    }
                }

                function fieldInvalid() {
                    $this.addClass('invalid');
                    result = false;
                }


            });

            return result;
        },

        iCanAddFile: function () {
            var $fileInput = this.$el.find('input[type=file]');
            if ($fileInput.length) {
                var $btn_file = this.$el.find('.js-sketch');
                $btn_file.on('click', function (e) {
                    e.preventDefault();
                    $fileInput.trigger('click');
                });
                $fileInput.change(function () {
                    $btn_file.html('Эскизы загружены');
                });
            }
        },
        addMask: function () {
            var $input = this.$el.find('.input-phone');
            if ($input.length) {
                $input.mask("8 (999) 999-99-99");
            }
        },
        addPreloader: function () {
            $('#loader-wrapper').show();
        },
        comagicGo: function () {
            var $nameField = this.$fields.filter('._name'),
                name = $nameField.length ? $nameField.find('input').val() : '-',
                phone = this.$fields.filter('._phone').find('input').val(),
                email = '-',
                comagicObj = {name: name, email: email, phone: phone, message: this.message},
                self = this;

            try {
                Comagic.addOfflineRequest(comagicObj);
            } catch (e) {
            }

            setTimeout(function () {
                self.$el.trigger('submit');
            }, 2000)
        }
    }
})(jQuery);
/**
 * Created by vasilisa on 26.02.16.
 */
(function ($) {
    var $win = $(window);

    $win.load(function () {

        function setMap(id) {
            myMap.setCenter(tabs[id][0], tabs[id][1]);
        }
    });
    $('.i-close').on('click', function (e) {
        $.fancybox.close();
    });
    $(document).on('click', '.fancybox-scrolable', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('fancybox-outer') || $target.hasClass('fancybox-scrolable') || $target.hasClass('fancybox-inner')) {
            $.fancybox.close();
        }
    });

    /*fancy-форма*/
    var $fancy = $('.js-fancy'),
        fancyOpt = {
            wrapCSS: 'fancybox-scrolable', //нужно для нового скрола модалки
            closeBtn: false,
            padding: 0,
            helpers: {
                overlay: {
                    locked: false
                }
            },
            //нужно для нового скрола модалки
            afterClose: function () {
                $('body').removeClass('body-fancybox-scrolable-open');
            },
            //нужно для нового скрола модалки
            beforeShow: function () {
                $('body').addClass('body-fancybox-scrolable-open');
            }
        };
    //if ($fancy.length)  $fancy.fancybox(fancyOpt);
    $fancy.each(function () {
        var $link = $(this), href = $link.attr('href'), $target = $(href);

        $link.bind('click', function (e) {
            e.preventDefault();
            $.fancybox($.extend(fancyOpt, {
                content: $target,
                parent: $body
            }));
        });
    });

    //Формы, которые выпадают по определенным параметрам
    var time = new Date().getHours(), $body = $('body');

    //Классы для форм
    /*Общий класс*/

    function FancyForm($el) {
        this.$el = $el;
        this.timeout = null;
        this.idTimeout = null;
    }

    FancyForm.prototype = {
        constructor: FancyForm,
        start: function () {

        },
        goFancy: function () {
            if (!$('.fancybox-wrap').length) {
                $.fancybox($.extend(fancyOpt, {
                    content: this.$el,
                    parent: $body
                }));
            } else {
                this.reCharge();
            }
        },
        reCharge: function () {
            clearTimeout(this.idTimeout);
            this.timeout = 15000;
            this.start();
        }
    };

    /*Класс для подарка*/
    function PrezentFancyForm($el) {
        this.$el = $el;
        FancyForm.apply(this, arguments);
        this.timeout = 20000;
    }

    PrezentFancyForm.prototype = Object.create(FancyForm.prototype);
    PrezentFancyForm.prototype.start = function () {
        if (tssForm) {
            tssForm.reCharge();
        }
        var self = this;
        setTimeout(function () {
            $body.one('mouseleave', function (e) {
                if (e.clientY < 0) {
                    self.goFancy();
                }
            });
        }, this.timeout);
    };


    /*Класс для сотого посетителя*/
    function StoFancyForm($el) {
        this.$el = $el;
        FancyForm.apply(this, arguments);
        this.timeout = 40000;
        this.idTimeout = null;
    }

    StoFancyForm.prototype = Object.create(FancyForm.prototype);
    StoFancyForm.prototype.start = function () {
        var self = this;
        this.idTimeout = setTimeout(function () {
            self.goFancy();
        }, this.timeout);
    };

    /*Класс для "непервого" посетителя*/
    function NotFirstFancyForm($el) {
        this.$el = $el;
        FancyForm.apply(this, arguments);
        this.timeout = 60000;
        this.idTimeout = null;
        console.log("zxc")
    }

    NotFirstFancyForm.prototype = Object.create(FancyForm.prototype);
    NotFirstFancyForm.prototype.start = function () {
        var self = this,
            host = this.parseUrl(document.referrer);
        if (host != "dveri-kupit.ru") {
            this.idTimeout = setTimeout(function () {
                self.goFancy();
            }, this.timeout);
        }

    };
    NotFirstFancyForm.prototype.parseUrl = function (url) {
        if (!url) {
            return 'false';
        }
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    };

    /*Класс для ночной формы Loto*/
    function LotoFancyForm($el) {
        this.$el = $el;
        FancyForm.apply(this, arguments);
    }

    LotoFancyForm.prototype = Object.create(FancyForm.prototype);
    LotoFancyForm.prototype.start = function () {
        var self = this;
        this.goFancy();
    };

    /*форма loto-priz ротация подарков*/
    /*var $lotoPriz = $('.loto-priz'),
     $textFieldLotoPriz = $lotoPriz.find('.b-form_priz'),
     $lotoPresentInput = $lotoPriz.find('.loto-present-field');

     var lotoPresents = ["Москитные<br/>сетки", "Водоотливы<br/>на окна", "Подоконники"];

     function randLoto() {
     return Math.floor(Math.random() * (lotoPresents.length));
     }

     var lotoPresentsText = lotoPresents[randLoto()];

     $textFieldLotoPriz.html(lotoPresentsText);
     $lotoPresentInput.val(lotoPresentsText);*/
    var $lotoPriz = $('.loto-priz'),
        $lotoPrizItems = $lotoPriz.find('.b-form_priz__item'),
        $lotoPresentInput = $lotoPriz.find('.loto-present-field');

    function randLoto() {
        return Math.floor(Math.random() * ($lotoPrizItems.length));
    }

    var $activeLotoItem = $lotoPrizItems.eq(randLoto());
    $activeLotoItem.addClass('active').siblings().removeClass('active');
    $lotoPresentInput.val($activeLotoItem.text());


    /*Дневные формы*/
    if (8 < time && time < 23) {
        if ($.cookie('not_first_visitor')) {
            //повторный заход
            var $tssForm = $("#tss");
            if ($tssForm.length) {
                /*var tssForm = new NotFirstFancyForm($tssForm);
                 tssForm.start();*/
                var shown_tss = getCookie("shown_tss");

                var date_shown_tss = new Date(shown_tss);

                var current_date = new Date();

                if (( date_shown_tss.valueOf() < current_date.valueOf() ) || shown_tss === undefined) {
                    var date = new Date();
                    date = new Date(+date + 30 * 6e4);
                    var tssForm = new NotFirstFancyForm($tssForm);
                    tssForm.start();
                    setCookie("shown_tss", date);
                }
            }
        } else {
            $.cookie('not_first_visitor', 'yes', {path: '/'});
            /*Сотый посетитель*/
            var $stoForm = $('#sto');
            if ($stoForm.length) {
                var stoForm = new StoFancyForm($stoForm);
                stoForm.start();
            }
        }

        if (!$.cookie('form_sended')) {
            /*Просто подарок*/
            var $prezentForm = $('#prezent');
            if ($prezentForm.length) {
                var presentForm = new PrezentFancyForm($prezentForm);
                presentForm.start();
            }
        }
    }

    /*Ночные формы*/
    /*Ночью дешевле*/
    var $lotoForm = $('#loto'),
        loto_start = $lotoForm.data('start'),
        loto_end = $lotoForm.data('end'),
        window_width = $(window).width();


    $lotoForm.find('.time-start').html(loto_start + ':00');
    $lotoForm.find('.time-finish').html(loto_end + ':00');


    function lotoInit() {
        if (window_width <= 420) {
            return false;
        }
        if (!$.cookie('loto-night')) {
            if ($lotoForm.length) {
                var lotoForm = new LotoFancyForm($lotoForm);
                lotoForm.start();
            }
            var date = new Date();
            var minutes = 30;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            $.cookie('loto-night', 'yes', {expires: date, path: '/'});
        }
    }

    if (loto_start < loto_end) {
        if (time >= loto_start && loto_end > time) {
            lotoInit();
        }
    } else {
        if (time >= loto_start || loto_end > time) {
            lotoInit();
        }
    }

    /*Ночью дешевле end*/


})(jQuery);
// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
$(document).ready(function () {
    var $el = $('#raspadinha');
    if ($el.length > 0) {
        $el.scratchie({
            target: 'target',
            img: '../img/loto-priz.png',
            imgHeight: 132, // target (prize) img height
            imgWidth: 282, // target (prize) img width
            title: 'Попытайте удачу!',
            fillImg: '/img/loto.png',
            requireMouseClick: true,
            callback: function () {
                console.log("asd")
                $.fancybox({
                    href: '#loto-priz',
                    padding: '0px',
                    type: 'inline',
                    closeBtn: false
                });
            }
        });
        // end of scratchie stuff!
    }
});
$(document).ready(function () {

    $('.iosSlider').iosSlider({
        snapToChildren: true,
        desktopClickDrag: true,
        keyboardControls: false,
        onSlideComplete: slideComplete,
        navNextSelector: $('.next'),
        navPrevSelector: $('.prev'),
        infiniteSlider: true
    });

    $('.iosSlider2').iosSlider({
        snapToChildren: true,
        desktopClickDrag: true,
        keyboardControls: false,
        onSlideComplete: slideComplete2,
        navNextSelector: $('.next2'),
        navPrevSelector: $('.prev2'),
        infiniteSlider: true
    });
    $('.iosSlider3').iosSlider({
        snapToChildren: true,
        desktopClickDrag: true,
        keyboardControls: false,
        onSlideComplete: slideComplete,
        navNextSelector: $('.next3'),
        navPrevSelector: $('.prev3'),
        infiniteSlider: true
    });

});


function slideComplete(args) {
    $('.next, .prev').removeClass('unselectable');
    if (args.currentSlideNumber == 1) {
        $('.prev').addClass('unselectable');
    } else if (args.currentSliderOffset == args.data.sliderMax) {
        $('.next').addClass('unselectable');
    }
}
function slideComplete2(args) {
    $('.next2, .prev2').removeClass('unselectable');
    if (args.currentSlideNumber == 1) {
        $('.prev2').addClass('unselectable');
    } else if (args.currentSliderOffset == args.data.sliderMax) {
        $('.next2').addClass('unselectable');
    }
}


(function ($) {
    'use strict';

    var $d = $(document);

    $(function () {
        var $navBar = $('.navbar-header'),
            $menuMain = $('.b-menu__main');
        $navBar.on('click', function () {
            if (!$menuMain.hasClass('active')) {
                $menuMain.slideDown(300).addClass('active');
            } else {
                closeMainMenu()
            }
        });

        function closeMainMenu() {
            $menuMain.slideUp(300).removeClass('active');
        }

        function makeMeActive($el) {
            $el.addClass('active').siblings().removeClass('active');
        }

        function makeMeActive($el) {
            $el.addClass('active').siblings().removeClass('active');
        }

        /*$d.on('click',function(e){
         if(!$(e.target).closest('.b-topmenu').length){
         closeMainMenu()
         }
         });*/

        var $menuItems = $menuMain.find('.b-menu__item');
        $.each($menuItems, function () {
            var $this = $(this),
                idTime = null;

            /*Для планшетов*/
            /* $this.on('tap', function () {
             idTime = setTimeout(function () {
             makeMeActive($this);
             }, 1000)
             });
             */
            /*  $this.hover(function () {
             var $this = $(this);
             idTime = setTimeout(function () {
             makeMeActive($this);
             }, 1000)
             }, function () {
             clearTimeout(idTime);
             if ($this.hasClass('active')) {
             setTimeout(function () {
             $this.removeClass('active');
             }, 1000)
             }
             });*/
        });

        //Правовая информация
        var $legalLink = $('#legal-info-link');
        $legalLink.fancybox({
            scrolling: 'visible'
        });

        //при нажатии на "нажмите и мы вам позвоним" в хедере message для comagic ставиться заголовок "хочу дешевле", а через калькулятор - "калькулятор"
        var $btnForm = $('#want-cheaper-link');
        /*$form_input = $('#want-cheaper').find('input[name=comagic]');
         $btnForm.on('click', function () {
         $form_input.val('Хочу дешевле');
         });*/

        //Выбор городов
        $('#changeCity').on('change', function () {
            var url = $(this).val(); // get selected value
            if (url) { // require a URL
                window.location = url; // redirect
            }
            return false;
        });
    });

})(jQuery);
/**
 * Created by Natali on 20.02.16.
 *
 */
(function ($) {
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) {
        is_safari = false;
    }
    if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }

    var $w = $(window);

    $(window).load(function () {
        var $sliderMulti = $('.b-slider-multi'),
            $slider = $sliderMulti.find('.scrollbar-inner');
        $slider.scrollbar({
            autoScrollSize: false,
            "showArrows": true,
            "scrollx": "advanced",
            "scrolly": "advanced",
            scrollStep: 50
        });

        var $arrowRight = $sliderMulti.find('.btn-rght'),
            $scrollArrowRight = $sliderMulti.find('.scroll-x').find('.scroll-arrow_more');


        //var scrollsteparrow = 100*7;

        $arrowRight.on('mousedown', function (event) {
            $scrollArrowRight.trigger(event)
        });

    });
    $(function () {
        $('.scrlto').click(function (e) {
            var target = $(this).attr('href');
            e.preventDefault();
            $.scrollTo(target, 800);
        });
    });
})(jQuery);


(function ($, w, d) {//w = window d = document

    $(function () { //DOM Ready

        $('.bxslider1').bxSlider(
            {
                auto: false,
                autoHover: false,
                mode: "fade",
                controls: true,
                slideWidth: 900,
                pagerCustom: "#ruchki",
                adaptiveHeight: true,
                startSlide: 0,
                onSlideAfter: function ($slideElement) {
                    //$('.', $slideElement).trigger('animate');
                    $(window).trigger('scroll');
                }
            }
        );
        //

    });
    $(function () { //DOM Ready

        $('.bxslider2').bxSlider(
            {
                auto: false,
                autoHover: false,
                mode: "fade",
                controls: true,
                slideWidth: 900,
                pagerCustom: "#ruchki2",
                adaptiveHeight: true,
                startSlide: 0,
                onSlideAfter: function ($slideElement) {
                    //$('.', $slideElement).trigger('animate');
                    $(window).trigger('scroll');
                }
            }
        );
        //

    });
    $(function () { //DOM Ready

        $('.bxslider3').bxSlider(
            {
                auto: false,
                autoHover: false,
                mode: "fade",
                controls: true,
                slideWidth: 900,
                pagerCustom: "#ruchki3",
                adaptiveHeight: true,
                startSlide: 0,
                onSlideAfter: function ($slideElement) {
                    //$('.', $slideElement).trigger('animate');
                    $(window).trigger('scroll');
                }
            }
        );
        //

    });
    $(function () { //DOM Ready

        $('.bxslider4').bxSlider(
            {
                auto: false,
                autoHover: false,
                mode: "fade",
                controls: true,
                slideWidth: 900,
                pagerCustom: "#ruchki4",
                adaptiveHeight: true,
                startSlide: 0,
                onSlideAfter: function ($slideElement) {
                    //$('.', $slideElement).trigger('animate');
                    $(window).trigger('scroll');
                }
            }
        );
        //

    });
})(jQuery, window, document);