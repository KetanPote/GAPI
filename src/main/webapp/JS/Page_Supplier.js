$(document).ready(function()
{
	var DefaultButton;

    $(document).bind('keypress', function(e) 
    {
        if(e.keyCode==13)
        {
        	$('#SaveBtn').trigger('click');
        }        
    });
    
	SubCoordinatorSupplier();
	
	$('#CancelBtn').click(function()
	{
		
	});
	
	$('#SaveBtn').click(function()
	{
		var flag=true; 		
		var Firm=$('#txtFirm').val();
		var Supplier=$('#txtName').val();
		var Contact=$('#txtMobile').val();
		
		if($.trim(Firm)=="" || $.trim(Contact)=="")
		{			
			$('#Response').css("display","block");
			$('#Response').empty();
			
			$('#Response').fadeIn(function()
			{
				$('#Response').empty();
				$('#Response').addClass("alert alert-warning fade in");
				$('#Response').append("<strong>Please enter valid information . . . ! </strong>");							
				$('#Response').fadeOut(5000);		
				
			});
			flag=false;
		}						
		if(flag)
		{
			var Params={};
			
			Params[0]="frmSupplier";
			Params[1]="Response";
			Params[2]="Name";
			Params[3]="Create-Supplier.htm";
			
			ajaxSave(Params);
			
			$('#txtAddress').val("");
			$('#txtName').val("");
			$('#txtFirm').val("");
			$('#txtMobile').val("");
			$('#txtPAN').val("");
			$('#txtGSTIN').val("");
		}
	});

	$('#EditBtn').click(function()
	{
		var Params={};
		
		Params[0]="frmSupplier";
		Params[1]="Response";
		Params[2]="*";
		Params[3]="Edit-Supplier.htm";
		
		ajaxSave(Params);

	});
	
	$(document).on('click', "#Page_Numbers_SupplierTable ul li a", function() 
	{
		pageClicking($(this),"SupplierTable","Get-Paginated-Supplier");
	});		

	$(document).on('click', "#SupplierTable tbody  #RemoveBtn", function()
	{
		var Params={};
		
		Params[0]=$(this);
		Params[1]="SupplierTable";
		Params[2]="Response"
		Params[3]="Delete-Supplier"; /* Without ID */

		deleteRowDatabase(Params);
	});
	
	$(document).on('click', "#SupplierTable tbody  td:not(:last-child)", function()
	{
        var position = $(this).parent().find('td');
        $('#txtSupplierID').val($(position[5]).text());				
		$('#txtMobile').val($(position[2]).text());
		$('#txtFirm').val($(position[1]).text());
		
		$.ajax(
		{
			url:"Get-Supplier/"+$('#txtSupplierID').val()+".htm",
			dataType:"json",
			cache: false,
			contentType:"application/json; charset=utf-8",
			type:"POST",
			async: false,
			
			success:function(response)
			{
				var Raw=JSON.stringify(response);
				var Obj=JSON.parse(Raw);
				
				$('#txtPAN').val(Obj.one);
				$('#txtGSTIN').val(Obj.two);
				$('#txtAddress').val(Obj.three);
				$('#txtName').val(Obj.four);				
			},
			error:function(e)
			{
				console.log(e);
			}		
		});				
	});	
});

function SubCoordinatorSupplier()
{
	var URL="Get-Paginated-Supplier";

	var PaginationParams={};
	
	PaginationParams[0]="1";
	
	PaginationParams[1]="RemoveBtn";
	PaginationParams[2]="Remove";
	PaginationParams[3]="btn btn-danger";
	
	PaginationParams[4]="Single";
	
	Ajax_PaginationLoader("SupplierTable",1,URL,PaginationParams);
}
