// TCP socket client example
// to run first start server 
var net = require('net');
function getConnection (connName) {
	//connect callback function logs a message and then writes some data out to the server. 
	var client = net.connect({port: 8107, host:'localhost'}, function() {
	  	console.log('connected ' + connName);
	  	console.log('   local = %s:%s', this.localAddress, this.localPort);
      	console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
	  	this.setTimeout(500);
      	this.setEncoding('utf8');
		//error handling 
		this.on('error', function(ex) {
		  console.log("Socket error: " + JSON.stringify(ex));
		});
		//To handle data coming back from the server, the on.data() event handler is implemented.
		this.on('data', function(data) {
		  console.log(connName + "From Server: " + data.toString());
		  this.end();
		});
		//To handle the closure of the socket, the on('end') event handler is implemented.
		this.on('end', function() {
		  console.log(connName + ' Client disconnected');
		});
		//Handle timeout
		this.on('timeout', function() {
    	  console.log('Socket Timed Out');
		});
		//close socket
		this.on('close', function() {
    	  console.log('Socket Closed');
    	});
    });
    return client;
}	
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
var Dwarves = getConnection("Dwarves");
var Elves = getConnection("Elves");
var Hobbits = getConnection("Hobbits");
writeData(Dwarves, "More Axes");
writeData(Elves, "More Arrows");
writeData(Hobbits, "More Pipe Weed");