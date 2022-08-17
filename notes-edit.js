const dateElementUpdate= document.querySelector('#edited-at')
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const dateElementCreate= document.querySelector('#created-at')

const noteId = location.hash.substring(1)
let notes = getSavedNotes();

let note = notes.find(function(note){
    return note.id === noteId;
})

if (note === undefined){
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElementUpdate.textContent = `last edited ${moment(note.updatedAt).fromNow()}`
dateElementCreate.textContent = `Created at ${moment(note.createdAt).fromNow()}`

bodyElement.addEventListener('change',function(e){
    note.body = e.target.value;
    note.updatedAt = moment().valueOf()

    dateElementUpdate.textContent= `last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes);

})

titleElement.addEventListener('change',function(e){
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    dateElementUpdate.textContent= `last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes);

})

document.querySelector('#remove-note').addEventListener('click',function(){
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')

})

//live render to new window edit.html
window.addEventListener('storage',function (e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find(function(note){
            return note.id === noteId;
        })
        
        if (note === undefined){
            location.assign('/index.html')
        }
        
        document.querySelector('#note-title').value = note.title
        document.querySelector('#note-body').value = note.body

    }   
})
