$(function(){
    var $p = $('p');
    var $clonedQuote = $p.clone();
    $p.remove();
    $clonedQuote.insertAfter('h2');

    var $moveItem = $('#one').detatch();
    $moveItem.appendTo('ul');
});