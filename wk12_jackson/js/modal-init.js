(function(){
    var $content = $('#share-options').detach();

    $('#share').on('click', funtion() {
        modal.open({content: $content, width:340, height:300});
    });
});