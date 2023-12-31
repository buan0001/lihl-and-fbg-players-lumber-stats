export default class Listrenderer {
  #oldList;
  constructor(id, list, Itemrenderer) {
    this.id = id;
    this.table = document.querySelector(`${id}`);
    this._list = this.#applyRank(list);
    this.activeList = [...this._list];
    this.#oldList = this._list;
    this.checkbox = document.querySelector("#detail-box");
    this.itemrenderer = new Itemrenderer();
  }

  render(listToShow = this.searchedList) {
    console.log("LIST", this.activeList);
    this.clear();
    listToShow.forEach((entry) => {
      const html = this.itemrenderer.render(entry, this.sortParam, this.checkbox.checked);
      this.table.insertAdjacentHTML("beforeend", html);
    });
  }

  set list(newList) {
    this._list = this.#applyRank(newList);
    this.activeList = [...this._list];
  }

  get list() {
    return this._list;
  }

  clear() {
    this.table.innerHTML = "";
  }

  #applyRank(listToRank = this.activeList) {
    const checkArray = ["games", "averageLumber", "rating", "winrate"];
    // const checkArray = ["games", "lumberAt10", "lumberAt14", "lumberAt7", "rating", "winrate"];
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

  sort(sortParam, reverseList) {
    if (!this.sortParam || sortParam !== this.sortParam) {
      this.sortParam = sortParam;
      this.sortDir = true;
    } else if (reverseList) {
      this.sortDir = !this.sortDir;
    }
    console.log("reverse list?", reverseList);
    // else if (sortParam === this.sortParam && this._list === this.#oldList) {
    //   this.sortDir = !this.sortDir;
    // } else if (this.#oldList !== this._list) {
    //   this.#oldList = this._list;
    // }
    console.log("this.sortParam", this.sortParam);
    console.log("this.sortDir", this.sortDir);
    this.searchedList.sort((a, b) => b[sortParam + "Rank"] - a[sortParam + "Rank"]);
    if (this.sortDir) {
      this.searchedList.reverse();
    }
  }

  search(searchParam) {
    this.searchedList = this.filteredList.filter((player) => player.name.toLowerCase().includes(searchParam.toLowerCase()));
    // console.log("SEARCH PRAM",searchParam);
    // console.log("searched list", this.activeList);
    // return activeList
  }

  filter(value) {
    this.filteredList = this.#applyRank(this.activeList.filter((player) => player.games > value));
  }
}
