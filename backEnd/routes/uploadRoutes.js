import express from "express";
import path from "path";
import multer from "multer";

const routes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkTypes(file, cb) {
  const checkTypes = /jpg|jpeg|png/;
  const extCheck = checkTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extCheck) {
    return cb(null, true);
  } else {
    return cb("Image only");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkTypes(file, cb);
  },
});

routes
  .route("/")
  .post(upload.single("image"), (req, res) => res.send(`/${req.file.path}`));
export default routes;
