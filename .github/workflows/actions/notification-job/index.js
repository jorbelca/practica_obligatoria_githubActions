const core = require("@actions/core");
const TelegramBot = require("node-telegram-bot-api");

try {
  // Configuración del Bot
  const token = core.getInput("token");
  const chatID = core.getInput("id");
  const bot = new TelegramBot(token, { polling: true });

  // Datos
  const workflowStatus = core.getInput("workflow_status");
  const workflowName = core.getInput("workflow_name");

  // Resultados de los jobs
  const linterResult = core.getInput("linter_result");
  const cypressResult = core.getInput("cypress_result");
  const addBadgeResult = core.getInput("add_badge_result");
  const deployResult = core.getInput("deploy_result");

  // Crear mensaje
  const messageBody = `
 📢 *Notificació del workflow*

S'ha realitzat un push en la branca *main* que ha provocat l'execució del workflow *${workflowName}* amb els següents resultats:

- *linter_job*: ${linterResult}
- *cypress_job*: ${cypressResult}
- *add_badge_job*: ${addBadgeResult}
- *deploy_job*: ${deployResult}

*Estat del workflow:* ${workflowStatus}
`;
  // Enviar
  bot.sendMessage(chatID, messageBody);
  core.setOutput("msg", "Mesaje enviado correctamente");
} catch (error) {
  core.setFailed(`Action failed: ${error.message}`);
}
