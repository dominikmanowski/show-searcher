import { loader } from "./domElements";
import defaultPoster from "../assets/default-image.jpg";

export const createNode = element => document.createElement(element);

export const append = (parent, element) => parent.appendChild(element);

const hasAwards = show => show.Awards && show.Awards !== "N/A";

export const createListElement = show => {
  let ul = createNode("ul"),
    li = createNode("li"),
    poster = createNode("img"),
    title = createNode("h2"),
    released = createNode("span"),
    runtime = createNode("span"),
    rating = createNode("span"),
    desc = createNode("span"),
    awards = createNode("div");
  poster.src = show.Poster !== "N/A" ? show.Poster : defaultPoster;
  poster.classList.add("poster");
  li.classList.add("flex");
  li.classList.add("show-container");
  title.innerHTML = `Title: ${show.Title}`;
  released.innerHTML = `Released: ${show.Released}`;
  runtime.innerHTML = `Runtime: ${show.Runtime}`;
  rating.innerHTML = `Rating: ${
    show.Ratings && show.Ratings.length ? show.Ratings[0].Value : "N/A"
  }`;
  desc.innerHTML = `Description: 
    ${
      show.Plot && show.Plot.length <= 100
        ? show.Plot
        : show.Plot.substring(0, 100) + "..."
    }`;
  awards.classList.add("awards");
  append(ul, li);
  append(li, poster);
  append(li, title);
  append(li, released);
  append(li, runtime);
  append(li, rating);
  append(li, desc);
  hasAwards(show) && append(li, awards);
  return ul;
};

export const generateMessage = (content, node) => {
  let message = createNode("span");
  message.innerHTML = content;
  message.classList.add("message");
  append(node, message);
};

export const setTotalSites = num => Math.ceil(num / 10);

export const getAllData = async (totalSites, fetchFunc, url, input) => {
  showSpinner();
  let limit = totalSites;
  let i = 1;
  let data = [];
  while (i <= limit) {
    data = [...data, ...(await fetchFunc(url, input.value, i))];
    i++;
  }
  return data.map(data => data.imdbID);
};

export const getShowsByTitles = async (
  fetchFunc,
  url,
  arr,
  start = 0,
  finish = arr.length < 12 ? arr.length - 1 : 11
) => {
  let i = start;
  let data = [];
  while (i <= finish) {
    data = [...data, await fetchFunc(url, arr[i])];
    i++;
  }
  hideSpinner();
  return data;
};

export const clearNodes = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const showSpinner = () => loader.classList.add("shown");
export const hideSpinner = () => loader.classList.remove("shown");
