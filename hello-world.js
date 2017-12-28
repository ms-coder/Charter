var Connection = require('tedious').Connection;

var config = {
   userName: 'dev',
   password: 'Hugon677',
   server: 'igorz.database.windows.net',
   // If you are on Microsoft Azure, you need this:  
   options: { encrypt: true, database: 'charter-test' }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
   if (err)
      console.log(err);
   else {
      console.log("Connected");
      executeStatement();
   }
});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
   let request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {

      if (err) {
         console.log(err);
      }
   });

   var result = "";

   request.on('row', function(columns) {
      columns.forEach(function(column) {
         if (column.value === null) {
            console.log('NULL');
         }
         else {
            result += column.value + " ";
         }
      });

      console.log(result);

      result = "";
   });

   request.on('done', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
   });
   connection.execSql(request);
}



// ---------------------

var http = require("http");

http.createServer(function(request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, { 'Content-Type': 'text/plain' });

   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
