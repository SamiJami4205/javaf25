// Week 8 Challenge — Steps 6, 7, 8

$(function () {
    $("#changeTextButton").on("click", function () {
        $("#changeText p").text("Text changed using jQuery!");
    });

    const fruits = ["Apple", "Banana", "Cherry", "Dragonfruit", "Grapes"];
    const $list = $("#loopList");

    const items = $.map(fruits, (f) => `<li>${escapeHtml(f)}</li>`).join("");
    $list.html(items);

    $("#chainingDiv")
        .css("color", "white")       
        .slideUp(2000)
        .slideDown(2000)
        .queue(function (next) {
        $(this).css({ outline: "3px solid #ffffff55" });
        setTimeout(() => {
            $(this).css({ outline: "none" });
            next();
        }, 700);
    });
});

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
