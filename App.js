import express from 'express';
import database from "./Data/db";
import bodyParser from "body-parser";
const app = express();


// parse application/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/conta', async (req, res) => {
	const dados = await database.select("*").table("conta");
	return res.json({dados});
});

app.post('/tipopagamento', async (req, res) => {
	var {pagamento, vencimento, melhor_dia_compra} = req.body;
	await database.insert(req.body).into("tipo_pagamento");
	return res.json({ok: true});
});

app.put('/tipopagamento/:index',  async (req, res) => {
		try{
			const id = parseInt(req.params.index);
			const {pagamento, vencimento, melhor_dia_compra} = req.body;
			await database.where({"id_pagamento": id}).update(req.body).table("tipo_pagamento");
			res.json({msg: "Item atualizado com sucesso"});
		}catch(err){
			res.status(400).json({msg: "Erro ao atualizar registro "})
		}
		
});

app.delete('/tipopagamento/:index', async (req, res) => {
		try{
			const id = parseInt(req.params.index);
			await database.where({"id_pagamento": id}).delete().table("tipo_pagamento")
			res.json({msg: "Item deletado com sucesso"});	
		}catch(err){
			res.status(400).json({msg: "Erro ao deletar registro "})
		}
		
});





app.listen(3000, () => {
	console.log('API Rodando');
})