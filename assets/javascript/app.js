$(function() {
    console.log( "ready!" );
    var currentQ = 0;
    var correct = 0;
    var incorrect = 0;
    var answered = false;
    var timer = 15;
    var x = setInterval(updateTimer,1000)         
    

    var questions = [{
        question: "How many planets are there in our solar system?",
        answers: ["Eight","Nine","Ten","Eleven"],
        correctAnswer: "Eight",
        image: "assets/images/q1.jpg"
    },{
        question: "What is the largest planet in our solar system?",
        answers: ["Mars", "Neptune", "Jupiter", "Uranus"],
        correctAnswer: "Jupiter",
        image: "assets/images/q2.jpg"
    },{
        question: "What is the smallest planet in our solar system?",
        answers: ["Mercury","Pluto","Mars","Earth"],
        correctAnswer: "Mercury",
        image: "assets/images/q3.jpg"
    },{
        question: "What is the largest type of star in the universe?",
        answers: ["Red Dwarf", "Red Supergiant","White Dwarf","Neutron Star"],
        correctAnswer:"Red Supergiant",
        image:"assets/images/q4.jpg"
    },{
        question: "What has a gravitational pull so strong that even light cannot escape it?",
        answers: ["Donut Hole","Pothole","Fox Hole","Black Hole"],
        correctAnswer:"Black Hole",
        image:"assets/images/q5.jpg"
    },{
        question: "Which NASA space flight was the last manned mission to the moon?",
        answers: ["Apollo 17","Vostok 1","Apollo 11", "Apollo 1"],
        correctAnswer:"Apollo 17",
        image:"assets/images/q6.jpg"
    },{
        question: "What is the farthest distance from Earth a manned mission has traveled? (Plus or minus 20,000 miles.)",
        answers:["Two Light-Years","248,655 miles", "Twelve Parsecs", "325,123 miles"],
        correctAnswer:"248,655 miles",
        image:"assets/images/q7.jpg" 
    },{
        question: "How many minutes was the shortest space flight?",
        answers: ["15 minutes","45 minutes", "3 hours","8 hours"],
        correctAnswer:"15 minutes",
        image:"assets/images/q8.png" 
    },{
        question: "What are the dimensions in inches of the first footprint on Earth’s moon?",
        answers: ["8 by 5 inches","10 by 4 inches","13 by 6 inches","12 by 7 inches"],
        correctAnswer:"13 by 6 inches",
        image:"assets/images/q9.jpg" 
    },{
        question: "What flavor ice cream did Baskin-Robbins release in 1969 to commemorate America’s landing on the moon?",
        answers: ["Cosmic Cookies n' Cream", "Galactic Crunch", "Lunar Cheesecake", "Apollo Fudge"],
        correctAnswer:"Lunar Cheesecake",
        image:"assets/images/q10.jpg"
    }]

    

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
            setTimeout(nextQ,3000)              
            answered = true; 
            var image = $("<img>").attr("src",questions[currentQ].image)
            $("#imageDisplay").append(image)
            $("#answerDisplay").empty()
            var result = $("<div></div").text("The answer is " + questions[currentQ].correctAnswer + "!")
            $("#messages").append(result)
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
            setTimeout(nextQ,3000)
            answered = true
            incorrect++;
            var image = $("<img>").attr("src",questions[currentQ].image)
            $("#imageDisplay").append(image)
            $("#answerDisplay").empty()
            var result = $("<div></div").text("The answer is " + questions[currentQ].correctAnswer + "!")
            $("#messages").append(result)
        }
        
    }

    function initialize(){
        var startButton = $("<button></button>").text("Press to Start").click(start)
        $("#answerDisplay").append(startButton)
        clearInterval(x)
    }

    function start(){
        console.log("start successful!")
        console.log(questions.length)
            $("#questionDisplay").text(questions[currentQ].question)
            $("#answerDisplay").empty()
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
    }

    function reset(){
        console.log("restart successful")
        currentQ = -1;
        correct = 0;
        incorrect = 0;
        answered = false;
        timer = 15;
        $("#messages").empty()
        $("<button>").remove()
        nextQ()  
    }

    function nextQ(){
        console.log("nextQ successful!")
        $("#answerDisplay").empty()
        $("#messages").empty()
        $("#timer").empty()
        $("#imageDisplay").empty()
        currentQ++;
        
        
        if (currentQ === questions.length){
            $("#questionDisplay").text("End of Quiz")
            var correctDisplay = $("<div></div>").text("Correct: " + correct)
            var incorrectDisplay =$("<div></div>").text("Incorrect: " + incorrect)
            var restart = $("<button></button>").text("Try Again!").click(reset)
            $("#messages").append(correctDisplay).append(incorrectDisplay).append(restart)
            
        }
        else{
            timer = 15;
            $("#timer").text(timer)
            $("#questionDisplay").text(questions[currentQ].question)
            $("<img>").remove()
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

    initialize()
    
})  
   
   
