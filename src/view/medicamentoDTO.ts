export interface ClienteDTO {
    idCliente?: number,
    nome: string,
    cpf: string,
    dataNascimento: number,
    telefone: string,
    email: string,
    situacao?: boolean
}