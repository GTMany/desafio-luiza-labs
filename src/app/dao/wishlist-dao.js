const axios = require('axios');

class WishlistDao {
    
    constructor(db) {
        this._db = db;
        this.produto = undefined;
    }
    
    adiciona(wishlist){
        return new Promise((resolve, reject) => {
            this._db.query('INSERT INTO wishlist (id_cliente, id_produto) VALUES($1, $2)', [wishlist.id_cliente, wishlist.id_produto], (error, result) => {
                if(error){
                    return reject("Não foi possível inserir o produto na lista de desejos.");
                }
                
                return resolve('Produto adicionado na lista de desejos com sucesso.'); 
            });
        });
    }
    
    removePeloIdDoCliente(id_cliente) {
        return new Promise((resolve, reject) => {
            this._db.query("DELETE FROM wishlist WHERE id_cliente=$1", [id_cliente], (error, results) => {
                if(error){
                    return reject("Não foi possível deletar a lista de desejos.");
                }
                return resolve('Lista removida com sucesso');
            });  
        });
    }
    
    buscaWishListPorIdCliente(id_cliente){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT id_produto FROM wishlist where id_cliente = $1", [id_cliente], (error, results) => {
                if(error){
                    console.log("Erro ao tentar encontrar o produto na lista de desejos.");
                    reject(error);
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    buscaWishListPorIdClienteEIdProduto(id_cliente, id_produto) {
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM wishlist where id_cliente = $1 and id_produto = $2", [id_cliente, id_produto], (error, results) => {
                if(error){
                    console.log("Erro ao tentar encontrar o produto na lista de desejos.");
                    reject(error);
                }
                
                resolve(results.rows);
            });     
        });
    }
}

module.exports = WishlistDao;