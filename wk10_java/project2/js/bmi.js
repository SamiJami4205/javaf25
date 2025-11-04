var userName = '';
var bmiHistory = [];

var welcomeSection = document.getElementById('welcome');
var calculatorSection = document.getElementById('calculator');
var historySection = document.getElementById('history');
var userNameDisplay = document.getElementById('userNameDisplay');
var timeDisplay = document.getElementById('currentTime');
var dateDisplay = document.getElementById('currentDate');


var bmiCategories = {
    underweight: {
        min: 0,
        max: 18.5,
        name: 'Underweight',
        image: 'images/underweight.jpg',
        advice: 'You are underweight. Consider consulting a nutritionist for a healthy weight gain plan.'
    },
    normal: {
        min: 18.5,
        max: 24.9,
        name: 'Normal Weight',
        image: 'images/normal.jpg',
        advice: 'Your weight is within normal range. Keep maintaining a healthy lifestyle!'
    },
    overweight: {
        min: 25,
        max: 29.9,
        name: 'Overweight',
        image: 'images/overweight.jpg',
        advice: 'You are overweight. Consider increasing physical activity and watching your diet.'
    },
    obese: {
        min: 30,
        max: Infinity,
        name: 'Obese',
        image: 'images/obese.jpg',
        advice: 'You are in the obese category. Please consult a healthcare provider for a weight management plan.'
    }
};

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    userName = document.getElementById('userName').value;
    userNameDisplay.textContent = userName;
    welcomeSection.classList.add('hidden');
    calculatorSection.classList.remove('hidden');
    updateDateTime();
});

document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateBMI();
});

document.querySelector('nav').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        var targetId = e.target.getAttribute('href').substring(1);
        showSection(targetId);
        
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
    }
});

function showSection(sectionId) {
    var sections = ['calculator', 'history'];
    sections.forEach(function(id) {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    
    if (sectionId === 'history') {
        loadHistory();
    }
}

function calculateBMI() {
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100; 
    
    if (weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values');
        return;
    }
    
    var bmi = weight / (height * height);
    var category = getBMICategory(bmi);
    
    displayResults(bmi, category);
    saveToHistory(bmi, category);
}

function getBMICategory(bmi) {
    for (var key in bmiCategories) {
        if (bmi >= bmiCategories[key].min && bmi < bmiCategories[key].max) {
            return bmiCategories[key];
        }
    }
    return bmiCategories.obese; 
}

function displayResults(bmi, category) {
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = category.name;
    document.getElementById('resultImage').src = category.image;
    document.getElementById('resultImage').alt = category.name + ' body type';
    document.getElementById('healthAdvice').textContent = category.advice;
    document.getElementById('results').classList.remove('hidden');
}

function saveToHistory(bmi, category) {
    var historyItem = {
        date: new Date().toISOString(),
        bmi: bmi,
        category: category.name,
        userName: userName
    };
    
    var history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    history.unshift(historyItem); 
    if (history.length > 10) history.pop(); 
    
    localStorage.setItem('bmiHistory', JSON.stringify(history));
    bmiHistory = history;
}

function loadHistory() {
    var history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    var historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    history.forEach(function(item) {
        var date = new Date(item.date);
        var div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-info">
                <strong>BMI: ${item.bmi.toFixed(1)}</strong> - ${item.category}
            </div>
            <div class="date">${date.toLocaleDateString()}</div>
        `;
        historyList.appendChild(div);
    });
}

function updateDateTime() {
    var now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
    dateDisplay.textContent = now.toLocaleDateString();
}

setInterval(updateDateTime, 1000);

$(document).ready(function() {
    var savedName = localStorage.getItem('userName');
    if (savedName) {
        userName = savedName;
        userNameDisplay.textContent = userName;
        welcomeSection.classList.add('hidden');
        calculatorSection.classList.remove('hidden');
    }
    
    $.getJSON('js/config.json')
        .done(function(data) {
            console.log('Configuration loaded');
        })
        .fail(function(jqXHR, textStatus, error) {
            console.log('Could not load configuration:', error);
        });
});