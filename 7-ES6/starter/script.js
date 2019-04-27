class Element{
    constructor(name, buildyear) {
        this.name = name;
        this.year = buildyear;
    }
}

class Park  extends Element{
    constructor(name, year, numOfTrees, area) {
        super(name, year);
        this.num = numOfTrees;
        this.area = area;
    }

    density(){
        console.log(`${name} park has a tree density of ${num / area} per square km`);
    }


    getAge(curYear) {
        return curYear - this.year;
    }

    getNum() {
        return this.num;
    }
}

class Street extends Element{
    constructor(name, year, length, size) {
        super(name, year);
        this.length = length;
        this.size = size;
    }

    
}