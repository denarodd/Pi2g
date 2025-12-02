const jwt = require("jsonwebtoken");
const SECRET_KEY = "MinhaChaveUltraSecretaParaToken123";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Caminhos dos scripts e dos arquivos JSON
const scriptsPath = path.join(__dirname, "..", "scripts-powershell");
const usersFile = path.join(__dirname, "..", "shared-data", "users.json");

// Função que executa um script PowerShell
function runPowerShellScript(scriptName, args = [], jsonInput = null) {
  return new Promise((resolve, reject) => {
    const ps = spawn("powershell", [
      "-File",
      path.join(scriptsPath, scriptName),
      ...args
    ]);

    let output = "";
    let error = "";

    ps.stdout.on("data", (data) => {
      output += data.toString();
    });

    ps.stderr.on("data", (data) => {
      error += data.toString();
    });

    ps.on("close", (code) => {
      if (code !== 0) reject(error);
      else resolve(output);
    });

    if (jsonInput) {
      ps.stdin.write(JSON.stringify(jsonInput));
    }

    ps.stdin.end();
  });
}

// ------------------------------
//    ROTA DE TESTE
// ------------------------------
app.get("/api", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

// ------------------------------
//    ROTA: LISTAR USUÁRIOS
// ------------------------------
app.get("/api/users", async (req, res) => {
  try {
    const result = await runPowerShellScript("read-json.ps1", [usersFile]);
    const users = JSON.parse(result || "[]");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao ler usuários." });
  }
});

// ------------------------------
//    ROTA: CRIAR USUÁRIO
// ------------------------------
const bcrypt = require("bcrypt");

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Informe usuário e senha." });

  // Criar hash seguro da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPassword };

  try {
    const result = await runPowerShellScript(
      "append-json.ps1",
      [usersFile],
      newUser
    );
    const userCreated = JSON.parse(result);
    delete userCreated.password; // não devolve a senha

    res.json(userCreated);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// ------------------------------
//    ROTA: LOGIN
// ------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Informe usuário e senha." });

  try {
    // ler todos os usuários do arquivo via PowerShell
    const result = await runPowerShellScript("read-json.ps1", [usersFile]);
    const users = JSON.parse(result || "[]");

    // encontrar o usuário pelo nome
    const user = users.find(u => u.username === username);

    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado." });

    // comparar a senha digitada com o hash salvo
    const passwordOK = await bcrypt.compare(password, user.password);

    if (!passwordOK)
      return res.status(401).json({ error: "Senha incorreta." });

    // gerar token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login realizado com sucesso.",
      token: token
    });

  } catch (err) {
    console.error("ERRO AO FAZER LOGIN:", err);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// ------------------------------
//    INICIAR SERVIDOR
// ------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Backend rodando na porta 4000");
});
