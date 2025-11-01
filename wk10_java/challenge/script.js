var API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');
var submitBtn = document.getElementById('submit');
var nextBtn = document.getElementById('next');
var feedbackEl = document.getElementById('feedback');
var scoreValueEl = document.getElementById('score-value');
var qnumEl = document.getElementById('qnum');

let currentQuestion = null;
let selectedAnswer = null;
let score = 0;
let qnum = 0;

function decodeHTML(html){
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffle(array){

    for(var i = array.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function clearState(){
    selectedAnswer = null;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    feedbackEl.textContent = '';
    answersEl.innerHTML = '';
}

function renderQuestion(data){
    clearState();
    currentQuestion = data;
    qnum++;
    qnumEl.textContent = qnum;

    questionEl.textContent = decodeHTML(data.question);

    var choices = data.incorrect_answers.slice();
    choices.push(data.correct_answer);
    shuffle(choices);

    choices.forEach(choice => {
        var div = document.createElement('div');
        div.className = 'answer';
        div.tabIndex = 0;
        div.textContent = decodeHTML(choice);
        div.dataset.value = choice;

        div.addEventListener('click', () => selectAnswer(div));
        div.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') selectAnswer(div);
        });

        answersEl.appendChild(div);
    });
}

function selectAnswer(el){
    var children = answersEl.querySelectorAll('.answer');
    children.forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedAnswer = el.dataset.value;
    submitBtn.disabled = false;
}

function fetchQuestion(){
    questionEl.textContent = 'Loading question...';
    clearState();

    fetch(API_URL)
        .then(resp => resp.json())
        .then(json => {
        if(json.response_code !== 0 || !json.results || json.results.length === 0){
            questionEl.textContent = 'Could not fetch a question. Try again.';
            return;
        }
        renderQuestion(json.results[0]);
        })
        .catch(err => {
        console.error(err);
        questionEl.textContent = 'Error fetching question.';
        });
}

function checkAnswer(){
    if(!selectedAnswer || !currentQuestion) return;

    var correct = currentQuestion.correct_answer;

    var nodes = answersEl.querySelectorAll('.answer');
    nodes.forEach(n => {
        var val = n.dataset.value;
        if(val === correct){
        n.classList.add('correct');
        }
        if(n.dataset.value === selectedAnswer && selectedAnswer !== correct){
        n.classList.add('wrong');
        }
        n.classList.remove('selected');

        n.style.pointerEvents = 'none';
    });

    if(selectedAnswer === correct){
        feedbackEl.textContent = 'Correct!';
        score++;
        scoreValueEl.textContent = score;
    } else {
        feedbackEl.textContent = 'Wrong. Correct answer: ' + decodeHTML(correct);
    }

    submitBtn.disabled = true;
    nextBtn.disabled = false;
}

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', fetchQuestion);

fetchQuestion();
