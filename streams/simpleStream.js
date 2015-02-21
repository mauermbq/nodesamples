var stream = require('stream');
var util = require('util');
util.inherits(Answers, stream.Readable);
function Answers(opt) {
  stream.Readable.call(this, opt);
  this.quotes = ["yes", "no", "maybe"];
  this._index = 0;
}
Answers.prototype._read = function() {
  if (this._index > this.quotes.length){
    this.push(null);
  } else {
    this.push(this.quotes[this._index]);
    this._index += 1;
  }
};
var r = new Answers();
console.log("Direct read: " + r.read().toString());
r.on('data', function(data){
  console.log("Callback read: " + data.toString());
});
r.on('end', function(data){
  console.log("No more answers.");
});

console.log("Writing Streams");

var stream = require('stream');
var util = require('util');
util.inherits(Writer, stream.Writable);
function Writer(opt) {
  stream.Writable.call(this, opt);
  this.data = new Array();
}
Writer.prototype._write = function(data, encoding, callback) {
  this.data.push(data.toString('utf8'));
  console.log("Adding: " + data);
  callback();
};
var w = new Writer();
for (var i=1; i<=5; i++){
  w.write("Item" + i, 'utf8');
}
w.end("ItemLast");
console.log(w.data);

console.log("Duplex Streams:");


var stream = require('stream');
var util = require('util');
util.inherits(Duplexer, stream.Duplex);
function Duplexer(opt) {
  stream.Duplex.call(this, opt);
  this.data = [];
}
Duplexer.prototype._read = function readItem(size) {
  var chunk = this.data.shift();
  if (chunk == "stop"){
    this.push(null);
  } else{
    if(chunk){
      this.push(chunk);
    } else {
      setTimeout(readItem.bind(this), 500, size);
    }
  }
};
Duplexer.prototype._write = function(data, encoding, callback) {
  this.data.push(data);
  callback();
};
var d = new Duplexer();
d.on('data', function(chunk){
  console.log('read: ', chunk.toString());
});
d.on('end', function(){
  console.log('Message Complete');
});
d.write("I think, ");
d.write("therefore ");
d.write("I am.");
d.write("Rene Descartes");
d.write("stop");

console.log("Transform Strema:");

var stream = require("stream"); 
var util = require("util");
util.inherits(JSONObjectStream, stream.Transform);
function JSONObjectStream (opt) {
  stream.Transform.call(this, opt);
};
JSONObjectStream.prototype._transform = function (data, encoding, callback) {
  object = data ? JSON.parse(data.toString()) : "";
  this.emit("object", object);
  object.handled = true;
  this.push(JSON.stringify(object));
  callback();
};
JSONObjectStream.prototype._flush = function(cb) {
  cb();
};
var tc = new JSONObjectStream();
tc.on("object", function(object){
  console.log("Name: %s", object.name);
  console.log("Color: %s", object.color);
});
tc.on("data", function(data){
  console.log("Data: %s", data.toString());
});
tc.write('{"name":"Carolinus", "color": "Green"}');
tc.write('{"name":"Solarius", "color": "Blue"}');
tc.write('{"name":"Lo Tae Zhao", "color": "Gold"}');
tc.write('{"name":"Ommadon", "color": "Red"}');



