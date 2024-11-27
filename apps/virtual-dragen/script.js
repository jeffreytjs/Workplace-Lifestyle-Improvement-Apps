let progress = 0;
const progressBar = document.getElementById('progress-bar');
const pet = document.getElementById('pet');
let isTransitioning = false; // Flag to prevent overlapping transitions
let currentStage = 0; // Tracks the current pet stage (0 to 4)
const petElement = document.getElementById("petstage");

function addProgress(points) {
  if (isTransitioning) return; // Prevent adding progress during transitions

  progress += points;
  if (progress > 100) progress = 100; // Cap progress at 100%

  // Update progress bar width
  progressBar.style.width = `${progress}%`;

  // Determine the current stage based on progress
  const newStage = determineStage(progress);

  // Only update the pet if the stage changes
  if (newStage !== currentStage) {
    currentStage = newStage;
    updatepet(newStage);
  }
}

function determineStage(progress) {
  if (progress < ((100/120)*20)) return 0; // Stage 0
  if (progress < ((100/120)*50)) return 1; // Stage 1
  if (progress < ((100/120)*80)) return 2; // Stage 2
  if (progress < ((100/120)*120)) return 3; // Stage 3
  return 4; // Stage 4 (fully grown)
}

function updatepet(stage) {
  isTransitioning = true;

  // Define stage and transition images
  const stages = ['mir1.webp', 'mir2.webp', 'mir3.webp', 'mir4.webp','mir5.webp'];
  const transitions = ['', 'hatch.png', 'transition.webp', 'transition.webp','transition.webp'];

  // Show the transition image
  pet.src = transitions[stage];
  if (stage === 1) {
    petElement.innerHTML = '<div id="petstage">Wow, something happened!</div>';
  }
  if (stage === 2) {
    petElement.innerHTML = '<div id="petstage">Hm? Something is happening?</div>';
  }
  if (stage === 3) {
    petElement.innerHTML = '<div id="petstage">Hm? Something is happening again?</div>';
  }
  if (stage === 4) {
    petElement.innerHTML = '<div id="petstage">Hm? Something is happening AGAIN?</div>';
  }

  // Wait for 1 second, then switch to the new stage image
  setTimeout(() => {
    pet.src = stages[stage];
    isTransitioning = false;
    if (stage === 1) {
      petElement.innerHTML = '<div id="petstage">Congrats! Your dragen egg hatched into a baby! uwu </div>';
    }
    if (stage === 2) {
      petElement.innerHTML = '<div id="petstage">Cmon, do something to grow your dragen!</div>';
    }
    if (stage === 3) {
      petElement.innerHTML = '<div id="petstage">Keep it up! Your dragen is adulting with you :)</div>';
    }
    if (stage === 4) {
      petElement.innerHTML = '<div id="petstage">Congrats! Your dragen is enjoying retirement now!</div>';
    }
    
  }, 1500); // 1.5-second delay for transition


}


