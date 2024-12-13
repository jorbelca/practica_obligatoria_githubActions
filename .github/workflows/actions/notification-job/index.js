const core = require("@actions/core");
const TelegramBot = require("node-telegram-bot-api");

try {
  // Configuración del Bot
  const token = core.getInput("token");
  const chatID = core.getInput("id");
  const bot = new TelegramBot(token);

  // Datos
  const workflowName = core.getInput("workflow_name");

  // Resultados de los jobs
  const linterResult = core.getInput("linter_result");
  const cypressResult = core.getInput("cypress_result");
  const addBadgeResult = core.getInput("add_badge_result");
  const deployResult = core.getInput("deploy_result");

  // Crear mensaje
  const message = `
 📢 *Notificació del workflow*

S'ha realitzat un push en la branca *main* que ha provocat l'execució del workflow *${workflowName}* amb els següents resultats:

- *linter_job*: ${linterResult}
- *cypress_job*: ${cypressResult}
- *add_badge_job*: ${addBadgeResult}
- *deploy_job*: ${deployResult}
`;
  // Enviar
  bot
    .sendMessage(chatID, message, { parse_mode: "Markdown" })
    .then(() => core.setOutput("msg", "Mensaje enviado correctamente"))
    .catch((error) =>
      core.setFailed(`Error al enviar mensaje: ${error.message}`)
    );
} catch (error) {
  core.setFailed(`Action failed: ${error.message}`);
}
