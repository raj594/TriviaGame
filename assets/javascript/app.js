window.onload = function() {

  //  Click events are done for us:
  $("#start").click(logic.start);
  $("#answer1").click(logic.check);
  $("#answer2").click(logic.check);
  $("#answer3").click(logic.check);
  $("#answer4").click(logic.check);
};

//  Variable that will hold our setInterval that runs the stopwatch
var questionTime;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

var questions =  [
  {
    question: "q1",
    answer1: ["a1f1", false],
    answer2: ["a1f2", true],
    answer3: ["a1f3", false],
    answer4: ["a1c", false]
  },
  {
    question: "q2",
    answer1: ["a2f1", false],
    answer2: ["a2f2", false],
    answer3: ["a2f3", false],
    answer4: ["a2c", true]
  },
  {
    question: "q3",
    answer1: ["a3f1", true],
    answer2: ["a3f2", false],
    answer3: ["a3f3", false],
    answer4: ["a3c", false]
  },
  {
    question: "q4",
    answer1: ["a4f1", false],
    answer2: ["a4f2", false],
    answer3: ["a4f3", true],
    answer4: ["a4c", false]
  },
  {
    question: "q5",
    answer1: ["a5f1", false],
    answer2: ["a5f2", true],
    answer3: ["a5f3", false],
    answer4: ["a5c", false]
  },
  {
    question: "q6",
    answer1: ["a6f1", false],
    answer2: ["a6f2", false],
    answer3: ["a6f3", true],
    answer4: ["a6c", false]
  },
  {
    question: "q7",
    answer1: ["a7f1", true],
    answer2: ["a7f2", false],
    answer3: ["a7f3", false],
    answer4: ["a7c", false]
  },
  {
    question: "q8",
    answer1: ["a8f1", false],
    answer2: ["a8f2", false],
    answer3: ["a8f3", false],
    answer4: ["a8c", true]
  },
  {
    question: "q9",
    answer1: ["a9f1", true],
    answer2: ["a9f2", false],
    answer3: ["a9f3", false],
    answer4: ["a9c", false]
  },
];

//  Our quiz logic.
var logic = {

  time: 0,
  questionCount: 0,
  unanswered: 0,
  correct: 0,
  incorrect: 0,

  reset: function() {
        logic.time = 30;
        clockRunning = false;
        $('#question').html();
        $('#start').text("Click to Start!");
  },

  timeUp: function() {
      logic.unanswered++;
      logic.stop();
      if(logic.questionCount <= 9){
      $('#question').text("Oops, You ran out of time!");
      $('#answer1').text("");
      $('#answer2').text("");
      $('#answer3').text("");
      $('#answer4').text("");
      $('#unanswered').text("Unanswered: " + logic.unanswered);
      $('#start').text("Next Question");
    }
  },

  check: function() {
      logic.stop();
      if(logic.questionCount < 9){
      $('#question').text("");
      $('#answer1').text("");
      $('#answer2').text("");
      $('#answer3').text("");
      $('#answer4').text("");
      $('#start').text("Next Question");
      if ($(this).attr('correct') == 'true'){
        logic.correct++;
        $('#correct').text("Correct: " + logic.correct);
        $('#question').text("Correct!");
      } else if ($(this).attr('correct') == 'false') {
        logic.incorrect++;
        $('#incorrect').text("Incorrect: " + logic.incorrect);
        $('#question').text("Incorrect!");
      }
    }

  },

  start: function() {
      if (!clockRunning) {
        logic.time = 30;
        clockRunning = true;
        questionTime = setInterval(logic.count, 100);
        $('#question').text(questions[logic.questionCount].question);
        $('#answer1').text(questions[logic.questionCount].answer1[0]);
        $('#answer2').text(questions[logic.questionCount].answer2[0]);
        $('#answer3').text(questions[logic.questionCount].answer3[0]);
        $('#answer4').text(questions[logic.questionCount].answer4[0]);
        $('#answer1').attr("correct", questions[logic.questionCount].answer1[1]);
        $('#answer2').attr("correct", questions[logic.questionCount].answer2[1]);
        $('#answer3').attr("correct", questions[logic.questionCount].answer3[1]);
        $('#answer4').attr("correct", questions[logic.questionCount].answer4[1]);
      }
      logic.questionCount++;
  },

  stop: function() {
    clockRunning = false;
    clearInterval(questionTime);
    alert(logic.questionCount);
    if(logic.questionCount == 9){
      logic.questionCount = 0;
      logic.correct = 0;
      logic.incorrect = 0;
      logic.unanswered = 0;
      $('#start').text("Start Over?");
      $('#question').text("Here's how you did:");
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
