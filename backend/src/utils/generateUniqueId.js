const crypto = require('crypto')

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX')
}

/**
 * O node não entende o export default function, por isso aqui foi usado
 * o module.exports = function
 */