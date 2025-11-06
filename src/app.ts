import { server } from "./server.js";
import { DatabaseModel } from "./model/DatabaseModel.js";

const port: number = 3333;

async function startServer() {
  try {
    const db = new DatabaseModel();
    const conexaoOk = await db.testeConexao();

    if (conexaoOk) {
      server.listen(port, () => {
        console.log(`✅ Servidor rodando em http://localhost:${port}`);
      });
    } else {
      console.error("❌ Não foi possível conectar ao banco de dados");
    }
  } catch (erro) {
    console.error("❌ Erro ao iniciar o servidor:", erro);
  }
}

startServer();
