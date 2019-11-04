import "./sass/main.scss";

import {
  fetchData,
  fetchTotalPages,
  fetchIndividualShow
} from "./js/fetchData";
import { URL } from "./js/constants";
import {
  getAllData,
  getShowsByTitles,
  append,
  createListElement,
  clearNodes,
  generateMessage
} from "./js/utils";
import { searchBar, searchFrom, output } from "./js/domElements";
import messages from "./js/messages";

let data = [];
let shows = [];
let totalSites = 0;

searchFrom.onsubmit = submit;

async function submit(event) {
  event.preventDefault();
  searchBar.blur();
  clearNodes(output);
  totalSites = await fetchTotalPages(URL, searchBar.value);
  if (!totalSites) {
    generateMessage(messages.nothingToShow, output);
    return;
  }
  data = await getAllData(totalSites, fetchData, URL, searchBar);
  shows = await getShowsByTitles(fetchIndividualShow, URL, data);
  await shows.forEach(show => append(output, createListElement(show)));
}
