const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");

//NASA API
const count = 1;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
  resultsArray.forEach((result) => {
    // Card container
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View full image";
    link.target = "_blank"; //Open link in new tab
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA picture of the day";
    image.loading = "lazy"; // lazy loading
    image.classList.add("card-img-top");
    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    cardTitle.style.textAlign = "center";
    // Card text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright; // In case it's not properly loaded
    const copyright = document.createElement("span");
    copyright.textContent = ` ${result.copyright}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
    console.log(card);
  });
}

//Get images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {
    // Catch error here
  }
}

//On load
getNasaPictures();
