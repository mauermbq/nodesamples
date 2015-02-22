var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/words');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
mongoose.connection.once('open', function(){
  var query = Words.findOne().where('word', 'book');
  query.exec(function(err, doc){
    console.log("Is Document New? " + doc.isNew);
    console.log("\nBefore Save: ");
    console.log(doc.toJSON());
    doc.set('word','Book');
    doc.set('first','B');
    console.log("\nModified Fields: ");
    console.log(doc.modifiedPaths());
    doc.save(function(err){
      Words.findOne({word:'Book'}, function(err, doc){
        console.log("\nAfter Save: ");
        console.log(doc.toJSON());
        mongoose.disconnect();
      });
    });
  });
});

/* update */
mongoose.connection.once('open', function() {
   var query = Words.findOne().where('word', 'gratifaction');
   query.exec(function(err, doc){
     console.log("Before Update: ");
     console.log(doc.toJSON());
     var query = doc.update({$set:{word:'gratifactions',
                                   size:13, last:'s'},
                             $push:{letters:'s'}});
     query.exec(function(err, results){
       console.log("\n%d Documents updated", results);
       Words.findOne({word:'gratifactions'}, function(err, doc){
         console.log("\nAfter Update: ");
         console.log(doc.toJSON());
         mongoose.disconnect();
       });
     });
   });
 });