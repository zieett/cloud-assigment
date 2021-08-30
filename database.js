const sqlite3 = require('sqlite3').verbose();

module.exports.is_valid_account = function (email, password, cb){
    var isValid = false;
    var db = new sqlite3.Database('test.db');           
    db.all("SELECT * FROM UserInformation", function(err,rows){
         if(err) return cb(err); 
         rows.forEach(function (row) { 
            if (email == row.email && password == row.password) isValid = true;
        }); 
        db.close();
        cb(isValid);
}); 
}

module.exports.signup = function (userdata, cb){
    var isSucessful = false;
    var db = new sqlite3.Database('test.db');           
    var query = "INSERT into UserInformation (email, password, username, gender, dob, phone, address)" 
                + "VALUES ('" + userdata.email + "','" + userdata.password + "','" + userdata.username 
                + "','" + userdata.gender + "','" + userdata.dob + "','" + userdata.phone + "','" + userdata.address + "');";
    db.run(query, function(err){
        if(!err) isSucessful = true; 
        else console.log(err);
        db.close();
        cb(isSucessful);
}); 
}

module.exports.confirmVacination = function(user, cb){
    var isSucessful = false;
    var db = new sqlite3.Database('test.db'); 
    var query = "";
    if (user.isfirstshot) query = "INSERT into UserInformation (firstshot, firstshotdate) VALUES ('" + userdata.vacineName + "','" + userdata.date + "');";
    else query = "INSERT into UserInformation (secondshot, secondshotdate) VALUES ('" + userdata.vacineName + "','" + userdata.date + "');";
    db.run(query, function(err){
        if(!err) isSucessful = true; 
        else console.log(err);
        db.close();
        cb(isSucessful);
}); 
}

module.exports.isAdmin = function(email, cb){
    var isAdmin = false;
    db.all("SELECT role FROM UserInformation WHERE email ='" + email +"';" , function(err, rows){
        if(!err && rows[0] == "Admin") isAdmin = true; 
        else console.log(err);
        db.close();
        cb(isAdmin);
    });
}

module.exports.dataList = function (user, cb){
    var list = [];
    var db = new sqlite3.Database('test.db');      
    if (user.role == "Admin"){
        db.all("SELECT * FROM UserInformation", function(err,rows){
            if(err) return cb(err);
            let index = 0; 
            rows.forEach(function (row) { 
               var data = {
                   email: row.email,
                   password: row.password,
                   username: row.username,
                   gender: row.gender,
                   dob: row.dob,
                   phone: row.phone,
                   address: row.address
               }
               list[index] = data;
               index ++;
   
           }); 
           db.close();
           cb(list);
       });   
    }
    else {
        db.all("SELECT * FROM UserInformation WHERE email ='" + user.email +"';" , function(err,rows){
            if(err) return cb(err);
            var data = {
                email: rows[0].email,
                password: rows[0].password,
                username: rows[0].username,
                gender: rows[0].gender,
                dob: rows[0].dob,
                phone: rows[0].phone,
                address: rows[0].address
            }
            list[0] = data;
            db.close();
            cb(list);
        });   
    }
}