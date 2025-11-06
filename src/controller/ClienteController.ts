import Cliente from "../model/Cliente.js";
import type { Request, Response } from "express";

/**
 * Classe responsável por receber a requisição do cliente, processar essa requisição e devolver a resposta ao cliente
 * 
 * Trata apenas de requisições relacionadas ao recurso Cliente
 */
class ClienteController extends Cliente {

    /**
     * Faz a chamada ao modelo para obter a lista de clientes e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os clientes
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarClientes da classe Cliente para buscar todos os clientes no banco de dados
            const listaClientes: Array<Cliente> | null = await Cliente.listarClientes();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de clientes em formato JSON
            return res.status(200).json(listaClientes);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });
        }

    }

    /**
     * Faz a chamada ao modelo para inserir um novo cliente
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Objeto do cliente inserido
     * @returns (400) Erro ao inserir cliente
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosCliente = req.body;

            const respostaModelo = await Cliente.cadastrarCliente(dadosRecebidosCliente);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar cliente." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o cliente" });
        }
    }

    /**
     * Faz a chamada ao modelo para obter o cliente selecionado e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Objeto do cliente selecionado
     * @returns (400) Erro no ID do cliente
     * @returns (500) Erro na consulta
     */
    static async cliente(req: Request, res: Response): Promise<Response> {
        try {
            const cpf: string = req.params.cpf as string;

            if (!cpf || cpf.trim() == "") {
                return res.status(400).json({ mensagem: "CPF inválido." });
            }

            const respostaModelo = await Cliente.listarCliente(cpf);

            if (respostaModelo == null) {
                return res.status(200).json({ mensagem: "Nenhum cliente encontrado com o CPF fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o cliente." });
        }
    }
}

export default ClienteController;