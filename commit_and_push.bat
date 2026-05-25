@echo off
:: Script automatizado de Commit e Push para o Eu Avanço
chcp 65001 > nul
echo ============================================================
echo 🚀 Enviando Teste Vocacional do Eu Avanço para o GitHub...
echo ============================================================
echo.

echo 📂 [1/3] Adicionando arquivos modificados...
git add index.html vocational_test.css vocational_test.js

echo.
echo 📝 [2/3] Criando commit local...
git commit -m "feat: atualiza teste vocacional do Eu Avanço"

echo.
echo 📤 [3/3] Enviando alterações para o repositório remoto (git push)...
git push

echo.
echo ============================================================
echo 🎉 Tudo pronto! Seu Teste Vocacional do Eu Avanço já está no GitHub!
echo ============================================================
echo.
pause
