const filterNames = [`Watchlist`, `History`, `Favorites`];

const generateFilters = (movies) => {
  const watchlistCount = movies.filter((movie) => movie.userDetails.inWatchlist);
  const historyCount = movies.filter((movie) => movie.userDetails.isWatched);
  const favoriteCount = movies.filter((movie) => movie.userDetails.isFavorite);

  return [{
    name: `Watchlist`,
    count: watchlistCount.length,
  },
  {
    name: `History`,
    count: historyCount.length,
  },
  {
    name: `Favorites`,
    count: favoriteCount.length,
  }
  ];

};

export {generateFilters};
