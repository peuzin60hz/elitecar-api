import type { ClienteDTO } from "../view/clienteDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados

/*
* Classe Cliente representa um modelo de cliente com seus atributos principais (nome, cpf, 
* data de nascimento, email, telefone e ID).
* Permite criar objetos de cliente, acessar e modificar seus dados, e consultar informações no banco de dados.
* Inclui métodos estáticos para listar todos os clientes ou buscar um medicamento específico pelo ID.
*/
class Cliente {

    // Atributos
    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private data_nascimento: string;
    private email: string;
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * @param _nome Nome do cliente
     * @param _cpf CPF do cliente
     * @param _data_nascimento Data de nascimento do cliente
     * @param _email Email do cliente
     * @param _telefone Telefone do cliente
     */
    constructor(
        _nome: string,
        _cpf: string,
        _data_nascimento: string,
        _email: string,
        _telefone: string
    ) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.data_nascimento = _data_nascimento;
        this.email = _email;
        this.telefone = _telefone;
    }

    /**
     * Retorna o ID do cliente
     * @returns ID do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um ID ao cliente
     * @param idCliente novo ID
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente
     * @returns Nome do cliente
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Atribui um nome ao cliente
     * @param nome novo nome do cliente
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do cliente
     * @returns CPF do cliente
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Atribui um CPF ao cliente
     * @param cpf novo CPF do cliente
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna a Data de nascimento do cliente
     * @returns Data de nascimento do cliente
     */
    public getData_Nascimento(): string {
        return this.data_nascimento;
    }

    /**
     * Atribui uma Data de nascimento ao cliente
     * @param data_nascimento nova Data de nascimento do cliente
     */
    public setData_Nascimento(data_nascimento: string): void {
        this.data_nascimento = data_nascimento;
    }

    /**
     * Retorna o E-mail do cliente
     * @returns E-mail do cliente
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Atribui um E-mail ao cliente
     * @param email novo E-mail do cliente
     */
    public setEmail(email: string): void {
        this.email = this.email;
    }

    /**
     * Retorna o telefone do cliente
     * @returns Telefone do cliente
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Atribui um telefone ao cliente
     * @param telefone novo telefone do cliente
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
            let listaDeClientes: Array<Cliente> = [];

            const querySelectClientes = `SELECT * FROM clientes;`;

            const respostaBD = await database.query(querySelectClientes);

            respostaBD.rows.forEach((clienteBD) => {
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome,
                    clienteBD.cpf,
                    clienteBD.data_nascimento,
                    clienteBD.email,
                    clienteBD.telefone
                );

                novoCliente.setIdCliente(clienteBD.id_cliente);

                listaDeClientes.push(novoCliente);
            });

            return listaDeClientes;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return null;
        }
    }

    /**
     * Insere um cliente no banco de dados
     * 
     * @param cliente objeto a ser inserido no banco
     * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
     */
    static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean> {
        try {
            const queryInsertCliente = `INSERT INTO clientes (nome, cpf, data_nascimento, email, telefone)
                                VALUES
                                ($1, $2, $3, $4, $5)
                                RETURNING id_cliente;`;

            const respostaBD = await database.query(queryInsertCliente, [
                cliente.nome.toUpperCase(), 
                cliente.cpf,                
                cliente.dataNascimento,    
                cliente.email,              
                cliente.telefone            
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Cliente cadastrado com sucesso. ID: ${respostaBD.rows[0].id_cliente}`);

                return true;
            }
            
            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listarCliente(cpf: string): Promise<Cliente | null> {
        try {
            const queryInsertCliente = `SELECT * FROM Clientes WHERE cpf=$1;`;

            const respostaBD = await database.query(queryInsertCliente, [cpf]);

            if (respostaBD.rowCount != 0) {
                const cliente: Cliente = new Cliente(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].cpf,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].telefone
                );
                cliente.setCpf(respostaBD.rows[0].cpf);

                return cliente;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Cliente;