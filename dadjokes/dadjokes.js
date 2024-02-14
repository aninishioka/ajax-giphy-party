"use strict";

const JOKES_CONTAINER = $('#jokes-container');
const JOKES_LIMIT = 10;
const BASE_URL = "https://icanhazdadjoke.com/";

JOKES_CONTAINER.on("click", "button", updateVotes);


async function fetchAndDisplayJokes() {
  const jokes = await fetchJokes();
  displayJokes(jokes);
}

async function fetchJokes() {
  const params = new URLSearchParams({
    limit: JOKES_LIMIT,
   });
  const response = await fetch(`${BASE_URL}search?${params}`, {headers: {
    "Accept": "application/json",
  }});
  const jokesData = await response.json();
  return jokesData.results.map(result => result.joke);
}

function displayJokes(jokes) {
  jokes.forEach(joke => {
    const jokeElem = $(
    `<div class="joke">
      ${joke}
      <span class="votes">0</span>
      <button class="up-vote">Up vote</button>
      <button class="down-vote">Down vote</button>
    </div>`);
    JOKES_CONTAINER.append(jokeElem);
});
}

fetchAndDisplayJokes();

function updateVotes(evt) {
  const buttonClass = $(evt.target).attr("class");
  const $votesElem = $(evt.target).siblings(".votes");
  let votes = Number($votesElem.text());
  if (buttonClass === "up-vote") {
    votes++;
  } else {
    votes--;
  }
  $votesElem.text(votes);
}