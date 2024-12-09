# practica_obligatoria_githubActions

Primer que res, creem un repositori propi i clonem el repo que ens dona l’ enunciat.
![](capturas/1.png)
![](capturas/clonar.png)

Instalem els moduls de node
![](capturas/npm_i.png)

Comprovem que el projecte s' inicia
![](capturas/start.png)

### Linter-job

Executem npm run lint en local perque comprove la sintaxi
![](capturas/lint.png)

Corregim tots els errors
![](capturas/lint_corregit.png)

Creem la carpeta .github i dins de /workflows creem la primera action que correspon a EsLint
![](capturas/linter-job.png)

Fem el commit i comprovem que haja passat tots els jobs

### Cypress-job

Seguidament, executem en local cypress per comprovar que els tests s'executen correctament (corregint el bug que hi havia )
![](capturas/bug.png)
![](capturas/cypress-local.png)

Fem el commit i comprovem que haja passat tots els jobs i que haja generat correctament l' artifact

### Badge-job

### Deploy-job

Primer que res hem de vincular el nostre projecte amb Vercel, per aixo executem en consola vercel y configurem el projecte seguint les preguntes
![](capturas/vercel_cli.png)

Generem un token desde Vercel i amb els tokens que ha generat la vinculacio del projecte els almacenem com a secrets per a les actions
![](capturas/token_vercel.png)
![](capturas/secrets-vercel.png)
Creem el deploy-job que consistirá en un checkout i l' action específica de Vercel
![](capturas/deploy-job.png)

Fem el commit i comprovem que haja passat tots els jobs i que s'haja desplegat correctament a Vercel.
![](capturas/vercel-job-ok.png)
![](capturas/vercel-despliegue.png)

### Notification-job

Example of nextjs project using Cypress.io

<!---Start place for the badge -->

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<!---End place for the badge -->
