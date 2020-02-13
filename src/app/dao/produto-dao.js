class ProdutoDao {
    
    constructor(db){
        this._db = db;
    }
    
    adiciona(produto){
        return new Promise((resolve, reject) => {
            this._db.query('INSERT INTO produto (id, price, image, brand, title, reviewscore) VALUES($1, $2, $3, $4, $5, $6)', 
                [produto.id, produto.price, produto.image, produto.brand, produto.title, produto.reviewScore], (error, result) => {
                if(error){
                    console.log(produto);
                    return reject("Não foi possível inserir o produto");
                }
                
                resolve('Produto inserido com sucesso'); 
            });
        });
    }
    
    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM produto where id = $1", [id], (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível encontrar o produto");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    buscaPorIds(ids){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM produto where id in ($1)", ids, (error, results) => {
                if(error){
                    console.log(error);
                    return reject("Não foi possível encontrar o produto");
                }
                
                resolve(results.rows);
            });     
        });
    }
    
    atualiza(produto){      
        return new Promise((resolve, reject) => {
            
            this._db.query('UPDATE produto SET id=$1, price=$2, image=$3, brand=$4, title=$5, reviewscore=$6', 
            [produto.id, produto.price, produto.brand, produto.title, produto.reviewScore], (error, result) => {
                if(error){
                    return reject("Não foi possível atualizar o produto");
                }
                
                resolve('Produto atualizado com sucesso.'); 
            });
        });
    }
    
}

module.exports = ProdutoDao;