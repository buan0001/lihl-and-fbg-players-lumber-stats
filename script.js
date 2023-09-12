"use strict";

window.addEventListener("load", start);
// start();

let playerStatsLIHL;
let currentLeague;
let sortBy = "rating";
let arrowValue = "images/arrowDown.png";
let searchValue;

function start(params) {
  prepareData(document.querySelector("#entrySelect").value);
  addEventListeners();
}

function addEventListeners() {
  document.querySelector("#entrySelect").addEventListener("change", changeEntry);
  document.querySelector("#detail-box").addEventListener("change", doTheThings);
  document.querySelector("#search").addEventListener("keyup", changeSearch);
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSortAndArrows));
}

async function getStats(fileDate) {
  console.log(fileDate);
  const promiseLIHL = await fetch(`stats/${fileDate}.json`);
  currentLeague = await promiseLIHL.json();
}

async function prepareData(fileDate) {
  await getStats(fileDate);
  addColors();
  doTheThings();
}

function changeEntry(event) {
  prepareData(event.target.value);
}

function addColors(params) {
  const playerArray = Array.from(currentLeague);
  let currentCheck = "lumberAt7";
  const lengthOfList = playerArray.length;
  const halfWayPoint = lengthOfList / 2;

  const increment = 255 / halfWayPoint;
  for (let i = 0; i < 5; i++) {
    let currentPoint = 0;
    let redValue = 255;
    let greenValue = 0;
    if (i === 1) {
      currentCheck = "lumberAt10";
    } else if (i === 2) {
      currentCheck = "lumberAt14";
    } else if (i === 3) {
      currentCheck = "rating";
    } else if (i === 4) {
      currentCheck = "games";
    }

    playerArray.sort((a, b) => a[currentCheck] - b[currentCheck]);
    let n = currentLeague.length;
    for (const entry of playerArray) {
      entry[currentCheck + "Color"] = `rgb(${redValue}, ${greenValue}, 0, 0.5)`;
      entry[currentCheck + "Rank"] = n;
      if (halfWayPoint > currentPoint) {
        greenValue += increment;
      } else {
        redValue -= increment;
      }
      currentPoint++;
      n--;
    }
  }
  console.log(playerArray);
  console.log(currentLeague);
}

function doTheThings(params) {
  const sorted = doTheSorting();
  let ranked = applyRank(sorted);
  if (searchValue !== undefined) {
    ranked = ranked.filter((player) => player.name.toLowerCase().includes(searchValue));
  }
  showStats(ranked);
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

// function changeFilter(event) {
//   filterValue = event.target.value;
//   doTheThings();
// }

// function applyFilter(player) {
//   return player.games >= filterValue;
// }

// function changeLeague() {
//   console.log("change league");
//   if (currentLeague === playerStatsLIHL) {
//     currentLeague = playerStatsFBG;
//   } else {
//     currentLeague = playerStatsLIHL;
//   }
//   doTheThings();
// }

// function resetArrows(params) {
//   sortBy = undefined;
//   document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
//   document.querySelectorAll("img").forEach((image) => (image.src = "images/arrowBoth.png"));
// }

function showStats(finalArray) {
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";
  const checked = document.querySelector("#detail-box").checked;
  console.log("checked: ", checked);
  console.log("sort by:", sortBy);
  if (checked) {
    for (const player of finalArray) {
      const html =
        /*html*/
        `
        <tr>
        <td>${player[sortBy + "Rank"]}</td>
        <td>${player.name}</td>
        <td >${player.rating}</td>
        <td >${player.games}</td>
        <td >${player.lumberAt7.toFixed(0)}</td>
        <td >${player.lumberAt10.toFixed(0)}</td>
        <td >${player.lumberAt14.toFixed(0)}</td>
        </tr>
        `;
      stats.insertAdjacentHTML("beforeend", html);
    }
  } else {
    for (const player of finalArray) {
      const html =
        /*html*/
        `
        <tr>
        <td>${player[sortBy + "Rank"]}</td>
        <td>${player.name}</td>
        <td style="background-color:${player.ratingColor}">${player.rating}</td>
        <td style="background-color:${player.gamesColor}">${player.games}</td>
        <td style="background-color:${player.lumberAt7Color}">${player.lumberAt7.toFixed(0)}</td>
        <td style="background-color:${player.lumberAt10Color}">${player.lumberAt10.toFixed(0)}</td>
        <td style="background-color:${player.lumberAt14Color}">${player.lumberAt14.toFixed(0)}</td>
        </tr>
        `;
      stats.insertAdjacentHTML("beforeend", html);
    }
  }
}

function changeSortAndArrows(event) {
  // Get the sort value and use its attribute to determine the arrow value
  // This value is the CURRENT one, meaning the one before the "desired" value
  sortBy = event.target.id;
  arrowValue = event.target.attributes[0].value;

  // Reset all arrows except the selected one
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

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSortAndArrows));
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
