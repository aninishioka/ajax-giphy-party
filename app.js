console.log("Let's get this party started!");

/**
 * event listener on submit button
 * grab search input
 * create parameters object
 * use parameters to fetch
 * handle response
 * put response on page
 */

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

/** Grabs search input from form and fetch gif data from giphy. */
async function getGif() {
  const searchInput = $("#search-input").val();
  const params = new URLSearchParams({
    q: searchInput,
    limit: "1",
    api_key: "BdtCGyMWhBe2CpRs68q8DzWVZabQi9j5"
  });

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const gifData = await response.json();
  const gif = gifData.data[0].images.original.url;
  return gif;
}

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