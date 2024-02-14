console.log("Let's get this party started!");

/**
 * event listener on submit button
 * grab search input
 * create parameters object
 * use parameters to fetch
 * handle response
 * put response on page
 */

const submitButton = $("#submit-button")
submitButton.on("click", getGif);

async function getGif(evt) {
  evt.preventDefault();

  const searchInput = $("#search-input").val();
  const params = new URLSearchParams({
    q: searchInput,
    limit: "1",
    api_key: "BdtCGyMWhBe2CpRs68q8DzWVZabQi9j5"});
  console.log(params);

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const gif = await response.json();
  console.log(gif);
  //displayGif(gif.images.original.url);
}