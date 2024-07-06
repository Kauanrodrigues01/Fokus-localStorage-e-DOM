const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa =  document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const containerTarefas = document.querySelector('.app__section-task-list')
const paragrafoTarefaEmAndamento = document.querySelector('.app__section-active-task-description')
const dropdownMenuOpcoes = document.querySelector('.app__section-task-header__ul')
const bntLimparTarefasConcluidas = dropdownMenuOpcoes.children[0]
const bntLimparTarefas = dropdownMenuOpcoes.children[1]

// Pegando informações da localStore
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null

const atualizarTarefas = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

const carregarTarefas = () => {
    // debugger
    containerTarefas.innerHTML = '' // Limpa o conteúdo anterior da lista de tarefas
    paragrafoTarefaEmAndamento.textContent = ''
    tarefas.forEach((tarefa) => {
        const li = document.createElement('li')
        li.classList.add('app__section-task-list-item')

        const svg = document.createElement('svg')
        svg.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
            </svg>
        `
        const paragrafo = document.createElement('p')
        paragrafo.classList.add('app__section-task-list-item-description')
        paragrafo.textContent = tarefa.descricao

        const botao = document.createElement('button')
        botao.classList.add('app_button-edit')

        botao.onclick = () => {
            // debugger
            const novaDescricao= prompt('Qual é o novo nome da tarefa?')
            if (novaDescricao == null){
                console.log('é nulo')
                return
            } else if (novaDescricao.length < 5 ){
                alert('A descrição da tarefa deve ter no mínimo 5 caracteres')
            }  else{
                paragrafo.textContent = novaDescricao
                tarefa.descricao = novaDescricao
                atualizarTarefas()
            }
        }

        const imagemBt = document.createElement('img')
        imagemBt.setAttribute('src', './imagens/edit.png')
        botao.appendChild(imagemBt)

        li.appendChild(svg)
        li.appendChild(paragrafo)
        li.appendChild(botao)

        if (tarefa.concluida){
            li.classList.add('app__section-task-list-item-complete')
            botao.setAttribute('disabled', true)
        }
        else{
            li.onclick = () => {
                // debugger
                const lis = [...containerTarefas.children]
                lis.forEach((el) => {
                    el.classList.remove('app__section-task-list-item-active')
                })


                if (tarefaSelecionada && tarefaSelecionada[0] == tarefa) {
                    paragrafoTarefaEmAndamento.textContent = ''
                    tarefaSelecionada = null
                    return
                }

                tarefaSelecionada = [tarefa, li]
                paragrafoTarefaEmAndamento.textContent = tarefa.descricao
                li.classList.add('app__section-task-list-item-active')
            }
        }
        
        containerTarefas.appendChild(li) // Adiciona o item na lista HTML
    })
}

const limparTodasTarefas = () => {
    tarefas = []
    atualizarTarefas()
    carregarTarefas()
}

const limparTarefasConcluidas = () => {
    tarefas = tarefas.filter((tarefa) => !tarefa.concluida)
    atualizarTarefas()
    carregarTarefas()
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    console.log('clicou')
})

formAdicionarTarefa.addEventListener('submit', (evt) => {
    evt.preventDefault()
    if (textarea.value.length < 5){
        alert('A descrição da tarefa tem que ter no mínimo 5 caracteres')
    } else{
        const tarefa = {
            descricao: textarea.value
        }
        tarefas.push(tarefa)
        atualizarTarefas()
        textarea.value = ''
        formAdicionarTarefa.classList.add('hidden')
        carregarTarefas() // Após adicionar uma tarefa, carrega novamente a lista de tarefas
    }
    
})

bntLimparTarefas.addEventListener('click', () => {
    limparTodasTarefas()
})

bntLimparTarefasConcluidas.addEventListener('click', () => {
    limparTarefasConcluidas();   
})

document.addEventListener('FocoFinalizado', () => {
    // console.log(tarefaSelecionada[0])
    // console.log(tarefaSelecionada[1])
    if (tarefaSelecionada[0] && tarefaSelecionada[1]){
        tarefaSelecionada[1].classList.remove('app__section-task-list-item-active')
        tarefaSelecionada[1].classList.add('app__section-task-list-item-complete')
        tarefaSelecionada[1].querySelector('button').setAttribute('disabled', true)

        tarefaSelecionada[0].concluida = true
        atualizarTarefas()
    }
})

// Carrega as tarefas ao iniciar o script
carregarTarefas()