$(document).ready(function() {
    $("#submit").click(function() {
        event.preventDefault();
        // console.log('ive been clicked');

        // loading gif show/hide 


        var fname = $("#fname").val().trim();
        var lname = $("#lname").val().trim();
        var pw = $("#pw").val().trim();
        var pwCon = $("#pwCon").val().trim();

        var name = fname.charAt(0).toUpperCase() + fname.substr(1).toLowerCase() + " " + lname.charAt(0).toUpperCase() + lname.substr(1).toLowerCase();
        var firstLetter = fname[0].toUpperCase();

        var uname = firstLetter + lname.toLowerCase();

        $(document).ready(function() {
            $(document).ajaxStart(function() {
                    $("#loading").show();
                })
                .ajaxStop(function() {
                    $("#loading").hide();
                });
        });

        console.log({ name: name, user: uname, pw: pw, pwCon: pwCon });

        if (name == '' || uname == '' || pw == '') {
            alert("Insertion Failed Some Fields are Blank....!!");
        } else if (pw != pwCon) {
            alert("Password Does Not Match!!");
            return
        } else {
            // Returns successful data submission message when the entered information is stored in database.           
            $.post("user_creation_form.php", {
                name: name,
                uname: uname,
                pw: pw,
            }, function(data) {
                console.log(data);
                alert(data);
                $('#form')[0].reset(); // To reset form fields
                return false;

            });
        }
    });




});