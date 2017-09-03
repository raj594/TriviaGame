window.onload = function() {

  //  Click events are done for us:
  $('.answer').hide();
  $("#start").click(logic.start);
  $("#answer1").click(logic.check);
  $("#answer2").click(logic.check);
  $("#answer3").click(logic.check);
  $("#answer4").click(logic.check);
};

var questionTime;
var clockRunning = false;

var questions =  [
  {
    question: "Which college has burnt orange as a color?",
    answer1: ["Tennessee", false],
    answer2: ["Texas", true],
    answer3: ["Oregon State", false],
    answer4: ["Oklahoma State", false]
  },
  {
    question: "What NFL team has a star as thier symbol and cry-babies for fans?",
    answer1: ["New England Patriots", false],
    answer2: ["Arizona Cardinals", false],
    answer3: ["Washington Redskins", false],
    answer4: ["Dallas Cowboys", true]
  },
  {
    question: "What NBA team from Texas has the most championships?",
    answer1: ["San Antonio Spurs", true],
    answer2: ["Houston Rockets", false],
    answer3: ["Dallas Mavericks", false],
    answer4: ["Texas Longhorns", false]
  },
  {
    question: "Who is the only person to play in both a World Series and a Superbowl?",
    answer1: ["Vince Young", false],
    answer2: ["Tiger Woods", false],
    answer3: ["Deione Sanders", true],
    answer4: ["Bo Jackson", false]
  },
  {
    question: "Which Dallas Cowboys Running Back has the most rushing yards in NFL history?",
    answer1: ["Barry Sanders", false],
    answer2: ["Emmit Smith", true],
    answer3: ["Ezekiel Elliot", false],
    answer4: ["Tony Romo", false]
  },
  {
    question: "Which NBA Player took the \"hardest road\" to join the Golden State Warriors and lead them to an NBA Championship in 2016?",
    answer1: ["Michael Jordan", false],
    answer2: ["LeBron James", false],
    answer3: ["Kevin Durant", true],
    answer4: ["Steph Curry", false]
  },
  {
    question: "In what year was the official Iditarod Trail Sled Dog Race first held?",
    answer1: ["1973", true],
    answer2: ["1953", false],
    answer3: ["1898", false],
    answer4: ["1910", false]
  },
  {
    question: "Where did the game of curling originate?",
    answer1: ["Texas", false],
    answer2: ["Switzerland", false],
    answer3: ["Italy", false],
    answer4: ["Scotland", true]
  },
  {
    question: "What boxer beat Connor McGregor to become 50-0?",
    answer1: ["Floyd Mayweather", true],
    answer2: ["Mohammed Ali", false],
    answer3: ["Mike Tyson", false],
    answer4: ["Cassius Clay", false]
  },
];

//  Our quiz logic.
var logic = {

  time: 0,
  questionCount: 0,
  unanswered: 0,
  correct: 0,
  incorrect: 0,
  completed: false,

  reset: function() {
        logic.time = 30;
        clockRunning = false;
        $('#question').html();
        $('#start').text("Click to Start!");
  },

  timeUp: function() {
      logic.unanswered++;
      logic.stop();
      if(logic.completed == false){
        $('#question').html("Oops, You ran out of time!");
        $('#answer1').text("");
        $('#answer2').text("");
        $('#answer3').text("");
        $('#answer4').text("");
        $('.answer').hide();
        $('#start').text("Next Question");
      }
  },

  check: function() {
      if ($(this).attr('correct') == 'true'){
        console.log($(this));
          logic.correct++;
          $('#question').html("Correct!");
      } else if ($(this).attr('correct') == 'false') {
          logic.incorrect++;
          $('#question').text("Incorrect!");
      }
      $('.answer').hide();
      logic.stop();
      if(logic.completed == false){
        $('#answer1').text("");
        $('#answer2').text("");
        $('#answer3').text("");
        $('#answer4').text("");
        $('#start').text("Next Question");
      }

  },

  start: function() {
      if (!clockRunning && logic.completed == false) {
        logic.time = 30;
        clockRunning = true;
        questionTime = setInterval(logic.count, 1000);
        $('#question').text(questions[logic.questionCount].question);
        $('#answer1').text(questions[logic.questionCount].answer1[0]);
        $('#answer2').text(questions[logic.questionCount].answer2[0]);
        $('#answer3').text(questions[logic.questionCount].answer3[0]);
        $('#answer4').text(questions[logic.questionCount].answer4[0]);
        $('#answer1').attr("correct", questions[logic.questionCount].answer1[1]);
        $('#answer2').attr("correct", questions[logic.questionCount].answer2[1]);
        $('#answer3').attr("correct", questions[logic.questionCount].answer3[1]);
        $('#answer4').attr("correct", questions[logic.questionCount].answer4[1]);
        $('.answer').show();
        $('#start').text("Next Question");
        logic.questionCount++;
      } else if (logic.completed == true){
        logic.unanswered = 0;
        logic.correct = 0;
        logic.incorrect = 0;
        $('#unanswered').text("");
        $('#correct').text("");
        $('#incorrect').text("");
        logic.completed = false;
        logic.start();
      }
  },

  stop: function() {
    clockRunning = false;
    clearInterval(questionTime);
    if(logic.questionCount == 9){
      logic.questionCount = 0;
      logic.completed = true;
      $('#start').text("Start Over?");
      $('.answer').hide();
      $('#question').text("Here's how you did:");
      $('#answer1').text("");
      $('#answer2').text("");
      $('#answer3').text("");
      $('#answer4').text("");
      $('#unanswered').text("Unanswered: " + logic.unanswered);
      $('#correct').text("Correct: " + logic.correct);
      $('#incorrect').text("Incorrect: " + logic.incorrect);
    }
  },

  count: function() {

    if (logic.time > 0 && clockRunning === true) {
      logic.time--;
      $('#time').html(logic.time);
    } else if (logic.time === 0){
      logic.timeUp();
    }

  },
};