//model
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var ID, newItem;
            ID = data.allItems[type].length === 0 ? 0 : data.allItems[type][data.allItems[type].length - 1].id + 1;
            newItem = type === 'exp' ? new Expense(ID, des, val) : new Income(ID, des, val);
            data.allItems[type].push(newItem);
            data.totals[type] += val;
            return newItem;
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
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            
        },

        getDOMstrings: function() {
            return DOMstrings;
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
    };

    var ctrlAddItem = function() {
        var input, newItem;
        //1. get the field input data
        input = UICtrl.getInput();
        //2. add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);
        //3. add the item to the UI

        //4. calculate the budget

        //5. display the budget
    };

    return {
        init: function(){
            console.log('application has started!');
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();