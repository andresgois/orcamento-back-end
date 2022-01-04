import database from '../Data/db';
import * as Yup from "yup";

class TipoPagamento{

	async index(req, res){
		const dados = await database.select("*").table("tipo_pagamento");
		return res.json({dados});
	}

	async indexOne(req, res){
		try{			
			const id = parseInt(req.params.index);
			const dados = await database.select("*").where({"id_pagamento": id}).table("tipo_pagamento");
			let idx = dados[0].id_pagamento;
			let pag = dados[0].pagamento
			let vencimento = dados[0].vencimento
			let melhor_dia_compra = dados[0].melhor_dia_compra
		
			return res.json({
				"id_pagamento":idx,
				"pagamento":pag,
				"vencimento":vencimento,
				"melhor_dia_compra":melhor_dia_compra
			});

		}catch(err){
			res.status(400).json({msg: "Erro ao Procurar registro"})
		}
	}

	async store(req, res){
		const schema = Yup.object().shape({
	      pagamento: Yup.string().required(),
	      vencimento: Yup.number().required(),
	      melhor_dia_compra: Yup.number().required()
	    });

		const {pagamento, vencimento, melhor_dia_compra} = req.body;

		if(melhor_dia_compra >= vencimento){
	    	return res.status(400).json({ error: "Melhor dia para comprar não pode ser maior que o vencimento" });
	    }

		if (!(await schema.isValid(req.body))) {
			console.log(req.body);
	      return res.status(400).json({ error: "Ausência de dados!" });
	    }
		
		await database.insert(req.body).into("tipo_pagamento");
		return res.status(200).json({ok: "Dados inseridos com sucesso"});
	}

	async update(req, res){
		try{
			const id = parseInt(req.params.index);
			console.log(id)
			const {pagamento, vencimento, melhor_dia_compra} = req.body;
			await database.where({"id_pagamento": id}).update(req.body).table("tipo_pagamento");
			console.log(req.body)
			res.json({msg: "Item atualizado com sucesso"});
		}catch(err){
			res.status(400).json({msg: "Erro ao atualizar registro "})
		}
	}

	async destroy(req, res){
		try{
			const id = parseInt(req.params.index);
			await database.where({"id_pagamento": id}).delete().table("tipo_pagamento")
			res.json({msg: "Item deletado com sucesso"});	
		}catch(err){
			res.status(400).json({msg: "Erro ao deletar registro "})
		}
	}

}


export default new TipoPagamento();