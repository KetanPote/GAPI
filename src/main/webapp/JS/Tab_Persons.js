jQuery(document).ready(function($) 
{
	var DefaultButton; 
	
	$('#EntitiesList').change(function()
	{
		var EID = $('#EntitiesList option:selected').val();
		$('#txtEIDPerson').val(EID);
	});
	
    $(document).bind('keypress', function(e)   
    {
        if(e.keyCode==13)
        { 
        	$('#CreatePersonBtn').trigger('click');  
        }        
    });    
    
	SubCoordinatorPerson(); 
	
	$('#txtPerson').focus(); 

	$('#CreatePersonBtn').click(function()
	{
		var flag=true; 		
		var Person=$('#txtPerson').val();
		var PAN=$('#txtPAN').val();
		var Mobile=$('#txtMobile').val();
		var Email=$('#txtEmail').val();
		var Eid = $('#EntityList option:selected').val();
		
		if($.trim(Person)=="" || $.trim(PAN)=="" || $.trim(Email)=="" || Eid=="" || Eid=="Select")
		{			
			$('#PersonSres').css("display","block");
			$('#PersonResponse').empty();
			
			$('#PersonResponse').fadeIn(function()
			{
				$('#PersonResponse').empty();
				$('#PersonResponse').addClass("alert alert-warning fade in");
				$('#PersonResponse').append("<strong>Please enter valid information . . . ! </strong>");							
				$('#PersonResponse').fadeOut(5000);		
				
			});
			flag=false;
		}						
		if(flag)
		{
			var Params={};
			
			Params[0]="frmPersons";
			Params[1]="PersonResponse";
			Params[2]="Person";
			Params[3]="Create-Person.htm";
			
			ajaxSave(Params);	
			
			$('#txtPerson').val("");
			$('#txtPAN').va("");
			$('#txtEmail').va("");
			$('#txtAddress').va("");
			$('#txtMobile').va("");			
		}
	});

	$('#ModifyPersonBtn').click(function()
	{
		var Params={};
		
		Params[0]="frmPersons";
		Params[1]="PersonResponse";
		Params[2]="Person";
		Params[3]="Edit-Persons.htm";
		
		ajaxSave(Params);
	});
	
	$(document).on('click', "#Page_Numbers_PesronsTable ul li a", function() 
	{
		pageClicking($(this),"PesronsTable","Get-Paginated-Persons");
	});		

	$(document).on('click', "#PesronsTable tbody  #RemoveBtn", function()
	{
		var Params={};
		
		Params[0]=$(this);
		Params[1]="PesronsTable";
		Params[2]="PersonResponse"
		Params[3]="Delete-Person"; /* Without ID */

		deleteRowDatabase(Params);
	});
	
	$(document).on('click', "#PesronsTable tbody  td:not(:last-child)", function()
	{
        var position = $(this).parent().find('td');
        
        $('#txtPersonID').val($(position[8]).text());				
		
        $('#txtPerson').val($(position[1]).text());
		$('#txtMobile').val($(position[2]).text());
		$('#txtEmail').val($(position[3]).text());
		$('#txtPAN').val($(position[5]).text());
		$('#txtAddress').val($(position[6]).text());
		
		var EID = $(position[7]).text()
		$('#EntitiesList').val(EID).trigger("change");
		$("#txtEIDPerson").val(EID);
		
		$.ajax(
		{
			url:"Get-Person/"+$('#txtPersonID').val()+".htm",
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

function SubCoordinatorPerson()
{
	var URL="Get-Paginated-Person";

	var PaginationParams={};
	
	PaginationParams[0]="1";
	
	PaginationParams[1]="RemoveBtn";
	PaginationParams[2]="Remove";
	PaginationParams[3]="btn btn-danger";
	
	PaginationParams[4]="Single";
	
	Ajax_PaginationLoader("PesronsTable",1,URL,PaginationParams);
}