const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa =  document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const containerTarefas = document.querySelector('.app__section-task-list')

// Pegando informações da localStore
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    console.log('clicou')
})

formAdicionarTarefa.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    carregarTarefas() // Após adicionar uma tarefa, carrega novamente a lista de tarefas
    textarea.value = '' // Limpa o textarea após adicionar a tarefa
})

const carregarTarefas = () => {
    containerTarefas.innerHTML = '' // Limpa o conteúdo anterior da lista de tarefas
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
        const imagemBt = document.createElement('img')
        imagemBt.setAttribute('src', 'imagens/edit.png')
        botao.appendChild(imagemBt)

        li.appendChild(svg)
        li.appendChild(paragrafo)
        li.appendChild(botao)

        containerTarefas.appendChild(li) // Adiciona o item na lista HTML
    })
}

// Carrega as tarefas ao iniciar o script
carregarTarefas()
