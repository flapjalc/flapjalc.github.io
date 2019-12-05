$(document).ready(function () {
    $(".order-implement-btn").click(function () {
        var $item = $(this).closest(".es13-furnitura__item_info");
        var title = $item.find(".es13-furnitura__ttl").text();
        var color = $item.find(".h-list .active span").text();
        var price = parseFloat( $item.find(".es13-furnitura__price_new").text() );

        var $form = $("#order-implement form");

        $form.find('input[data-field="door_color_input"]').val(color);
        $form.find('input[data-field="door_name_input"]').val(title);
        $form.find('input[data-field="door_page_input"]').val(window.location);
        $form.find('input[data-field="door_price_input"]').val(price);
    });
});
