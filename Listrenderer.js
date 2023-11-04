export default class Listrenderer {
  constructor(id, list, Itemrenderer) {
    this.id = id;
    this.table = document.querySelector(`${id}`);
    this.list = this.applyRank(list);
    this.checkbox = document.querySelector("#detail-box");
    this.itemrenderer = new Itemrenderer();
  }

  render(differentList = this.list) {
    console.log("LIST",this.list);
    this.clear()
    differentList.forEach((entry) => {
      const html = this.itemrenderer.render(entry, this.sortParam, this.checkbox.checked);
      this.table.insertAdjacentHTML("beforeend", html);
    });
  }

  clear(){
    this.table.innerHTML = ""
  }

  applyRank(listToRank = this.list) {
    const checkArray = ["games", "lumberAt10", "lumberAt14", "lumberAt7", "rating", "winrate"];
    const lengthOfList = listToRank.length;
    const halfWayPoint = lengthOfList / 2;

    const increment = 255 / halfWayPoint;
    for (const check of checkArray) {
      let currentPoint = 0;
      let redValue = 255;
      let greenValue = 0;
      listToRank.sort((a, b) => a[check] - b[check]);
      let n = listToRank.length;
      for (const entry of listToRank) {
        entry[check + "Color"] = `rgb(${redValue}, ${greenValue}, 0, 0.5)`;
        entry[check + "Rank"] = n;
        if (halfWayPoint > currentPoint) {
          greenValue += increment;
        } else {
          redValue -= increment;
        }
        currentPoint++;
        n--;
      }
    }
    return listToRank;
  }

  sort(sortParam) {
    if (!this.sortParam || sortParam !== this.sortParam) {
      this.sortParam = sortParam;
      this.sortDir = true
    } else if (sortParam === this.sortParam) {
      this.sortDir = !this.sortDir
    }
    console.log("this.sortParam",this.sortParam);
    console.log("this.sortDir", this.sortDir);
    this.list.sort((a, b) => b[sortParam+"Rank"] - a[sortParam+"Rank"]);
    if (this.sortDir) {
      this.list.reverse();
    }
    this.render();
  }

  search(searchParam){
    console.log("SEARCH PRAM",searchParam);
    const searchedList = this.list.filter(player => player.name.toLowerCase().includes(searchParam.toLowerCase()))
    console.log("searched list",searchedList);
    this.render(searchedList)
  }
}
