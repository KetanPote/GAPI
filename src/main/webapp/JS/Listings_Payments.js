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
	
	$(document).on('click', "#Page_Numbers_PaymentsTable ul li a", function() 
	{
		pageClicking($(this),"PaymentsTable","Get-Paginated-Payment");
	});		

	$(document).on('click', "#PaymentsTable tbody  #DeleteBtn", function()
	{
		var Params={};
		
		Params[0]=$(this);
		Params[1]="PaymentsTable";
		Params[2]="Response"
		Params[3]="Delete-Payment"; /* Without ID */

		deleteRowDatabase(Params);
		
		SubCoordinatorListings();
	});

	$(document).on('click', "#PaymentsTable tbody  #PayBtn", function()
	{
        var PaymentID=$(this).parent().next().text();
        var PersonID=$(this).parent().next().next().text();
                
        //alert("PaymentID : PersonID : " + PaymentID + "-"+ PersonID);
        
		$.ajax(
	    {
	    	url:"Pay-Payments/"+ PaymentID +"/"+ PersonID +"/External.htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  
			
			success:function(response)
			{				
				if(response.extra=="Success")
					$('#Response').text("Payment successfully made . . . !").css("color","green");
				else if(response.extra=="ME")
					$('#Response').text("You have not made any payment entry").css("color","red");
				else if(response.extra=="Paid")
					$('#Response').text("You have already paid this payment.").css("color","blue");
				
			},
			error:function(er)
			{
				console.log("Sales While :  " + er);
			}
	    });						
        
	});

	$('#SearchBtn').click(function()
	{
		SubCoordinatorListings();
	});
});

function SubCoordinatorListings()
{
	$('#PaymentsTable tbody').empty();
	
	var URL="Get-Paginated-Payment";

	var PaginationParams={};
	
	PaginationParams[0]="2";
	
	PaginationParams[1]="DeleteBtn";
	PaginationParams[2]="Delete";
	PaginationParams[3]="btn btn-danger";

	PaginationParams[4]="PayBtn";
	PaginationParams[5]="Pay";
	PaginationParams[6]="btn btn-success";

	PaginationParams[7]="Joint";
	
	var Data={};
	
	Data['userID']=sessionStorage.getItem("PersonID");
	Data['fromDate']=moment($('#txtFrom').val()).format("YYYY-MM-DD");
	Data['toDate']=moment($('#txtTo').val()).format("YYYY-MM-DD");
	Data['section']=$('#SectionList option:selected').text();
	
	var JSON_Data=JSON.stringify(Data);
	
	Ajax_PaginationRequestBody("PaymentsTable",1,URL,PaginationParams,JSON_Data);
}