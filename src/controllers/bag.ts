import OrderItem from "../models/OrderItem";
import ErrorResponse from "../utils/ErrRes";
import asyncHandler from "../middleware/async";
import Bag from "../models/Bag";
import Product from "../models/Product";
import WishList from "../models/WishList";

// @desc   Add Product to Bag
// @route  POST /api/v1/bag/
// @access Private

export const addProductToBag = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const orderItem = await OrderItem.create(req.body);

  let bag = await Bag.findOne({ user: userId });

  if (bag === null) {
    bag = await Bag.create({
      OrderItem: [orderItem._id],
      user: userId,
    });
  } else {
    const orderItemIndex = bag.OrderItem.findIndex((Item) => {
      return Item.toString() === orderItem._id;
    });
    if (orderItemIndex === -1) {
      bag.OrderItem.unshift(orderItem._id);
    }
    await bag.save();
  }
  return res.status(200).json(bag);
});

// @desc   Delete Product from Bag
// @route  DELETE /api/v1/bag/:id
// @access Private

export const deleteProductfromBag = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let bag = await Bag.findOne({ user: userId });

  const orderItemIndex = bag.OrderItem.findIndex((Item) => {
    return Item.toString() === req.params.id;
  });
  if (orderItemIndex !== -1) {
    bag.OrderItem.splice(orderItemIndex, 1);
  }
  await bag.save();

  await OrderItem.findByIdAndDelete(req.params.id);

  return res.status(200).json(bag);
});

// @desc   update order item
// @route  PUT /api/v1/bag/orderItem/:id
// @access Private

export const updateOrderItem = asyncHandler(async (req, res, next) => {
  await OrderItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200);
});

// @desc   fetch bag
// @route  GET /api/v1/bag/
// @access Private

export const fetchBag = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const bag = await Bag.findOne({ user: userId });

  if (bag === null) {
    return res.status(200).json({ bag: null, products: null });
  }

  await bag
    .populate({
      path: "OrderItem",
    })
    .execPopulate();

  const productsIds = [];
  let products = [];
  bag.OrderItem.forEach((item) => {
    // @ts-ignore
    productsIds.push(item!.products);
  });

  if (productsIds.length > 0) {
    products = await Product.find({ _id: { $in: productsIds } });
  }
  return res.status(200).json({ bag, products });
});

// @desc   update order item qty
// @route  POST /api/v1/bag/orderItem/:id
// @access Private

export const updateQtyOrderItem = asyncHandler(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  const { quantity } = req.body;
  orderItem.quantity = quantity;
  await orderItem.save();
  return res.status(200).json(orderItem);
});

// @desc   move  Product from Bag to wish list
// @route  POST /api/v1/bag/wishList/
// @access Private

export const moveProductToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let bag = await Bag.findOne({ user: userId });

  const { productId, orderItemId } = req.body;

  const orderItemIndex = bag.OrderItem.findIndex((Item) => {
    return Item.toString() === orderItemId;
  });

  if (orderItemIndex !== -1) {
    bag.OrderItem.splice(orderItemIndex, 1);
  }
  await bag.save();

  await OrderItem.findByIdAndDelete(orderItemId);

  if ((await WishList.findOne({ user: userId })) === null) {
    await WishList.create({ user: userId });
  }
  const wishList = await WishList.findOne({ user: userId });

  const productIndex = wishList.products.findIndex((product) => {
    return product.toString() === productId;
  });
  if (productIndex === -1) {
    wishList.products.unshift(productId);
  }
  await wishList.save();

  return res.status(200).json(bag);
});
