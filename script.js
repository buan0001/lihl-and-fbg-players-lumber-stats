"use strict";

window.addEventListener("load", start);

let playerStatsLIHL;
let playerStatsFBG;
let currentLeague;
let filteredLeague;
let sortBy = "rating";
let filterValue = 0;
let arrowValue = "images/arrowDown.png";
let searchValue;

async function start(params) {
  await getStats();
  currentLeague = playerStatsLIHL;
  filteredLeague = currentLeague;
  showStats(currentLeague);
  document.querySelector("#filter").addEventListener("change", changeFilter);
  document.querySelector("#swap").addEventListener("click", changeLeague);
  document.querySelector("#search").addEventListener("keyup", changeSearch);
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
}

function doTheThings(params) {
  const sorted = doTheSorting();
  const ranked = applyRank(sorted);
  if (searchValue !== undefined) {
    const searched = ranked.filter(applySearch);
    const final = searched.filter(applyFilter);
    console.log("final", final);
    showStats(final);
  } else {
    const final = ranked.filter(applyFilter);
    showStats(final);
  }
}

function changeSearch(event) {
  searchValue = event.target.value;
  doTheThings();
}

function applyRank(array) {
  let n = 1;
  if (arrowValue == "images/arrowUp.png") {
    n = array.length;
  }
  for (const player of array) {
    if (arrowValue == "images/arrowDown.png") {
      player.rank = n;
      n++;
    } else {
      player.rank = n;
      n--;
    }
  }
  return array;
}

function applySearch(player) {
  return player.name.toLowerCase().includes(searchValue);
}

function changeFilter(event) {
  filterValue = event.target.value;
  doTheThings();
}

function applyFilter(player) {
  return player.games >= filterValue;
}

function changeLeague() {
  console.log("change league");
  if (currentLeague === playerStatsLIHL) {
    currentLeague = playerStatsFBG;
  } else {
    currentLeague = playerStatsLIHL;
  }
  doTheThings();
}

function resetArrows(params) {
  sortBy = undefined;
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
  document.querySelectorAll("img").forEach((image) => (image.src = "images/arrowBoth.png"));
}

async function getStats() {
  const promiseLIHL = await fetch("stats/endOfSeasonStatsLIHL.json");
  playerStatsLIHL = await promiseLIHL.json();
  const promiseFBG = await fetch("stats/statsFBG.json");
  playerStatsFBG = await promiseFBG.json();
}

function showStats(finalArray) {
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";

  for (const player of finalArray) {
    const html =
      /*html*/
      `
        <tr>
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.rating}</td>
        <td>${player.games}</td>
        <td>${player.lumberAt7.toFixed(0)}</td>
        <td>${player.lumberAt10.toFixed(0)}</td>
        <td>${player.lumberAt14.toFixed(0)}</td>
        </tr>
        `;
    stats.insertAdjacentHTML("beforeend", html);
  }
}

function changeSort(event) {
  sortBy = event.target.id;
  arrowValue = event.target.attributes[0].value;
  document.querySelectorAll("img").forEach((image) => {
    if (image !== event.target) {
      image.src = "images/arrowBoth.png";
    }
  });

  const imageToUpdate = document.querySelector(`#${event.target.id}`);
  const up = "images/arrowUp.png";
  const down = "images/arrowDown.png";
  const both = "images/arrowBoth.png";

  if (arrowValue == both || arrowValue == up) {
    arrowValue = down;
    imageToUpdate.src = down;
  } else if (arrowValue == down) {
    imageToUpdate.src = up;
    arrowValue = up;
  }

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
  doTheThings();
}

function doTheSorting() {
  const up = "images/arrowUp.png";
  const down = "images/arrowDown.png";
  const both = "images/arrowBoth.png";
  let sortedLeague;
  if (sortBy === "name") {
    if (arrowValue === both || arrowValue === up) {
      sortedLeague = currentLeague.sort(sortByLetter);
    } else if (arrowValue === down) {
      sortedLeague = currentLeague.sort(sortByLetter).reverse();
    }
  } else if (arrowValue === down) {
    sortedLeague = currentLeague.sort(sortByNumber).reverse();
  } else {
    sortedLeague = currentLeague.sort(sortByNumber);
  }
  function sortByNumber(player1, player2) {
    return player1[sortBy] - player2[sortBy];
  }

  function sortByLetter(player1, player2) {
    return player1.name.localeCompare(player2.name);
  }
  return sortedLeague;
}
