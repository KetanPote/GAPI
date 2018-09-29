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
				var Section=Obj.two;
				
				$('#ReportName').text(Section+" Report");
				$('#SPTable tboty').empty();
				
				var Data_List={};
				var Len=0;
				
				Data_List=Obj.list_Table;
				Len=Data_List.length;
				var TotalSGST=0,TotalCGST=0,TotalIGST=0,BillNo=0,TotalAmount=0;
				var index=1;
				
				for(var i=0;i<Len;i++)
				{
					$('#SPTable tbody').append
					(
						'<tr>'+ 
						
							'<td class="AS">'+ index +'</td>'+
							'<td class="AS">'+ Data_List[i].a0 +'</td>'+
							'<td class="AS">'+ Data_List[i].a1 +'</td>'+
							'<td class="AS">'+ Data_List[i].a2 +'</td>'+
							'<td class="AS">'+ Data_List[i].a3 +'</td>'+
							'<td class="AS">'+ Data_List[i].a4 +'</td>'+
							'<td class="AS">'+ Data_List[i].a5 +'</td>'+							
						'</tr>'
						
					);
					index++;
					TotalSGST=parseInt(TotalSGST) + parseInt(Data_List[i].a2);
					TotalCGST=parseInt(TotalCGST) + parseInt(Data_List[i].a3);
					TotalIGST=parseInt(TotalIGST) + parseInt(Data_List[i].a4);
					TotalAmount=parseInt(TotalAmount) + parseInt(Data_List[i].a5);
				}	
				
				$('#ColSGSTTotal').text(TotalSGST);
				$('#ColCGSTTotal').text(TotalCGST);
				$('#ColIGSTTotal').text(TotalIGST);
				$('#ColTotal').text(TotalAmount);
				
				var From,To;
				
				From=moment(Obj.three).format("DD-MM-YYYY");
				To=moment(Obj.four).format("DD-MM-YYYY");
				
				$('#Dating').text("From : " + From + " To : "+ To);
			}
			else
			{
				
			}
			
		},
		error: function (data, status, error) 
		{
			console.log("Error : From Page_Output.js - " + data + " Status : " + status + " -  Error : " + error);
		}
	});   			
}