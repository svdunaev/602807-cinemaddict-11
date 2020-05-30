const generateFilters = (movies) => {
  const watchlistCount = movies.filter((movie) => movie.userDetails.inWatchlist).length;
  const historyCount = movies.filter((movie) => movie.userDetails.isWatched).length;
  const favoriteCount = movies.filter((movie) => movie.userDetails.isFavorite).length;

  return [{
    name: `Watchlist`,
    count: watchlistCount,
  },
  {
    name: `History`,
    count: historyCount,
  },
  {
    name: `Favorites`,
    count: favoriteCount,
  }
  ];

};

export {generateFilters};
