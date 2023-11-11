export default class Itemrenderer {
  render(player, rankType = "rating", checkedBool) {
    //   <td>${player[sortBy + "Rank"]}</td>
    let html =
      /*html*/
      `
        <tr>
        <td>${player[rankType + "Rank"]}</td>
        <td>${player.name}</td>`;
    if (checkedBool) {
      html += `<td >${player.rating}</td>
        <td >${player.winrate}%</td>
        <td >${player.games}</td>
        <td >${player.averageLumber.toFixed(0)}</td>
         </tr>`;
    } else {
      html += `<td style="background-color:${player.ratingColor}">${player.rating} <span class="inLineRank">(${player.ratingRank})</span></td>
        <td style="background-color:${player.winrateColor}">${player.winrate}% <span class="inLineRank">(${player.winrateRank})</span></td>
        <td style="background-color:${player.gamesColor}">${player.games}<span class="inLineRank">(${player.gamesRank})</span></td>
        <td style="background-color:${player.averageLumberColor}">${player.averageLumber.toFixed(0)} <span class="inLineRank">(${player.averageLumberRank})</span></td>
        </tr>`;
    }
    // <td style="background-color:${player.lumberAt10Color}">${player.lumberAt10.toFixed(0)} <span class="inLineRank">(${player.lumberAt10Rank})</span></td>
    // <td style="background-color:${player.lumberAt14Color}">${player.lumberAt14.toFixed(0)} <span class="inLineRank">(${player.lumberAt14Rank})</span></td>

    return html;
  }
}
