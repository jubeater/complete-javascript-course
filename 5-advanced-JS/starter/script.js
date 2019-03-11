/* var john = {
    name: 'john',
    yearOfBirth: 1990,
    job: 'teacher'
};


var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
}

var john = new Person('john', 1990, 'teacher');

john.calculateAge();

var jane = new Person('Jane', 1969, 'engineer'); */
(function() {
    function Question(question, answers, correctAnswer){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    
    function generationQuestions() {
        var qone = new Question("what's my name?", ['jubeater','lasd','sadf'],0);
        var qtwo = new Question('what\'s my birth year? ', [1993,1992,1994], 1);
        var qthree = new Question('what\'s my age?', [14,15,27],2);
        return [qone,qtwo,qthree];
    }
    
    
    function chooseQuestion(questions) {
        return questions[Math.floor(Math.random()*3)];
    }
    
    function displayQuestion(questions) {
        for (let i  = 0; i < questions.answers.length; i++) {
            console.log('' + i + ' ' + questions.answers[i]);
        }
        var input = prompt(questions.question);
        checkCorrectness(questions,input);
    }
    
    
    function checkCorrectness(question, answer){
        if (question.correctAnswer == answer) {
            console.log("you are correct!");
        } else {
            console.log("you are wrong, the correct answer is the option " + question.correctAnswer);
        }
    }
    displayQuestion(chooseQuestion(generationQuestions()));
})();
