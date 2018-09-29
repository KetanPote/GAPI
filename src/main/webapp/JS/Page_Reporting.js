$(document).ready(function()
{
	$('#SectionList').change(function()
	{
		var Section=$('#SectionList option:selected').val();		
		$('#txtSection').val(Section);		
	});
	
	$('#EntityList').change(function()
	{
		var Entity = $('#EntityList option:selected').val();
		
		$('#IndiList').empty();
		$('#IndiList').append("<option value='Select'>Select</option>");
		
		if(Entity==1)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==2)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==3)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");			
		else if(Entity==4)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==5)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");			
	});	
	
	$('#GenerateBtn').click(function()
	{
		var Section=$('#txtSection').val();		
		SetData(Section);
	});
	
});
function OpenInNewTab(URL)
{
  var win=window.open(URL, '_blank');
  win.focus();
}
function SetData(Section)
{
	var Data={};
	
	Data['section']=$('#txtSection').val();
	Data['fromDate']=moment($('#txtFrom').val()).format("YYYY-MM-DD")+" 00:00:00";
	Data['toDate']=moment($('#txtTo').val()).format("YYYY-MM-DD") + " 23:59:59";
	
	var JSON_Data=JSON.stringify(Data);
	alert("Data Being Sent : To Report_Common.jsp : " + JSON_Data);
	
	sessionStorage.setItem("Section",Section);
	
    $.ajax(
	{
		url:"Set-Data.htm",
		type:"POST",
		data:JSON_Data,
		dataType:"json",		
		mimeType:"application/json",
		contentType:"application/json",  
		
		success:function(response)
		{				
			if(response.extra=="Success")
			{
				var Mode=sessionStorage.getItem("Section");
				//alert("Moding : " + Mode);
				
				if(Mode=="Taxation")
				OpenInNewTab("Report_Taxation.htm");	
				else if(Mode=="Payments")
				OpenInNewTab("Report_Payments.htm");
				else if(Mode=="Listings")
				OpenInNewTab("Listings_Bills.htm");
				else 					
				OpenInNewTab("Report_Sales.htm");	
			}
		},
		error:function(er)
		{
			console.log("While Prepairing Reports. :  " + er);
		}
	});
}