jQuery(document).ready(function($)
{
	var DefaultButton;
	
    $(document).bind('keypress', function(e) 
    {
        if(e.keyCode==13)
        {
        	$('#SaveBtn').trigger('click');
        }        
    });    
    
    Global_DD_Loader("Get-States.htm","#StateList");
    
    $('#BankList').change(function()
    {
    	var Bank=$('#BankList option:selected').val();
    	$('#txtBank').val(Bank);
    	
    });
    
    $('#StateList').change(function()
    {
    	var Temp=$('#StateList option:selected').val().split("-");
    	var StateID=Temp[0];
    	var StateCode=Temp[1];
    	
    	$('#txtStateID').val(StateID);
    	
    });
    
	$('#SaveBtn').click(function()
	{
		var flag=true; 		
		var Name=$('#txtFirm').val();
		//var GSTIN,LandLine,SGST,CGST,IGST,Address,Bank,IFSC,Branch,AccNo;
		var Data=[];
		
		Data[0]=$('#txtGstin').val();
		Data[1]=$('#txtBank').val();
		Data[2]=$('#txtIFSC').val();
		Data[3]=$('#txtBranch').val();
		Data[4]=$('#txtAccNo').val();
		Data[5]=$('#txtAddress').val();
		Data[6]=$('#txtName').val();
		Data[7]=$('#txtStateID').val();
		
		for(var i=0;i<7;i++)
		{
			if(Data[i]=="" || Data[i]<=0)
			flag=false;
		}
		
		if(!flag)
		{
			$('#Response').text("Please enter valid information . . . !");
			flag=true;
		}
		else
		{
			var Params={};
			
			Params[0]="frmFirm";
			Params[1]="Response";
			Params[2]="Item";
			Params[3]="Create-Firm.htm";
			
			ajaxSave(Params);			
		}
	});

	$('#EditBtn').click(function()
	{		
		var flag=true; 		
		var Name=$('#txtFirm').val();
		//var GSTIN,LandLine,SGST,CGST,IGST,Address,Bank,IFSC,Branch,AccNo;
		var Data=[];
		
		Data[0]=$('#txtGstin').val();
		Data[1]=$('#txtBank').val();
		Data[2]=$('#txtIFSC').val();
		Data[3]=$('#txtBranch').val();
		Data[4]=$('#txtAccNo').val();
		Data[5]=$('#txtAddress').val();
		Data[6]=$('#txtName').val();
		Data[7]=$('#txtStateID').val();
		
		for(var i=0;i<8;i++)
		{
			if(Data[i]=="" || Data[i]<=0)
			flag=false;
		}
		
		if(!flag)
		{
			$('#Response').text("Please enter valid information . . . !");
		}
		else
		{
			var Params={};
			
			Params[0]="frmFirm";
			Params[1]="Response";
			Params[2]="Item";
			Params[3]="Edit-Firm.htm";
			
			ajaxSave(Params);			
		}
	});
});
