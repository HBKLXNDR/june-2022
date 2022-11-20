const router = require("express").Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");

router.get('/', controller.getAllUsers);

router.post('/', mdlwr.isBodyValidCreate, controller.create);

router.get('/:userId', mdlwr.isIdValid, mdlwr.checkDoesUserExist, controller.getSingleUser);

router.put('/:userId', mdlwr.isIdValid, mdlwr.isBodyValidUpdate, mdlwr.checkDoesUserExist, controller.updateUser);

router.delete('/:userId', mdlwr.isIdValid, mdlwr.checkDoesUserExist, controller.deleteUser);

module.exports = router;