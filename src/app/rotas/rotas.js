const db = require('../../config/database');
const ClienteDao = require('../../app/dao/cliente-dao');
const UsuarioDao = require('../../app/dao/usuario-dao');
const WishListService = require('../../app/service/wishlist-service');
const authentication = require('../../config/authentication');

const clienteDao = new ClienteDao(db);
const usuarioDao = new UsuarioDao(db);
const wishListService = new WishListService();
var jwt = require('jsonwebtoken');

module.exports = (app) => {
    
    app.get('/' , (req, res) => {
        res.send("API rest para gerenciar os produtos favoritos dos clientes da Magazine Luiza.");
    })
    
    app.post('/login', (req, res, next) => {
        usuarioDao.buscaUsuario(req.user, req.pwd)
            .then(response => {
                if(response){
                    const id = 1;
                    var token = jwt.sign({ id }, 'luizalabs', {
                        expiresIn: 600 // expira em 10 minutos
                    });
                    res.status(200).send({ auth: true, token: token });
                }        
            })
            .catch(() => res.status(500).send('Login inválido!'));
      })
      
    app.get('/cliente',authentication.verifyJWT, (req,res) => {
        clienteDao.buscaClientes(parseInt(req.query.page))
        .then(results => {
            res.send(results); 
        })
        .catch((err) => res.send({erro: err}));
    });
    
    app.get('/cliente/:id',authentication.verifyJWT, (req,res) => {  
        if(!req.params.id){
            res.send({erro: 'id do cliente não informado.'})
        }
        
        clienteDao.buscaPorId(parseInt(req.params.id))
            .then(results => {
                res.send(results); 
            })  
        .catch((err) => res.send({erro: err}));
    });
        
    app.post('/cliente', authentication.verifyJWT, (req, res) => {
        clienteDao.adiciona(req.body)
            .then((response) => res.send(response))
            .catch(err => res.send({erro: err}));
    });
        
    app.put('/cliente', authentication.verifyJWT, (req, res) => {
            clienteDao.atualiza(req.body)
            .then((response) => res.send(response))
            .catch(err => res.send({erro: err}));
        });
        
    app.delete('/cliente', (req, res) => {
            clienteDao.remove(parseInt(req.query.id_cliente))
                .then((response) => res.send({msg: response}))
                .catch(err => res.send({erro: err}));
        });
        
    app.route('/wishlist')
        .get(authentication.verifyJWT, (req, res) => {
            wishListService.buscaWishListPorIdCliente(parseInt(req.query.id_cliente))
            .then((response) => res.send(response))
            .catch((err) =>  res.send({erro: err}));
        })
        .post(authentication.verifyJWT, async (req, res) => {
            
            const wishlist = req.body;
            await wishListService.adiciona(wishlist)
                .then((response) => res.send({msg: response}))
                .catch((error) => res.send({erro: error}));
        });
}