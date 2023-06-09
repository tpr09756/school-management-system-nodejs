const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//@desc Register admin
//@route POST /api/admins/register
//@access Private
const registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin exists");
  }

  //register admin
  const user = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin registered successfully",
  });
});

//@desc Login admin
//@route POST /api/v1/admins/login
//@access Private
const loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const user = await Admin.findOne({ email });
  console.log(user.password);
  if (!user) {
    return res.json({ message: "Invalid login credentials" });
  }

  // verify password

  const isMatched = await isPassMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: "Admin logged in successful",
    });
  }
});

//@desc Get all admins
//@route GET /api/v1/admins
//@access Private
const getAdminsCtrl = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: "success",
    data: admins,
    message: "Admins fetched successfully",
  });
});

//@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private
const getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  console.log(req.user);
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears");
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin profile fetched successfully",
    });
  }
});

//@desc Update admin
//@route UPDATE /api/v1/admins/:id
//@access Private
const updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // if email exists
  const emailExists = await Admin.findOne({ email });
  if (emailExists) {
    throw new Error("this email already exists");
  }

  //check if user is updating password
  if (password) {
    //update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        name,
        email,
        password: await hashPassword(password),
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedAdmin,
      message: "Admin updated successfully",
    });
  } else {
    //update admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        name,
        email,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedAdmin,
      message: "Admin updated successfully",
    });
  }
});

//@desc Delete admin
//@route DELETE /api/v1/admins/:id
//@access Private
const deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin suspends a teacher
//@route PUT /api/v1/admins/suspend/teacher/:id
//@access Private
const adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin suspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin unsuspend teacher
//@route PUT /api/v1/admins/unsuspend/teacher/:id
//@access Private
const adminUnsuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin Unsuspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Withdraw teacher
//@route PUT /api/v1/admins/unsuspend/teacher/:id
//@access Private
const adminWithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc unWithdraw teacher
//@route PUT /api/v1/admins/unwithdraw/teacher/:id
//@access Private
const adminUnwithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin publish exam results
//@route PUT /api/v1/admins/publish/exam/:id
//@access Private
const adminPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin exam results",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin unpublish exam results
//@route PUT /api/v1/admins/unpublish/exam/:id
//@access Private
const adminUnPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unpublishing exam results",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdminCtrl: registerAdminCtrl,
  loginAdminCtrl: loginAdminCtrl,
  getAdminsCtrl: getAdminsCtrl,
  getAdminProfileCtrl: getAdminProfileCtrl,
  updateAdminCtrl: updateAdminCtrl,
  deleteAdminCtrl: deleteAdminCtrl,
  adminSuspendTeacherCtrl: adminSuspendTeacherCtrl,
  adminUnsuspendTeacherCtrl: adminUnsuspendTeacherCtrl,
  adminWithdrawTeacherCtrl: adminWithdrawTeacherCtrl,
  adminUnwithdrawTeacherCtrl: adminUnwithdrawTeacherCtrl,
  adminPublishResultsCtrl: adminPublishResultsCtrl,
  adminUnPublishResultsCtrl: adminUnPublishResultsCtrl,
};
