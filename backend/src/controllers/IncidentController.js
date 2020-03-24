const db = require('../database/connection')

module.exports = {

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        // insert retorna um array com os dados
        // como inserimos apenas um valor, desestrutura pra pegar o item do array
        const [id] = await db('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },

    async index (request, response) {
        const { page = 1 } = request.query

        const [ count ] = await db('incidents').count()
        response.header('X-Total-Count', count['count(*)'])

        const incidents = await db('incidents')
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)

        return response.json(incidents)
    },

    async delete (request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization
        const incident = await db('incidents')
            .select('ong_id')
            .where('id', id)
            .first()

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not allowed' })
        }

        await db('incidents').delete().where('id', id)

        return response.status(204).send()
    }
}