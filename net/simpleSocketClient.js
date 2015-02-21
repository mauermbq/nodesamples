//first start server 
var net = require('net');
//connect callback function logs a message and then writes some data out to the server. 
var client = net.connect({port: 8107, host:'localhost'}, function() {
  console.log('Client connected');
  client.write('Some Data\r\n');
});
//error handling 
client.on('error', function(ex) {
  console.log("handled error");
  console.log(ex);
});
//To handle data coming back from the server, the on.data() event handler is implemented.
client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
//To handle the closure of the socket, the on('end') event handler is implemented.
client.on('end', function() {
  console.log('Client disconnected');
});
