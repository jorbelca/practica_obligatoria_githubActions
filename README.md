# Github Actions

## Què és CI/CD?

• Continuous Integration (CI):
Consisteix en integrar codi freqüentment en un repositori compartit. Cada integració passa proves automatitzades per detectar errors aviat i corregir-los ràpidament.

• Continuous Delivery (CD):
Va més enllà del CI assegurant que el codi sempre està llest per ser desplegat. Això inclou proves i validacions automatitzades que faciliten l’alliberament de noves versions amb confiança.

• Continuous Deployment (CD):
Porta el lliurament continu a un altre nivell: cada canvi aprovat es desplega automàticament a producció. Això requereix processos de prova robustos per evitar problemes.

## Automatització de fluxos de treball

És la solució de Github per implementar CI/CD d’una manera senzilla i integrada. Permet automatitzar tasques com provar, construir i desplegar codi amb només configurar un fitxer YAML.

Components principals:
• Workflow: Seqüència automatitzada de passos que s’activa per esdeveniments (push, PR, etc.).
• Jobs: Agrupen passos individuals que s’executen en un mateix entorn (runner). Els jobs poden ser paral·lels o seqüencials.
• Steps: Cada tasca dins d’un job, com executar comandes o utilitzar accions predefinides.
• Actions: Blocs reutilitzables de funcionalitat que s’integren en els steps.
• Runner: El servidor (hosted o self-hosted) on s’executen els jobs.

## Runners: Què són i tipus

• Github-hosted runners:
Estan al núvol, sense necessitat de configuració ni manteniment. Disposen de sistemes operatius com Windows, MacOS i Ubuntu. Es paga pel temps d’ús (2000 minuts gratuïts al mes).

• Self-hosted runners:
Configurats en màquines pròpies, ofereixen més flexibilitat i control sobre els recursos. No tenen cost d’ús, però requereixen manteniment i configuració.

## Com crear un workflow

Els workflows es defineixen en fitxers YAML ubicats al directori .github/workflows del repositori.

```yaml
name: Exemple bàsic
on: [push]
jobs:
  prova:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: echo "Hola, món!"
```

name: Nom opcional del workflow.
• on: Esdeveniments que activen el workflow (push, PR, etc.).
• jobs: Agrupació de tasques que defineixen el flux de treball.
• steps: Comandes o accions a executar dins del job.

### Elements avançats en workflows

• needs: Per especificar dependències entre jobs i assegurar execució seqüencial.
• runs-on: Defineix el sistema operatiu del runner.
• env: Variables d’entorn per personalitzar els jobs.
• strategy: Permet executar variacions d’un mateix job (per exemple, amb diferents versions de Node.js).

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
      node: [14, 16]
    steps:
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node }}
      - run: npm install && npm test
```

## Accions personalitzades

Les accions personalitzades permeten definir tasques específiques reutilitzables en diversos workflows. Hi ha dos tipus principals:
• Docker-container actions: Funcionen en entorns Linux. Són més lentes però consistents.
• Javascript actions: Més ràpides i lleugeres, però han de ser compatibles amb tots els runners si s’utilitzen fora de Linux.

```yaml
name: Salutació
description: Acció per saludar
inputs:
  nom:
    description: Nom de la persona a saludar
    required: true
outputs:
  missatge:
    description: Missatge complet
runs:
  using: "node12"
  main: "index.js"
```

---

---

# Pràctica

Primer que res, creem un repositori propi i clonem el repo que ens dona l’ enunciat.
![](capturas/1.png)
![](capturas/clonar.png)

Instalem els moduls de node
![](capturas/npm_i.png)

Comprovem que el projecte s' inicia correctament
![](capturas/start.png)

### Linter-job

Executem npm run lint en local perque comprove la sintaxi
![](capturas/linter/lint.png)

Corregim tots els errors
![](capturas/linter/lint_corregit.png)

Creem la carpeta .github i dins de /workflows creem la primera action que correspon a EsLint
![](capturas/linter/linter-job.png)

Fem el commit i comprovem que haja passat tots els jobs

### Cypress-job

Seguidament, executem en local cypress per comprovar que els tests s'executen correctament (corregint el bug que hi havia )
![](capturas/cypress/bug.png)
![](capturas/cypress/cypress-local.png)

Fem el commit i comprovem que haja passat tots els jobs i que haja generat correctament l' artifact

### Badge-job

Primer, creem un projecte de node amb npm init -y dins del nou directori actions/update-badge
![](capturas/badge/npm_init_badge.png)

Seguidament, creem el arxiu action.yml que consisteix en una accio personalitzada que te com a input obligatori el resultat del test que hem executat anteriorment amb cypress. Tot s'executa en node 20

![](capturas/badge/badge_action.png)

Creem l'arxiu index.js a l' arrel del projecte que será el que conté tota la lógica que duga a terme l'acció. Es una funció en javascript que te com a únic argument test_result i que dependent de el seu valor asigna una imatge diferent a la variable badge.
Finalment, el script modifica l' arxiu README.md i asigna el valor de badge dins d'uns comentaris especifics.

![](capturas/badge/badge_index.png)

Tot seguit, instalem les dependencies (actions/core i actions/github i vercel/ncc ) per a que el script funcione degudament i pugam compilar-lo.
![](capturas/badge/npm_i_npm_build.png.png)

Captura del package.json de l'acció
![](capturas/badge/badge_pckg.png)

Passant a les accions generals, definim un nou job que conte:

- Precisa de l'accio anterior per poder executar-se
- Checkout, per accedir als arxius del projecte
- Descarrega el artifact de l'acció anterior
- Crea i asigna a una variable el contingut del artifact
- Crida a la action personalitzada que acavem de crear amb la variable
- Finalment, per modificar el Readme fem ús de la action endbug-add-and-commit que fara us d'un token amb permisos d' escriptura

![](capturas/badge/badge_job.png)

Per poder modificar el readme, necessitem d' un token amb permisos d'esciptura en el repo. El creem i el vinculem a una variable d' entorn
![](capturas/badge/token_1.png)
![](capturas/badge/token_2.png)

Pugem els canvis i comprovem que s'executen les dos actions associades.
![](capturas/badge/ok_1.png)
![](capturas/badge/ok_2.png)

FALLO
Per tal de comprovar que posa el badge de fallo, insertem un test que falle.
![](capturas/badge/fallo.png)

Fem el commit, pugem els canvis i esperem a que s'executen els works corresponents i comprovem els logs:
![](capturas/badge/false_2.png)
![](capturas/badge/false_1.png)

Badge actualizat:
![](capturas/badge/false_3.png)

### Deploy-job

Primer que res hem de vincular el nostre projecte amb Vercel, per aixo executem en consola vercel y configurem el projecte seguint les preguntes
![](capturas/deploy/vercel_cli.png)

Generem un token desde Vercel i amb els tokens que ha generat la vinculacio del projecte els almacenem com a secrets per a les actions
![](capturas/deploy/token_vercel.png)
![](capturas/deploy/secrets-vercel.png)
Creem el deploy-job que consistirá en un checkout i l' action específica de Vercel
![](capturas/deploy/deploy-job.png)

Fem el commit i comprovem que haja passat tots els jobs i que s'haja desplegat correctament a Vercel.
![](capturas/deploy/vercel-job-ok.png)
![](capturas/deploy/vercel-despliegue.png)

### Notification-job

(Com vam parlar en clase, canviem l'envio de un mail per un missatge a Telegram)

### Readme

Primer que res, creem un token desde el perfil de GitHub > Settings > Developer Settings > Personal Access Tokens > Tokens classic > Generate new token.
![](capturas/readme/token_metrics.png)

I el guardem com una secret en Actions > Repository Secrets
![](capturas/readme/token_metrics_2.png)

Despres, modifiquem el Readme per poder mostrar les metriques, al final del arxiu fem un apartat dedicat
![](capturas/readme/readme-img.png)

Seguidament creem un arxiu pipeline.yml dins de .github/workflows, que es veu aixi:
![](capturas/readme/pipeline-readme.png)

Aquest arxiu es compon de dos jobs un per a les metriques globals del perfil i un altre per a les de llenguatges de programacio. Tambe s'executara una vegada al dia i tambe donem la opcio per poder executar les actions manualment per a ocasions com la que tenim entre mans.

Fem el commit dels canvis i comprovem que els jobs s'hagen executat correctament
![](capturas/readme/actions_ok.png)

Finalment, comprovem que el readme s'haja actualizat correctament
![](capturas/readme/final_readme.png)

# Badge de Cypress

<!---Start place for the badge -->
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
<!---End place for the badge -->
