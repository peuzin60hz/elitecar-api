import { DatabaseModel } from "./DatabaseModel.js"; 

 const database = new DatabaseModel().pool;

class Medicamento {

    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private principioAtivo: string;
    private dataValidade: number;
    private preco: number;

    constructor(
        _nome: string,
        _fabricante: string,
        _principioAtivo: string,
        _dataValidade: number,
        _preco: number
    ) {
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.principioAtivo = _principioAtivo;
        this.dataValidade = _dataValidade;
        this.preco = _preco;
    }

    public getIdMedicamento(): number {
        return this.idMedicamento;
    }

    public setIdMedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getFabricante(): string {
        return this.fabricante;
    }

    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }

    public getPrincipioAtivo(): string {
        return this.principioAtivo;
    }

    public setPrincipioAtivo (principioAtivo: string): void {
        this.principioAtivo = principioAtivo;
    }

    public getDataValidade(): number {
        return this.dataValidade;
    }

    public setDataValidade(dataValidade: number): void {
        this.dataValidade = dataValidade;
    }

     public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

    static async listarMedicamento(): Promise<Array<Medicamento> | null> {
        try {
           
            let listaDeMedicamento: Array<Medicamento> = [];

           
            const querySelectMedicamento = `SELECT * FROM medicamentos;`;

            const respostaBD = await database.query(querySelectMedicamento);

            respostaBD.rows.forEach((medicamentoBD) => {
                
                const novoMedicamento: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.fabricante,
                    medicamentoBD.principioAtivo,
                    medicamentoBD.dataValidade,
                    medicamentoBD.preco
                );

                novoMedicamento.setIdMedicamento(medicamentoBD.idMedicamento);

                listaDeMedicamento.push(novoMedicamento)
            });
 
            return listaDeMedicamento;
        } catch (error) {
            
            console.error(`Erro na consulta ao banco de dados. ${error}`);
  
            return null;
        }
    }
}

export default Medicamento;