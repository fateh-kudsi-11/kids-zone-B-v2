import Product from "../models/Product";
import WishList from "../models/WishList";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/ErrRes";
import filterElement from "../utils/filterElement";
import { getProductsParams, getProductspagination } from "../types/product";

// @desc   get Products
// @route  GET /api/v1/products/
// @access Public

export const getProducts = asyncHandler(async (req, res, next) => {
  let query;

  const params: getProductsParams = {};

  if (req.query.gender) {
    params.gender = req.query.gender as string;
  }

  if (req.query.category && req.query.category !== "new") {
    params.category = req.query.category as string;
  }

  if (req.query.brand) {
    const brandFields = (req.query.brand as string).split(",");
    const brands = { $in: brandFields };
    params.brand = brands;
  }
  if (req.query.color) {
    const colorFields = (req.query.color as string).split(",");
    const color = { $in: colorFields };
    params.availableColor = color;
  }
  if (req.query.size) {
    const sizeFields = (req.query.size as String).split(",");
    const size = { $in: sizeFields };
    params.size = size;
  }
  if (req.query.productType) {
    const productTypeAndCategoryFields = (
      req.query.productType as String
    ).split("-");
    const productType = productTypeAndCategoryFields[1];
    const category = productTypeAndCategoryFields[0];
    params.productType = productType;
    params.category = category;
  }

  if (req.query.priceRange) {
    const priceRangeFields = (req.query.priceRange as String).split(",");
    const minPrice = +priceRangeFields[0] * 1000;
    const maxPrice = +priceRangeFields[1] * 1000;
    const price = { $gte: minPrice, $lte: maxPrice };
    params.price = price;
  }

  query = Product.find(params);

  if (req.query.select) {
    const fields = (req.query.select as String).split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort;
    let sort;
    if (sortBy === "newProduct") {
      sort = "-createdAt";
    }

    if (sortBy === "priceHighToLow") {
      sort = "-price";
    }

    if (sortBy === "priceLowToHigh") {
      sort = "price";
    }

    query = query.sort(sort);
  } else {
    query = query.sort("-createdAt");
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.where(params).countDocuments();

  const productsForFilter = await query;

  const filterElements = filterElement(productsForFilter);

  query = query.skip(skip).limit(limit);

  const products = await query;

  const pagination: getProductspagination = {
    total,
  };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  res.status(200).json({
    success: true,
    filterElements,
    count: products.length,
    pagination,
    data: products,
  });
});

// @desc   get product for  Wish List
// @route  GET /api/v1/products/wishList/
// @access Private

export const getProductsForWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const wishList = await WishList.findOne({ user: userId });
  if (wishList == null) {
    return res.status(200).json({ products: null });
  }
  const productId = wishList.products;
  const products = await Product.find({ _id: { $in: productId } });
  return res.status(200).json({ products });
});
