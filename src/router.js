import { Router } 		from "express";

import TipoPagamento 	from '../controllers/TipoPagamento';
import Conta 			from '../controllers/Conta';
import Relatorio 		from '../controllers/Relatorio';

const routes = new Router();


routes.get("/tipopagamento",  TipoPagamento.index);
routes.get("/tipopagamento/:index",  TipoPagamento.indexOne);
routes.post("/tipopagamento",  TipoPagamento.store);
routes.put("/tipopagamento/:index",  TipoPagamento.update);
routes.delete("/tipopagamento/:index",  TipoPagamento.destroy);

routes.get("/conta",  Conta.index);
routes.post("/conta",  Conta.store);
routes.put("/conta/:index",  Conta.update);
// falta, quando deletar de conta apagar de relatorio 
routes.delete("/conta/:index",  Conta.destroy);


routes.get("/relatorio",  Relatorio.index);
//routes.get("/relatorio/:mes",  Relatorio.indexMonth);
routes.get("/relatorio/:data",  Relatorio.indexYearMonth);


export default routes;