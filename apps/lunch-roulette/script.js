// script.js

let userSelections = {
    mode: null,
    purpose: null,
    dining: null,
    time: null,
    transport: null,
    distance: null,
    cuisine: null,
    recommendation: null,
};

// Track question history for back navigation
let questionHistory = [];

// Questions array
const questions = [
    {
        id: "step-1",
        question: "Is this for an individual or a team?",
        options: [
            { text: "Individual", next: "step-3", value: "individual" },
            { text: "Team", next: "step-2", value: "team" },
        ],
    },
    {
        id: "step-2",
        question: "What is the purpose of the team lunch?",
        options: [
            { text: "Informal Work Discussion", next: "step-3", value: "informal" },
            { text: "Team Cohesiveness", next: "step-3", value: "cohesiveness" },
            { text: "Networking", next: "step-3", value: "networking" },
            { text: "Celebrations", next: "step-3", value: "celebrations" },
            { text: "Problem Solving", next: "step-3", value: "problem-solving" },
            { text: "Onboarding New Members", next: "step-3", value: "onboarding" },
        ],
    },
    {
        id: "step-3",
        question: "Dine in or eat out?",
        options: [
            { text: "Dine In", next: "step-9", value: "dine-in" },
            { text: "Eat Out", next: "step-4", value: "eat-out" },
        ],
    },
    {
        id: "step-4",
        question: "How much time do you have?",
        options: [
            { text: "30 minutes", next: "step-5", value: "30-minutes" },
            { text: "1 hour", next: "step-5", value: "1-hour" },
            { text: "1.5 hours", next: "step-5", value: "1.5-hours" },
            { text: "2 hours or more", next: "step-5", value: "2-hours" },
        ],
    },
    {
        id: "step-5",
        question: "What is your mode of transport?",
        options: [
            { text: "Walking", next: "step-6", value: "walking" },
            { text: "Public Transport", next: "step-6", value: "public-transport" },
            { text: "Driving", next: "step-6", value: "driving" },
        ],
    },
    {
        id: "step-6",
        question: "Maximum distance willing to travel (in km)?",
        input: true,
        next: "step-7",
    },
    {
        id: "step-7",
        question: "Preferred Cuisine?",
        options: [
            { text: "Singaporean", next: "step-8", value: "singaporean" },
            { text: "Chinese", next: "step-8", value: "chinese" },
            { text: "Indian", next: "step-8", value: "indian" },
            { text: "Malay", next: "step-8", value: "malay" },
            { text: "Japanese", next: "step-8", value: "japanese" },
            { text: "Korean", next: "step-8", value: "korean" },
            { text: "Western", next: "step-8", value: "western" },
            { text: "Thai", next: "step-8", value: "thai" },
            { text: "Healthy", next: "step-8", value: "healthy" },
            { text: "Vegetarian/Vegan", next: "step-8", value: "vegetarian-vegan" },
        ],
    },
    {
        id: "step-8",
        question: "What are you feeling?",
        options: [
            {
                text: "Illuminion's food guide",
                description: "Choose from popular nearby options known to your colleagues.",
                next: "result",
                value: "Illuminion's",
            },
            {
                text: "Iconic",
                description: "Pick a dish that is a must-try in your selected cuisine.",
                next: "result",
                value: "Iconic",
            },
            {
                text: "Adventurous..?",
                description: "Try something completely random and explore!",
                next: "result",
                value: "Adventurous",
            },
        ],
    },
    {
        id: "step-9",
        question: "Food delivery or meal prep?",
        options: [
            { text: "Food delivery", next: "step-10", value: "Food-delivery" },
            { text: "Meal prep", next: "step-12", value: "Meal-prep" },
        ],
    },
    {
        id: "step-10",
        question: "Preferred Cuisine?",
        options: [
            { text: "Singaporean", next: "step-11", value: "singaporean" },
            { text: "Chinese", next: "step-11", value: "chinese" },
            { text: "Indian", next: "step-11", value: "indian" },
            { text: "Malay", next: "step-11", value: "malay" },
            { text: "Japanese", next: "step-11", value: "japanese" },
            { text: "Korean", next: "step-11", value: "korean" },
            { text: "Western", next: "step-11", value: "western" },
            { text: "Thai", next: "step-11", value: "thai" },
            { text: "Healthy", next: "step-11", value: "healthy" },
            { text: "Vegetarian/Vegan", next: "step-11", value: "vegetarian-vegan" },
        ],
    },
    {
        id: "step-11",
        question: "What are you feeling?",
        options: [
            {
                text: "Illuminion's food guide",
                description: "Choose from popular options known to your colleagues.",
                next: "result",
                value: "Illuminion's",
            },
            {
                text: "Iconic",
                description: "Pick a dish that is a must-try in your selected cuisine.",
                next: "result",
                value: "Iconic",
            },
            {
                text: "Adventurous..?",
                description: "Try something completely random and explore!",
                next: "result",
                value: "Adventurous",
            },
        ],
    }, 
    {
        id: "step-12",
        question: "Meal prep ideas",
        options: [
            {
                text: "Simple",
                description: "Choose from popular options known to your colleagues.",
                next: "result",
                value: "Simple",
            },
           
            {
                text: "Healthy",
                description: "Healthy and delicious recipes to keep you fueled!",
                next: "result",
                value: "Healthy",
            },
            {
                text: "Budget",
                description: "Try something completely random and explore!",
                next: "result",
                value: "Budget",
            },
            {
                text: "Illuminion's all time favourite",
                description: "Pick a dish that is a must-try in your selected cuisine.",
                next: "result",
                value: "Illuminion's",
            },
        ]
    }            
];

// Start the app
function startApp() {
    showQuestion(questions[0]);
}

// Show a question dynamically
function showQuestion(question) {
    const container = document.getElementById("question-container");
    container.innerHTML = ""; // Clear existing content

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const title = document.createElement("h2");
    title.innerText = question.question;
    questionDiv.appendChild(title);

    if (question.options) {
        question.options.forEach((option) => {
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "option-container";

            const button = document.createElement("button");
            if(option.description) {
                button.innerHTML = `
                <span class="option-text">${option.text}</span>
                <br>
                <span class="option-description">${option.description}</span>
                `;
            }
            else {
                button.innerHTML = `
                <span class="option-text">${option.text}</span>
                `;
            }
            button.className = "option-button";
            button.addEventListener("click", () => {
                handleAnswer(question.id, option.value, option.next);
            });

            buttonDiv.appendChild(button);

            questionDiv.appendChild(buttonDiv);
        });
    } else if (question.input) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Enter distance (km)";
        const button = document.createElement("button");
        button.innerText = "Next";
        button.addEventListener("click", () => {
            const distance = parseFloat(input.value);
            if (!distance || distance <= 0) {
                alert("Please enter a valid distance.");
                return;
            }
            handleAnswer(question.id, distance, question.next);
        });

        questionDiv.appendChild(input);
        questionDiv.appendChild(button);
    }

    // Add "Back" button if there is a question history
    if (questionHistory.length > 0) {
        const backButton = document.createElement("button");
        backButton.innerText = "Back";
        backButton.classList.add("back-button");
        backButton.addEventListener("click", () => {
            goBack();
        });
        questionDiv.appendChild(backButton);
    }

    container.appendChild(questionDiv);
}

// Handle user response
function handleAnswer(questionId, answer, nextStep) {
    userSelections[questionId] = answer;
    questionHistory.push(questionId);

    if (nextStep === "result") {
        showResult();
    } else {
        const nextQuestion = questions.find((q) => q.id === nextStep);
        showQuestion(nextQuestion);
    }
}

// Navigate to the previous question
function goBack() {
    const previousQuestionId = questionHistory.pop();
    const previousQuestion = questions.find((q) => q.id === previousQuestionId);
    showQuestion(previousQuestion);
}

// Show result
function showResult() {
    document.getElementById("question-container").classList.add("hidden");
    const resultContainer = document.getElementById("result-container");
    resultContainer.classList.remove("hidden");

    // Display placeholder results
    document.getElementById("spot-name").innerText = "A Great Lunch Spot";
    document.getElementById("cuisine-type").innerText =
        userSelections["step-7"] || "Any Cuisine";
    document.getElementById("recommendation").innerText =
        userSelections["step-8"] || "Any Recommendation";
    document.getElementById("travel-info").innerText = `Mode: ${
        userSelections["step-5"]
    }, Distance: ${userSelections["step-6"]} km`;
}

// Restart the app
function restart() {
    userSelections = {};
    questionHistory = [];
    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("welcome-container").classList.remove("hidden");
}

// Start button event listener
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("welcome-container").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    startApp();
});