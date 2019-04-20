//model
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function() {
        var totIncome;
        totIncome = data.totals.inc;
        if (totIncome > 0) {
            this.percentage = Math.round(this.value/totIncome*100); 
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem: function(type, des, val) {
            var ID, newItem;
            ID = data.allItems[type].length === 0 ? 0 : data.allItems[type][data.allItems[type].length - 1].id + 1;
            newItem = type === 'exp' ? new Expense(ID, des, val) : new Income(ID, des, val);
            data.allItems[type].push(newItem);
            //data.totals[type] += val;
            return newItem;
        },

        deleteItem: function(type, id){
           var index, ids;
           ids = data.allItems[type].map(function(cur) {
               return cur.id;
           });
           index =  ids.indexOf(id);
           if (index !== -1) {
               data.allItems[type].splice(index, 1);
           }

        },
        calcualteBudget: function() {
            //cal total
            calculateTotal('exp');
            calculateTotal('inc');
            //cal budget
            data.budget = data.totals.inc - data.totals.exp;

            //cal percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp/data.totals.inc*100);   
            } else {
                data.percentage = -1;
            }
        },

        calcualtePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage()
            });
        },
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;

        },
        getBudget: function() {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        testing: function() {
            console.log(data);
        }
    };
})();


//view
var UIController = (function() {
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expenseContainer: '.expenses__list',
        incomeContainer: '.income__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        DateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type) {
        /**
         * have + or - before the num
         */
        var numSplit, sign, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];
        type === 'exp' ? sign = '-' : sign = '+';
        return sign + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function(list, callback){
        for (var i = 0;i < list.length;i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html,newHtml, element;
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            newHtml = newHtml.replace('%description%', obj.description);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },
        deleteListItem: function(selectorID){
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);

        },

        displayMonth: function() {
            var months = ['January','Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var now = new Date();
            document.querySelector(DOMstrings.DateLabel).textContent = months[now.getMonth()] + ' ' +  now.getFullYear(); 
        },

        changeType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        getDOMstrings: function() {
            return DOMstrings;
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current){
                current.value = ""; 
            });

            fieldsArr[0].focus();
        },

        displayBudget(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc':'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage > 0 ? obj.percentage + '%':'---';
        },

        displayPercentages(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            nodeListForEach(fields, function(cur, idx){
                cur.textContent = percentages[idx] > 0 ? percentages[idx] + '%': '---';
            });
        }
    };
})();


//controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) {
                console.log("enter pressed!");
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changeType);
    };
    var updateBudget = function() {

        //1. calculate the budget
        budgetCtrl.calcualteBudget();

        //2. return the budget
        var budget = budgetCtrl.getBudget();
        //3. display the budget
        UIController.displayBudget(budget);

    };

    var updatePercentages = function(){
        //1. cal the percen
        budgetCtrl.calcualtePercentages();

        //2. read from budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. update in the user interface
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        //1. get the field input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
        //2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. add the item to the UI and clear fields
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
        //4. calculate the update budget
        updateBudget();
        //5. update percentage
        updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]); 
            //1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            //2. delete item from user interface
            UICtrl.deleteListItem(itemID); 
            //3. update and show the new budget
            updateBudget();
            //4. update percentage
            updatePercentages();
        }

    };

    return {
        init: function(){
            console.log('application has started!');
            UICtrl.displayBudget({
                budget:0,
                totalInc:0,
                totalExp:0,
                percentage:-1,
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();