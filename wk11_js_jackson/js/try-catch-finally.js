var feed = document.getElementById('feed');
response = ' {"deals": [{"title": "Farrow and Ball",... '

if (response) {
    try {
        var dealData = JSON.parse(response);
        showContent(dealData);
    } catch(e) {
        var errorMessage = e.name + ' ' + e.message;
        console.log(errorMessage);
        feed.innterHTML = '<em>Sorry, could not load deals</em>';
    } finally {
        var link = document.createElement('a');
        link.innerHTML = '<a href="Try-catch-finally.html">reload</a>';
        feed.appendChild(link);
    }
}

//function showContent() to display deals goes here