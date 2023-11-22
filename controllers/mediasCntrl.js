const axios = require('axios');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Tv = require('../models/tvModel');
const asyncHandler = require('express-async-handler');

const getAllMedias = asyncHandler(async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const mediaType = req.params.mediaType; // Get the media type from the URL params
    const tmdbEndpoint = `https://api.themoviedb.org/3/discover/${mediaType}`;

    const response = await axios.get(tmdbEndpoint, {
      params: {
        api_key: tmdbApiKey,
      },
    });

    const medias = response.data.results;
    res.json(medias);
  } catch (error) {
    throw new Error('Error fetching movies from TMDb:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  };
});

const getTopFiveMedia = asyncHandler(async (req, res, next) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const mediaType = req.params.mediaType; // Get the media type from the URL params
    const tmdbTopMediaEndpoint = `https://api.themoviedb.org/3/${mediaType}/top_rated`;

    const response = await axios.get(tmdbTopMediaEndpoint, {
      params: {
        api_key: tmdbApiKey,
      },
    });

    const topMedia = response.data.results.slice(0, 5);
    res.json(topMedia);
  } catch (error) {
    throw new Error('Error fetching top movies from TMDb:', error.message);
  }
});

const getMoviesInBatches = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const mediaType = req.params.mediaType; // Get the media type from the URL params
    const tmdbMediaInBatchesEndpoint = `https://api.themoviedb.org/3/discover/${mediaType}`;

    const page = req.params.page || 1; // Get the requested page from the URL params
    const batchSize = 10; 

    const response = await axios.get(tmdbMediaInBatchesEndpoint, {
      params: {
        api_key: tmdbApiKey,
        page,
      },
    });

    const mediasInbatches = response.data.results.slice(0, batchSize);
    res.json(mediasInbatches);
  } catch (error) {
    console.error('Error fetching movies from TMDb:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMediaDetails = asyncHandler(async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const mediaType = req.params.mediaType;
    const mediaId = req.params.id; // Get the movie ID from the URL params
    const tmdbMediaDetailsEndpoint = `https://api.themoviedb.org/3/${mediaType}/${mediaId}`;

    const response = await axios.get(tmdbMediaDetailsEndpoint, {
      params: {
        api_key: tmdbApiKey,
      },
    });

    const mediaDetails = response.data;
    res.json(mediaDetails);
  } catch (error) {
    console.error('Error fetching movie details from TMDb:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const toggleFavorites = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const mediaType = req.params.mediaType; // Get the media type from the URL params
    const mediaId = req.params.id; // Get the media ID from the URL params

    let Media;
    if (mediaType === 'movie') {
      Media = Movie;
    } else if (mediaType === 'tv') {
      Media = Tv;
    } else {
      return res.status(400).json({ error: 'Invalid media type' });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isAlreadyFavorited = user.favorites.includes(mediaId);

    if (isAlreadyFavorited) {

      // Remove media from user's favorites list
      user.favorites = user.favorites.filter((favId) => favId.toString() !== mediaId);
    } else {
      // Add media to user's favorites list
      user.favorites.push(mediaId);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error toggling favorites:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// const deleteFromFavorites = asyncHandler(async (req, res) => {
//   try {
//     const { _id } = req.user;
//     const mediaType = req.params.mediaType; // Get the media type from the URL params
//     const mediaId = req.params.id; // Get the media ID from the URL params

//     let Media;
//     if (mediaType === 'movie') {
//       Media = Movie;
//     } else if (mediaType === 'tv') {
//       Media = Tv;
//     } else {
//       return res.status(400).json({ error: 'Invalid media type' });
//     }

//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isAlreadyFavorited = user.favorites.includes(mediaId);

//     if (isAlreadyFavorited) {

//       // Remove media from user's favorites list
//       user.favorites = user.favorites.filter((favId) => favId.toString() !== mediaId);
//     } 
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error('Error toggling favorites:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

const getAllFavorites = asyncHandler(async(req,res) => {
  try { 
    const {_id} = req.user;
    const user = await User.findById(_id);

    if(!user){
      return res.status(404).json({ error: 'User not found' });
    }else{
      const userFavorites = user.favorites;
      res.json(userFavorites);
    }
  }catch(error) {
    console.error('Error displaying favorites:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const searchMedia = asyncHandler(async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const query = req.query.query; // Get the search query from query parameters
    const mediaType = req.params.mediaType; // Get the media type from the URL params

    const tmdbSearchEndpoint = 'https://api.themoviedb.org/3/search/multi';

    const response = await axios.get(tmdbSearchEndpoint, {
      params: {
        api_key: tmdbApiKey,
        query,
      },
    });

    const searchResults = response.data.results;
    res.json(searchResults);
  } catch (error) {
    console.error('Error searching for media:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const getTrailer = async (req, res) => {
  try {
    const mediaType = req.params.mediaType; // 'movie' or 'tv'
    const mediaId = req.params.id;

    const tmdbGettingTrailer = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos`;

    const response = await axios.get(tmdbGettingTrailer, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });

    const videos = response.data.results;

    // Find the first trailer (assuming it has a type of 'Trailer')
    const trailer = videos.find((video) => video.type === 'Trailer');

    if (!trailer) {
      return res.status(404).json({ error: 'Trailer not found' });
    }

    res.json({ trailerKey: trailer.key });
  } catch (error) {
    console.error('Error getting trailer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};






module.exports = {
  getAllMedias,
  getTopFiveMedia,
  getMoviesInBatches,
  getMediaDetails,
  toggleFavorites, 
  getAllFavorites,
  searchMedia,
  getTrailer,
}