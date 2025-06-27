document.addEventListener('DOMContentLoaded', () => {

    const textToTranslateEl = document.getElementById("text-to-translate");
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA - AGORA MUITO MAIS SIMPLES!
    const backendApiUrl = 'https://backendtraducao1-0-gsbad3avg3bucxgh.brazilsouth-01.azurewebsites.net/api/translate';

    async function translateText() {

        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.

        

         try {
            // A função 'fetch' faz a requisição para a API.
            const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
            method: 'POST',
            headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });
            
            // (Dentro da função translateText, dentro do bloco try)

            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            const data = await response.json();

            // Verificamos o status da resposta diretamente
            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;
                        
            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }

    translateBtn.addEventListener('click', translateText);
    
})