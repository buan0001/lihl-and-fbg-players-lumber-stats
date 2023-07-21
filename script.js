"use strict";

window.addEventListener("load", start);

async function start(params) {
  const playerStats = await getStats();
  console.log(playerStats);
  showStats(playerStats);

  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));
}

async function getStats(params) {
  const promise = await fetch("statsLIHL.json");
  return promise.json();
}

function showStats(playerArray) {
  for (const player of playerArray) {
    const html =
      /*html*/
      `
        <tr>
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.rating}</td>
        <td>${player.lumberAt7.toFixed(0)}</td>
        <td>${player.lumberAt10.toFixed(0)}</td>
        <td>${player.lumberAt14.toFixed(0)}</td>
        </tr>
        `;
    document.querySelector("#playerStats").insertAdjacentHTML("beforeend", html);
  }
}

function changeSort(event) {
  document.querySelectorAll("img").forEach((image) => {
    if (image !== event.target) {
      image.src = "images/arrowBoth.png";
    }
  });
  console.log("event target@@@@@", event.target);
  console.log(event);
  console.log(event.target.id);
  console.log(event.target.attributes);
  console.log(event.target.attributes[0]);
  console.log(event.target.attributes[0].value);
  console.log(event.target.attributes[0].value == "images/arrowBoth.png");

  console.log(event.target);
  if (event.target.attributes[0].value == "images/arrowBoth.png") {
    console.log("check");
    document.querySelector(`#${event.target.id}`).src = "images/arrowDown.png";
  } else if (event.target.attributes[0].value == "images/arrowDown.png") {
    console.log("check 2");
    document.querySelector(`#${event.target.id}`).src = "images/arrowUp.png";
  } else {
    console.log("check 3");
    document.querySelector(`#${event.target.id}`).src = "images/arrowBoth.png";
  }
  document.querySelectorAll("img").forEach((image) => image.addEventListener("click", changeSort));

  //   const restOfTheArrows = document.querySelectorAll("img").
}
