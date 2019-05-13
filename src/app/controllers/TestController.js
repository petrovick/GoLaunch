
class TestController {
    async index(req, res) {
        return res.json({status:200, message: 'Salvo com sucesso'})
    }
}

module.exports = new TestController()