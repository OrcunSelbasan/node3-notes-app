const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return "Your notes..."
}

// Create Add Note
const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)
    // const duplicateNotes = notes.filter(function (note){
    //     return note.title === title
    // })

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

//Create Remove Note
const removeNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.filter((note) => note.title === title)
    // const selectedNote = notes.filter( function (note){
    //     return note.title === title
    // })

    if (selectedNote.length === 1) {
        notes.pop({ title: title })
        saveNotes(notes)

        const msg = chalk.green.inverse('Not was removed')
        console.log(msg)
    } else {
        const msg = chalk.red.inverse('Not wasn\'t found')
        console.log(msg)
    }

}

//Create List Notes
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

//Create Read Notes
const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)

    if (selectedNote) {
        console.log(chalk.inverse(selectedNote.title))
        console.log(selectedNote.body)
    } else {
        console.log(chalk.red.inverse('Something went wrong'))
    }
}


//Create Save Notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

//Create Load Notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}