var fs = require('fs');
var config = {
  maxFiles: 20,
  maxConnections: 15,
  rootPath: "/webroot"
};
var configTxt = JSON.stringify(config);
var options = {encoding:'utf8', flag:'w'};
fs.writeFile('./config.txt', configTxt, options, function(err){
  if (err){
    console.log("Config Write Failed.");
  } else {
    console.log("Config Saved.");
  }
});

console.log("nad raeding:");


fs.exists('configread.txt', function (exists) {
  console.log(exists ? "Path Exists" : "Path Does Not Exist");
});

var fs = require('fs');
var options = {encoding:'utf8', flag:'r'};
fs.readFile('configread.txt', options, function(err, data){
  if (err){
    console.log("Failed to open Config File.");
  } else {
    console.log("Config Loaded.");
    var config = JSON.parse(data);
    console.log("Max Files: " + config.maxFiles);
    console.log("Max Connections: " + config.maxConnections);
    console.log("Root Path: " + config.rootPath);
    console.log("Description: " + config.description);
  }
});

console.log("Statistics about file:");


fs.stat('configread.txt', function (err, stats) {
  if (!err){
    console.log('stats: ' + JSON.stringify(stats, null, '  '));
    console.log(stats.isFile() ? "Is a File" : "Is not a File");
    console.log(stats.isDirectory() ? "Is a Folder" : "Is not a Folder");
    console.log(stats.isSocket() ? "Is a Socket" : "Is not a Socket");
    stats.isDirectory();
    stats.isBlockDevice();
    stats.isCharacterDevice();
    //stats.isSymbolicLink(); //only lstat
    stats.isFIFO();
    stats.isSocket();
  }
});

