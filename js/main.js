$(function () {
    const ADJUST_THRESHOLD_LIST_ITEMS_LENGTH = 1;
    const LIST_ITEM_HEIGHT = 34;
    const LIST_HEIGHT_MARGIN = 20;
    const LIST_HEIGHT_UPPER_LIMIT = LIST_ITEM_HEIGHT * 10 + LIST_HEIGHT_MARGIN;
    const LIST_HEIGHT_LOWER_LIMIT = LIST_ITEM_HEIGHT * ADJUST_THRESHOLD_LIST_ITEMS_LENGTH + LIST_HEIGHT_MARGIN;

    $("body").on("inview", "#_toList", function (event, isInView) {
        const $listArea = $(this).find("._cwLTList");

        if (isInView) {
            // element is now visible in the viewport

            if ($listArea.children().length < ADJUST_THRESHOLD_LIST_ITEMS_LENGTH) {
                return;
            }

            let listHeight = LIST_ITEM_HEIGHT * $listArea.children().length + LIST_HEIGHT_MARGIN;
            
            if (listHeight > LIST_HEIGHT_UPPER_LIMIT) {
                listHeight = LIST_HEIGHT_UPPER_LIMIT;
            } else if (listHeight < LIST_HEIGHT_LOWER_LIMIT) {
                listHeight = LIST_HEIGHT_LOWER_LIMIT;
            }

            $listArea.css({
                "height": listHeight,
                "max-height": listHeight
            });

            const listY = window.innerHeight - $(this).height() - $("#_chatSendArea").height();
            
            $(this).css("top", listY);
        } else {
            // element has gone out of viewport

            $listArea.css({
                "height": LIST_HEIGHT_LOWER_LIMIT,
                "max-height": LIST_HEIGHT_LOWER_LIMIT
            });
        }
    });
});
