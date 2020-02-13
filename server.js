const app = require('./src/config/custom-express')

app.listen(3000, function() {
	console.log('serviço de lista de desejos iniciado na porta 3000!');
});
