import { setTotalSites } from "./utils";

export const fetchData = (url, query, pageNum) => {
  return fetch(`${url}&s=${query}&page=${pageNum}&plot=full&type=series`)
    .then(resp => resp.json())
    .then(data => data.Search);
};

export const fetchTotalPages = (url, query) => {
  return fetch(`${url}&s=${query}&type=series`).then(resp =>
    resp
      .json()
      .then(data => data.totalResults)
      .then(totalResults => setTotalSites(totalResults))
  );
};

export const fetchIndividualShow = (url, query) => {
  return fetch(`${url}&i=${query}&plot=full&type=series`)
    .then(resp => resp.json())
    .then(data => data);
};
