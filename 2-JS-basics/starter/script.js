var firstName = 'John';
console.log(firstName);
//str
var lastName = 'Smith';

//number
var age =  28;

//bool
var fullAge = true;
console.log(fullAge);

//undefined
var job;
console.log(job);

//except char we can only use _ or $ as the var name

//this is the single line comment

/*
this is multi line comments
this is multi line comments
*/


/*
var firstName = 'John';
var age = 28;
Type coercion make the type of age change from number to str
*/
console.log(firstName + ' ' + age);


var job, isMarried;
job = 'teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old ' + job + 
'. Is he married? ' + isMarried);

//math operators
var year = 2019;
var yearJohn = year - age;

console.log(yearJohn);


//Logical operatios
// > <  >=  <= 



//typeof operator
console.log(typeof year);

var JohnTeam = [89, 120, 103];
var mikeTeam = [116, 94, 123];

var johnScore,mikeScore;
johnScore = mikeScore = 0;
for (let i = 0;i < JohnTeam.length;i++){
    johnScore += JohnTeam[i];
    mikeScore += mikeTeam[i];
}

console.log(johnScore/JohnTeam.length ? johnScore > mikeScore : mikeScore/mikeTeam.length);
