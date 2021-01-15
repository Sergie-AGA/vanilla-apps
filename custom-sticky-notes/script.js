// Button group activation
const buttonGroup = document.getElementById("buttonGroup");
const logoArea = document.getElementById("logoArea");
const topCircle = document.getElementById("topCircle");
const diagonalCircle = document.getElementById("diagonalCircle");
const rightCircle = document.getElementById("rightCircle");
const about = document.getElementById("about");
const mainArea = document.getElementById("mainArea");

topCircle.addEventListener("mouseenter", () => {
    logoArea.classList.add("hover-text")
    logoArea.innerHTML = "Back to mini-apps"
})

diagonalCircle.addEventListener("mouseenter", () => {
    logoArea.classList.add("hover-text")
    logoArea.innerHTML = "New sticky note"
})

rightCircle.addEventListener("mouseenter", () => {
    logoArea.classList.add("hover-text")
    logoArea.innerHTML = "About"
})

rightCircle.addEventListener("click", () => {
    rightCircle.classList.toggle("active-button")
    about.classList.toggle("invisible")
})

buttonGroup.addEventListener("mouseenter", () => {
    logoArea.innerHTML = '<i id="logo" class="far fa-circle">';
})

buttonGroup.addEventListener("mouseleave", () => {
    logoArea.innerHTML = '<i class="fas fa-sticky-note">';
    logoArea.classList.remove("hover-text");
})

// GET YEAR DINAMICALLY
document.getElementById("currentYear").innerHTML = new Date().getFullYear();

// HANDLING STICKY NOTES
let notes = []

const saveButton = document.getElementById("saveButton")
const cancelButton = document.getElementById("cancelButton")
const deleteButton = document.getElementById("deleteButton")
const modal = document.getElementById("editModal")
let  originX = 10, originY = 10, screenX = 0, screenY = 0
const modalTitle = document.getElementById("modalTitle")
const modalImageUrl = document.getElementById("modalImageUrl")
const modalPosNone = document.getElementById("modalPosNone")
const modalPosTop = document.getElementById("modalPosTop")
const modalPosBackground = document.getElementById("modalPosBackground")
const modalNoteColor = document.getElementById("modalNoteColor")
const modalTextColor = document.getElementById("modalTextColor")
const layer = document.getElementById("layer")
const deletePrompt = document.getElementById("deletePrompt")
const confirmDelete = document.getElementById("confirmDelete")
const cancelDelete = document.getElementById("cancelDelete")

// LOCAL STORAGE
let activeId = 0

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

if (localStorage.getObj("savedNotes") !== null) {
    notes = localStorage.getObj("savedNotes")
}

notes.forEach(element => {
    if (element !== "Deleted") {
    createNote(element.id)
    }
})


// MODAL ACTIVATION
function removePosAttributes() {
    modalPosNone.checked = false;
    modalPosTop.checked = false;
    modalPosBackground.checked = false;
}

function activateModal(editingId) {
    activeId = editingId 
    modalTitle.value = notes[editingId].title;
    modalImageUrl.value = notes[editingId].url;
    modalNoteColor.value = notes[editingId].noteColor;
    modalTextColor.value = notes[editingId].textColor;
    
    removePosAttributes();
    if (notes[editingId].position == "none") {
        modalPosNone.checked = true;
    } else if (notes[editingId].position == "top") {
        modalPosTop.checked = true;
    } else if(notes[editingId].position == "background") {
        modalPosBackground.checked = true;
    }
    
    editModal.classList.add("edit-modal--active")
}

function dismissModal() {
    editModal.classList.remove("edit-modal--active")
}

function showPrompt() {
    deletePrompt.style.display = "block"
    layer.style.display = "block"
}

function dismissPrompt() {
    deletePrompt.style.display = "none"
    layer.style.display = "none"
}

confirmDelete.addEventListener("click", () => {
    let deleting = document.getElementById(activeId)
    notes[activeId] = "Deleted";
    deleting.remove();
    dismissPrompt();
    localStorage.setObj("savedNotes", notes);
    dismissModal();
})

cancelDelete.addEventListener("click", () => dismissPrompt())

deleteButton.addEventListener("click", () => showPrompt());

function styleNote(receivedId){
    if (notes[receivedId] !== "Deleted") {
    document.getElementById(`${receivedId}`).style.backgroundColor = notes[receivedId].noteColor
    document.getElementById(`title${receivedId}`).style.color = notes[receivedId].textColor
    document.getElementById(`icon${receivedId}`).style.color = notes[receivedId].textColor
    document.getElementById(`icon${receivedId}`).style.borderColor = notes[receivedId].textColor
    document.getElementById(`text${receivedId}`).style.color = notes[receivedId].textColor
    if (notes[receivedId].position == "top") {
        document.getElementById(`header${receivedId}`).style.backgroundImage = `url(${notes[receivedId].url})`
        document.getElementById(`header${receivedId}`).style.height = "40%";
        document.getElementById(`text${receivedId}`).style.height = "50%";
        document.getElementById(`${receivedId}`).style.backgroundImage = `none`
    } else if (notes[receivedId].position == "background") {
        document.getElementById(`${receivedId}`).style.backgroundImage = `url(${notes[receivedId].url})`
        document.getElementById(`text${receivedId}`).style.backgroundColor = `transparent`
        document.getElementById(`header${receivedId}`).style.backgroundImage = `none`
        document.getElementById(`header${receivedId}`).style.height = "5%";
        document.getElementById(`text${receivedId}`).style.height = "85%";
    } else {
        document.getElementById(`${receivedId}`).style.backgroundImage = `none`
        document.getElementById(`header${receivedId}`).style.backgroundImage = `none`
        document.getElementById(`header${receivedId}`).style.height = "5%";
        document.getElementById(`text${receivedId}`).style.height = "85%";
    }
    document.getElementById(`${receivedId}`).style.left = `${notes[receivedId].noteX}`;
    document.getElementById(`${receivedId}`).style.top = `${notes[receivedId].noteY}`;
}
}

saveButton.addEventListener("click", () => {
    notes[activeId].title = modalTitle.value
    document.getElementById(`title${activeId}`).innerHTML = modalTitle.value
    notes[activeId].url = modalImageUrl.value
    notes[activeId].noteColor = modalNoteColor.value
    notes[activeId].textColor = modalTextColor.value
    if (modalPosTop.checked) {
        notes[activeId].position = "top"
    } else if (modalPosBackground.checked) {
        notes[activeId].position = "background"
    } else {
        notes[activeId].position = "none"
    }
    styleNote(activeId)
    localStorage.setObj("savedNotes", notes);
    dismissModal();
})

cancelButton.addEventListener("click", () => dismissModal())

function textUpdate(receivedId) {
    notes[receivedId].text = document.getElementById(`text${receivedId}`).value
    localStorage.setObj("savedNotes", notes);
}

// GENERATING NOTE
function createNote(noteId) {
    
        let note = document.createElement("div")
        note.classList.add("note")
        note.setAttribute("id", noteId)
        
        let noteHeader = document.createElement("div")
        noteHeader.classList.add("note__header")
        noteHeader.setAttribute("id", `header${noteId}`)

        let noteTitle = document.createElement("h2")
        noteTitle.classList.add("note__header__title")
        noteTitle.innerHTML = notes[noteId].title
        noteTitle.setAttribute("id", `title${noteId}`)

        let noteEdit = document.createElement("div")
        noteEdit.classList.add("note__header__edit")
    
        let noteIcon = document.createElement("i")
        noteIcon.classList.add("fas", "fa-edit", "note__header__icon")
        noteIcon.setAttribute("id", `icon${noteId}`)
    
        noteEdit.appendChild(noteIcon)
        noteHeader.appendChild(noteTitle)
        noteHeader.appendChild(noteEdit)
    
        let noteText = document.createElement("textarea")
        noteText.classList.add("note__text")
        noteText.setAttribute("placeholder", "Write notes here")
        noteText.setAttribute("id", `text${noteId}`)
        noteText.innerHTML = notes[noteId].text
        if (noteText.addEventListener) {
            noteText.addEventListener('input', () => textUpdate(noteId));
          } else if (area.attachEvent) {
            area.attachEvent('onpropertychange',() => textUpdate(noteId))
        }

         //INVISIBLE ELEMENTS
        let noteUrl =  document.createElement("input")
        noteUrl.setAttribute("value", notes[noteId].url)
        noteUrl.setAttribute("id", `url${noteId}`)
        let noteImagePos =  document.createElement("input")
        noteImagePos.setAttribute("value", notes[noteId].position)
        noteImagePos.setAttribute("id", `imagePos${noteId}`)
        let noteBackgroundColor =  document.createElement("input")
        noteBackgroundColor.setAttribute("value", notes[noteId].noteColor)
        noteBackgroundColor.setAttribute("id", `backgroundColor${noteId}`)
        let noteTextColor =  document.createElement("input")
        noteTextColor.setAttribute("value", notes[noteId].textColor)
        noteTextColor.setAttribute("id", `textColor${noteId}`)
        
        let invisibleContainer = document.createElement("div")
        invisibleContainer.appendChild(noteUrl)
        invisibleContainer.appendChild(noteImagePos)
        invisibleContainer.appendChild(noteBackgroundColor)
        invisibleContainer.appendChild(noteTextColor)
        invisibleContainer.classList = 'invisible'

        note.appendChild(noteHeader)
        note.appendChild(noteText)
        note.appendChild(invisibleContainer)
        mainArea.appendChild(note)

        note.style.top = `${originY}px`
        note.style.left = `${originX}px`

        screenX = window.screen.width;
        screenY = window.screen.height;
        if (originX >= screenX * 0.8) {
            originX = 0
            originY += 40
        } else {
            originX +=40

        }
        

        if (originY >= screenY * 0.8) {
            originY = 0
        }
        

        styleNote(noteId)

        noteIcon.addEventListener("click", () => {
            let changingId = noteId
            activateModal(changingId)
            
            })
    
        // DRAGGING ELEMENTS
    dragElement(document.getElementById(noteId));
    
    function dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(`header${elmnt.id}`)) {
        document.getElementById(`header${elmnt.id}`).onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = `${(elmnt.offsetTop - pos2)}px`;
        elmnt.style.left = `${(elmnt.offsetLeft - pos1)}px`;
        notes[noteId].noteX = elmnt.style.left
        notes[noteId].noteY = elmnt.style.top
      }
    
      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        localStorage.setObj("savedNotes", notes);
      }
    }
}


diagonalCircle.addEventListener("click", () => {
    let noteId = notes.length
    notes[noteId] = {
        id: noteId,
        title: `Note`,
        text: '',
        url: '',
        position: "none",
        noteColor: "#ffff88",
        textColor: "#000000",
        noteX: `0px`,
        noteY: `0px`
    }
    createNote(noteId);
})

