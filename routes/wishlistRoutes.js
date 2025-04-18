import express from 'express';
import {
    addWishlistItem,
    deleteWishlistItem,
    getWishlist,
    updateWishlistItem,
} from '../controllers/wishlistController.js';

import protectRoute from '../middlewares/protectRoute.js';

const wishlistRouter = express.Router();

wishlistRouter.post('/wishlist', protectRoute, addWishlistItem);
wishlistRouter.get('/wishlists', protectRoute, getWishlist);
wishlistRouter.delete('/wishlist/:id', protectRoute, deleteWishlistItem);
wishlistRouter.put('/wishlist/:id', protectRoute, updateWishlistItem);

export default wishlistRouter;
