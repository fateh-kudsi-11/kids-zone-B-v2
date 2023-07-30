import PaymentMethod from "../models/PaymentMethod";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/ErrRes";

// @desc Create Payment method
// @route POST /api/v1/PaymentMethod
// @access Private

export const createPaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const paymentMethod = await PaymentMethod.create({
    ...req.body,
    user: userId,
  });
  res.status(201).json({ paymentMethod });
});

// @desc find Payment method
// @route GET /api/v1/PaymentMethod
// @access Private

export const findPaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const paymentMethod = await PaymentMethod.find({ user: userId });
  res.status(200).json({ paymentMethod });
});

// @desc find Payment method by id
// @route GET /api/v1/PaymentMethod/:id
// @access Private

export const findPaymentMethodById = asyncHandler(async (req, res, next) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id);
  res.status(200).json({ paymentMethod });
});

// @desc Delete Payment method  by id
// @route DELETE /api/v1/PaymentMethod/:id
// @access Private

export const deletePaymentMethodById = asyncHandler(async (req, res, next) => {
  const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
  res.status(200).json({ succes: true });
});
