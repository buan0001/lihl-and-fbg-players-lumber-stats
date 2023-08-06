"use strict";

window.addEventListener("load", start);

let playerStatsLIHL;
let playerStatsFBG;
let currentLeague;
let filteredLeague;

async function start(params) {
  await getStats();
  currentLeague = playerStatsLIHL;
  filteredLeague = currentLeague;
  showStats(currentLeague);
  document.querySelector("#filter").addEventListener("change", changeFilter);
  document.querySelector("#swap").addEventListener("click", changeLeague);
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
}

function changeFilter(event) {
  console.log(event.target.value);
  const value = event.target.value;
  filteredLeague = currentLeague.filter((player) => player.games >= value);
  resetArrows();
  showStats("rating");
}

function changeLeague() {
  console.log("change league");
  if (currentLeague === playerStatsLIHL) {
    currentLeague = playerStatsFBG;
  } else {
    currentLeague = playerStatsLIHL;
  }
  doTheSorting("x", "x", "Y", "x", "rating");
  resetArrows();
  showStats("rating");
}

function resetArrows(params) {
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
  document.querySelectorAll("img").forEach((image) => (image.src = "images/arrowBoth.png"));
}

async function getStats() {
  const promiseLIHL = await fetch("stats/endOfSeasonStatsLIHL.json");
  playerStatsLIHL = await promiseLIHL.json();
  const promiseFBG = await fetch("stats/statsFBG.json");
  playerStatsFBG = await promiseFBG.json();
}

function showStats(id, arrowValue) {
  console.log("current league:", filteredLeague);
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";
  let n;
  console.log("arrow value", arrowValue);
  console.log("id", id);
  if (arrowValue === "images/arrowDown.png" && id !== "name") {
    console.log("@@@@@@@@@@@@@@@@@@");
    n = filteredLeague.length;
  } else {
    n = 1;
  }
  for (const player of filteredLeague) {
    if (id === "name") {
      n = player.rank;
    }
    const html =
      /*html*/
      `
        <tr>
        <td>${n}</td>
        <td>${player.name}</td>
        <td>${player.rating}</td>
        <td>${player.games}</td>
        <td>${player.lumberAt7.toFixed(0)}</td>
        <td>${player.lumberAt10.toFixed(0)}</td>
        <td>${player.lumberAt14.toFixed(0)}</td>
        </tr>
        `;
    stats.insertAdjacentHTML("beforeend", html);
    if (arrowValue === "images/arrowDown.png") {
      n--;
    } else {
      n++;
    }
  }
}

function changeSort(event) {
  document.querySelectorAll("img").forEach((image) => {
    if (image !== event.target) {
      image.src = "images/arrowBoth.png";
    }
  });

  const arrowValue = event.target.attributes[0].value;
  const imageToUpdate = document.querySelector(`#${event.target.id}`);
  const up = "images/arrowUp.png";
  const down = "images/arrowDown.png";
  const both = "images/arrowBoth.png";
  const id = event.target.id;

  if (arrowValue == both || arrowValue == up) {
    console.log("check");
    imageToUpdate.src = down;
  } else if (arrowValue == down) {
    console.log("check 2");
    imageToUpdate.src = up;
  }

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
  doTheSorting(arrowValue, both, down, up, id);
  showStats(id, arrowValue);

  //   const restOfTheArrows = document.querySelectorAll("img").
}

function doTheSorting(arrowValue, both, down, up, id) {
  console.log("do the sorting");
  console.log(arrowValue);
  if (id === "name") {
    // console.log("sort by name");
    if (arrowValue === both || arrowValue === up) {
      filteredLeague.sort(sortByLetter);
    } else if (arrowValue === down) {
      filteredLeague.sort(sortByLetter).reverse();
    }
  } else if (arrowValue === down) {
    console.log("checkasdfjasdfasd@@@");
    // console.log("number down");
    filteredLeague.sort(sortByNumber);
  } else {
    // console.log("number up");
    filteredLeague.sort(sortByNumber).reverse();
  }
  function sortByNumber(player1, player2) {
    return player1[id] - player2[id];
  }

  function sortByLetter(player1, player2) {
    return player1.name.localeCompare(player2.name);
  }
}
