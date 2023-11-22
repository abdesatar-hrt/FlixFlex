const express = require('express')
const router = express.Router()
const {getAllMedias, getTopFiveMedia, getMediaDetails, toggleFavorites, searchMedia, getAllFavorites, getMoviesInBatches, getTrailer} = require('../controllers/mediasCntrl')
const authMiddleware  = require("../middlewares/authMiddleware");


router.get('/:mediaType/get-all-medias',authMiddleware, getAllMedias);
router.get('/:mediaType/get-top-five-medias',authMiddleware, getTopFiveMedia);
router.get('/:mediaType/:page', getMoviesInBatches);
router.get('/:mediaType/:id/details',authMiddleware, getMediaDetails);
router.put('/:mediaType/:id/add-to-favorites',authMiddleware, toggleFavorites);
// router.put('/:mediaType/:id/remove-from-favorites', authMiddleware, deleteFromFavorites); // New route for removing from favorites
router.get('/:mediaType/search',authMiddleware, searchMedia);
router.get('/list-of-favorites',authMiddleware, getAllFavorites);
router.get('/:mediaType/:id/trailer',authMiddleware ,getTrailer);

module.exports = router;