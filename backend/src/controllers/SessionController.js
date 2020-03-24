const db = require('../database/connection')

module.exports = {

    async create (request, response) {
        const { id } = request.body

        const ong = await db('ongs')
            .select('name')
            .where('id', id)
            .first()
        if (!ong) {
            return response.status(400).json({ error: 'On ONG found with this id' })
        }

        return response.json(ong)
    }
}