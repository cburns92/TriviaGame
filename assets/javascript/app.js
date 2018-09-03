$(function() {
    console.log( "ready!" );
    var currentQ = 0;
    var correct = 0;
    var incorrect = 0;
    var answered = false;
    var timer = 15;
    var x = setInterval(updateTimer,1000) 

    var questions = [{
        question: "What is the Sum of 2 + 2?",
        answers: [10,5,3,4],
        correctAnswer: 4,
    },{
        question: "What is the 8th Month of the Year?",
        answers: ["April", "May", "August", "December"],
        correctAnswer: "August"
    },{
        question: "What is 5 * 7?",
        answers: [33,46,12,35],
        correctAnswer: 35
    },]

    

    $("#answerDisplay").on("click",".answer",function(){ 
        console.log(this)
        if (!answered){
            if ($(this).attr("value") === "correct"){
                correct++
                $("#messages").text("Correct!")
            }
            else{
                incorrect++
                $("#messages").text("Incorrect!")
            }
            clearInterval(x)
            setTimeout(nextQ,2000)  
            answered = true; 
        }              
    })

    function updateTimer(){
        if (timer !== 0){
            timer--
            $("#timer").text(timer)
        }
        else{
            $("#timer").text("Out of Time!")
            clearInterval(x)
            setTimeout(nextQ,2000)
            answered = true
            incorrect--;
        }
        
    }

    function start(){
        console.log("start successful!")
        console.log(questions.length)        
            $("#questionDisplay").text(questions[currentQ].question)

            for (i = 0; i < questions[currentQ].answers.length;i++){
                var answersDisplay = $("#answerDisplay")
                var newDiv = $("<div></div>").addClass("answer").text(questions[currentQ].answers[i])

                if (questions[currentQ].answers[i] === questions[currentQ].correctAnswer){                    
                    newDiv.attr({value:"correct"})
                }
                else{                    
                    newDiv.attr({value:"incorrect"})
                }
                answersDisplay.append(newDiv)
            }         
    }

    function nextQ(){
        console.log("nextQ successful!")
        $("#answerDisplay").empty()
        $("#messages").empty()
        $("#timer").empty()
        currentQ++;
        
        
        if (currentQ === questions.length){
            $("#questionDisplay").text("End of Quiz")
            var correctDisplay = $("<div></div>").text("Correct: " + correct)
            var incorrectDisplay =$("<div></div>").text("Incorrect: " + incorrect)
            var restart = $("<button></button>").text("Try Again!").click(start)
            $("#messages").append(correctDisplay).append(incorrectDisplay).append(restart)
            
        }
        else{
            timer = 15;
            $("#timer").text(timer)
            $("#questionDisplay").text(questions[currentQ].question)
            x = setInterval(updateTimer,1000)

            for (i = 0; i < questions[currentQ].answers.length;i++){
                var answersDisplay = $("#answerDisplay")
                var newDiv = $("<div></div>").addClass("answer").text(questions[currentQ].answers[i])

                if (questions[currentQ].answers[i] === questions[currentQ].correctAnswer){                    
                    newDiv.attr({value:"correct"})
                }
                else{                    
                    newDiv.attr({value:"incorrect"})
                }
                answersDisplay.append(newDiv)
            }
        answered = false;
        }
                            
    }

    start();
})  
   
   
