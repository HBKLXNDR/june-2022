const router = require("express").Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers);

router.get('/:userId', mdlwr.checkDoesUserExist, controller.getSingleUser);

router.put('/:userId', mdlwr.checkDoesUserExist, controller.updateUser);

module.exports = router;