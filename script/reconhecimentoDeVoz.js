// Configuração do SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'pt-BR'
recognition.continuous = false
recognition.interimResults = false

const mic = document.querySelector('.app__form-footer__button--microfone')

mic.addEventListener('click', () => {
    recognition.start()
    console.log('Reconhecimento de fala iniciado')
})

recognition.addEventListener('result', onSpeak)

recognition.addEventListener('error', (event) => {
    console.error('Erro no reconhecimento de fala: ', event.error)
})

recognition.addEventListener('end', () => {
    console.log('Reconhecimento de fala encerrado')
})

function onSpeak(e) {
    // debugger
    const frase = e.results[0][0].transcript
    console.log('Você disse: ', frase)
    textarea.textContent = frase
}