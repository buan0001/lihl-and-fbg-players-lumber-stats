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

  addColors();
  doTheThings();
  // document.querySelector("#filter").addEventListener("change", changeFilter);
  // document.querySelector("#swap").addEventListener("click", changeLeague);
  document.querySelector("#detail-box").addEventListener("change", doTheThings);
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
  const promiseLIHL = await fetch("stats/Stats(8).json");
  // const promiseLIHL = await fetch("stats/endOfSeasonStatsLIHL.json");
  playerStatsLIHL = await promiseLIHL.json();
  const promiseFBG = await fetch("stats/statsFBG.json");
  playerStatsFBG = await promiseFBG.json();
}

function showStats(finalArray) {
  const stats = document.querySelector("#playerStats");
  stats.innerHTML = "";
  const checked = document.querySelector("#detail-box").checked;
  console.log("checked: ", checked);
  if (checked) {
    for (const player of finalArray) {
      const html =
        /*html*/
        `
        <tr>
        <td>${player.rank}</td>
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
        <td>${player.rank}</td>
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

function addColors(params) {
  // const color7 = document.querySelectorAll(".color7");
  // const color10 = document.querySelectorAll(".color10");
  // const color14 = document.querySelectorAll(".color14");

  // console.log("PLAYER ARRAY:", playerArray);

  // let currentColor = color7;
  let currentCheck = "lumberAt7";
  const playerArray = Array.from(currentLeague);
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

    for (const entry of playerArray) {
      entry[currentCheck + "Color"] = `rgb(${redValue}, ${greenValue}, 0, 0.5)`;
      if (halfWayPoint > currentPoint) {
        greenValue += increment;
      } else {
        redValue -= increment;
      }
      currentPoint++;
    }
  }
  console.log(playerArray);
  // for (let i = 0; i < 2; i++) {
  //   let currentPoint = 0;
  //   let redValue = 255;
  //   let greenValue = 0;
  //   if (i === 1) {
  //     currentCheck = "lumberAt10";
  //     currentColor = color10;
  //   } else if (i === 2) {
  //     currentCheck = "lumberAt14";
  //     currentColor = color14;
  //   }

  //   playerArray.sort((a, b) => b[currentCheck] - a[currentCheck]);

  //   for (const td of currentColor) {
  //     td.style.background = `rgb(${redValue}, ${greenValue}, 0)`;
  //     if (halfWayPoint > currentPoint) {
  //       console.log("if");
  //       greenValue += increment;
  //     } else {
  //       console.log("else");
  //       redValue -= increment;
  //     }
  //     currentPoint++;
  //   }
  // }
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
