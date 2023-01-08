const bcrypt = require("bcrypt")

const hashPassword = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash
}

const comparePassword = async (plaintextPassword, hash) => {
    return await bcrypt.compare(plaintextPassword, hash);
}

module.exports = {
    comparePassword,
    hashPassword
}