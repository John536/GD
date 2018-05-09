$(document).ready(function() {

    editor = new $.fn.dataTable.Editor( {
        // ajax: '../php/staff-html.php',
        table: '#students',
        fields: [ {
                label: "Name:",
                name: "name"
            }, {
                label: "Username:",
                name: "username"                
            }, {
                label: "School:",
                name: "school"
            }, {
                label: "Class:",
                name: "class"
            }, {
                label: "Password:",
                name: "password"
            }, {
                label: "Email:",
                name: "email"
            }
        ]
    } );
 
    var table = $('#students').DataTable( {
        dom: 'Bfrtip',
        columns: [
            { data: "name" },
            { data: "username" },
            { data: "school" },
            { data: "class" },
            { data: "password" },
            { data: "email" }            
        ],
        select: true,
        buttons: [
            { extend: "create", editor: editor, },
            { extend: "edit",   editor: editor },
             {
                extend: "selected",
                text: 'Duplicate',
                action: function ( e, dt, node, config ) {
                    // Start in edit mode, and then change to create
                    editor  //  THIS IS THE DIRECTION AS TO WHERE IT IS PUT!!!!
                        .edit( table.rows( {selected: true} ).indexes(), {
                            title: 'Duplicate record',
                            buttons: 'Create from existing'
                        } )
                        .mode( 'create' );
                }
            },
            { extend: "remove", editor: editor },
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

// ***********************************************
// Selecting students for analyzing data
// ***********************************************

$('#analyzeStuButton').on('click', function () { 
    var infoD = table.row({selected: true}).data();
    if (Object.entries(infoD)[0][1] == 'Ashton Cox') {   
        johnDisplay();
    } else if (Object.entries(infoD)[0][1] == 'Cedric Kelly') {
        johnDisplay();
    } else if (Object.entries(infoD)[0][1] == 'Garrett Winters') {
        johnDisplay();
    }else if (Object.entries(infoD)[0][1] == 'John Nixon') {
        johnDisplay();
    }
})


function johnDisplay () {
    console.log('john called');
    $("#johnPanel").show();
    $("#ashtonPanel").hide();
    $("#cedricPanel").hide();
    $("#garrettPanel").hide();
}


// *********John Data Set********* 
//Hides John table
$("#johnPanel").hide();
//John's Charts
//John's Chart for Weaknesses/Strengths: Subject
var ctx = document.getElementById("JohnChartSubject").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["Math", "Reading", "History", "Spelling", "Social Studies"],
            datasets: [{
                label: '% Correct',
                data: [75, 85, 90, 65, 84, 69],
                backgroundColor: [
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(255, 159, 64, 2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Weaknesses/Strengths: Subject'
            }
        }
    });

//John's Tests Over Time chart
//Line chart  (need to consider function for how many get rendered (top 5 or 10?))
    var ctx3 = document.getElementById("JohnChartTests").getContext('2d');
    var myLineChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                    label: 'Test Scores',
                    fill: false,
                    data: [65, 75, 90, 65, 84, 69],
                    backgroundColor: [
                        'rgba(255, 99, 132, 2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }
                ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Test Scores Over Time'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
        }
    });

//John's Type Over Time chart
//Line chart  (need to consider function for how many get rendered (top 5 or 10?))
    var ctx2 = document.getElementById("JohnChartType").getContext('2d');
    var myLineChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                    label: 'Decimals',
                    fill: false,
                    data: [75, 85, 90, 65, 84, 69],
                    backgroundColor: [
                        'rgba(153, 102, 255, 2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Fractions',
                    fill: false,
                    data: [50, 56, 45, 60, 63, 69],
                    backgroundColor: [
                        'rgba(54, 162, 235, 2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 2)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Multiplication',
                    fill: false,
                    data: [75, 70, 85, 86, 80, 95],
                    backgroundColor: [
                        'rgba(75, 192, 192, 2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 2)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Type Over Time'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
        }
    });


var ctx4 = document.getElementById("JohnChartIndividType").getContext('2d');
    var myChart = new Chart(ctx4, {
        type: 'horizontalBar',
        data: {
            labels: ["Fractions", "Decimals", "Addition", "Subtraction", "Multiplication"],
            datasets: [{
                label: '% Correct',
                data: [75, 85, 90, 65, 84, 69],
                backgroundColor: [
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)',
                    'rgba(75, 192, 192, 2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Weaknesses/Strengths: Type'
            }
        }
    });


//***********End John Data Table********

var editorJohn; // use a global for the submit and return data rendering in the examples
 
// $(document).ready(function() {
    editorJohn = new $.fn.dataTable.Editor( {
        // ajax: '../php/staff-html.php',
        table: '#johnData',
        fields: [ {
                label: "Date:",
                name: "Date"
            }, {
                label: "Test:",
                name: "Test"
            }, {
                label: "Subject:",
                name: "Subject"
            }, {
                label: "Grade:",
                name: "Grade"
            }, {
                label: "Level:",
                name: "Level",
                }, {
                label: "Type:",
                name: "Type",
                }, {
                label: "Question:",
                name: "Question",
                }, {
                label: "Correct Ans.:",
                name: "Correct Ans.",
                }, {
                label: "Student Ans.:",
                name: "Student Ans.",
                }, {
                label: "Result:",
                name: "Result",
                }
        ]
    } );
 
    var table2 = $('#johnData').DataTable( {
        dom: 'Bfrtip',
        columns: [
            { data: "Date" },
            { data: "Test" },
            { data: "Subject" },
            { data: "Grade" },
            { data: "Level" },
            { data: "Type" },
            { data: "Question" },
            { data: "Correct Ans." },
            { data: "Student Ans." },
            { data: "Result" }
        ],
        select: true,
        buttons: [
            
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
// } );




}) //End of document ready function


// *****************************************
// Notes
// *****************************************


// Perhaps instead of an analyze button simple put jquery that when 
//a name is 'selected' it automatically populates data
//too difficult right now

// THIS CODE IS TO TRANSFER API RESPONSE TO ARRAY
// var table = $('#example').DataTable();
// var data = table.data().toArray();
 
// data.forEach(function(row, i) {
//   row.forEach(function(column, j) {
//     console.log('row ' + i + ' column ' + j + ' value ' + column);
//   });
// });



// EXPERIMENTS WITH CLICKING ON TABLE 
// var data = table.data().toArray()
// console.log(table.row({selected: true}));
// console.log(table.data().row().toArray())
// console.log(table.row({'order':'index'}, {selected: true}).data().JSON.stringify() )
// var readyData = JSON.stringify(infoD);
// console.log(Object.entries(infoD)[0][1]);  //grabs row name value form object and then now you can put in fucntion!!
