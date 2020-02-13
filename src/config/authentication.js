var jwt = require('jsonwebtoken');

module.exports = {
    verifyJWT: (req, res, next) => {
        var token = req.headers['authorization'];
        if (!token) return res.status(401).send({ auth: false, message: 'Token não fornecido.' });

        jwt.verify(token, 'luizalabs', function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar.' });
            
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}   