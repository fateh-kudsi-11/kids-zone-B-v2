import AddressBook from "../models/AddressBook";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/ErrRes";

// @desc Create Address book
// @route POST /api/v1/addressBook
// @access Private

export const createAddressBook = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const addressBook = await AddressBook.create({ ...req.body, user: userId });
  res.status(201).json({ addressBook });
});

// @desc find Address book
// @route GET /api/v1/addressBook
// @access Private

export const findAddressBook = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const addressBook = await AddressBook.find({ user: userId });
  res.status(200).json({ addressBook });
});

// @desc find Address book by id
// @route GET /api/v1/addressBook/:id
// @access Private

export const findAddressBookById = asyncHandler(async (req, res, next) => {
  const addressBook = await AddressBook.findById(req.params.id);
  res.status(200).json({ addressBook });
});

// @desc Delete Address book by id
// @route DELETE /api/v1/addressBook/:id
// @access Private

export const deleteAddressBookById = asyncHandler(async (req, res, next) => {
  const addressBook = await AddressBook.findByIdAndDelete(req.params.id);
  res.status(200).json({ succes: true });
});
