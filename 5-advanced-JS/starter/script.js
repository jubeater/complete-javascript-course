var john = {
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

var jane = new Person('Jane', 1969, 'engineer');