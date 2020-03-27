const app = require('../../src/app')
const request = require('supertest')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.migrate.rollback()
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({ 
                name: "Médicos sem Fronteiras",
                email: "contato@email.com",
                whatsapp: "12345678901",
                city: "São Paulo",
                uf: "SP",
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})