import sequelize from "./config/db.js";
import chalk from "chalk";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

try {
  await sequelize.authenticate();
  console.log("🟢 Conexão com o banco de dados foi bem-sucedida!");

  await sequelize.sync();
  console.log("✅ Modelos sincronizados com o banco!");

  app.listen(PORT, () => {
    console.log(chalk.bgYellowBright(`🚀 Servidor rodando em http://localhost:${PORT}`));
  });
} catch (error) {
  console.error("🔴 Erro ao conectar no banco de dados:", error);
}
