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
		url:"Get-Data.htm",
		mimeType:"application/json",
		contentType:"application/json",  
		
		success: function(response)
		{		
			var Raw=JSON.stringify(response);
			var Obj=JSON.parse(Raw);
			
			if(Obj.one=="NoneEmpty")
			{			
				var Data={};
				var Len=0;
				
				Data=Obj.list_Table;
				Len=Data.length;

				var From,To,PartyName,BillDate,EntryDate,GrandTotal=0,BillNo=0,InvoiceNo=0;
	
				Section=Obj.two;
				From=Obj.three;
				To=Obj.four;				

				From=moment(From).format("DD-MM-YYYY");
				To=moment(To).format("DD-MM-YYYY");
				
				$('#Section').text(Section);
				$('#Dating').text("From : " + From + " To : "+ To);
								
				var Index=1;
				
				$('#ListingsTable tbody').empty();
				
				for(var i=0;i<Len;i++)
				{
					BillDate=Data[i].a1;
					EntryDate=Data[i].a8;
					
					//console.log("BillDate  : " + Data[i].a1);
					//console.log("EntryDate : " + Data[i].a8);
					
					
					PartyName=Data[i].a6;
					GrandTotal=Data[i].a7;
					
					if(Section=="Sales")
					{
						BillNo=Data[i].a0;
						InvoiceNo=Data[i].a0;
					}
					else if(Section=="Purchase")
					{
						InvoiceNo=Data[i].a0;
						BillNo=Data[i].a9;						
					}

					$('#ListingsTable tbody').append
					(
						'<tr>'+
						
							'<td class="AS">'+ Index +'</td>'+
							
							'<td class="AS">'+ BillNo +'</td>'+
							'<td class="AS">'+ InvoiceNo +'</td>'+
							'<td class="AL">'+ PartyName +'</td>'+
							
							'<td class="AR">'+ GrandTotal +'</td>'+
							
							'<td class="AS">'+ BillDate +'</td>'+
							'<td class="AS">'+ EntryDate +'</td>'+

						'</tr>'					
					);
					Index++;
				}				
			}			
		},
		error: function (data, status, error) 
		{
			console.log("Error : From Page_Output.js - " + data + " Status : " + status + " -  Error : " + error);
		}
	});   			
}