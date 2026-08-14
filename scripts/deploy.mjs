// Publica o site em ateliemonaco.com.
//
// A Hostinger clona o repositorio de deploy e serve a raiz dele — ela nao roda
// build. Por isso o fluxo e: buildar aqui, espelhar o dist/ para um clone do
// repo de deploy e dar push. O codigo-fonte fica so neste projeto.
//
// Uso: npm run deploy

import { execSync } from 'node:child_process'
import { existsSync, rmSync, mkdirSync, cpSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ       = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST       = join(RAIZ, 'dist')
const CLONE      = join(RAIZ, '.deploy')          // ignorado pelo git
const REPO       = 'https://github.com/mauricioluzardo/ateliemonaco.com.git'
const BRANCH     = 'main'

const rodar = (cmd, cwd = RAIZ) => execSync(cmd, { cwd, stdio: 'inherit' })
const ler   = (cmd, cwd = RAIZ) => execSync(cmd, { cwd, encoding: 'utf8' }).trim()

console.log('\n[1/4] Buildando...')
rodar('npm run build')

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('\nERRO: dist/index.html nao existe. Build falhou?')
  process.exit(1)
}

console.log('\n[2/4] Preparando clone do repositorio de deploy...')
if (!existsSync(join(CLONE, '.git'))) {
  rmSync(CLONE, { recursive: true, force: true })
  rodar(`git clone --depth 1 --branch ${BRANCH} ${REPO} .deploy`)
} else {
  rodar(`git fetch origin ${BRANCH} && git reset --hard origin/${BRANCH}`, CLONE)
}

console.log('\n[3/4] Espelhando o build...')
// Limpa tudo menos .git e README.md, para que arquivos removidos do build
// tambem sumam do site publicado.
for (const item of readdirSync(CLONE)) {
  if (item === '.git' || item === 'README.md') continue
  rmSync(join(CLONE, item), { recursive: true, force: true })
}
mkdirSync(CLONE, { recursive: true })
cpSync(DIST, CLONE, { recursive: true })

console.log('\n[4/4] Publicando...')
rodar('git add -A', CLONE)

if (!ler('git status --porcelain', CLONE)) {
  console.log('\nNada mudou desde a ultima publicacao. Site ja esta atualizado.')
  process.exit(0)
}

const carimbo = new Date().toISOString().slice(0, 16).replace('T', ' ')
rodar(`git commit -q -m "deploy: ${carimbo}"`, CLONE)
rodar(`git push origin ${BRANCH}`, CLONE)

console.log('\nPublicado. A Hostinger puxa a nova versao no proximo deploy do painel.')
console.log('https://ateliemonaco.com\n')
