const WishlistDao = require('../dao/wishlist-dao');

class ClienteDao {
    constructor(db) {
        this._db = db;
        this._wishlistDao = new WishlistDao(db);
    }
    
    lista(){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM cliente ORDER BY id ASC", (error, results) => {
                if(error){
                    return reject("Não foi possível listar os clientes");
                }
                
                resolve(results.rows);
            });     
        });
        
    }
    
    adiciona(cliente){
        return new Promise(async (resolve, reject) => {
            
            let clienteExiste = false;
            await this.buscaPorEmail(cliente.email).
                then((res)=> {
                    if(res.length){
                        clienteExiste = true;
                    }
                }).catch((err)=> reject(err));
                
            console.log(clienteExiste);
                
            if(clienteExiste){
                return reject('Cliente já cadastrado.');
            }
            
            this._db.query('INSERT INTO cliente (nome, email) VALUES($1, $2)', [cliente.nome, cliente.email], (error, result) => {
                if(error){
                    return reject("Não foi possível inserir o cliente");
                }
                
                resolve('Cliente inserido com sucesso'); 
            });
        });
    }
    
    atualiza(cliente){      
        return new Promise(async (resolve, reject) => {
            
            if(!this.buscaPorId(cliente.id)){
                return reject('Cliente não existe.');
            }
            
            let clienteExiste = false;
            await this.buscaPorEmail(cliente.email).
                then((res)=> {
                    if(res.length){
                        clienteExiste = true;
                    }
                }).catch((err)=> reject(err));
                
            if(clienteExiste){
                return reject('Cliente já cadastrado.');
            }
            
            this._db.query('UPDATE cliente SET nome=$1, email=$2 WHERE id_cliente=$3', [cliente.nome, cliente.email, cliente.id], (error, result) => {
                if(error){
                    return reject("Não foi possível atualizar o cliente");
                }
                
                resolve('Cliente atualizado com sucesso.'); 
            });
        });
    }
    
    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM cliente where id_cliente = $1", [id], (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível encontrar o cliente");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    buscaClientes(page){
        return new Promise(async (resolve, reject) => {
                
            this._db.query("SELECT * FROM cliente", (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível encontrar o cliente");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    countClientes(){
        return new Promise(async (resolve, reject) => {
            this._db.query("SELECT count(1) FROM cliente", (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível calcular a quantidade de clientes");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    buscaPorEmail(email){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM cliente where email = $1", [email], (error, results) => {
                if(error){
                    return reject("Não foi possível encontrar o cliente");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    remove(id){
        return new Promise(async (resolve, reject) => {
            await this._wishlistDao.removePeloIdDoCliente(id)
                .then((res) => console.log(res))
                .catch((error) => reject(error));
                
            this._db.query("DELETE FROM cliente WHERE id_cliente=$1", [id], (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível deletar o cliente.");
                }
                resolve('Cliente removido com sucesso');
            });
        });
    }
}

module.exports = ClienteDao;