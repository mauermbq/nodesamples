1 var mongoose = require('mongoose');
2 mongoose.connect('mongodb://localhost/words');
3 mongoose.connection.on('open', function(){
4   console.log(mongoose.connection.collection);
5   mongoose.connection.db.collectionNames(function(err, names){
6     console.log(names);
7     mongoose.disconnect();
8   });
9 });