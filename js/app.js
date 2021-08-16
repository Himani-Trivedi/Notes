showNotes();

let noteTxt = document.getElementById('addTxt');
let titleTxt = document.getElementById('titleTxt');
let alarm=document.getElementById('errorTxt');

document.getElementById('addBtn').addEventListener('click', function () {
    let notes = localStorage.getItem('notes');
    let titles=localStorage.getItem('title');

    
    if(titles == null){
        titleObj=[];
    }else{
        titleObj=JSON.parse(titles);
    }

    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    if(titleTxt.value !=""){
        if(noteTxt.value != "" ){
            noteObj.push(noteTxt.value);
            titleObj.push(titleTxt.value);

            localStorage.setItem('notes', JSON.stringify(noteObj));
            localStorage.setItem('title', JSON.stringify(titleObj));

            noteTxt.value = "";
            titleTxt.value = "";

        }else{
            document.getElementById('error').style.display="block";
            alarm.innerText="First Write Note!"
            noteTxt.focus();
        }
    }else{
        document.getElementById('error').style.display="block";
        alarm.innerText="Write Title First!"
        titleTxt.focus();
    }
    
    noteTxt.addEventListener('blur',()=>{
        document.getElementById('error').style.display="none";
    })

    titleTxt.addEventListener('blur',()=>{
        document.getElementById('error').style.display="none";
    })
    
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

    let titles=localStorage.getItem('title');
    
    if(titles == null){
        titleObj=[];
    }else{
        titleObj=JSON.parse(titles);
    }

    let html="";

    noteObj.forEach(function(element,index){
        let title= new Date();
        let final_title=title.getDate() + "-" + title.getMonth() + "-" + title.getFullYear() + "<br>" + title.getHours() + ":" + title.getMinutes() + ":" + title.getSeconds();
       html+= `    
            <div class="noteCard m-2 card" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">${titleObj[index]}</h3>
                <h6 class="card-title text-danger"> Noted at :${final_title}</h6>
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
    let title = localStorage.getItem('title');

    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }

    noteObj.splice(index,1);
    titleObj.splice(index,1);

    localStorage.setItem('notes',JSON.stringify(noteObj));
    localStorage.setItem('title',JSON.stringify(titleObj));

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