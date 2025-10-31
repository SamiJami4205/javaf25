function showEvents(data) {
    var newContent = '';

    for (var i = 0; i < responseObject.events.length; i++){
            newContent += '<div class="event">';
            newContent += '<img src"' + responseObject.events[i].map + '" ';
            newContent += 'alt="' + responseObject.events[i].location + '" />';
            newContent += '<p><b>' + responseObject.events[i].location + '</b><br>';
            newContent += responseObject.events[i].date + '</p>';
            newContent += '</div>';
        }
        document.getElementById('content').innerHTML = newContent; }
