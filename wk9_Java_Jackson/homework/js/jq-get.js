$('#selector a').on('click', function(e){
    e.preventDefault();
    var queryString = 'vote=' + event.target.id;
    $.get('votes.php', queryString, function(data){
        $('#selector').html(data);
    });
});