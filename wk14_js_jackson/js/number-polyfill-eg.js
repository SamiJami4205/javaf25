yepnope({
    test: Modernizr.inputtypes.number,
    nope: ['js/numPolufill.js', 'css/number.css'],
    complete: function() {
        console.log('YepNope + Modernizer are done');
    }
});