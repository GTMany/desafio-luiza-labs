const db = require('../../config/database');
const ClienteDao = require('../dao/cliente-dao')

const clienteDao = new ClienteDao(db);

class ClienteService {
    async clienteExiste(id_cliente) {
        let clienteExiste = false;
        await clienteDao.buscaPorId(id_cliente)
            .then(res => {
                if(res.length > 0) clienteExiste = true;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        return clienteExiste;
    }
}

module.exports = ClienteService;