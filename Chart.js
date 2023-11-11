let chart;
function startChart(listRenderer) {
  const pList = [...listRenderer.list];
  pList.sort((a, b) => b.ratingRank - a.ratingRank);
  const yValues = pList.map((player) => {
    return player.rating;
  });
  const xValues = pList.map((player) => {
    return player.ratingRank;
  });

  chart = new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
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

function updateChart(listRenderer) {
  const newList = [...listRenderer.list];
  newList.sort((a, b) => b.ratingRank - a.ratingRank);
  const yValues = newList.map((player) => {
    return player.rating;
  });
  const xValues = newList.map((player) => {
    return player.ratingRank;
  });
  chart.data.datasets[0].data = yValues;
  chart.data.labels = xValues;
  chart.update();
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