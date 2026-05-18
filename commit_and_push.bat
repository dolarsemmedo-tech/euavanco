@echo off
:: Script automatizado de Commit e Push para o EADon
chcp 65001 > nul
echo ============================================================
echo 🚀 Enviando Teste Vocacional do EADon para o GitHub...
echo ============================================================
echo.

echo 📂 [1/3] Adicionando arquivos modificados...
git add index.html vocational_test.css vocational_test.js

echo.
echo 📝 [2/3] Criando commit local...
git commit -m "feat: adiciona teste vocacional premium integrado ao gemini 1.5 flash e google sheets"

echo.
echo 📤 [3/3] Enviando alterações para o repositório remoto (git push)...
git push

echo.
echo ============================================================
echo 🎉 Tudo pronto! Seu Teste Vocacional já está no GitHub!
echo ============================================================
echo.
pause
