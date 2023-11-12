let charts = [eloChart, lumberChart];
// charts.forEach(chart => buildChart(chart, check, canvas, type))

function startChart(listRenderer) {
  charts[0] = buildChart(listRenderer, "averageLumber", "lumberChart", "line");
  charts[1] = buildChart(listRenderer, "rating", "eloChart", "line");
  //   charts[2] = buildChart(listRenderer, "rating", "eloLumberChart", "scatter");
  //   console.log(charts[2]);
}
// let charty
function buildChart(listRenderer, check, canvas, type) {
  //   let check = i == 0 ? "averageLumber" : "rating";
  //     let value = i == 0 ? "Rating" : "Lumber";
  // let domCanvas;
  // if (i == 0) {
  //   domCanvas = "lumberChart";
  // } else if (i == 1) {
  //   domCanvas = "eloChart";
  // } else {
  //   domCanvas = "eloLumberChart";
  // }

  // let domCanvas = i == 0 ? "eloChart" ? i==1 : "eloLumberChart" : "lumberChart";

  //   const lumberTotal = pList.reduce((accumulator, currentValue) => accumulator + currentValue.averageLumber, 0)
  //   const eloTotal = pList.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0)
  //   console.log("total lumber?",lumberTotal);
  //   console.log("average lumber!",lumberTotal/pList.length);
  //   console.log("total elo!",eloTotal);

  // const data = {
  //   datasets: [{
  //     label: 'Dataset 1',
  //     data: chartArrayMaker(listRenderer.list,"","scatter" )
  //   }]
  // }

  // const config = {
  //   type: "scatter",
  //   data,
  //   options: {
  //     elements: {
  //       point: {
  //         radius: 7,
  //         backgroundColor: "rgba(0,0,255,0.2)",
  //         hitRadius: 2
  //       },
  //     },
  //   },
  // };
  //   return new Chart("lumberChart",config)

  const pList = [...listRenderer.activeList];

    const values = chartArrayMaker(pList, check, type);
  if (type == "scatter") {
    console.log("creating scatter?");
    return new Chart(canvas, {
      type: "scatter",
      data: [
        { x: 3, y: 4 },
        { x: 6, y: 10 },
      ],
    });
  } else {
    return new Chart(canvas, {
      type: type,
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
                labelString: check == "rating" ? "Rating" : "Lumber",
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
        title: { text: canvas == "eloChart" ? "Elo distribution" : canvas == "eloLumberChart" ? "Lumber gained compared to elo rank" : "Lumber distribution", display: true },
        legend: { display: false, labels: { color: "rgb(255, 99, 132)" } },
      },
    });
  }
}

function updateChart(listRenderer) {
  const newList = [...listRenderer.searchedList];
  for (let i = 0; i < charts.length; i++) {
    // let check = i == 0 ? "rating" : "averageLumber";
    let check = i == 0 ? "averageLumber" : "rating";
    const values = chartArrayMaker(newList, check, "line");
    charts[i].data.datasets[0].data = values.yValues;
    charts[i].data.labels = values.xValues;
    charts[i].update();
  }
}

function chartArrayMaker(newList, check, type) {
  if (type === "line") {
    console.log("CHECK:", check);
    newList.sort((a, b) => b[check + "Rank"] - a[check + "Rank"]);
    const yValues = newList.map((player) => {
      return player[check];

    });
    const xValues = newList.map((player) => {

      return player[check + "Rank"];

    });
    console.log(xValues, yValues);
    return { yValues, xValues };
  }
  // else if (type === "scatter") {
  //   newList.sort((a, b) => b["ratingRank"] - a["ratingRank"]);
  //   const matchingValues = newList.map((player) => {
  //     return { x: player.rating, y: player.averageLumber };
  //   });
  //   console.log("matching values:", matchingValues);
  //   return matchingValues;
  // }
}

function toggleChart(event) {
  const allCanvas = document.querySelectorAll("canvas");
  allCanvas.forEach((canvas) => {
    if (canvas.style.display == "none") {
      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
    }
    console.log("canvas display?", canvas.style.display);
  });
}

export { startChart, updateChart, toggleChart };
