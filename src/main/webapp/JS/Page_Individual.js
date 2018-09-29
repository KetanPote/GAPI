$(document).ready(function()
{
	function validateEmail($email) 
	{
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}
	
	$('#txtPhone1').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtPhone1').val("");
			$('#txtPhone1').focus();
			return false;
		}
		else
		{
			return true;
		}
	});	

	$('#txtMobile').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtMobile').val("");
			$('#txtMobile').focus();
			return false;
		}
		else
		{
			return true;
		}
	});		
	$('#EditBtn').prop("disabled",true);
	$('#DeleteBtn').prop("disabled",true);
	
	SubCoordinatorIndividual();
	
	var DefaultButton;

	$('#CategoryList').change(function()
	{
		var EntityID = $('#CategoryList option:selected').val(); 
		$('#txtEntityID').val(EntityID);
	});
	
    $(document).bind('keypress', function(e) 
    {
        if(e.keyCode==13)
        {
        	$('#SaveBtn').trigger('click');
        }        
    });
    
	$('#SaveBtn').click(function()
	{
		var flag=true; 		

		var Name=$('#txtContactPerson').val();
		var Mobile=$('#txtMobile').val();
		var Phone=$('#txtPhone1').val();
		var Email1=$('#txtEmail1').val();
		var State=$('#txtState').val();
		var District=$('#txtDistrict').val();
		var City=$('#txtCity').val();
		var Entity = $('#txtEntityList option:selected').val();
		
		if(Mobile=="" || Phone=="")
		{
			$('#Response').css("display","block"); 
			$('#Response').empty(); 
			
			$('#Response').fadeIn(function() 
			{
				$('#Response').empty();
				$('#Response').addClass("alert alert-alert fade in");
				$('#Response').append("<strong>Enter valid contact information . . . ! </strong>").css("color","red");	 						
				$('#Response').fadeOut(5000);								
			});													
		}
		else if(!validateEmail(Email1))
		{
			$('#Response').css("display","block"); 
			$('#Response').empty(); 
			
			$('#Response').fadeIn(function() 
			{
				$('#Response').empty();
				$('#Response').addClass("alert alert-alert fade in");
				$('#Response').append("<strong>Enter valid email address . . . ! </strong>").css("color","red");	 						
				$('#Response').fadeOut(5000);								
			});									
		}		
		else if($.trim(Name)=="" ||State=="" || District=="" || City=="" || Entity=="")
		{			
			$('#Response').empty();
			$('#Response').append("<strong>Please enter valid information . . . ! </strong>");							
		}						
		else
		{
			var Params={};
			
			Params[0]="frmIndividual";
			Params[1]="Response";
			Params[2]="Name";
			Params[3]="Create-Individual.htm";
			
			ajaxSave(Params);
			
			$('#CancelBtn').trigger("click");
			$('#txtFirm').focus();
		}
	});
	
	$('#DeleteBtn').click(function()
	{
		$.ajax(
		{
			url:'Delete-Individual/'+ $('#txtIndividualID').val() +'.htm',
			dataType:"json",
			cache: false,
			contentType:'application/json; charset=utf-8', 
			type:'POST',						

			success:function(response)
			{
				ResponseDiv=sessionStorage.getItem("ResponseDiv"); 				
				$('#'+ResponseDiv).empty();				
				
				if(response.extra=="Success")
				{	
					SessionGetter();
					
					$('#'+ResponseDiv).fadeIn(function()
					{
						$('#'+ResponseDiv).addClass("alert alert-success fade in");
						$('#'+ResponseDiv).append("<strong>Success : </strong>Information deleted successfully . . . !");							
						$('#'+ResponseDiv).css("display","block");														
						$('#'+ResponseDiv).fadeOut(6000);
					});
					$('#SaveBtn').prop("disabled",false);
					$('#CancelBtn').click();
				}				
				else
				{
					$('#'+ResponseDiv).fadeIn(function()
					{
						$('#'+ResponseDiv).addClass("alert alert-danger fade in");
						$('#'+ResponseDiv).append("<strong>Error : </strong>Error deleting information . . . !")
						$('#'+ResponseDiv).css("display","block");							
						$('#'+ResponseDiv).fadeOut(6000);	
					});
					$('#SaveBtn').prop("disabled",true);
				}
				$('#'+ResponseDiv).empty();		
			},
			error:function(error)
			{
				console.log(" From Page_Feedback.jsp : " + error);
			}
		});		
	});
	
	$('#EditBtn').click(function()
	{
		var Name=$('#txtContactPerson').val();
		var Mobile=$('#txtMobile').val();
		var Email1=$('#txtEmail1').val();
		var State=$('#txtState').val();
		var District=$('#txtDistrict').val();
		var City=$('#txtCity').val();
		var Entity = $('#txtEntityList option:selected').val();
		var Phone=$('#txtPhone1').val();
		
		if(Mobile=="" || Phone=="")
		{
			$('#Response').css("display","block"); 
			$('#Response').empty(); 
			
			$('#Response').fadeIn(function() 
			{
				$('#Response').empty();
				$('#Response').addClass("alert alert-alert fade in");
				$('#Response').append("<strong>Enter valid contact information . . . ! </strong>").css("color","red");	 						
				$('#Response').fadeOut(5000);								
			});													
		}
		else if(!validateEmail(Email1))
		{
			$('#Response').css("display","block"); 
			$('#Response').empty(); 
			
			$('#Response').fadeIn(function() 
			{
				$('#Response').empty();
				$('#Response').addClass("alert alert-alert fade in");
				$('#Response').append("<strong>Enter valid email address . . . ! </strong>").css("color","red");	 						
				$('#Response').fadeOut(5000);								
			});									
		}		
		else if($.trim(Name)=="" || State=="" || District=="" || City=="" || Entity=="Select")
		{			
			$('#Response').empty();
			$('#Response').append("<strong>Please enter valid information . . . ! </strong>");							
		}						
		else
		{
		var Params={};
		
		Params[0]="frmIndividual";
		Params[1]="Response";
		Params[2]="*";
		Params[3]="Edit-Individual.htm";
		
		ajaxSave(Params);
		$('#CancelBtn').trigger("click");
		$('#SaveBtn').prop("disabled",false);
		
		}
	});
	 
	$(document).on('click', "#Page_Numbers_IndividualTable ul li a", function() 
	{
		pageClicking($(this),"IndividualTable","Get-Paginated-Individual");
	});		

	$(document).on('click', "#IndividualTable tbody  #RemoveBtn", function()
	{
		var Params={};
		
		Params[0]=$(this);
		Params[1]="IndividualTable";
		Params[2]="Response"
		Params[3]="Delete-Individual"; /* Without ID */

		deleteRowDatabase(Params);
		$('#txtFirm').focus();
	});
	
	$(document).on('click', "#IndividualTable tbody  td:not(:last-child)", function()
	{
        var position = $(this).parent().find('td');        
        
        $('#txtIndividualID').val($(position[7]).text());	
        
		$('#txtFirm').val($(position[1]).text());
		$('#txtContactPerson').val($(position[2]).text());
		$('#txtPhone1').val($(position[3]).text());
		$('#txtMobile').val($(position[4]).text());
		$('#txtEmail1').val($(position[5]).text()); 
		
		$('[name=CategoryList] option').filter(function() 
		{ 
			return ($(this).val() == $(position[8]).text());
		}).prop('selected', true);

		$.ajax(
		{
			url:"Get-Individual/"+$('#txtIndividualID').val()+".htm",
			dataType:"json",
			cache: false,
			contentType:"application/json; charset=utf-8",
			type:"POST",
			
			success:function(response)
			{
				//alert(response);
				
				var Raw=JSON.stringify(response);
				var Obj=JSON.parse(Raw);
				
				$('#txtEmail2').val(Obj.replica_Individual.email2); 
				$('#txtPan').val(Obj.replica_Individual.pan);  
				$('#txtGSTN').val(Obj.replica_Individual.gstn);  
				$('#txtAddress').val(Obj.replica_Individual.address);  
				$('#txtState').val(Obj.replica_Individual.state);  
				$('#txtDistrict').val(Obj.replica_Individual.district);  
				$('#txtCity').val(Obj.replica_Individual.city);  
				
				$('#SaveBtn').prop("disabled",true);
				$('#EditBtn').prop("disabled",false);
				$('#DeleteBtn').prop("disabled",false);

			},
			error:function(e)
			{
				console.log(e);
			}		
		});		
	});	
		
	$('#CancelBtn').click(function()
	{
		$('#frmIndividual').trigger("reset");
		$('#SaveBtn').prop("disabled",false);
		$('#EditBtn').prop("disabled",true);
		$('#DeleteBtn').prop("disabled",true);

	});
});

function SubCoordinatorIndividual()
{
	var URL="Get-Paginated-Individual";

	var PaginationParams={};
	
	PaginationParams[0]="1";
	
	PaginationParams[1]="RemoveBtn";
	PaginationParams[2]="Remove";
	PaginationParams[3]="btn btn-danger";
	
	PaginationParams[4]="Single";
	
	Ajax_PaginationLoader("IndividualTable",1,URL,PaginationParams);
}
