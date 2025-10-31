$('nav a').on('click', function(e){
    e.preventDefault();
    var url = this.href;
    var $content = $('#content');
    
    $('nav a.current').removeClass('current');
    $(this).addClass('current');
    $('#container').remove();

    $.ajax({
        type: "POST",
        url: urll,
        timeout: 2000,
        beforeSend: function() {
            $content.append('<div id="load">Loading</div>');
        },
        complete: function() {
            $('#loading').remove();
        },
        success: function(data){
            $content.html( $(data).find('#container') ).hide().fadeIn(400);
        },
        fail: function() {
            $('#panel').html('<div class="loading">Please try again soon.</div>');
        }
    });
});