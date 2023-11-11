let charts = [eloChart, lumberChart];
function startChart(listRenderer) {
  const pList = [...listRenderer.list];

  for (let i = 0; i < 3; i++) {
    let check = i == 0 ? "averageLumber" : "rating";
    const values = chartArrayMaker(pList, check, i);
    let value = i == 0 ? "Rating" : "Lumber";
    let domCanvas;
    if (i == 0) {
      domCanvas = "lumberChart";
    } else if (i == 1) {
      domCanvas = "eloChart";
    } else {
      domCanvas = "eloLumberChart";
    }

    // let domCanvas = i == 0 ? "eloChart" ? i==1 : "eloLumberChart" : "lumberChart";
    charts[i] = new Chart(domCanvas, {
      type: "line",
      data: {
        labels: values.xValues,
        datasets: [
          {
            backgroundColor: "rgba(0,0,255,0.2)",
            borderColor: "rgba(50,50,50,0.1)",
            data: values.yValues,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: value,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Rank",
              },
            },
          ],
        },
        title: { text: domCanvas == "eloChart" ? "Elo distribution" :domCanvas == "eloLumberChart" ? "Lumber gained compared to elo rank" : "Lumber distribution", display: true },
        legend: { display: false, labels: { color: "rgb(255, 99, 132)" } },
      },
    });
  }
}

function updateChart(listRenderer) {
  const newList = [...listRenderer.list];
  for (let i = 0; i < 3; i++) {
    // let check = i == 0 ? "rating" : "averageLumber";
    let check = i == 0 ? "averageLumber" : "rating";
    const values = chartArrayMaker(newList, check,i);
    charts[i].data.datasets[0].data = values.yValues;
    charts[i].data.labels = values.xValues;
    charts[i].update();
  }
}

function chartArrayMaker(newList, check, i) {
  if (i < 3) {
    console.log("CHECK:",check);
    newList.sort((a, b) => b[check + "Rank"] - a[check + "Rank"]);
    const yValues = newList.map((player) => {
    //   return player[check];
      return player[i == 2 ? "averageLumber" : check];
    });
    const xValues = newList.map((player) => {
      // return player["ratingRank"];
    //   return player[check + "Rank"];
      return player[i == 2 ? "ratingRank" : check + "Rank"];
    });
    console.log(xValues, yValues);
    console.log("i value", i);
    return { yValues, xValues };
}
// else {
//     newList.sort((a, b) => b["ratingRank"] - a["ratingRank"]);
//     const yValues = newList.map((player) => {
//         return player["averageLumber"];
//         // return player[i == 2 ? check + "Rank" : check];
//     });
//     const xValues = newList.map((player) => {
//         // return player["ratingRank"];
//         return player["ratingRank"];
//     });
//     return { yValues, xValues };
//   }
}

function toggleChart(event) {
  const allCanvas = document.querySelectorAll("canvas");
  allCanvas.forEach(canvas => {
  if (canvas.style.display == "none") {
    canvas.style.display = "block";
  } else {
    canvas.style.display = "none";
  }
  console.log("canvas display?", canvas.style.display);
  })

}

export { startChart, updateChart, toggleChart };
