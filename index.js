// Espera que el DOM estigui completament carregat
document.addEventListener('DOMContentLoaded', () => {
    const form = window.document.querySelector('.newNoteForm');
    const notesList = window.document.querySelector('.notesList');

    // Afegeix un listener d'esdeveniments per a la presentació del formulari
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el comportament predeterminat de presentació del formulari

        // Recupera les dades del formulari
        const title = sanitizeInput(form.noteTitle.value);
        const content = sanitizeInput(form.noteContent.value);
        const priority = form.noteSelect.value;

        // Valida la selecció de prioritat
        if (priority === "Select priority") {
            console.log("No priority");
            alert("No s'ha seleccionat cap prioritat. Si us plau, seleccioneu una prioritat.");
            return; // Sortir de la funció anticipadament si no s'ha seleccionat cap prioritat
        }

        // Crea un nou node DOM per la nota
        const noteElement = createNoteElement(title, content, priority);
        notesList.appendChild(noteElement); // Afegeix la nova nota a la llista de notes

        // Reinicia els valors del formulari després de la presentació
        form.reset();
    });
});

// Funció per sanititzar l'entrada per prevenir vulnerabilitats de seguretat
function sanitizeInput(input) {
    const tempElement = window.document.createElement('div');
    tempElement.innerText = input; // Utilitzant innerText per escapar HTML
    return tempElement.innerHTML; // Retorna la cadena sanititzada
}

// Funció per crear un nou element de nota DOM
function createNoteElement(title, content, priority) {
    const noteDiv = window.document.createElement('div');
    noteDiv.classList.add('note');

    const titleElement = window.document.createElement('h3');
    titleElement.innerText = title; // Estableix el títol

    const contentElement = window.document.createElement('p');
    contentElement.innerText = content; // Estableix el contingut

    const priorityElement = window.document.createElement('p');
    priorityElement.innerText = `Prioritat: ${priority}`; // Estableix la prioritat

    // Afegeix tots els elements al noteDiv
    noteDiv.appendChild(titleElement);
    noteDiv.appendChild(contentElement);
    noteDiv.appendChild(priorityElement);

    return noteDiv; // Retorna el nou element de nota
}
