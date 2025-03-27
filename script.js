const bitsyContainer = document.getElementById("bitsyContainer");
const generateButton = document.getElementById("generateButton");

// Arrays of different Bitsy parts (PNG files)
const heads = ["expression-1.png", "expression-2.png", "expression-3.png", "expression-4.png", "expression-5.png", "expression-6.png", "expression-7.png", "expression-8.png", "expression-9.png", "expression-10.png", "expression-11.png", "expression-12.png", "expression-13.png", "expression-14.png", "expression-15.png"];
const bodies = ["body-1.png", "body-2.png", "body-3.png", "body-4.png", "body-5.png"];
const feet = ["foot-1.png", "foot-2.png", "foot-3.png", "foot-4.png","foot-5.png","foot-6.png", "foot-7.png","foot-8.png"];
const handL = ["hand-1L.png", "hand-2L.png", "hand-3L.png", "hand-4L.png", "hand-5L.png", "hand-6L.png", "hand-7L.png", "hand-8L.png"];
const handR = ["hand-1R.png", "hand-2R.png", "hand-3R.png", "hand-4R.png", "hand-5R.png", "hand-6R.png", "hand-7R.png", "hand-8R.png"];
const backgrounds = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg"];
const names = ["Captain Giggles", "Pixel McBitsy", "Sir Fluffington", "The Doodle King", "Professor Scribbles", "Ziggy Zog", "Mister Bloop", "Glitchy McGlow", "Doodletron 3000", "Blinky Bits", "Wobble Wizard"];

let generatedName = ""; // Store the generated name

// Function to get a random element from an array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a random Bitsy
function generateBitsy() {
    // Select random parts
    const head = getRandomElement(heads);
    const body = getRandomElement(bodies);
    const foot = getRandomElement(feet);
    const leftHand = getRandomElement(handL);
    const rightHand = getRandomElement(handR);
    const background = getRandomElement(backgrounds);
    generatedName = getRandomElement(names); // Assign the generated name

    // Create an image container with the name included
    bitsyContainer.innerHTML = `
        <div class="bitsy">
            <img src="assets/${background}" class="bitsy-bg" alt="Bitsy Background">
            <img src="assets/${body}" class="bitsy-body" alt="Bitsy Body">
            <img src="assets/${head}" class="bitsy-head" alt="Bitsy Head">
            <img src="assets/${leftHand}" class="bitsy-handL" alt="Bitsy Left Hand">
            <img src="assets/${rightHand}" class="bitsy-handR" alt="Bitsy Right Hand">
            <img src="assets/${foot}" class="bitsy-foot" alt="Bitsy Foot">
            <div id="bitsy-name" class="bitsy-name">🎲 Name: ${generatedName}</div>
        </div>
    `;
}

// Add event listener for the button (fixed duplicate issue)
generateButton.addEventListener("click", function () {
    generateBitsy();

    // Scroll down smoothly to the generated Bitsy
    setTimeout(() => {
        document.getElementById("bitsyContainer").scrollIntoView({ behavior: "smooth" });
    }, 200);
});

// Function to capture and download the image
document.getElementById("shareButton").addEventListener("click", function () {
    html2canvas(bitsyContainer, { useCORS: true, allowTaint: false }).then(canvas => {
        const ctx = canvas.getContext("2d");
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ED9455"; 
        ctx.textAlign = "center";
        ctx.fillText("🎲 Name: " + generatedName, canvas.width / 2, canvas.height - 20);
        
        let imageURL = canvas.toDataURL("image/png");

        // Create a download link
        let downloadLink = document.createElement("a");
        downloadLink.href = imageURL;
        downloadLink.download = "MyBitsy.png";
        downloadLink.click();  // Trigger download

        // Tweet with a link (user uploads the image manually)
        let tweetText = encodeURIComponent("Check out my Bitsy creation! #SaharaLabs #Bitsy #SarahaLabsAI #BitsyGenerator @SaharaLabsAI");
        let tweetURL = `https://twitter.com/intent/tweet?text=${tweetText}&url=https://bitsy-generator.vercel.app/`;

        window.open(tweetURL, "_blank");  // Open Twitter share
    });
});
