var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("astro");
  myDB.collection("nebulae", function(err, nebulae){
    nebulae.find(function(err, items){
      items.toArray(function(err, itemArr){
        console.log("Before Delete: ");
        console.log(itemArr);
        nebulae.remove({type:"planetary"}, function(err, results){
          console.log("Deleted " + results + " documents.");
          nebulae.find(function(err, items){
            items.toArray(function(err, itemArr){
              console.log("After Delete: ");
              console.log(itemArr);
              db.close();
            });
          });
        });
      });
    });
  });
});

/*
remove single documents
 var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("astro");
  myDB.collection("nebulae", function(err, nebulae){
    nebulae.find(function(err, items){
      items.toArray(function(err, itemArr){
        console.log("Before Delete: ");
        console.log(itemArr);
        nebulae.findAndRemove({type:"Planetary"}, [['name', 1]],
                              {w:1}, function(err, results){
          console.log("Deleted:\n " + results);
          nebulae.find(function(err, items){
            items.toArray(function(err, itemArr){
              console.log("After Delete: ");
              console.log(itemArr);
              db.close();
            });
          });
        });
      });
    });
  });
});
*/
