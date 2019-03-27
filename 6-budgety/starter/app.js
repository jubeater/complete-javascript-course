//model
var budgetController = (function() {


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
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();


//controller
var controller = (function(budgetCtrl, UICtrl) {
    var DOM = UIController.getDOMstrings();

    var ctrlAddItem = function() {
        //1. get the field input data
        var input = UIController.getInput();
        console.log(input);
        //2. add the item to the budget controller

        //3. add the item to the UI

        //4. calculate the budget

        //5. display the budget
    }

    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13) {
            console.log("enter pressed!");
            ctrlAddItem();
        }
    });

})(budgetController,UIController);