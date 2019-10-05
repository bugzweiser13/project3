$(document).ready(function() {
    $("#submit").click(function() {

        var fname = $("#fname").val().trim();
        var lname = $("#lname").val().trim();
        var pw = $("#pw").val().trim();

        var name = fname.charAt(0).toUpperCase() + fname.substr(1).toLowerCase() + " " + lname.charAt(0).toUpperCase() + lname.substr(1).toLowerCase();
        var firstLetter = fname[0].toUpperCase();

        var uname = firstLetter + lname.toLowerCase();

        console.log({ name: name, user: uname, pw: pw });

        if (name == '' || uname == '' || pw == '') {
            alert("Insertion Failed Some Fields are Blank....!!");
        } else {
            // Returns successful data submission message when the entered information is stored in database.           
            $.post("form.php", {
                name: name,
                uname: uname,
                pw: pw,
            }, function(data) {
                alert(data);
                $('#form')[0].reset(); // To reset form fields
            });
        }
    });
});