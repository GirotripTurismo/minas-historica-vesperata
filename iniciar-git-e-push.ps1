# Script para inicializar o Git e enviar o projeto para o GitHub
# Execute este script no PowerShell dentro do diretório do projeto

Write-Host "=== CONFIGURAÇÃO DO GITHUB GIROTRIP ===" -ForegroundColor Cyan

# 1. Verificar se o Git está instalado
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Erro: O Git não está instalado ou não está no PATH do sistema." -ForegroundColor Red
    Write-Host "Por favor, instale o Git e tente novamente: https://git-scm.com/" -ForegroundColor Yellow
    exit
}

# 2. Inicializar repositório Git se não existir
if (!(Test-Path .git)) {
    Write-Host "Inicializando repositório Git local..." -ForegroundColor Green
    git init
} else {
    Write-Host "Repositório Git já inicializado." -ForegroundColor Green
}

# 3. Adicionar arquivos e fazer commit
Write-Host "Adicionando arquivos..." -ForegroundColor Green
git add .

Write-Host "Criando commit inicial..." -ForegroundColor Green
git commit -m "Initial commit - Landing Page Minas Historica com Vesperata"

Write-Host "Definindo branch principal como 'main'..." -ForegroundColor Green
git branch -M main

# 4. Configurar o repositório remoto
Write-Host ""
Write-Host "Por favor, acesse o GitHub (https://github.com/girotripturismo-collab) e crie um NOVO repositório vazio." -ForegroundColor Yellow
Write-Host "Exemplo de nome: minas-historica-vesperata" -ForegroundColor Yellow
Write-Host ""

$repoUrl = Read-Host "Digite a URL HTTPS do repositório criado (ex: https://github.com/girotripturismo-collab/minas-historica-vesperata.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "URL inválida. O processo foi abortado. Você pode rodar o script novamente ou configurar manualmente." -ForegroundColor Red
    exit
}

# Verificar se já existe um remote origin
$originExists = git remote | Select-String "origin"
if ($originExists) {
    Write-Host "Atualizando remote 'origin' existente..." -ForegroundColor Green
    git remote set-url origin $repoUrl
} else {
    Write-Host "Adicionando remote 'origin'..." -ForegroundColor Green
    git remote add origin $repoUrl
}

# 5. Fazer o Push
Write-Host "Enviando arquivos para o GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host ""
Write-Host "=== CONCLUÍDO COM SUCESSO ===" -ForegroundColor Green
Write-Host "Agora seu código está no GitHub!" -ForegroundColor Cyan
Write-Host "Para subir para o Vercel:" -ForegroundColor Yellow
Write-Host "1. Acesse o painel da Vesperata no Vercel (https://vercel.com/girotripturismo-collabs-projects)" -ForegroundColor Yellow
Write-Host "2. Clique em 'Add New...' -> 'Project'" -ForegroundColor Yellow
Write-Host "3. Importe o repositório que você acabou de criar no GitHub" -ForegroundColor Yellow
Write-Host "4. Clique em 'Deploy' sem alterar nenhuma configuração padrão" -ForegroundColor Yellow
Write-Host "5. O Vercel gerará o link online automaticamente e criará um novo projeto sem afetar os outros!" -ForegroundColor Yellow
