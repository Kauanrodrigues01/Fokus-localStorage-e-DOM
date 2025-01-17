const html = document.querySelector('html')

// botões para alterar o modo
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

//elementos alterados
const banner = document.querySelector('.app__image')
const displayTempo = document.querySelector('#timer')
const titulo = document.querySelector('.app__title')

// audios
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true

//cronômetro
const startPauseBt = document.querySelector('#start-pause')
const audioPlay = new Audio('./sons/play.wav')
const audioPausa = new Audio('./sons/pause.mp4')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const imgBtComecar = startPauseBt.children[0]
const ComecarPausarBt = startPauseBt.children[1]
const tempoNaTela = document.querySelector('#timer')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null


// Função para alternar o modo de descanso
const alterarModoDeTempo = (contexto, el) => {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    focoBt.classList.remove('active')
    curtoBt.classList.remove('active')
    longoBt.classList.remove('active')

    el.classList.add('active')

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = ()=>{
    if (tempoDecorridoEmSegundos > 0){
        tempoDecorridoEmSegundos -= 1
        console.log('temporizador: ' + tempoDecorridoEmSegundos)
        mostrarTempo()
    } else{
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')

        imgBtComecar.setAttribute('src', './imagens/play_arrow.png')
        ComecarPausarBt.textContent = 'Começar'
        // debugger
        if (html.dataset.contexto == 'foco'){
            tempoDecorridoEmSegundos = 1500
            mostrarTempo()
        } else if (html.dataset.contexto == 'descanso-curto'){
            tempoDecorridoEmSegundos = 300
            mostrarTempo()
        } else{
            tempoDecorridoEmSegundos = 900
            mostrarTempo()
        }

        const focoAtico = html.dataset.contexto == 'foco'
        if (focoAtico){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }

        pausar()
        return
    }
}

const iniciarOuPausar = () => {
    if(intervaloId){
        audioPausa.play()
        pausar()
        imgBtComecar.setAttribute('src', './imagens/play_arrow.png')
        ComecarPausarBt.textContent = 'Começar'
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    imgBtComecar.setAttribute('src', './imagens/pause.png')
    ComecarPausarBt.textContent = 'Pausar'
}

const pausar = () => {
    clearInterval(intervaloId)
    intervaloId = null
}

const mostrarTempo = () => {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    
    
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

musicaFocoInput.addEventListener('change', ()=>{
    if (musica.paused){
        musica.currentTime = 15
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    imgBtComecar.setAttribute('src', './imagens/play_arrow.png')
    ComecarPausarBt.textContent = 'Começar'
    pausar()
    tempoDecorridoEmSegundos = 1500
    alterarModoDeTempo('foco',  focoBt)
})

curtoBt.addEventListener('click', () => {
    imgBtComecar.setAttribute('src', './imagens/play_arrow.png')
    ComecarPausarBt.textContent = 'Começar'
    pausar()
    tempoDecorridoEmSegundos = 300
    alterarModoDeTempo('descanso-curto', curtoBt)
})

longoBt.addEventListener('click', () => {
    imgBtComecar.setAttribute('src', './imagens/play_arrow.png')
    ComecarPausarBt.textContent = 'Começar'
    pausar()
    tempoDecorridoEmSegundos = 900
    alterarModoDeTempo('descanso-longo', longoBt)
})

mostrarTempo()
startPauseBt.addEventListener('click', iniciarOuPausar)