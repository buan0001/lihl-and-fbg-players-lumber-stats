import Listrenderer from "./Listrenderer.js";
import Itemrenderer from "./Itemrenderer.js";

window.addEventListener("load", start);

let playerStatsLIHL;
let currentLeague;
let sortBy = "rating";
let arrowValue = "images/arrowDown.png";
let searchValue = "";

let playerlist;

async function start(params) {
  const players = await getStats(document.querySelector("#entrySelect").value);

  playerlist = new Listrenderer("#playerStats", players, Itemrenderer);
  startChart();
  doTheThings();

  addEventListeners();
  updateChart();
}

let chart;
function startChart(params) {
  const testList = [...playerlist.list];
  testList.sort((a, b) => b.ratingRank - a.ratingRank);
  const yValues = testList.map((player) => {
    return player.rating;
  });
  const xValues = testList.map((player) => {
    return player.ratingRank;
  });

  chart = new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          // fill: false,
          // lineTension: 0,
          backgroundColor: "rgba(0,0,255,0.2)",
          borderColor: "rgba(50,50,50,0.1)",
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
    },
  });
}

function updateChart(params) {
  const testList = [...playerlist.list];
  testList.sort((a, b) => b.ratingRank - a.ratingRank);
  const yValues = testList.map((player) => {
    return player.rating;
  });
  const xValues = testList.map((player) => {
    return player.ratingRank;
  });
  chart.data.datasets[0].data = yValues;
  chart.data.labels = xValues;
  chart.update();
}

function addEventListeners() {
  document.querySelector("#entrySelect").addEventListener("change", changeEntry);

  document.querySelector("#detail-box").addEventListener("change", () => playerlist.render());

  document.querySelector("#search").addEventListener("keyup", (event) => {
    searchValue = event.target.value;
    doTheThings();
  });
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSortAndArrows));
}

async function getStats(fileDate) {
  console.log(fileDate);
  const promiseLIHL = await fetch(`stats/${fileDate}.json`);
  console.log("STATS:", currentLeague);
  return await promiseLIHL.json();
}

async function changeEntry(event) {
  const newStats = await getStats(event.target.value);
  playerlist.list = newStats;
  doTheThings();
  updateChart();
}

function doTheThings() {
  console.log("sort by", sortBy);
  playerlist.search(searchValue);
  playerlist.sort(sortBy);
  playerlist.render();
}

function changeSortAndArrows(event) {
  // Get the sort value and use its attribute to determine the arrow value
  // This value is the CURRENT one, meaning the one before the "desired" value
  sortBy = event.target.id;
  let arrowValue = event.target.attributes[0].value;

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
