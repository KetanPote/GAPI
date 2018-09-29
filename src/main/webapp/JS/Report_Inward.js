$(document).ready(function()
{
	GetData();
});

function GetData()
{
	$.ajax
	({
		type:"POST",
		dataType:"json",
		url:"Get-Inwarded.htm",
		mimeType:"application/json",
		contentType:"application/json",  
		
		success: function(response)
		{		
			var Raw=JSON.stringify(response);
			var Obj=JSON.parse(Raw);
			
			//alert(JSON.stringify(Raw));
			
			var Data={};
			var Len=0;
			
			Data=Obj.list_Data;
			Len=Data.length;
			
			var From,To;
			
			var temp=Obj.code.split("|");
						
			From=temp[0];
			To=temp[1];
			
			//alert("Date To : " + To);
			
			From=moment(From).format("DD-MM-YYYY");
			To=moment(To).format("DD-MM-YYYY");
			
			$('#Dating').text("From : " + From + " To : "+ To);
			
		},
		error: function (data, status, error) 
		{
			console.log("Error : From Page_Output.js - " + data + " Status : " + status + " -  Error : " + error);
		}
	});   			
}