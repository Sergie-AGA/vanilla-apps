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
// Storage.prototype.setObj = function(key, obj) {
//     return this.setItem(key, JSON.stringify(obj))
// }
// Storage.prototype.getObj = function(key) {
//     return JSON.parse(this.getItem(key))
// }

// if (localStorage.getObj("savedNotes") !== null) {
//     notes = localStorage.getObj("savedNotes")
// }


// notes.forEach(element => {
//     mainArea.appendChild(element)
// })


// MODAL ACTIVATION
let activeId = 0

function removePosAttributes() {
    modalPosNone.checked = false;
    modalPosTop.checked = false;
    modalPosBackground.checked = false;
}

function activateModal(editingId) {
    activeId = editingId 
    modalTitle.value = document.getElementById(`title${editingId}`).innerHTML;
    modalImageUrl.value = document.getElementById(`url${editingId}`).value;
    modalNoteColor.value = document.getElementById(`backgroundColor${editingId}`).value;
    modalTextColor.value = document.getElementById(`textColor${editingId}`).value;
    
    removePosAttributes();
    if (notes[editingId].position.value == "none") {
        modalPosNone.checked = true;
    } else if (notes[editingId].position.value == "top") {
        modalPosTop.checked = true;
    } else if(notes[editingId].position.value == "background") {
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
    dismissModal();
})

cancelDelete.addEventListener("click", () => dismissPrompt())

deleteButton.addEventListener("click", () => showPrompt());

saveButton.addEventListener("click", () => {
    notes[activeId].title.innerHTML = modalTitle.value
    notes[activeId].url.value = modalImageUrl.value
    notes[activeId].noteColor.value = modalNoteColor.value
    notes[activeId].textColor.value = modalTextColor.value
    notes[activeId].note.style.backgroundColor = modalNoteColor.value
    notes[activeId].title.style.color = modalTextColor.value
    notes[activeId].icon.style.color = modalTextColor.value
    notes[activeId].icon.style.borderColor = modalTextColor.value
    notes[activeId].text.style.color = modalTextColor.value
    if (modalPosTop.checked) {
        notes[activeId].position.value = "top"
        document.getElementById(`header${activeId}`).style.backgroundImage = `url(${notes[activeId].url.value})`
        document.getElementById(`header${activeId}`).style.height = "40%";
        document.getElementById(`text${activeId}`).style.height = "50%";
        document.getElementById(`${activeId}`).style.backgroundImage = `none`
    } else if (modalPosBackground.checked) {
        notes[activeId].position.value = "background"
        document.getElementById(`${activeId}`).style.backgroundImage = `url(${notes[activeId].url.value})`
        document.getElementById(`text${activeId}`).style.backgroundColor = `transparent`
        document.getElementById(`header${activeId}`).style.backgroundImage = `none`
        document.getElementById(`header${activeId}`).style.height = "5%";
        document.getElementById(`text${activeId}`).style.height = "85%";
    } else {
        notes[activeId].position.value = "none"
        document.getElementById(`${activeId}`).style.backgroundImage = `none`
        document.getElementById(`header${activeId}`).style.backgroundImage = `none`
        document.getElementById(`header${activeId}`).style.height = "5%";
        document.getElementById(`text${activeId}`).style.height = "85%";
    }
    localStorage.setObj("savedNotes", notes);
    dismissModal();
})
cancelButton.addEventListener("click", () => dismissModal())

// GENERATING NOTE
diagonalCircle.addEventListener("click", () => {
    let note = document.createElement("div")
    note.classList.add("note")

    let noteId = notes.length
    note.setAttribute("id", noteId)

    let noteHeader = document.createElement("div")
    noteHeader.classList.add("note__header")
    noteHeader.setAttribute("id", `header${noteId}`)

    let noteTitle = document.createElement("h2")
    noteTitle.classList.add("note__header__title")
    noteTitle.innerHTML = "Note"
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

    //INVISIBLE ELEMENTS
    let noteUrl =  document.createElement("input")
    noteUrl.setAttribute("value", "")
    noteUrl.setAttribute("id", `url${noteId}`)
    let noteImagePos =  document.createElement("input")
    noteImagePos.setAttribute("value", "none")
    noteImagePos.setAttribute("id", `imagePos${noteId}`)
    let noteBackgroundColor =  document.createElement("input")
    noteBackgroundColor.setAttribute("value", "#ffff88")
    noteBackgroundColor.setAttribute("id", `backgroundColor${noteId}`)
    let noteTextColor =  document.createElement("input")
    noteTextColor.setAttribute("value", "#000000")
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
    } else {
        originX += 20

    }
    if (originY >= screenY * 0.8) {
        document.body.style.height += 50
    }
    originY += 20

    notes[noteId] = {
        id: noteId,
        note: document.getElementById(noteId),
        header: document.getElementById(`header${noteId}`), 
        title: document.getElementById(`title${noteId}`),
        icon: document.getElementById(`icon${noteId}`),
        text: document.getElementById(`text${noteId}`),
        url: document.getElementById(`url${noteId}`),
        position: document.getElementById(`imagePos${noteId}`),
        noteColor: document.getElementById(`backgroundColor${noteId}`),
        textColor: document.getElementById(`textColor${noteId}`), 
    }

    notes[noteId].icon.addEventListener("click", () => {
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
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
})

