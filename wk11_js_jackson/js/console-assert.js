var $form, width, height, area;
$form = $('#calculator');

$('form input[type="text"]').on('blur', function(){
    //the message only shhows if user has entered number less than 10
    console.assert(this.value > 10, 'User entered less than 10');
});

$('#calculator').on('submit', function(e){
    e.preventDefault();
    console.log('Clicked submit....');

    width = $('#width').val();
    height = $('#height').val();
    area = width * height;
    console.assert($.isNumeric(area), 'User entered non-numeric value');

    $form.append('<p>' + area + '</p>');
});