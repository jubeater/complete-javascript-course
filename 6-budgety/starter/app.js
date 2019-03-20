//model
var budgetController = (function() {


})();


//view
var UIController = (function() {
    //some code


})();


//controller
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        //1. get the field input data

        //2. add the item to the budget controller

        //3. add the item to the UI

        //4. calculate the budget

        //5. display the budget
        console.log("it's works!");
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13) {
            console.log("enter pressed!");
            ctrlAddItem();
        }
    });

})(budgetController,UIController);