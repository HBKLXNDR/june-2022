const ApiError = require("../error/ApiError");
const {fileServices} = require("../service");

module.exports = {
    checkDoesUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const users = await fileServices.reader();
            const user = users.find(el => el.id === +userId);

            if (!user) {
                throw new ApiError("user not found", 404);
            }
            req.users = users;
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }

    },

    isBodyValidCreate: (req, res, next) => {
        try {

            const {name, age} = req.body;

            if (!name || name.length <= 2) {
                throw new ApiError("Wrong name or it does not exist", 400);
            }
            if (!age || age < 2 || isNaN(age)) {
                throw new ApiError("Wrong age or it does not exist", 400);
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;
            if (userId < 0 || isNaN(userId)) {
                throw new ApiError(`Not valid Id ${userId}`, 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyValidUpdate: (req, res, next) => {
        try {

            const {name, age} = req.body;

            if (name && (name.length <= 2 || typeof name !== "string")) {
                throw new ApiError("Wrong name or it does not exist", 400);
            }
            if (age && (age < 2 || isNaN(+age))) {
                throw new ApiError("Wrong age or it does not exist", 400);
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}