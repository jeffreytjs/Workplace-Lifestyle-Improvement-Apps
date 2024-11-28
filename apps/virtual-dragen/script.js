let progress = 0;
const progressBar = document.getElementById("progress-bar");
const pet = document.getElementById("pet");
let isTransitioning = false; // Flag to prevent overlapping transitions
let currentStage = 0; // Tracks the current pet stage (0 to 4)
const petElement = document.getElementById("petstage");
let currentPetName;
let currentProgress;
// Define stage and transition images
const stages = [
  "mir1.webp",
  [
    "mir2.webp",
    '<div id="petstage">Congrats! Your dragen egg hatched into a baby! uwu </div>',
  ],
  [
    "mir3.webp",
    '<div id="petstage">Your dragen grew! Continue doing tasks to grow your dragen even more!</div>',
  ],
  [
    "mir4.webp",
    '<div id="petstage">Keep it up! Your dragen is adulting with you :)</div>',
  ],
  [
    "mir5.webp",
    '<div id="petstage">Congrats! Your dragen is all grown up now!</div>',
  ],
];

// Prompt for pet name on load
window.onload = async () => {
  currentPetName = localStorage.getItem("petName");
  currentProgress = localStorage.getItem("progress");

  if (!currentPetName) {
    currentPetName = prompt("Name your pet (must be unique):");

    while (!currentPetName) {
      currentPetName = prompt(
        "The name is invalid or already taken. Please enter a unique pet name:"
      );
    }

    // Save pet name locally and in Firebase
    localStorage.setItem("petName", currentPetName);
    alert(`Your pet "${currentPetName}" is ready to grow with you!`);
  }

  // Update the header with the pet's name
  const greetings = [
    "IS HYPED UP AND READY TO COMPLETE TASKS!! ",
    "IS WAVING AT YOU, WAVE BACK?",
    "IS EXCITED TO SEE YOU!",
    "THINKS THAT YOU DESERVE BBT TODAY",
    "FLIES OVER AND GIVES YOU A HUG",
    "IS SIPPING WATER AND THINKS YOU SHOULD TOO",
  ];
  const petNameHeader = document.getElementById("pet-name-header");
  if (petNameHeader) {
    let randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    petNameHeader.textContent = `${currentPetName} ${randomGreeting}`;
  }

  if (currentProgress) {
    progress = parseInt(currentProgress);
    progressBar.style.width = `${progress}%`;

    const newStage = determineStage(progress);
    currentStage = newStage;
    console.log(newStage);
    // Initialize accordingly
    if (progress < 20) {
      pet.src = stages[0];
    } else {
      pet.src = stages[currentStage][0];
      petElement.innerHTML = stages[currentStage][1];
    }
  }
};

function addProgress(points) {
  if (!currentPetName) {
    alert("Please name your pet first!");
    return;
  }

  if (isTransitioning) return; // Prevent adding progress during transitions

  progress += points;
  if (progress > 100) progress = 100; // Cap progress at 100%
  localStorage.setItem("progress", progress.toString());
  console.log(progress);

  // Update progress bar width
  progressBar.style.width = `${progress}%`;

  if (progress === 100) {
    // Congratulatory prompt
    alert(
      "🎉 Congratulations! You've reached 100% progress! Stay tuned for more updates, maybe more unlockable rewards and fashion items?"
    );
  }
  // Determine the current stage based on progress
  const newStage = determineStage(progress);

  // Only update the pet if the stage changes
  if (newStage !== currentStage) {
    currentStage = newStage;
    updatepet(newStage);
  }
}

function determineStage(progress) {
  if (progress < (100 / 120) * 20) return 0; // Stage 0
  if (progress < (100 / 120) * 50) return 1; // Stage 1
  if (progress < (100 / 120) * 80) return 2; // Stage 2
  if (progress < (100 / 120) * 120) return 3; // Stage 3
  return 4; // Stage 4 (fully grown)
}

function updatepet(stage) {
  isTransitioning = true;
  const transitions = [
    "",
    ["mir1-2.gif", "hatch.png"], // Two images for stage 1 transition
    "mir2-3.gif",
    "mir3-4.gif",
    "mir4-5.gif",
  ];

  // Special case for stage 1 transition with two images
  pet.src = stages[stage - 1];
  if (stage === 1) {
    petElement.innerHTML =
      '<div id="petstage">Oh? Something is happening..</div>';
    pet.src = transitions[stage][0];

    // Wait for 1 second, then show the second transition image
    setTimeout(() => {
      pet.src = transitions[stage][1];
      petElement.innerHTML = '<div id="petstage">Wow, look at that!</div>';
    }, 2500); // 1-second delay for the first image
    setTimeout(() => {
      pet.src = stages[stage][0];
      petElement.innerHTML = stages[stage][1];
      isTransitioning = false;
    }, 4500);
  }
  // Default behavior for other stages
  if (stage === 2) {
    petElement.innerHTML =
      '<div id="petstage">Hm.. something is happening?</div>';
    pet.src = transitions[stage];

    setTimeout(() => {
      pet.src = stages[stage][0];
      petElement.innerHTML = stages[stage][1];
      isTransitioning = false;
    }, 2500);
  }
  if (stage === 3) {
    petElement.innerHTML =
      '<div id="petstage">Hm? Something is happening again?</div>';
    pet.src = transitions[stage];

    setTimeout(() => {
      pet.src = stages[stage][0];
      petElement.innerHTML = stages[stage][1];
      isTransitioning = false;
    }, 2500);
  }
  if (stage === 4) {
    petElement.innerHTML =
      '<div id="petstage">Something is happening AGAIN!</div>';
    pet.src = transitions[stage];

    setTimeout(() => {
      pet.src = stages[stage][0];
      petElement.innerHTML = stages[stage][1];
      isTransitioning = false;
    }, 2500);
  }
}
