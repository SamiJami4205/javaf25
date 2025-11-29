(function(){
    var form, options, other, otherText, hide;
    form = document.getElementById('how-heard');
    options = form.nextElementSibling.heard;
    other = document.getElementById('other');
    otherText = document.getElementById('other-text');
    otherText.className = 'hide';

    for (var i = [0]; i < options.length; i++) {
        addEvent (options[i], 'click', radioChanged);
    }

    function radioChanged() {
        hide = other.checked ? '' : 'hide';
        otherText.className = hide;
        if (hide) {
            otherText.value = '';
        }
    }
}());