'use strict';
console.log("Let's get this party started!");

/**
 * pseudocode:
 * event listener on submit button
 * grab search input
 * create parameters object
 * use parameters to fetch
 * handle response
 * put response on page
 */

const GIF_LIMIT = "5";
const GIPHY_API_KEY = "BdtCGyMWhBe2CpRs68q8DzWVZabQi9j5"

//TODO: add $ to var names
const submitButton = $("#submit-button");
const clearButton = $("#clear-button");
submitButton.on("click", getAndDisplayGif);
clearButton.on("click", clearGifs);

/** Gets search input, fetches gif, and displays in DOM. */
async function getAndDisplayGif(evt) {
  evt.preventDefault();
  const gif = await getGif();
  displayGif(gif);
}
//TODO: make API key to global constant
//TODO: save base url to global constant
/** Grabs search input from form and fetch gif data from giphy. */
async function getGif() {
  const searchInput = $("#search-input").val();
  const params = new URLSearchParams({
    q: searchInput,
    limit: GIF_LIMIT,
    api_key: GIPHY_API_KEY
  });

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const gifData = await response.json();
  console.log(gifData);
  //TODO: change to gifUrl
  const gifArray = gifData.data.map(gif => gif.images.original.url);
  const gifUrlIndex = Math.round(Math.random() * 4);
  console.log(gifUrlIndex);
  return gifArray[gifUrlIndex];
}

//TODO: gif container to global constant
//TODO: add $ to image variable name
/** Takes url for gif and display gif in DOM. */
function displayGif(gif) {
  const image = $("<img>");
  image.attr("src", gif);
  $("#gif-container").append(image);
}

/** Clears all gifs from DOM. */
function clearGifs() {
  $("#gif-container").clear();
}