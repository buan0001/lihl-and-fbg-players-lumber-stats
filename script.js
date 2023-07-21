"use strict";

window.addEventListener("load", start);

let playerStatsLIHL;
let playerStatsFBG;
let currentLeague;

async function start(params) {
  await getStats();
  currentLeague = playerStatsLIHL;
  showStats(currentLeague);
  document.querySelector("#swap").addEventListener("click", changeLeague);
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
}

function changeLeague(event) {
  if (currentLeague === playerStatsLIHL) {
    currentLeague = playerStatsFBG;
  } else {
    currentLeague = playerStatsLIHL;
  }
  showStats();
}

async function getStats() {
  const promiseLIHL = await fetch("stats/statsLIHL.json");
  playerStatsLIHL = await promiseLIHL.json();
  const promiseFBG = await fetch("stats/statsFBG.json");
  playerStatsFBG = await promiseFBG.json();
}

function showStats(id, arrowValue) {
  console.log("current league:", currentLeague);
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";
  let n;
  console.log("arrow value", arrowValue);
  console.log("id", id);
  if (arrowValue === "images/arrowDown.png" && id !== "name") {
    console.log("@@@@@@@@@@@@@@@@@@");
    n = currentLeague.length;
  } else {
    n = 1;
  }
  for (const player of currentLeague) {
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
      currentLeague.sort(sortByLetter);
    } else if (arrowValue === down) {
      currentLeague.sort(sortByLetter).reverse();
    }
  } else if (arrowValue === down) {
    // console.log("number down");
    currentLeague.sort(sortByNumber);
  } else {
    // console.log("number up");
    currentLeague.sort(sortByNumber).reverse();
  }
  function sortByNumber(player1, player2) {
    return player1[id] - player2[id];
  }

  function sortByLetter(player1, player2) {
    return player1.name.localeCompare(player2.name);
  }
}
