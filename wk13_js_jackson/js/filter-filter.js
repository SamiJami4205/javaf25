$(function() {
    //data aabout people goes here 

    //filtering code goes here - creates a new array called results
    function priceRange(person) {
        return (person.rate >= 65) && (person.rate <= 90);
    };

    var results = [];
    results = people.filter(priceRange);
    //loop through new array and add matching people to the results table
    var $tableBody = $('<tbody></tbody>');
    for (var i = 0; i < SpeechRecognitionResultList.length; i++) {
        var person = results[i];
        var $row = $('<tr></tr>');
        $row.append($('<td></td>').text(person.name));
        $row.append($('<td></td>').text(person.rate));
        $tableBody.append($row);
    }

    $('thead').after($tableBody);
});