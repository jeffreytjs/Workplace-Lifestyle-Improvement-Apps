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
        question: "Dine in or eat out?",
        options: [
            { text: "Dine In", next: "step-6", value: "dine-in" },
            { text: "Eat Out", next: "step-2", value: "eat-out" },
        ],
    },
    {
        id: "step-2",
        question: "How much time do you have?",
        options: [
            { text: "30 minutes", next: "step-3", value: "30-minutes" },
            { text: "1 hour", next: "step-3", value: "1-hour" },
            { text: "1.5 hours", next: "step-3", value: "1.5-hours" },
            { text: "2 hours or more", next: "step-3", value: "2-hours" },
        ],
    },
    {
        id: "step-3",
        question: "What is your mode of transport?",
        options: [
            { text: "Walking", next: "step-4", value: "walking" },
            { text: "Public Transport", next: "step-4", value: "public-transport" },
            { text: "Driving", next: "step-4", value: "driving" },
        ],
    },
    {
        id: "step-4",
        question: "Maximum distance willing to travel (in km)?",
        options: [
            { text: "<2", next: "step-5", value: "<2" },
            { text: "2-5", next: "step-5", value: "2-5" },
            { text: ">5", next: "step-5", value: ">5" },
        ],

        next: "step-5",
    },
    {
        id: "step-5",
        question: "What are you feeling?",
        options: [
            {
                text: "Illuminion's food guide",
                description: "Popular food options amongst your colleagues.",
                next: "result",
                value: "Illuminion's",
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
        id: "step-6",
        question: "Food delivery or meal prep?",
        options: [
            { text: "Food delivery", next: "step-7", value: "Food-delivery" },
            { text: "Meal prep", next: "step-8", value: "Meal-prep" },
        ],
    },
    {
        id: "step-7",
        question: "What are you feeling?",
        options: [
            {
                text: "Illuminion's food guide",
                description: "Popular food options amongst your colleagues.",
                next: "result",
                value: "Illuminion's",
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
        id: "step-8",
        question: "Meal prep ideas",
        options: [
            {
                text: "Simple & Quick",
                description: "Ideal for beginners or busy people!",
                next: "googlesimple",
                value: "Simple",
            },
            {
                text: "Healthy & Nutritious",
                description: "Healthy and delicious recipes to keep you fueled!",
                next: "googlehealthy",
                value: "Healthy",
            },
            {
                text: "Budget-Friendly",
                description: "Inexpensive and cost-effective meals.",
                next: "googlebudget",
                value: "Budget",
            },
            {
                text: "Freezer Friendly",
                description: "No time on weekdays? Fret not! Meals that can be prepared in bulk, frozen and reheated.",
                next: "googlefreezer",
                value: "Freezer",
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
    } 
    
    
    else if (nextStep == "googlesimple") {
        showGooglesimple();
    } 
    else if (nextStep == "googlehealthy") {
        showGooglehealthy();
    } 
    else if (nextStep == "googlebudget") {
        showGooglebudget();
    } 
    else if (nextStep == "googlefreezer") {
        showGooglefreezer();
    } 
  
    else {
        
    } {
        const nextQuestion = questions.find((q) => q.id === nextStep);
        showQuestion(nextQuestion);
    }
    
}

// Show google
function showGooglesimple() {
    window.location.href = "https://www.google.com/search?q=simple+quick+meal+recipe";
}

function showGooglehealthy() {
    window.location.href = "https://www.google.com/search?q=healthy+and+nutritious+meal+recipe";
}

function showGooglebudget() {
    window.location.href = "https://www.google.com/search?q=budget+friendly+meal+recipe";
}

function showGooglefreezer() {
    window.location.href = "https://www.google.com/search?q=freezer+friendly+meal+recipe";
}



// Navigate to the previous question
function goBack() {
    const previousQuestionId = questionHistory.pop();
    const previousQuestion = questions.find((q) => q.id === previousQuestionId);
    showQuestion(previousQuestion);
}


// Show result
function showResult() {
    const places = {
        "<2": ["Place A (nearby)", "Place B (within 2 km)", "Place C (short walk)"],
        "2-5": ["Place D (moderate distance)", "Place E (within 5 km)", "Place F (bike ride)"],
        ">5": ["Place G (long drive)", "Place H (outskirts)", "Place I (explore further)"],
    };
    const distance = questions.find((q) => q.id === nextStep);
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