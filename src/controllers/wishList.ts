import WishList from "../models/WishList";
import ErrorResponse from "../utils/ErrRes";
import asyncHandler from "../middleware/async";

// @desc Get Create  Wishlist
// @route POST /api/v1/wishList/
// @access Private

export const createWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await WishList.create({ ...req.body, user: userId });
  res.status(201).json({ wishList });
});

// @desc   Add Product to Wish List
// @route  POST /api/v1/wishList/:id
// @access Private

export const addProductToWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await WishList.findOne({ user: userId });

  const productIndex = wishList.products.findIndex((product) => {
    return product.toString() === req.params.id;
  });
  if (productIndex === -1) {
    wishList.products.unshift(req.params.id);
  }
  await wishList.save();
  res.status(200).json({ wishList });
});

// @desc   Add Product to Wish List
// @route  DELETE /api/v1/wishList/:id
// @access Private

export const deletProductFromWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await WishList.findOne({ user: userId });

  const productIndex = wishList.products.findIndex((product) => {
    return product.toString() === req.params.id;
  });
  if (productIndex !== -1) {
    wishList.products.splice(productIndex, 1);
  }
  await wishList.save();
  res.status(200).json({ wishList });
});

// @desc   get user  Wish List
// @route  GET /api/v1/wishList/
// @access Private

export const getWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await WishList.findOne({ user: userId });
  res.status(200).json({ wishList });
});
