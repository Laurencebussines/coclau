// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

let currentQuestionIndex = 0;
let userResponses = [];

document.addEventListener("DOMContentLoaded", function () {
    autoReply("Bună! Cu ce te pot ajuta astăzi?");
});

const botQuestions = [
     "Buna ziua! Cum vă pot ajuta astăzi?",
"Mulțumim pentru întrebarea ta! Echipa noastră este aici să te sprijine.",
    "Dacă ești interesat/ă de ofertele noastre speciale sau ai alte întrebări, te rog să nu eziti să întrebi",
    "De asemenea, vreau să te informez că unul dintre operatorii noștri amabili va lua legătura cu tine în curând pentru a-ți oferi asistența necesară. Îți dorim o zi minunată! 😊 ",
"Îmi pare rău, momentan toți operatorii noștri sunt ocupați.Dacă ai nevoie de ajutor imediat, sună-ne la 0727159340",
"Îți mulțumim pentru răbdare! 👷‍♂️👷‍♀️📞",
    // Adaugă mai multe întrebări pentru bot aici
];

textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length;

    if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';
    } else {
        chatboxForm.style.alignItems = 'center';
    }
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage();
        setTimeout(autoReply, 1000);
    }
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function writeMessage() {
    const today = new Date();
    let message = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">
                ${textarea.value.trim().replace(/\n/g, '<br>\n')}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    chatboxForm.style.alignItems = 'center';
    textarea.rows = 1;
    textarea.focus();
    textarea.value = '';
    chatboxNoMessage.style.display = 'none';
    scrollBottom();
}

function autoReply() {
    const today = new Date();
    let message;

    if (currentQuestionIndex < botQuestions.length) {
        // Bot-ul pune întrebări
        message = `
            <div class="chatbox-message-item received">
                <span class="chatbox-message-item-text">
                    ${botQuestions[currentQuestionIndex]}
                </span>
                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            </div>
        `;
    } else {
        // Bot-ul răspunde la întrebările tale
        message = `
            <div class="chatbox-message-item received">
                <span class="chatbox-message-item-text">
                    ${getBotResponse()}
                </span>
                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
            </div>
        `;
    }

    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    currentQuestionIndex++;
    scrollBottom();
}

function getBotResponse() {
    // Aici poți adăuga logica pentru a genera răspunsurile bot-ului în funcție de răspunsurile tale anterioare.
    // De exemplu, dacă ai răspuns cu un fruct, bot-ul poate răspunde cu un alt fruct, și tot așa.

    // În exemplu simplu, vom folosi un array fix de răspunsuri pentru demonstrație.
    const responses = [
        "Vom răspunde imediat. O zi frumoasă!.",
        // Adaugă mai multe răspunsuri ale bot-ului aici
    ];

    if (userResponses.length < responses.length) {
        return responses[userResponses.length];
    } else {
        return "Nu știu ce să mai spun. Ai răspunsuri interesante!";
    }
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');

    return text.length > 0;
}
