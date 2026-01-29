const User = require('../models/User');

const createUser = async (name, email, password) => {
    return await User.create({name, email, password});
}

const getAllUsers = async () => {
    return await User.find();
}

const getUserById = async (id) => {
    return await User.findById(id);
}

const getUserByEmail = async (email) => {
    return await User.findOne({email});
}

const updateUser = async (id, name, email, password) => {
    return await User.findByIdAndUpdate(id, {name, email, password, updatedAt: Date.now() }, {new: true});
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}