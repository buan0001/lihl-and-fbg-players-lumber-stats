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
        <td >${player.lumberAt7.toFixed(0)}</td>
        <td >${player.lumberAt10.toFixed(0)}</td>
        <td >${player.lumberAt14.toFixed(0)}</td>
         </tr>`;
    } else {
      html +=
      `<td style="background-color:${player.ratingColor}">${player.rating}</td>
        <td style="background-color:${player.winrateColor}">${player.winrate}%</td>
        <td style="background-color:${player.gamesColor}">${player.games}</td>
        <td style="background-color:${player.lumberAt7Color}">${player.lumberAt7.toFixed(0)} <span class="inLineRank">(${player.lumberAt7Rank})</span></td>
        <td style="background-color:${player.lumberAt10Color}">${player.lumberAt10.toFixed(0)} <span class="inLineRank">(${player.lumberAt10Rank})</span></td>
        <td style="background-color:${player.lumberAt14Color}">${player.lumberAt14.toFixed(0)} <span class="inLineRank">(${player.lumberAt14Rank})</span></td>
        </tr>`;
    }

    return html;
  }
}
