showNotes();

let noteTxt = document.getElementById('addTxt');
document.getElementById('addBtn').addEventListener('click', function () {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    if(noteTxt.value != ""){
        noteObj.push(noteTxt.value)
        localStorage.setItem('notes', JSON.stringify(noteObj));
        // console.log(noteObj)
        noteTxt.value = "";
    }else{
        // console.log("Empty");
        document.getElementById('error').style.display="block";
        noteTxt.focus();
    }
    showNotes();
 
});


function showNotes() {
    let noteNode = document.getElementById('notes');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    let html="";
    noteObj.forEach(function(element,index){
        let title= new Date();
        let final_title=title.getDate() + "-" + title.getMonth() + "-" + title.getFullYear() + "<br>" + title.getHours() + ":" + title.getMinutes() + ":" + title.getSeconds();
       html+= `    
            <div class="noteCard m-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${final_title}</h5>
                <p class="card-text"> ${element}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
            </div>
        `;
    });

    if(noteObj.length !=0)
        noteNode.innerHTML=html;
    else
        noteNode.innerHTML="<h3>No Notes Created Yet. </h3>"

}

function deleteNote(index){

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index,1);

    localStorage.setItem('notes',JSON.stringify(noteObj));
    showNotes();

}

s=document.getElementById('searchTxt');

s.addEventListener('input',()=>{

    let value=s.value.toLowerCase();

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    let noteCards = document.getElementsByClassName('noteCard');


    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
       
        if(cardTxt.includes(value)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
    

});