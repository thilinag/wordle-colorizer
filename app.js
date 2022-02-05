const colorize = event => {
    event.preventDefault()

    // get formdata
    const formData = new FormData(event.target)

    // support light mode
    formData.set('⬜', formData.get('⬛'))
    
    // separate emoji and text
    const wordle = formData.get('wordle')
    const wordleShareParts = wordle.replaceAll('\r', '').split('\n\n')
    const wordleText = wordleShareParts[0]
    const solutionRows = wordleShareParts[1].split('\n').map(r => [...r])
    const concealStartingWord = formData.get('conceal_starting_word')

    // create a placeholder array
    const colorizedWordleMatrix = Array.from(Array(solutionRows.length), () => new Array(5).fill(0))

    for(let i in solutionRows) {
        for(let j in solutionRows[i]) {
            // replace placeholder with the new color
            colorizedWordleMatrix[i][j] = formData.get(solutionRows[i][j])
        }
    }

    if (concealStartingWord) {
        colorizedWordleMatrix[0] = colorizedWordleMatrix[0].map(c => '🈲')
    }

    // re-create share string
    const colorizedWordle = `${wordleText}\n\n${colorizedWordleMatrix.map(c => c.join('')).join('\n')}`
    
    // set the textarea with colorized string
    document.getElementById('colorizedWordle').innerHTML = colorizedWordle

    // show the textbox and copy button
    document.getElementById('colorizedWordle').hidden = false
    document.getElementById('copy').hidden = false
}

const init = () => {
    // hide colorized textbox and copy button on load
    document.getElementById('copy').hidden = true
    document.getElementById('colorizedWordle').hidden = true

    // copy text on element click
    document.getElementById('colorizedWordle').onclick = e => {
        e.target.select()
        document.execCommand('copy')
    }

    // copy colorized string on button click
    document.getElementById('copy').onclick = e => {
        document.getElementById('colorizedWordle').select()
        document.execCommand('copy')
        e.target.textContent = 'copied'
        setTimeout(() => {
            e.target.textContent = 'copy'
        }, 1000)
    }
}