const add = document.querySelector('.add')
const remove = document.querySelector('.remove')
const inputCon = document.querySelector('.input')
const input = document.querySelector('input')
const inputBtn = document.querySelector('.add-btn')
const todoCon = document.querySelector('.list-container')
const sort = document.querySelector('.sort')
const trash = document.querySelector('.trash')
let arr = []

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("todo", e.target.id);
    trash.style.display = 'block'
}

function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("todo");
    e.target.appendChild(document.getElementById(data));
}


trash.addEventListener('drop',drop)
trash.addEventListener('dragover',allowDrop)


add.addEventListener('click', () => {
    inputCon.style.display = 'block'
    input.focus()
    add.style.display = 'none'
    remove.style.display = 'block'
})
remove.addEventListener('click', () => {
    inputCon.style.display = 'none'
    add.style.display = 'block'
    remove.style.display = 'none'
})

const generateTodos = () => {
    todoCon.innerHTML = ''
    arr.map(item => {
        let todo = todoCon.appendChild(document.createElement('div'))
        todo.classList.add('todo')
        todo.draggable = true
        todo.appendChild(document.createElement('p')).innerText = item.text
        const delBtn = document.createElement('img')
        delBtn.src = 'delete.png'
        delBtn.setAttribute('id', item.id)
        todo.appendChild(delBtn)
        todo.addEventListener('dragstart',drag)
        todo.addEventListener('dragend', function(e){
            if(e.dataTransfer.dropEffect !== 'none'){
                trash.style.display = 'none'
                todo.remove()
                arr = arr.filter(todo => todo.id !== item.id)
            }
        })
    })


    const del = document.querySelectorAll('.todo img')
    del.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            e.target.src = 'delete-hover.png'
        })
        item.addEventListener('mouseout', (e) => {
            e.target.src = 'delete.png'
        })
        item.addEventListener('click', (e) => {
            arr = arr.filter(todo => todo.id !== item.id)
            generateTodos()
        })
    })
}

inputBtn.addEventListener('click', () => {
    if (input.value !== '') {
        arr.push({
            id: `todo-${arr.length + 1}`,
            text: input.value
        })
        generateTodos()
        let count = 0
        sort.addEventListener('click', () => {
            if (count == 0) {
                sort.innerHTML = '<img src="downBlck.png" alt="">'
                arr.sort((a, b) => {
                    const keyA = a.text
                    const keyB = b.text
                    return keyA > keyB ? 1 : -1
                })
                generateTodos()
                count = 1
            } else if (count == 1) {
                sort.innerHTML = '<img src="upBlck.png" alt="">'
                arr.sort((a, b) => {
                    const keyA = a.text
                    const keyB = b.text
                    return keyA > keyB ? 1 : -1
                }).reverse()
                generateTodos()
                count = 0
            }
        })

        if (arr.length !== 0) {
            sort.innerHTML = '<img src="downBlck.png" alt="">'
        }
        input.value = ''
        input.focus()
    } else if (input.value === '') {
        alert('List cannot be empty! \nPlease type something...')
    }
}) 