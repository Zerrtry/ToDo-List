$(document).ready(function(){
    
    // here is storing number of list's items
    var counterJS;
    // check if local store already contains any integer, than print it out in the page  
    if (localStorage.getItem('items counter')>0) {
        counterJS = parseInt(localStorage.getItem('items counter'));
        $("#todo-counter").html(counterJS.toString());
    } else {
        counterJS = 0;
    };
    // 
    if (localStorage.getItem('items in list')) {
        var y = localStorage.getItem('items in list');
        $('#todo-list').append(y.replace(/,/g, ''));
    };
    
    var counterUpdate = function (){
        $("#todo-counter").html(counterJS.toString());
        console.log("sent to DOM",counterJS );
        localStorage.setItem("items counter", counterJS);
    }; 
    
    var storeToDoList = function (){
        var ulToDoList = $('#todo-list').html();
        console.log(ulToDoList);
        localStorage.setItem("items in list", ulToDoList);
    };

    var addToDo = function(add) {
        $('#todo-list').append(
            `<li class='itemToDo'>
            ${add}
            <button type="button" class="btn btn-sm">Delete</button>
            </li>`
            );
        storeToDoList ();
        }
        
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
    
    $(document).on('click','.btn.btn-sm', function(){
        $(this).closest('li.itemToDo').remove();
        console.log("delete");
        counterJS = counterJS - 1;
        counterUpdate();
        storeToDoList ();
    });
});
