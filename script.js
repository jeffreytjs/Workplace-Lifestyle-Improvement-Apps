// Function to dynamically load an app's content
async function loadApp(appName) {
  const contentContainer = document.getElementById("content");
  contentContainer.innerHTML = `<p>Loading ${appName}...</p>`; // Show a loading message

  try {
    // Fetch the app's index.html file
    const response = await fetch(`apps/${appName}/index.html`);
    if (!response.ok) throw new Error(`Failed to load ${appName}`);
    const htmlContent = await response.text();
    contentContainer.innerHTML = htmlContent;

    // Remove existing styles and scripts for previous apps
    document
      .querySelectorAll(".dynamic-style, .dynamic-script")
      .forEach((el) => el.remove());

    // Dynamically load the app's CSS
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = `apps/${appName}/styles.css`;
    styleLink.className = "dynamic-style";
    document.head.appendChild(styleLink);

    // Dynamically load the app's JavaScript
    const scriptTag = document.createElement("script");
    scriptTag.src = `apps/${appName}/script.js`;
    scriptTag.className = "dynamic-script";
    document.body.appendChild(scriptTag);
  } catch (error) {
    // Display error message in case of failure
    contentContainer.innerHTML = `<p>Error loading ${appName}: ${error.message}</p>`;
    console.error(`Error loading ${appName}:`, error);
  }
}

// Set up navigation buttons to load apps
document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const appName = button.getAttribute("data-app");
    loadApp(appName);
  });
});

// Load the first app by default
loadApp("app1");
