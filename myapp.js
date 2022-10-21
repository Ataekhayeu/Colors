const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColor()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type == 'locker') {
        const node = 
        event.target.tagName.toLowerCase() == 'i'
        ? event.target
        : event.target.children[0];

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
    } else if (type == 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})



function generateRandomColor() {
    const hexCods = '0123456789ABCDF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color
}

function copyToClickBoard (title) {
   return navigator.clipboard.writeText(title)
}

function setRandomColor(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    columns.forEach((column, index) => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock')
        const title = column.querySelector('h2')
        const button = column.querySelector('button')
        

        if (isLocked) {
            colors.push(title.textContent)
            return
        }

        const color = isInitial
         ? colors[index] 
            ? colors[index]
            : chroma.random()
         : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }
    
         

        title.textContent = color;
        column.style.background = color

        setTextColor(title, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor (title, color) {
    const luminance = chroma(color).luminance()
    title.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((column) => {
       return column.toString().substring(1)
    }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#' + color)
    }
    return []
}

setRandomColor(true);