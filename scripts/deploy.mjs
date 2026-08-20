// Publica o site em ateliemonaco.com.
//
// A Hostinger acompanha o branch main deste repositorio e publica sozinha.
// Ou seja: o que for commitado aqui vai para o ar. Por isso este script erra
// para o lado seguro — se qualquer passo falhar, o que ja esta publicado
// continua intacto.
//
// Uso: npm run deploy

import { execSync } from 'node:child_process'
import { existsSync, rmSync, mkdirSync, cpSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ   = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST   = join(RAIZ, 'dist')
const CLONE  = join(RAIZ, '.deploy')
const STAGE  = join(RAIZ, '.deploy-novo')
const REPO   = 'https://github.com/mauricioluzardo/ateliemonaco.com.git'
const BRANCH = 'main'

const rodar = (cmd, cwd = RAIZ) => execSync(cmd, { cwd, stdio: 'inherit' })
const ler   = (cmd, cwd = RAIZ) => execSync(cmd, { cwd, encoding: 'utf8' }).trim()

console.log('\n[1/5] Buildando...')
rodar('npm run build')

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('\nERRO: dist/index.html nao existe. Build falhou. Nada foi publicado.')
  process.exit(1)
}

console.log('\n[2/5] Preparando clone do repositorio de deploy...')
if (!existsSync(join(CLONE, '.git'))) {
  rmSync(CLONE, { recursive: true, force: true })
  rodar(`git clone --depth 1 --branch ${BRANCH} ${REPO} .deploy`)
} else {
  rodar(`git fetch origin ${BRANCH} && git reset --hard origin/${BRANCH}`, CLONE)
}

// ORDEM IMPORTA. A versao anterior apagava o destino e SO ENTAO copiava. Numa
// vez em que a copia falhou (bloqueio de arquivo do Windows), o commit subiu
// com a pasta vazia e tirou o site do ar. Agora a copia acontece primeiro,
// numa pasta ao lado, e so troca o publicado depois de conferida.
console.log('\n[3/5] Copiando o build para area de teste...')
rmSync(STAGE, { recursive: true, force: true })
mkdirSync(STAGE, { recursive: true })
cpSync(DIST, STAGE, { recursive: true })

if (!existsSync(join(STAGE, 'index.html'))) {
  console.error('\nERRO: index.html nao chegou na copia. Nada foi alterado.')
  process.exit(1)
}
const naRaiz = readdirSync(STAGE).length
if (naRaiz < 3) {
  console.error(`\nERRO: copia com ${naRaiz} item(ns) — build incompleto. Nada foi alterado.`)
  process.exit(1)
}

console.log('\n[4/5] Trocando o conteudo publicado...')
for (const item of readdirSync(CLONE)) {
  if (item === '.git' || item === 'README.md') continue
  rmSync(join(CLONE, item), { recursive: true, force: true })
}
for (const item of readdirSync(STAGE)) {
  cpSync(join(STAGE, item), join(CLONE, item), { recursive: true })
}
rmSync(STAGE, { recursive: true, force: true })

// Ultima rede antes de tocar no git: nunca commitar um estado sem index.html
if (!existsSync(join(CLONE, 'index.html'))) {
  console.error('\nERRO: index.html nao chegou no clone. NAO vou commitar.')
  process.exit(1)
}

console.log('\n[5/5] Publicando...')
rodar('git add -A', CLONE)

if (!ler('git status --porcelain', CLONE)) {
  console.log('\nNada mudou desde a ultima publicacao. Site ja esta atualizado.')
  process.exit(0)
}

// Recusa publicar se o commit for apagar o site em vez de atualizar
const arquivos = ler('git ls-files', CLONE).split('\n').filter(Boolean)
if (arquivos.length < 5) {
  console.error(`\nERRO: o commit teria apenas ${arquivos.length} arquivo(s). Isso derrubaria o site. NAO vou publicar.`)
  process.exit(1)
}

const carimbo = new Date().toISOString().slice(0, 16).replace('T', ' ')
rodar(`git commit -q -m "deploy: ${carimbo}"`, CLONE)
rodar(`git push origin ${BRANCH}`, CLONE)

console.log(`\nPublicado — ${arquivos.length} arquivos. A Hostinger atualiza sozinha em instantes.`)
console.log('https://ateliemonaco.com\n')
