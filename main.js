$(document).ready(function(){
    
    // here is storing the number of  items in the list
    var counterJS;
    // check if the local store already contains any number, then print it out in HTML
    if (localStorage.getItem('items counter')>0) {
        counterJS = parseInt(localStorage.getItem('items counter'));
        $("#todo-counter").html(counterJS.toString());
    } else {
        counterJS = 0;
    };
    // transmitting an updated number of list items to HTML and the local store
    var counterUpdate = function (){
        $("#todo-counter").html(counterJS.toString());
        console.log("sent to DOM",counterJS );
        localStorage.setItem("items counter", counterJS);
    }; 
    // transmitting an updated HTML element (list) to the local store
    var storeToDoList = function (){
        var ulToDoList = $('#todo-list').html();
        console.log(ulToDoList);
        localStorage.setItem("items in list", ulToDoList);
    };
    // adding a new 'to do' item to HTML and run function to transmit updated HTML to the local store 
    var addToDo = function(add) {
        $('#todo-list').append(
            `<li class='itemToDo'>
            ${add}
            <button type="button" class="btn btn-sm">Delete</button>
            </li>`
            );
        storeToDoList ();
        }
    // pressing of 'enter' key sat as event and check if the form is not empty and run function for adding a new "to do" item     
    $("#itemToDo").keydown(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var add = $("#itemToDo").val();
            if (add!="") {
            addToDo(add);
            counterJS = counterJS + 1;    
            } else {
                alert("Please, fill the form.")
            };
            $("#itemToDo").val("");
            console.log(add);
            console.log("counterLocal=",counterJS);
            counterUpdate();  
        }
    });
    // removal of items from the list: remove an item, reduce counter of items, 
    // run functions for updating HTML and store new number to the local store
    $(document).on('click','.btn.btn-sm', function(){
        $(this).closest('li.itemToDo').remove();
        console.log("delete");
        counterJS = counterJS - 1;
        counterUpdate();
        storeToDoList ();
    });
});
