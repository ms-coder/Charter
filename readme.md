# Charter Project

## Our goals

This framework should help web masters by building modern looking, dynamic dashboards and interactive graphic elements, based on data provided by DB server or selected Web APIs. The difference to similar projects is an easy understandable code, which can be included in any html document (**TODO: more benefits here**). As a widgets library we are using google charts at the moment. We plan to include also some other libraries later. As a data source can be chosen different db-servers, web-APIs (with JSON as return object) or local JSON files (will be supported later).

## Base functionality:

* Resolving variables from query string
	* Variable from query string overwrites variable with the same name, defined in page's source code
	* URL variables and variables from page's source code will be transferred to the server and used in a main configuration file (in section "requests" only), "widgets" configuration file and in stand alone widget html files.
* Server-side loading data from external source
* Mapping data to table layout (or other textual forms), processed on server or client
* Mapping data to graphic objects/dashboards, processed on server or client

## Project structure and workflow

Charter supports two working modes: server and client processing. The working mode can be global chosen in the config file. But it can be defined for each weadget its own strategy of processing using variable "chrt-processing-at"

### Client part (charter.js)

charter.js client script manages following processes on the client side (charter.js should be included in the header of HTML page)

<table>
	<tr>
		<th width="50%">In a case of client-side processing</th>
		<th>In a case of server-side processing</th>
	</tr>
	<tr>
		<td width="50%">
			<ol>
				<li>Requesting content and widgets configuration from server</li>
				<li>Processing content (exchange placeholders with values from variables, etc... )</li>
				<li>Integration of content with graphical APIs (eg. google charts) and creating HTML elements to render in browser, using widgets configuration from server (corresponding < div > element will be replaced with in charter generated content).</li>
		    </ol>
	    </td width="50%">
		<td>
			<ol>
				<li>Requesting "ready to use" HTML snippet or image from server</li>
				<li>Replacing < div > in current page with received data</li>
			</ol>
		</td>
	</tr>
</table>


### Server part (node.js)

Server operations for both working modes (server and client processing)

1. Mapping user requests to JSON / SQL queries based on syntax of particular REST API or DB Server
2. Data fetching from DB server/REST service
3. Processing of fetched data and convert it to JSON

If client processin has been chosen, the data will be then imideately sent to the client, otherwise server first builds ready-to-use weadgets and then send them to the client.

Server part will be written in JS and hosted on node.js server. The server is stateless and communication with a client is based on requests sending from client to server with payload. 

## Configuration

Configuraton files can be found on server in folder charterconfig and can't be requested from the client.

Format of these files: Hjson (https://hjson.org/)

### Main configuration file

```
{
    # where content should be fetched from
    DataSources 
    {
    	{
            # name of the source
            name: SQLServer1
            # type (at the moment two types are available: DB and API)
            type: DB
            # connection string (only for sources of DB type)
            connectionString: Server=myServerAddress;Database=myDataBase;User Id=myUsername;
Password=myPassword;
        }
       	{
            name: YahooAPI
            type: JsonAPI
        }
    }
    Requests
    {
    	{
            name: getAllCustomers
            # source name
            source: SQLServer1
            # request to data source. Placeholders %%a and %%b will substitued with values received from client.
            request: SELECT %%a FROM %%b+'bigTables'
        }
        {
            name: getSomeSearchResults
            source: YahooAPI
            request: http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=YahooDemo&query=%%a&results=10

        }

    }
    
    # possible values are 'server' or 'client'
    Processing: server
}
```

### Widgets
```
{
    widgets
    {
        {
            name: google-table-for-customers
            type: google-chart
            file: c:\path\google-table.html
        }
    }
    
}
```

## Sample HTML code of the google table widget

will be saved here: c:\path\google-table.html and accessed from configuration file "widgets"
**(TODO don't forget: loader.js can be loaded only once per page! Remove it from widget, it should depend from type propertie in widgets configuration file)**

```html
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }
    </script>
  </head>
  <body>
    <div id="table_div"></div>
  </body>
</html>
```

## Sample HTML code to insert into the page

```html
<div data-chrt-server="https://www.idealewebseite.de/charter/" data-chrt-params="{[ "request":"getAllCustomers", "widget":"google-table-for-customers", "var-chrt-variablea" : "*", "var-chrt-variableb" : "customers" ]}"> 
</div>
```

