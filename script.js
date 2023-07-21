"use strict";

window.addEventListener("load", start);

let playerStats;

async function start(params) {
  playerStats = await getStats();
  console.log(playerStats);
  //   playerStats.sort(sortByNumber).reverse();
  console.log(playerStats);
  showStats(playerStats);

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
}

async function getStats(params) {
  const promise = await fetch("statsLIHL.json");
  return promise.json();
}

function showStats(playerArray, id, arrowValue) {
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";
  let n;
  console.log("id", id);
  if (arrowValue === "images/arrowDown.png" && id !== "name") {
    console.log("@@@@@@@@@@@@@@@@@@");
    n = playerArray.length;
  } else {
    n = 1;
  }
  for (const player of playerArray) {
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
  //   console.log("event target@@@@@", event.target);
  //   console.log(event);
  //   console.log(event.target.id);
  //   console.log(event.target.attributes);
  //   console.log(event.target.attributes[0]);
  //   console.log(event.target.attributes[0].value);
  //   console.log(event.target.attributes[0].value == "images/arrowBoth.png");

  const arrowValue = event.target.attributes[0].value;
  const imageToUpdate = document.querySelector(`#${event.target.id}`);
  const up = "images/arrowUp.png";
  const down = "images/arrowDown.png";
  const both = "images/arrowBoth.png";
  const id = event.target.id;
  //   console.log(event.target);
  if (arrowValue == both || arrowValue == up) {
    console.log("check");
    imageToUpdate.src = down;
  } else if (arrowValue == down) {
    console.log("check 2");
    imageToUpdate.src = up;
  }

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
  doTheSorting(arrowValue, both, down, up, id);
  showStats(playerStats, id, arrowValue);

  //   const restOfTheArrows = document.querySelectorAll("img").
}

function doTheSorting(arrowValue, both, down, up, id) {
  console.log("do the sorting");
  console.log(arrowValue);
  if (id === "name") {
    // console.log("sort by name");
    if (arrowValue === both || arrowValue === up) {
      playerStats.sort(sortByLetter);
    } else if (arrowValue === down) {
      playerStats.sort(sortByLetter).reverse();
    }
  } else if (arrowValue === down) {
    // console.log("number down");
    playerStats.sort(sortByNumber);
  } else {
    // console.log("number up");
    playerStats.sort(sortByNumber).reverse();
  }
  function sortByNumber(player1, player2) {
    return player1[id] - player2[id];
  }

  function sortByLetter(player1, player2) {
    return player1.name.localeCompare(player2.name);
  }
}
