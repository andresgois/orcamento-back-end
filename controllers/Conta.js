import database from '../Data/db';

class Conta{

	async index(req, res){
		const dados = await database.select("*").table("conta");
		return res.json({dados});
	}

	async store(req, res){
		var { data_compra, descricao, parcelas, valor, id_pagamento } = req.body;
		await database.insert(req.body).into("conta");
		return res.json({ok: "Dados inseridos com sucesso"});
	}

	async update(req, res){
		try{
			const id = parseInt(req.params.index);
			const {data_compra, descricao, parcelas, valor, id_pagamento} = req.body;
			await database.where({"id_conta": id}).update(req.body).table("conta");
			res.json({msg: "Item atualizado com sucesso"});
		}catch(err){
			res.status(400).json({msg: "Erro ao atualizar registro "})
		}
	}

	async destroy(req, res){
		try{
			const id = parseInt(req.params.index);
			await database.where({"id_conta": id}).delete().table("conta")
			res.json({msg: "Item deletado com sucesso"});	
		}catch(err){
			res.status(400).json({msg: "Erro ao deletar registro "})
		}
	}

}


export default new Conta();