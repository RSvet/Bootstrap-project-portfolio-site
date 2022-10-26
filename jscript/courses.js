var currentReservation = 0;    
$(document).ready(function () {
    //povlacenje tabele sa spiskom kurseva iz json-a
    var get = $.ajax({
        type: "GET",
        url: "http://localhost:3000/kursevi"
    });
    get.done(function (coursesData) {
        $.each(coursesData, function (i, courseInfo) {
            $("tbody.first-table").append('<tr py-1> <td>' + courseInfo.course + '</td> <td>' + courseInfo.startingDate + '</td>' +
                '<td>' + courseInfo.duration + '</td> <td>' + courseInfo.price + '</td> <td><button id = "' + courseInfo.id +
                '" style="border: 1px solid rgb(89, 167, 148); outline: 1px solid rgb(171,243,234)" class="bg-transparent px-5 py-1 rounded-2 ' + courseInfo.id + '-details" >View Details</button></td>' +
                '<td><button id= "' + courseInfo.id + '" style="border: 1px solid rgb(54,117,91); outline: 1px solid rgb(203,255,240)" class="bg-transparent px-4 py-1 rounded-2 reserv">Make reservation</button> </td> </tr>');
        })
        $('#tabela').dataTable({
            "aaSorting": [],
            autoWidth: false
        });
    });
    get.fail(function (error) {
        alert(error.statusText)
    });
    // klik na dugme detalji/make reservation-modali
    $('#tabela tbody.first-table').on('click', 'button', function () {
        if ($(this).hasClass("1-details")) {
            $("#modalInfo").modal('toggle');
        }
        else if ($(this).hasClass("reserv")) {           
            $("#modalReserve").modal('toggle');
            let tr = this.parentNode.parentNode;
            $("#selection").attr("value", tr.cells[0].childNodes[0].data);
            $("#price").attr("value", tr.cells[3].childNodes[0].data + "$");
            $("label.error").hide();
        }
    });

    // delete i change reservation
    $('#tabela2 tbody.second-table').on('click', 'button', function () {
        if($(this).hasClass("delete")){
            
            $.ajax({
                url: "http://localhost:3000/rezervacije/" + $(this).attr("id"),
                type: 'DELETE',
                dataType: 'json'                            
            });
            $(this).parent().parent().remove();
            document.getElementById("sumPrices").innerHTML= sumavrednosti()
        }
        else if ($(this).hasClass("change-reser")) {
            $("#modalChange").modal('toggle');
            currentReservation = $(this).attr("id");
            let tr = this.parentNode.parentNode;            
            $("#name_change").attr("value", tr.cells[0].childNodes[0].data);
            $("#surname_change").attr("value", tr.cells[1].childNodes[0].data);
            $("#email_change").attr("value", tr.cells[2].childNodes[0].data);
            $("#course_change").attr("value", tr.cells[3].childNodes[0].data);
            $("#price_change").attr("value", tr.cells[4].childNodes[0].data);           
            $("label.error").hide();
        };                    
    });
        
});
// izmena rezervacije    
function changeReservation() {    
    var courseChange = $("#course_change").val();
    var priceChange = $("#price_change").val();
    var nameChange = $("#name_change").val();
    var surnameChange = $("#surname_change").val();
    var emailChange = $("#email_change").val();
    var noteChange = $("#note_change").val();
    var changeReserv = { name: nameChange, surname: surnameChange, email: emailChange, course: courseChange, price: priceChange, note: noteChange};

    $.ajax({
        
        url: "http://localhost:3000/rezervacije/" + currentReservation,
        type: "PUT",
        data: changeReserv,
        success: function (podatak) {
        var getChange = $.ajax({
        type: "GET",
        url: "http://localhost:3000/rezervacije"
    });
    getChange.done(function (dataChange) {
        $("tbody.second-table").empty();
        $.each(dataChange, function (i, dataNew) {
            $("tbody.second-table").append('<tr><td>' + dataNew.name + '</td><td>' +
                dataNew.surname + '</td><td>' + dataNew.email + '</td><td>' +
                dataNew.course + '</td><td>' + dataNew.price +
                '</td><td>' + dataNew.note + '</td><td><button id="' + dataNew.id +
                '" style="border: 1px solid rgb(89, 167, 148); outline: 1px solid rgb(171,243,234)" class="bg-transparent px-4 py-1 rounded-2 change-reser">Change Reservation</button></td><td><button id="' +
                dataNew.id + '" style="border: 1px solid rgb(89, 167, 148); outline: 1px solid rgb(171,243,234)" class="bg-transparent px-4 py-1 rounded-2 delete">Delete Reservation</button></td></tr>');
        });
        $("#tabela2").dataTable();
    });
    getChange.fail(function (podaci) {
        alert(podaci.statusText);
    });
}
});

};

//ukloni unesene vrednosti u polja modala nakon sto se modal iskljuci
$('#modalReserve').on('hidden.bs.modal', function () {
    $('.modal-body').find('#name,#surname,#email,#note').val('');
});
$('#modalChange').on('hidden.bs.modal', function () {
    $("#forma2").trigger('reset');
});

//validacija formi
$("#forma1").validate({
    rules: {
        name: {
            required: true,
            minlength: 3
        },
        surname: {
            required: true,
            minlength: 3
        },
        email: "required",
        note: {
            required: false,
        },
    },

    messages: {
        name: {
            required: "Enter your name",
            minlength: "Name must be at least 5 caracters long"
        },
        surname: {
            required: "Enter your surname",
            minlength: "Surname must be at least 5 caracters long"
        },
        email: "Enter a valid email address",
    }

});    
$("#forma2").validate({
    rules: {
        name: {
            required: true,
            minlength: 3
        },
        surname: {
            required: true,
            minlength: 3
        },
        email: "required",
        note: {
            required: false,
        },
    },

    messages: {
        name: {
            required: "Enter your name",
            minlength: "Name must be at least 5 caracters long"
        },
        surname: {
            required: "Enter your surname",
            minlength: "Surname must be at least 5 caracters long"
        },
        email: "Enter a valid email address",
    }

}); 
 
// povlacenje tabele sa rezervacijama
var disTable = $.ajax({
    type: "GET",
    url: "http://localhost:3000/rezervacije"
});
disTable.done(function (resData) {
    $("thead.second-table").append('<tr> <th>Name</th> <th>Surname</th> <th>Email</th> <th>Course</th> <th>Price</th> <th>Note</th> <th></th> <th></th>');
    $.each(resData, function (i, resInfo) {
        $("tbody.second-table").append('<tr> <td>' + resInfo.name + '</td><td>' + resInfo.surname + '</td><td>' + resInfo.email + '</td><td>' + resInfo.course + '</td><td>' + resInfo.price + '</td><td>' + resInfo.note +
            '</td><td><button id="' + resInfo.id + '" style="border: 1px solid rgb(89, 167, 148); outline: 1px solid rgb(171,243,234)" class="bg-transparent px-4 py-1 rounded-2 change-reser">Change Reservation</button></td><td><button id="'
            + resInfo.id + '" style="border: 1px solid rgb(89, 167, 148); outline: 1px solid rgb(171,243,234)" class="bg-transparent px-4 py-1 rounded-2 delete">Delete Reservation</button></td></tr>');
            
            
    });

    $('#tabela2').dataTable({
        "aaSorting": [],
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        autoWidth: false,
        fnDrawCallback : function() {
            if ($(this).find('.dataTables_empty').length == 1) {
                $(this).parent().remove();
            }
        }       
    });       
    
});
disTable.fail(function (error) {
    alert(error.statusText)
});
//disable modal button if required fields are empty
$(".sbmt").prop('disabled', true);
$('.rq').on('change', function(){
    var nameN = $("#name").val();
    var surnameS = $("#surname").val();
    var emailEm = $("#email").val();
    if(nameN != '' && surnameS != '' && emailEm != ''){
        $(".sbmt").prop('disabled', false); 
    }
    else {
        $(".sbmt").prop('disabled', true);
    }
});

$(".change-res").prop('disabled', true);
$('.rq2').on('change', function(){
    var nameNew = $("#name_change").val();
    var surnameNew = $("#surname_change").val();
    var emailNew = $("#email_change").val();
    if(nameNew != '' && surnameNew != '' && emailNew != ''){
        $(".change-res").prop('disabled', false); 
    }
    else {
        $(".change-res").prop('disabled', true);
    }
}); 

// slanje podataka o rezervaciji
function sendReservation() {
    var courseC = $("#selection").val();
    var priceP = $("#price").val();
    var nameI = $("#name").val();
    var surnameP = $("#surname").val();
    var emailE = $("#email").val();
    var noteN = $("#note").val();
    var reservation = { name: nameI, surname: surnameP, email: emailE, course: courseC, price: priceP, note: noteN };    
    var zahtev = $.ajax({
        type: "POST",
        url: "http://localhost:3000/rezervacije",
        data: reservation
    });
    zahtev.fail(function(podaci){
        alert(podaci.statusText);
    })
};
//funkcija za prikazivanje total iznosa rezervacija
var sumavrednosti =function CalculateSum(){
    var table = document.getElementById("tabela2");
    if(table){ 
    var nomrows = table.rows.length;
    var sumVal = 0;
    for(var i = 2; i < nomrows; i++){
        sumVal += parseInt(table.rows[i].cells[4].innerHTML);
    }
    return "TOTAL: "+sumVal+"$";
    }
    else{
        return "TOTAL: 0$";
    }    
};


//prebacivanje izmedju tabela klikom na dugme
var drugiel = document.getElementById("second-hide");
var prviel = document.getElementById("first-hide");
function showReservations() {
    drugiel.style.display = "block";
    prviel.style.display= "none";     
    document.getElementById("sumPrices").innerHTML= sumavrednosti();
};

function backToCourses() {
    drugiel.style.display = "none";
    $("#first-hide").show();
}

