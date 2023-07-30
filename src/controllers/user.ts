import User from "../models/User";
import ErrorResponse from "../utils/ErrRes";
import asyncHandler from "../middleware/async";

// @desc Get Register user
// @route POST /api/v1/auth/register
// @access Public

export const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getSignedJwtToken();
  res.status(201).json({ token });
});

// @desc   Get Login user
// @route  POST /api/v1/auth/login
// @access Public

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentails`, 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentails`, 401));
  }
  const token = user.getSignedJwtToken();
  res.status(200).json({ token });
});

// @desc   Get Current logged in user
// @route  GET /api/v1/auth/me
// @access Private

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    data: user,
  });
});

// @desc   Update user profile
// @route  POST /api/v1/auth/update-user
// @access Private

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    data: user,
  });
});

// @desc   Update User Password
// @route  POST /api/v1/auth/update-password
// @access Private

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(
      new ErrorResponse(
        `Please provide an current password and new password`,
        400
      )
    );
  }
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentails`, 401));
  }
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentails`, 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
  });
});
