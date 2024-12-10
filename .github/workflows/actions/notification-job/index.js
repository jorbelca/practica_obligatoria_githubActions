const core = require("@actions/core");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

try {
  // Configuración de Mailgun
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: core.getInput("mailgun_api_key"),
    url: "https://api.eu.mailgun.net",
  });

  // Datos del correo
  const recipient = core.getInput("recipient_email");
  const workflowStatus = core.getInput("workflow_status");
  const workflowName = core.getInput("workflow_name");

  // Resultados de los jobs
  const linterResult = core.getInput("linter_result");
  const cypressResult = core.getInput("cypress_result");
  const addBadgeResult = core.getInput("add_badge_result");
  const deployResult = core.getInput("deploy_result");

  // Crear mensaje
  const subject = `Resultat del workflow: ${workflowName}`;
  const messageBody = `
  <h1>Notificació del workflow</h1>
  <p>S'ha realitzat un push en la branca <strong>main</strong> que ha provocat l'execució del workflow <strong>${workflowName}</strong> amb els següents resultats:</p>
  <ul>
    <li><strong>linter_job</strong>: ${linterResult}</li>
    <li><strong>cypress_job</strong>: ${cypressResult}</li>
    <li><strong>add_badge_job</strong>: ${addBadgeResult}</li>
    <li><strong>deploy_job</strong>: ${deployResult}</li>
  </ul>
  <p><strong>Estat del workflow:</strong> ${workflowStatus}</p>
`;
  // Enviar correo
  mg.messages
    .create("sandbox-123.mailgun.org", {
      from: `GitHub Actions <mailgun@sandbox49597b6d9d3d498a81496cd0f9efcafd.mailgun.org>`,
      to: [recipient],
      subject: subject,
      html: messageBody,
    })
    .then((msg) => console.log("Email sent:", msg))
    .catch((err) => core.setFailed(`Error sending email: ${err.message}`));
} catch (error) {
  core.setFailed(`Action failed: ${error.message}`);
}
