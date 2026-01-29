const bcrypt = require('bcryptjs')
require('dotenv').config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords
}