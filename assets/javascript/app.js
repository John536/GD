
// *****************************************************************
// Community Questions Table
// *****************************************************************

var editor; // use a global for the submit and return data rendering in the examples
var editor2; 

$(document).ready(function() {
    editor = new $.fn.dataTable.Editor( {
        // ajax: '../php/staff-html.php',
        table: '#example',
        fields: [ {
                label: "Subject:",
                name: "subject"
            }, {
                label: "Grade:",
                name: "grade"                
            }, {
                label: "Level:",
                name: "level"
            }, {
                label: "Type:",
                name: "type"
            }, {
                label: "Question:",
                name: "question"
            }, {
                label: "Answer1:",
                name: "answer1"
            }, {
                label: "Answer2:",
                name: "answer2"
            }, {
                label: "Answer3:",
                name: "answer3"
            }, {
                label: "Answer4:",
                name: "answer4"
            }, {
                label: "Answer5:",
                name: "answer5"
            }, {
                label: "Answer6:",
                name: "answer6"
            }, {
                label: "Answer7:",
                name: "answer7"
            }, {
                label: "Correct:",
                name: "correct"
            }, {
                label: "TextBook:",
                name: "textbook"
            }
        ]
    } );
 
    var table = $('#example').DataTable( {
        dom: 'Bfrtip',
        columns: [
            { data: "subject" },
            { data: "grade" },
            { data: "level" },
            { data: "type" },
            { data: "question" },
            { data: "answer1" },
            { data: "answer2" },
            { data: "answer3" },
            { data: "answer4" },
            { data: "answer5" },    
            { data: "answer6" },
            { data: "answer7" },
            { data: "correct" },
            { data: "textbook" }
        ],
        select: true,
        buttons: [
            // { extend: "create", editor: editor, },
            // { extend: "edit",   editor: editor },
            //  {
            //     extend: "selected",
            //     text: 'Duplicate',
            //     action: function ( e, dt, node, config ) {
            //         // Start in edit mode, and then change to create
            //         editor  //  THIS IS THE DIRECTION AS TO WHERE IT IS PUT!!!!
            //             .edit( table.rows( {selected: true} ).indexes(), {
            //                 title: 'Duplicate record',
            //                 buttons: 'Create from existing'
            //             } )
            //             .mode( 'create' );
            //     }
            // },
            // { extend: "remove", editor: editor }
        ]
    } );

// *****************************************************************
// END of Community Questions Table
// *****************************************************************


// *****************************************************************
// My Questions Table
// *****************************************************************




// Object that will contain the local state
    var todo = {};
 
    // Create or update the todo localStorage entry
    if ( localStorage.getItem('todo') ) {
        todo = JSON.parse( localStorage.getItem('todo') );
    }
 
    // Set up the editor
    editor2 = new $.fn.dataTable.Editor( {
        table: "#example2",
        fields: [
            {
                label: "Subject:",
                name: "subject"
            }, {
                label: "Grade:",
                name: "grade"                
            }, {
                label: "Level:",
                name: "level"
            }, {
                label: "Type:",
                name: "type"
            }, {
                label: "Question:",
                name: "question"
            }, {
                label: "Answer1:",
                name: "answer1"
            }, {
                label: "Answer2:",
                name: "answer2"
            }, {
                label: "Answer3:",
                name: "answer3"
            }, {
                label: "Answer4:",
                name: "answer4"
            }, {
                label: "Answer5:",
                name: "answer5"
            }, {
                label: "Answer6:",
                name: "answer6"
            }, {
                label: "Answer7:",
                name: "answer7"
            }, {
                label: "Correct:",
                name: "correct"
            }, {
                label: "TextBook:",
                name: "textbook"
            }
        ],
        ajax: function ( method, url, d, successCallback, errorCallback ) {
            var output = { data: [] };
 
            if ( d.action === 'create' ) {
                // Create new row(s), using the current time and loop index as
                // the row id
                var dateKey = +new Date();
 
                $.each( d.data, function (key, value) {
                    var id = dateKey+''+key;
 
                    value.DT_RowId = id;
                    todo[ id ] = value;
                    output.data.push( value );
                } );
            }
            else if ( d.action === 'edit' ) {
                // Update each edited item with the data submitted
                $.each( d.data, function (id, value) {
                    value.DT_RowId = id;
                    $.extend( todo[ id ], value );
                    output.data.push( todo[ id ] );
                } );
            }
            else if ( d.action === 'remove' ) {
                // Remove items from the object
                $.each( d.data, function (id) {
                    delete todo[ id ];
                } );
            }
 
            // Store the latest `todo` object for next reload
            localStorage.setItem( 'todo', JSON.stringify(todo) );
 
            // Show Editor what has changed
            successCallback( output );
        }
    } );
 
    // Initialise the DataTable
    var table2 = $('#example2').DataTable( {
        dom: "Bfrtip",
        data: $.map( todo, function (value, key) {
            return value;
        } ),
        columns: [
            { data: "subject" },
            { data: "grade" },
            { data: "level" },
            { data: "type" },
            { data: "question" },
            { data: "answer1" },
            { data: "answer2" },
            { data: "answer3" },
            { data: "answer4" },
            { data: "answer5" },
            { data: "answer6" },
            { data: "answer7" },
            { data: "correct" },
            { data: "textbook" }
        ],
        select: true,
        buttons: [
            { extend: "create", editor: editor2, },  //this has something to do where shit goes, also if you want to add class use: className: 'newToCommunity'
            //{ extend: "edit",   editor: editor2, },  //for some reason edit fucks it all up
            {
                extend: "selected",
                text: 'Duplicate',
                action: function ( e, dt, node, config ) {
                    // Start in edit mode, and then change to create
                    editor2  //  THIS IS THE DIRECTION AS TO WHERE IT IS PUT!!!!
                        .edit( table2.rows( {selected: true} ).indexes(), {
                            title: 'Duplicate record',
                            buttons: 'Create from existing'
                        } )
                        .mode( 'create' );
                }
            },
            { extend: "remove", editor: editor2, },
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    'copy',
                    'excel',
                    'csv',
                    'pdf',
                    'print'
                ]
            }
        ]
    } );



// *******************************************
// save function pushing to My Questions table
// ********************************************


$("#save").on('click', function () {
    console.log(table.rows({selected: true}).data());  
    var additionalRW = table.row({selected: true}).data();//remove 's' in 'rows' if problems pushing

    table2.row.add(additionalRW).draw()
    //4.18.18  A couple of problems here... it propely adds to table 2 but whenever I click edit, everything will then not work on table2.
    // Also the css goes out of whack.  
    //But then again if you just take out 'edit' it won't matter, because the user can just duplicate to edit!!!!!
    //Need to also do same thing for table 1 when you create new...  if possible to connect to click

})

// *****************************************
//code for prepending to "My Tests" table
// *****************************************

$("#createTestButton").on('click', function () {
    //need to prepend it to table
    var named = $("#testName").val().trim();
    var number = Math.floor((Math.random() * 1000) + 1);
    var animalNum = Math.floor((Math.random() * 10) + 1);    
    var animal;
    function zoo () { 
        if (animalNum === 1) {
            animal = "dolphin";
        } else if (animalNum === 2) {
            animal = "puppy";
        } else if (animalNum === 3) {
            animal = "kitten";
        } else if (animalNum === 4) {
            animal = "hamster";
        } else if (animalNum === 5) {
            animal = "goldfish";
        } else if (animalNum === 6) {
            animal = "ferret";
        } else if (animalNum === 7) {
            animal = "eagle";
        } else if (animalNum === 8) {
            animal = "bear";
        } else if (animalNum === 9) {
            animal = "tiger";
        } else if (animalNum === 10) {
            animal = "mouse";
        }
}
zoo()
const now = new Date();

    $('#createdTests').prepend("<tr><td>"+ named + "</td><td>" + now + "</td><td><a href='assets/Quiz-GD/story.html'>" + animal + number +"</a></td></tr>")

})



} );


// .edit( table.rows( {selected: true} ).indexes(),
 
//     Get the data for a single row when clicked upon:
// var table = $('#example').DataTable(); 
// $('#example tbody').on( 'click', 'tr', function () {
//     console.log( table.row( this ).data() );
// } );