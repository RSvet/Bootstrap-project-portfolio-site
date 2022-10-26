//array of questions
const quizData = [
    {
        question: "Before we dive in, what's your name?",
        
    },
    {
        question: "Where are you in your career?",
        a: "I know what career I want, and I need to learn some skills",
        b: "I like my career-or, at least, I don't HATE it-but I keep wondering if there's something more out there.",
        c: "I took a break from my career, and now I'm ready to get back into the workforce",
        d: "I want to make a career change, but I'm also super busy.",
        e: "I'm just starting out",
        f: "I'm burnt out from going into an office every day and ready to make my own hours",
        g: "Other (please eneter)!",
    },
    {
        question: "What's your biggest concern about learning tech skills?",
        a: "Even if I learned the skills, with my weird resume, why would they hire me over a computer science grad?",
        b: "I don't have the time to learn new skills.",
        c: "I dream of a remote job-but do those jobs REALLY exist for, you know, REAL people like me?",
        d: "It's too late in my career/life to make this big of a change.",
        e: "Learning tech skills is expensive and I'm on a tight budget-I'm not sure it's worth it.",
        f: "My career is okay and learning tech skills is expensive-why should I rock the boat?",
    },
    {
        question: "Picture the perfect workplace for you. What do you see?",
        a: "A bustling agency where I'm surrounded by incredible creative talent.",
        b: "A collaborative environment where I'm LEADING the team.",
        c: "A collaborative environment where I'm full-time member of a team\
        working shoulder-to-shoulder with fun, experienced team members.",
        d: "A coworking spot! I work with my team sometimes in-person and then have\
        the freedom to finish my work around my busy schedule.",
        e: "A video conference with coworkers on my screen... and the beach behind it",
        f: "Work at home in the morning, with time for kids' soccer practice in the afternoon.",
    },
    {
        question: "Just one more thing! How much you like this survey?"
    }
]

const question = document.getElementById("question");
const answer_a = document.getElementById("a_text");
const answer_b = document.getElementById("b_text");
const answer_c = document.getElementById("c_text");
const answer_d = document.getElementById("d_text");
const answer_e = document.getElementById("e_text");
const answer_f = document.getElementById("f_text");
const answer_g = document.getElementById("g_text");
const lastAnsw = document.getElementById("hide");
const nextButton = document.getElementById("submit");
const radioBtnPart = document.getElementById("radioBtn-section");
const questionPart = document.getElementById("quiz-container");
const firstPart = document.getElementById("first");
const lastPart = document.getElementById("last");
const qCount = document.getElementById("q-counter");
const allAnswers = document.querySelectorAll('.answer');
const finalScreen = document.getElementById('main-container');


questionPart.style.display = "none";

//load quiz
let count = 0;
function loadQuiz(){
    deselectAnswers()
    const currentQuizData = quizData[count];
    question.innerText = currentQuizData.question; 
    countQuestions(count);     
    if(count>0){
        firstPart.style.display = "none";
        radioBtnPart.style.display = "block";
        nextButton.style.margin = 0;        
    }
    answer_a.innerText = currentQuizData.a;
    answer_b.innerText = currentQuizData.b;
    answer_c.innerText = currentQuizData.c;
    answer_d.innerText = currentQuizData.d;
    answer_e.innerText = currentQuizData.e;
    answer_f.innerText = currentQuizData.f;    
    
    if(count>1){
    lastAnsw.style.display="none";
    textField.style.display="none"
    }
    else{    
    answer_g.innerText = currentQuizData.g;} 
    if(count == (quizData.length-1)){
        lastPart.style.display = "block";
        radioBtnPart.style.display = "none";
        nextButton.style.display = "none";        

    }
}

//unselect radio button
function deselectAnswers() {
    allAnswers.forEach(answerEl => answerEl.checked = false)
}

//next button fuction (for name input and the next steps)
var nameInput ="";
nextButton.addEventListener('click', () => {
    if(document.getElementById("floatingInput").value==""){
        alert("Name must be filled out")} 

    else {   
        nameInput = document.getElementById("floatingInput").value;
        count++;
        if(count < quizData.length)
        {      
            loadQuiz();            
        }    
    }
 
})

//show text field when other is checked/ hide when everything else is checked
var textField = document.getElementById("other");

for(var i=0; i<allAnswers.length-1; i++){

    allAnswers[i].addEventListener('click', () => {
        if(textField.style.display="block"){
            textField.style.display="none";
        }
    })
}
function openField(){    
        textField.style.display ="block";
    } 


//start button function
var welcomeP = document.getElementById("intro");
function startSurvey() {  
    welcomeP.style.display = "none";
    questionPart.style.display = "block";
    radioBtnPart.style.display = "none";
    lastPart.style.display = "none";
    qCount.style.display = "block";
    loadQuiz();    
 }
// div for counting questions
 function countQuestions(index){
     qCount.innerHTML = '<span>Question '+(index+1)+' of '+quizData.length+'</span>';
 }

 //submit button and final screen depending on score
 var rate = 0;
 function submitAll(){
     rate = document.getElementById('range1').value;
     finalScreen.style.textAlign = "center";
     switch(rate){
        case "1":
            finalScreen.innerHTML = `<h2>Hi ${nameInput}</h2>
            <h2>Thank you for your time!</h2>
            <p class="fs-5">We appreciate your opinion. Oooops, sorry to disappoint you.</p>
            <i class="fa-regular fa-face-sad-tear smile-symbol"></i>`;
        break;
        case "2":
            finalScreen.innerHTML = `<h2>Hi ${nameInput}</h2>
            <h2>Thank you for your time!</h2>
            <p class="fs-5">We appreciate your opinion. We hope it will be better next time!</p>
            <i class="fa-regular fa-face-frown smile-symbol"></i>`;
        break;
        case "3":
            finalScreen.innerHTML = `<h2>Hi ${nameInput}</h2>
            <h2>Thank you for your time!</h2>
            <p class="fs-5">We appreciate your opinion. Golden middle!</p>
            <i class="fa-solid fa-face-smile smile-symbol"></i>`;    
        break;
        case "4": 
            finalScreen.innerHTML = `<h2>Hi ${nameInput}</h2>
            <h2>Thank you for your time!</h2>
            <p class="fs-5">We appreciate your opinion. Thanks for the very good rating!</p>
            <i class="fa-solid fa-face-laugh-beam smile-symbol"></i>`; 
        break;
        case "5":
            finalScreen.innerHTML = `<h2>Hi ${nameInput}</h2>
            <h2>Thank you for your time!</h2>
            <p class="fs-5">We appreciate your opinion. Perfect! We are glad to meet your requirements!</p>
            <i class="fa-regular fa-face-grin-hearts smile-symbol"></i>`;   
        break;
        default: break;       
    }
 }
