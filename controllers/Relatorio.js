import database from '../Data/db';

class Relatorio{

	async index(req, res){
		try{
			const dados = await database.select(["conta.descricao","conta.valor","relatorio.parc_atual","conta.parcelas","conta.data_compra","tipo_pagamento.pagamento as Tipo"])
									.table("relatorio")
									.innerJoin("conta","conta.id_conta","relatorio.conta_id")
									.innerJoin("tipo_pagamento","tipo_pagamento.id_pagamento","conta.id_pagamento")
									.whereRaw("Month(relatorio.data_parcela) = Month(now())");

			return res.status(200).json({dados});
		}catch(err){
			return res.status(400).json({msq: "Erro ao exibir dados: "+err})
		}		
	}


	/*async indexMonth(req, res){
		try{
			const mes = parseInt(req.params.mes);
			const dados = await database.select(["conta.descricao","conta.valor","relatorio.parc_atual","conta.parcelas","conta.data_compra","tipo_pagamento.pagamento as Tipo"])
									.table("relatorio")
									.innerJoin("conta","conta.id_conta","relatorio.conta_id")
									.innerJoin("tipo_pagamento","tipo_pagamento.id_pagamento","conta.id_pagamento")
									.whereRaw("Month(relatorio.data_parcela) = "+mes);

			return res.status(200).json({dados});
		}catch(err){
			return res.status(400).json({msq: "Erro ao exibir dados: "+err})
		}		
	}*/

	async indexYearMonth(req, res){
		try{
			const data = req.params.data;
			const ano = data.substr(0,4);
			const mes = data.substr(4,2);
			const dados = await database.select(["conta.descricao","conta.valor","relatorio.parc_atual","conta.parcelas","conta.data_compra","tipo_pagamento.pagamento as Tipo"])
									.table("relatorio")
									.innerJoin("conta","conta.id_conta","relatorio.conta_id")
									.innerJoin("tipo_pagamento","tipo_pagamento.id_pagamento","conta.id_pagamento")
									.whereRaw(`CONCAT(YEAR(relatorio.data_parcela),'-',Month(relatorio.data_parcela)) = CONCAT(${ano},"-",${mes})`);

			return res.status(200).json({dados});
		}catch(err){
			return res.status(400).json({msq: "Erro ao exibir dados: "+err})
		}		
	}

}


export default new Relatorio();