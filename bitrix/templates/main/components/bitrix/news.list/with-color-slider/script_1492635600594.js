$(document).ready(function() {
    $(".door-call_want-cheaper-link").click(function(){
        var $this = $(this);
        $('#want-cheaper input[data-field="door_name_input"]').val( $this.data("name") );
        $('#want-cheaper input[data-field="door_price_input"]').val( $this.data("price") );
        $('#want-cheaper input[data-field="door_page_input"]').val(window.location);

        var color_name = $this.closest(".es13__item").find(".swiper-slide.swiper-slide-active").data("color-name");
        $('#want-cheaper input[data-field="door_color_input"]').val( color_name );
    });
});