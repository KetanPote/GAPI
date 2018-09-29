$(document).ready(function()
{
	$(document).on('click', "#UsersTable tbody  #DeleteUserBtn", function()
	{
		var UserID=$(this).parent().next().text();
		
		var count = $('#UsersTable tbody').children('tr').length;
		var flag=false;
		
		if(count<=1)
		{
			$('#Response_Users').empty();
			
			$('#Response_Users').fadeIn(function()
			{
				$('#Response_Users').addClass("alert alert-warning fade in");
				$('#Response_Users').append("<strong>Warning : </strong>You can not remove all users, \n Application needs at least one user to operate . . . !");							
				$('#Response_Users').css("display","block");														
				$('#Response_Users').fadeOut(6000);
			});
			flag=true;
		}
		else
		{
			$(this).parent().parent().remove();
			flag=false;
			
			$.ajax(
			{
				url:'Delete-User/'+ UserID +'.htm',
				dataType:"json",
				cache: false,
				contentType:'application/json; charset=utf-8', 
				type:'POST',						
		
				success:function(response)
				{
					$('#Response_Users').empty();				
					
					if(response.extra=="Success")
					{												
						$('#Response_Users').fadeIn(function()
						{
							$('#Response_Users').addClass("alert alert-success fade in");
							$('#Response_Users').append("<strong>Success : </strong>User deleted successfully . . . !");							
							$('#Response_Users').css("display","block");														
							$('#Response_Users').fadeOut(6000);
						});						
						Ajax_UsersLoader(1); 
					}				
					else
					{
						$('#Response_Users').fadeIn(function()
						{
							$('#Response_Users').addClass("alert alert-danger fade in");
							$('#Response_Users').append("<strong>Error : </strong>Error deleting user . . . !")
							$('#Response_Users').css("display","block");							
							$('#Response_Users').fadeOut(6000);	
						});
					}
					$('#Response_Users').empty();		
				},
				error:function(error)
				{
					console.log(" From Page_Feedback.jsp : " + error);
				}
			});
			
		}
	});
	
	$('#CreateUserBtn').click(function()
	{		
		var username,pass;
		var flag=true; 
		
		username=$('#txtUName').val();
		pass=$('#txtPass').val();
		
		if($.trim(username)=="" || $.trim(pass)=="")
		{			
			$('#Response_Users').css("display","block");
			$('#Response_Users').empty();
			
			$('#Response_Users').fadeIn(function()
			{
				$('#Response_Users').empty();
				$('#Response_Users').addClass("alert alert-warning fade in");
				$('#Response_Users').append("<strong>Please enter valid information . . . ! </strong>");							
				$('#Response_Users').fadeOut(5000);		
				
			});
			flag=false;
		}				
		
		if(flag)
		{
			var keyValue={};

			$("#frmMasterUsers :input").each(function()
			{
				keyValue[$(this).attr("name")]=$(this).val();			
			});
				
			$.ajax(
			{ 
				url:"Create-User.htm",
				data: JSON.stringify(keyValue), 
				dataType:"json",
				cache: false,
				contentType:"application/json; charset=utf-8",
				type:"POST",	
			
				success:function(response)
				{				
					$('#Response_Users').empty();				
					
					if(response.extra=="Success")
					{												
						$('#Response_Users').fadeIn(function()
						{
							$('#Response_Users').addClass("alert alert-success fade in");
							$('#Response_Users').append("<strong>Success : </strong>User Created Successfully . . . !");							
							$('#Response_Users').css("display","block");														
							$('#Response_Users').fadeOut(6000);
						});
						Ajax_UsersLoader(1); 
					}				
					else if(response.extra=="Duplicate")
					{
						$('#Response_Users').fadeIn(function()
						{
							$('#Response_Users').addClass("alert alert-danger fade in");
							$('#Response_Users').append("<strong>Error : </strong>Entered username already exist, try different . . . !")
							$('#Response_Users').css("display","block");							
							$('#Response_Users').fadeOut(6000);	
						});
					}
					else if(response.extra=="Failed")
					{
						$('#Response_Users').fadeIn(function()
						{
							$('#Response_Users').addClass("alert alert-danger fade in");
							$('#Response_Users').append("<strong>Error : </strong>Error while creating user . . . !")
							$('#Response_Users').css("display","block");							
							$('#Response_Users').fadeOut(6000);	
						});
					}
					
					$('#Response_Users').empty();
				},
				error: function (data, status, error) 
	            {
	            	console.log("From Page_Admin.jsp : " + data + " Status : " + status + " -  Error : " + error);
	            }
			});			
			
		}
		
	});
				
});

function Ajax_UsersLoader(PageIndex) 
{       
    $.ajax
    ({ 
        type:"POST",
        dataType:"json",
        url:"Get-Paginated_Users/" + PageIndex + ".htm",
        mimeType:"application/json",
        contentType:"application/json",  
        
        success: function(response)
        {   
        	var Raw_Data=JSON.stringify(response);
        	var obj=JSON.parse(Raw_Data);
        	    	      	
        	var Customer_List=[]; 
        	var NPages=0;            	
        	
        	Users_List=obj.list_Useraccounts;
        	           	
        	NPages=response.one;
        	$('#NPages_Users').val(NPages);

        	var index=0;           	
        	
        	var limit=Users_List.length;

        	var Table=$('#UsersTable').DataTable();
        	
        	Table.clear().draw();
        	
    		for(index=0;index<limit;index++)
			{
				Table.row.add
				([
					index+1,							
					Users_List[index].username,							
					Users_List[index].password,
					'<button type="button" class="glyphicon glyphicon-remove" id="DeleteUserBtn"></button>',
				  	'<div class="Hider">'+ Users_List[index].userid+'</div>',
				  	
				]).draw();
			}              		
    		
        	$("#UsersTable").find("tr td").each(function() 
			{
        		if($(this).find('.Hider').attr('class')=="Hider")
        		$(this).css('display','none');
			});          		

        		
    		$('.pagination').empty();
    		
    		$('.pagination').append('<li><a href="#" aria-label="Previous" id="Previous"><span aria-hidden="true">&laquo;</span></a></li>');
    		
    		for(index=1;index<=NPages;index++)
			{
    			$('.pagination').append('<li><a href="#" id="PN_'+ index +'">'+ index +'</a></li>');
			}
    		
    		$('.pagination').append('<li><a href="#" aria-label="Next" id="Next"><span aria-hidden="true">&raquo;</span></a></li>');
    		
    		$('.pagination').css("height:-6px;padding:5px 5px; margin-top:-25px");
        },
        
        error: function (e) 
        {
        	console.log("Error From Tab_Users.js : " + e);
        }            
    });			
}	