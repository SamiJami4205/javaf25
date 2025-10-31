let tasks = [];

const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("todoList");
const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clearCompleted");

document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage();
    render();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTask(text);
    input.value = "";
    input.focus();
});

list.addEventListener("click", (e) => {
    const li = e.target.closest("li.item");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.matches("input.checkbox")) {
        toggleComplete(id, e.target.checked);
        return;
    }

    if (e.target.matches("button.delete")) {
        deleteTask(id);
        return;
    }

    if (e.target.matches("button.edit")) {
        enterEditMode(li);
        return;
    }
});

list.addEventListener("keydown", (e) => {
    if (e.target.matches(".label[contenteditable='true']") && e.key === "Enter") {
        e.preventDefault(); 
        commitEdit(e.target.closest("li.item"));
    }
});
list.addEventListener("blur", (e) => {
    if (e.target.matches(".label[contenteditable='true']")) {
        commitEdit(e.target.closest("li.item"));
    }
}, true);

clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed);
    saveToStorage();
    render();
});

function addTask(text) {
    const task = {
        id: String(Date.now()),
        text,
        completed: false
    };
    tasks.unshift(task);
    saveToStorage();
    render();
    }

function toggleComplete(id, done) {
    const t = tasks.find(t => t.id === id);
    if (t) t.completed = done;
    saveToStorage();
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToStorage();
    render();
}

function enterEditMode(li) {
    const label = li.querySelector(".label");
    label.setAttribute("contenteditable", "true");
    label.focus();
    placeCaretAtEnd(label);
}

function commitEdit(li) {
    const id = li.dataset.id;
    const label = li.querySelector(".label");
    const newText = label.textContent.trim();
    if (!newText) {
        deleteTask(id);
        return;
    }
    const t = tasks.find(t => t.id === id);
    if (t) t.text = newText;
    label.removeAttribute("contenteditable");
    saveToStorage();
    render();
}

function render() {
    list.innerHTML = "";

    const frag = document.createDocumentFragment();
    tasks.forEach(task => {
        frag.appendChild(renderItem(task));
    });
    list.appendChild(frag);

    const count = tasks.length;
    counter.textContent = `${count} item${count === 1 ? "" : "s"}`;
}

function renderItem(task) {
    const li = document.createElement("li");
    li.className = `item${task.completed ? " completed" : ""}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} aria-label="Mark complete">
        <div class="label" role="textbox" aria-label="Task text" spellcheck="false">${escapeHtml(task.text)}</div>
        <div class="actions">
        <button class="icon-btn edit" type="button" aria-label="Edit task">Edit</button>
        <button class="icon-btn delete" type="button" aria-label="Delete task">Delete</button>
        </div>
    `;
    return li;
}

function saveToStorage() {
    localStorage.setItem("week7_tasks", JSON.stringify(tasks));
    }
    function loadFromStorage() {
    try {
        const raw = localStorage.getItem("week7_tasks");
        tasks = raw ? JSON.parse(raw) : [];
    } catch {
        tasks = [];
    }
}

function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
function placeCaretAtEnd(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
