var width = 12;
var height = 'test';

function calculateArea(width, height) {
    try{
        var area = width * height;
        if (!isNaN(area)) {
            return area;
        } else {
            throw new Error('calculateArea() received invalid number');
        }
    } catch(e) {
        console.log(e.name + ' ' + e.message);
        return 'We were unable to calculate the area.';
    }
}

//try to show the area on the page
document.getElementById('area').innerHTML = calculaterArea(width, height);