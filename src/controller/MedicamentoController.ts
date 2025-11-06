import Medicamento from "../model/medicamento.js";
import type { Request, Response } from "express";

class MedicamentoController extends Medicamento {


    static async todos(req: Request, res: Response): Promise<Response> {
        try {

            const listarMedicamento: Array<Medicamento> | null = await Medicamento.listarMedicamento();

            return res.status(200).json(listarMedicamento);
        } catch (error) {
        
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });
        }

    }
}

export default MedicamentoController;