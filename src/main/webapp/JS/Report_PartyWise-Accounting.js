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
		url:"Get-PartyWise-Accounting.htm",
		mimeType:"application/json",
		contentType:"application/json",  
		
		success: function(response)
		{		
			var Raw=JSON.stringify(response);
			var Obj=JSON.parse(Raw);
			
			//alert(JSON.stringify(Raw));
			
			var Data={};
			var Len=0;
			
			Data=Obj.list_Table;
			Len=Data.length;

			var From,To,PartyName,TotalBA=0,TotalPA=0,TotalDA=0,TotalSGST=0,TotalCGST=0,TotalIGST=0;

			PartyName=Obj.one;			
			TotalPA=Obj.two;
			TotalDA=Obj.three;
			TotalBA=Obj.four;
			From=Obj.five;
			To=Obj.six;
			
			TotalSGST=Obj.seven;
			TotalCGST=Obj.eight;
			TotalIGST=Obj.nine;
			
			From=moment(From).format("DD-MM-YYYY");
			To=moment(To).format("DD-MM-YYYY");
			
			$('#Dating').text("From : " + From + " To : "+ To);
			
			$('#PartyName').text("Party-Name :- " + PartyName);
			$('#TotalPA').text(TotalPA);
			$('#TotalBA').text(TotalBA);
			$('#TotalDA').text(TotalDA);
						
			var Index=1;
			
			$('#AccountingTable tbody').empty();
			
			for(var i=0;i<Len;i++)
			{
				
				$('#AccountingTable tbody').append
				(
					'<tr>'+
					
						'<td class="AS">'+ Index +'</td>'+
						
						'<td class="AS">'+ Data[i].a0 +'</td>'+
						'<td class="AS">'+ Data[i].a1 +'</td>'+
						'<td class="AR">'+ Data[i].a2 +'</td>'+
						
						'<td class="AR">'+ Data[i].a3 +'</td>'+
						'<td class="AR">'+ Data[i].a4 +'</td>'+
						'<td class="AS">'+ Data[i].a5 +'</td>'+
						'<td class="AS">'+ Data[i].a6 +'</td>'+
												
					'</tr>'
				
				);
				Index++;
			}
			
		},
		error: function (data, status, error) 
		{
			console.log("Error : From Page_Output.js - " + data + " Status : " + status + " -  Error : " + error);
		}
	});   			
}