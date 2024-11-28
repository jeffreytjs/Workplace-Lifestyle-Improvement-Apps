// script.js

let userSelections = {
  mode: null,
  purpose: null,
  dining: null,
  time: null,
  transport: null,
  distance: null,
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
      { text: "Surprise me", next: "result", value: "surprise-me" },
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
      {
        text: "Public Transport",
        next: "step-4",
        value: "public-transport",
      },
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
        description:
          "No time on weekdays? Fret not! Meals that can be prepared in bulk, frozen and reheated.",
        next: "googlefreezer",
        value: "Freezer",
      },
    ],
  },
  {
    id: "step-9",
    question: "Fun activities to do during lunch!",
    options: [
        { text: "Ingredient Challenge", next: "step-10", value: "Ingredient" },
        { text: "Surprise your buds!", next: "step-15", value: "Surprise" },
        { text: "Colour Day", next: "step-16", value: "Colour" },
        { text: "Would you rather?", next: "step-17", value: "Would" },
      ],
  },
  {
    id: "step-10",
    question: "Pick an ingredient and everyone incorporates it into their lunch!",
      options: [
        {
          text: "Eggs", next: "step-11", value: "eggs"
        },
        {
            text: "Kimchi", next: "step-12", value: "kimchi"
        },
        {
            text: "Eggplant", next: "step-13", value: "eggplant"
        },
        {
            text: "Chicken", next: "step-14", value: "chicken"
        },
    ],
  },
  {
    id: "step-11",
    question: "You have selected eggs! ",
    options:[
        {
            text: "Fun fact: Chickens can lay eggs of different colours (white, brown, blue and even green) depending on their breed, but the nutritional value remains the same.", 
            next: "final", 
        },
    ]
  },
  {
    id: "step-12",
    question: "You have selected kimchi! ",
    options:[
        {
            text: "Fun fact: Traditionally, kimchi was fermented underground in large earthern pots called ongi to keep it fresh through Korean winters.", 
            next: "final", 
        },
    ]
  },
  {
    id: "step-13",
    question: "You have selected eggplant! ",
    options:[
        {
            text: "Did you know that eggplants are called Crazy apples in Italy because people believe eating too many can make you insane?", 
            next: "final", 
        },
    ]
  },
  {
    id: "step-14",
    question: "You have selected chicken! ",
    options:[
        {
            text: "Chickens are the closest living relatives to the T-rex.", 
            next: "final", 
        },
    ]
  },
  {
    id: "step-15",
    question: "Trade lunch with your work bud, there are more benefits than you'd expect!",
      options: [
        {
            text: "Opportunity to try out new food",
            next: "final",
        },
        {
          text: "Fosters a sense of community and connection",
          next: "final"
        },
        {
            text: "Stimulates creativity",
            next: "final",
        },
       
    ],
  },
  {
    id: "step-16",
    question: "Choose a colour and everyone's lunch should match it!",
      options: [
        {
          text: "Red",
          next: "final",
        },
        {
            text: "Orange",
            next: "final",
        },
        {
            text: "Green",
            next: "final",
        },
        {
            text: "Brown",
            next: "final",
        },
        {
            text: "Purple",
            next: "final",
        },
    ],
  },
  {
    id: "step-17",
    question: "A series of fun, difficult and quirky decisions!",
      options: [
        {
          text: "Would you rather be the funniest or smartest person in the office ?",
          next: "final"
        },
        {
            text: "Would you rather accidentally send a typo in a company-wide email or forget to attach an important file?",
            next: "final",
        },
        {
            text: "Would you rather never eat chocolate again or never drink coffee again?",
            next: "final",
        },
        {
            text: "Would you rather always have to eat dessert first, or never be able to have dessert again?",
            next: "final",
        },
        {
            text: "Would you rather have unlimited first-class plane tickets or free stays at any hotel?",
            next: "final",
        },
        {
            text: "Would you rather have to sing everything you say or dance everywhere you go?",
            next: "final",
        },
        {
            text: "Would you rather have unlimited energy or need no sleep?",
            next: "final",
        },
    ],
  },
  
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
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "option-main-container";
    question.options.forEach((option) => {
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "option-container";

      const button = document.createElement("button");
      if (option.description) {
        button.innerHTML = `
                <span class="option-text">${option.text}</span>
                <br>
                <span class="option-description">${option.description}</span>
                `;
      } else {
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
      optionsDiv.appendChild(questionDiv);
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
  } else if (nextStep == "googlesimple") {
    showGooglesimple();
  } else if (nextStep == "googlehealthy") {
    showGooglehealthy();
  } else if (nextStep == "googlebudget") {
    showGooglebudget();
  } else if (nextStep == "googlefreezer") {
    showGooglefreezer();
  } else if (nextStep == "final") {
    finalpage();
  }
    else {
    const nextQuestion = questions.find((q) => q.id === nextStep);
    showQuestion(nextQuestion);
    }
  
  }


// Show google
function showGooglesimple() {
  window.location.href =
    "https://www.google.com/search?q=simple+quick+meal+recipe";
}

function showGooglehealthy() {
  window.location.href =
    "https://www.google.com/search?q=healthy+and+nutritious+meal+recipe";
}

function showGooglebudget() {
  window.location.href =
    "https://www.google.com/search?q=budget+friendly+meal+recipe";
}

function showGooglefreezer() {
  window.location.href =
    "https://www.google.com/search?q=freezer+friendly+meal+recipe";
}

function finalpage() {
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("final-container").classList.remove("hidden");
    document.getElementById("final-container").classList.add("fullscreen");
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
    "<2": [
      "Mee Hoon Kueh (Harvest)",
      "Thai (Micron)",
      "$5 Western (HZB Canteen)",
      "Min Jiang Kueh (HZB Canteen)",
      "Korean @ Food Canopy (RP)",
    ],
    "2-5": [
      "Haidilao Hot Pot (Sun Plaza)",
      "Kway Chap (Marsiling mall)",
      "Zhang Liang Mala Tang (Causeway Point)",
    ],
    ">5": [
      "Yew Kee Duck Rice (Bukit Canberra Hawker Centre)",
      "Jinjja Chicken (Northpoint)",
      "Papa Ayam (Northpoint)",
      "Sembawang Traditional Claypot Rice",
    ],
  };

  
  document.getElementById("question-container").classList.add("hidden");
  const resultContainer = document.getElementById("result-container");
  resultContainer.classList.remove("hidden");

  // Display placeholder results
  let distance = userSelections["step-4"];
  if (distance) {
    const foodSpots = places[distance];
    var randomFoodSpot =
      foodSpots[Math.floor(Math.random() * foodSpots.length)];
  } else {
    const distances = Object.keys(places);
    distance = distances[Math.floor(Math.random() * distances.length)];
    const foodSpots = places[distance];
    var randomFoodSpot =
      foodSpots[Math.floor(Math.random() * foodSpots.length)];
  }
  console.log(randomFoodSpot);

  document.getElementById("spot-name").innerText = randomFoodSpot || "Jolibee";
  document.getElementById("distance").innerText = `${distance} km`;
}

// Restart the app
function restart() {
  userSelections = {
    mode: null,
    purpose: null,
    dining: null,
    time: null,
    transport: null,
    distance: null,
    recommendation: null,
  };
  questionHistory = [];
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("welcome-container").classList.remove("hidden");
  document.getElementById("final-container").classList.add("hidden");
}

// Suggest more activities
function moreActivities() {
  showQuestion(questions[8]);
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
}

// Start button event listener
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("welcome-container").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  startApp();
});
