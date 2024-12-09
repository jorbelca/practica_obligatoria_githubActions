const fs = require("fs");
const core = require("@actions/core");

try {
  const testResult = core.getInput("test_result");
  let badge;

  // Badge según el resultado
  if (testResult === "success") {
    badge =
      "[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)";
  } else {
    badge =
      "[![Failure](https://img.shields.io/badge/test-failure-red)](https://www.cypress.io/)";
  }

  // Leer el archivo README.md
  const readmePath = "README.md";
  const readmeContent = fs.readFileSync(readmePath, "utf-8");

  // Modificar la sección entre los comentarios
  const updatedContent = readmeContent.replace(
    /(<!---Start place for the badge -->)([\s\S]*?)(<!---End place for the badge -->)/,
    `$1\n${badge}\n$3`
  );

  // Sobrescribir el archivo README.md
  fs.writeFileSync(readmePath, updatedContent);

  console.log("README.md actualizado con el badge correspondiente.");
} catch (error) {
  core.setFailed(`Error actualizando el README.md: ${error.message}`);
}
