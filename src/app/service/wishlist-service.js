const db = require('../../config/database');
const WishListDao = require('../dao/wishlist-dao');
const ProdutoDao = require('../dao/produto-dao');
const ClienteService = require('../service/cliente-service')
const axios = require('axios');

const wishlistDao = new WishListDao(db);
const clienteService = new ClienteService();
const produtoDao = new ProdutoDao(db);

class WishlistService {
    async adiciona(wishlist){
        return new Promise(async (resolve, reject) => {
            if(!await clienteService.clienteExiste(wishlist.id_cliente)){
                return reject('Cliente não existe.');
            }
            
            if(!this.produtoExiste(wishlist.id_produto)){
                return reject('Produto não encontrado.');
            }
            
            var produtoExisteNaLista = false;
            await wishlistDao.buscaWishListPorIdClienteEIdProduto(wishlist.id_cliente, wishlist.id_produto)
                .then((response) => {
                    if(response.length > 0){
                        produtoExisteNaLista = true;
                    }
                })
                .catch((err) =>  reject(err));
            
            if(produtoExisteNaLista) {
                return reject('Produto já está adicionado na lista de desejos');
            }
            
            wishlistDao.adiciona(wishlist)
                .then((response) => resolve(response))
                .catch((err)=> reject(err));
        });
    }
    
    async produtoExiste(id_produto) {
        let produto = null;
        await axios.get('http://challenge-api.luizalabs.com/api/product/'+ id_produto)
            .then((res) => produto = res.data)
            .catch((err) => {
                throw err
            });
        
        if(produto != null){
            let produtoDb = null;
            await produtoDao.buscaPorId(id_produto)
                .then((resp) => {
                    if(resp && resp[0]){
                        produtoDb = resp[0];
                    }
                })
                .catch((err) => console.log(err));
                
            if(produtoDb == null) {
                await produtoDao.adiciona(produto).then((res) => console.log(res)).catch((err) => console.log(err));
            }
        }
        
        return produto;
    }
    
    async buscaProduto(id_produto) {
        let produto = null;
        await axios.get('http://challenge-api.luizalabs.com/api/product/'+ id_produto)
            .then((res) => produto = res)
            .catch((err) => console.log(err));
        return produto;
    }
    
    buscaWishListPorIdCliente(id_cliente){
        return new Promise(async (resolve, reject) => {
            let produtosBuscar = [];
            let produtos = [];
            await wishlistDao.buscaWishListPorIdCliente(id_cliente)
                .then((res) => {
                    res.forEach(i => {
                        produtosBuscar.push(i.id_produto);
                    })
                })
                .catch((err) => reject(err));
                
            await produtoDao.buscaPorIds(produtosBuscar)
                .then((res) => {
                    produtos = res;
                })
                .catch((err) => console.log(err));
                
            resolve(produtos);
        });
    }
}

module.exports = WishlistService;