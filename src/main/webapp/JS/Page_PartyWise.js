$(document).ready(function()
{
	var Section="*",PersonID=0;
	
	$('#SectionList').change(function()
	{
		Section=$('#SectionList option:selected').val();
		sessionStorage.setItem("Section",Section);
		
    	$('#PartyList').empty();
    	$('#PartyList').append("<option value='Select'>Select</option>")
    	
    	if(Section=="Sales")
    	Global_DD_Loader("Get-Customers.htm",'#PartyList');
    	else if(Section=="Purchase")
    	Global_DD_Loader("Get-Suppliers.htm",'#PartyList');   		
	});
	
	$('#PartyList').change(function()
	{
		var temp;
		
		if(Section=="Sales")
		{
			temp=$('#PartyList option:selected').val().split("-");
			PersonID=temp[0];
		}
		else if(Section=="Purchase")
		{
			PersonID=$('#PartyList option:selected').val().split("-");			
		}
		
		
		sessionStorage.setItem("PersonID",PersonID);
						
	});	
	
	$('#PrintBtn').click(function()
	{
		var Section=$('#txtSection').val();		
		SetData("Detailed");
	});
	
	$('#AccountBtn').click(function()
	{
		SetData("Account");
	});
	
});
function OpenInNewTab(URL)
{
  var win=window.open(URL, '_blank');
  win.focus();
}
function SetData(Mode)
{
	var Data={};
	
	Data['section']=sessionStorage.getItem("Section");
	Data['userID']=sessionStorage.getItem("PersonID");
	Data['fromDate']=moment($('#txtFrom').val()).format("YYYY-MM-DD");
	Data['toDate']=moment($('#txtTo').val()).format("YYYY-MM-DD");
	
	var JSON_Data=JSON.stringify(Data);
	//alert("Data Being Sent : To Report_Common.jsp : " + JSON_Data);
	
	sessionStorage.setItem("Mode",Mode);
	
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
				var Mode=sessionStorage.getItem("Mode");
				if(Mode=="Detailed")
				OpenInNewTab("Report_PartyWise-Billing.htm");
				else if(Mode=="Account")
				OpenInNewTab("Report_PartyWise-Accounting.htm");					
			}
		},
		error:function(er)
		{
			console.log("While Managing Vintage Bill :  " + er);
		}
	});
}