let charts = [eloChart, lumberChart];
function startChart(listRenderer) {
  const pList = [...listRenderer.list];

  for (let i = 0; i < 2; i++) {
    let check = i == 0 ? "rating" : "lumberAt7";
    const values = chartArrayMaker(pList, check);
    let value = i == 0 ? "Rating" : "Lumber";
    let domCanvas = i == 0 ? "eloChart" : "lumberChart";
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
        title: { text: domCanvas == "eloChart" ? "Elo distribution" : "Lumber distribution", display: true },
        legend: { display: false, labels: { color: "rgb(255, 99, 132)" } },
      },
    });
  }
}

function updateChart(listRenderer) {
  const newList = [...listRenderer.list];
  for (let i = 0; i < 2; i++) {
    let check = i == 0 ? "rating" : "lumberAt7";
    const values = chartArrayMaker(newList, check);
    charts[i].data.datasets[0].data = values.yValues;
    charts[i].data.labels = values.xValues;
    charts[i].update();
  }
}

function chartArrayMaker(newList, check) {
  newList.sort((a, b) => b[check + "Rank"] - a[check + "Rank"]);
  const yValues = newList.map((player) => {
    return player[check];
  });
  const xValues = newList.map((player) => {
    return player[check + "Rank"];
  });

  return { yValues, xValues };
}

function toggleChart(event) {
  const canvas = document.querySelector("canvas");
  if (canvas.style.display == "none") {
    canvas.style.display = "block";
  } else {
    canvas.style.display = "none";
  }
  console.log("canvas display?", canvas.style.display);
}

export { startChart, updateChart, toggleChart };
