import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Cliente {

    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;

    constructor(
        _nome: string,
        _cpf: string,
        _telefone: string,
    ) {
        this.nome = _nome;
        this.cpf = _cpf;
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

        static async listarClientes(): Promise<Array<Cliente> | null> {
            try {
                let listaDeClientes: Array<Cliente> = [];

                const querySelectClientes = `SELECT * FROM clientes;`

                const respostaBD = await database.query(querySelectClientes);
                
                respostaBD.rows.forEach((linha: any) => {
                    const novoCliente: Cliente = new Cliente(
                        linha.nome,
                        linha.cpf,
                        linha.telefone
                    );
                    
            });
            } catch (error) {
                console.error(`Erro ao acessar o banco de dados. ${error}`);
                return null;
                
        
        }
    }
}

export default Cliente;