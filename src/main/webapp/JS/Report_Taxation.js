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
		url:"Get-Taxation.htm",
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
			
			$('#SGST_Sales').text(Data[0]);
			$('#SGST_Purchase').text(Data[4]);
			//$('#SGST_Pay').text(Data[0]);
			
			$('#CGST_Sales').text(Data[1]);
			$('#CGST_Purchase').text(Data[5]);
			//$('#CGST_Pay').text(Data[0]);
			
			$('#IGST_Sales').text(Data[2]);
			$('#IGST_Purchase').text(Data[6]);
			//$('#IGST_Pay').text(Data[0]);
			
			$('#Total_Sales').text(Data[3]);
			$('#Total_Purchase').text(Data[7]);
			//$('#Total_Pay').text(Data[0]);
			
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