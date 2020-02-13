class UsuarioDao {
    constructor(db){
        this._db = db;
    }
    
    buscaUsuario(usuario, senha){
        return new Promise((resolve, reject) => {
            this._db.query("SELECT * FROM usuario where username = $1 and pwd = $2", [usuario, senha], (error, results) => {
                if(error){
                    console.log("Erro ao tentar encontrar o usuario.");
                    console.log(error);
                    reject(error);
                }
                
                resolve(results.rows);
            }); 
        });
    }
    
}

module.exports = UsuarioDao;