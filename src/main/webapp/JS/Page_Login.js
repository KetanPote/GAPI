$(document).ready(function()
{
    $(document).bind('keypress', function(e) 
    {
        if(e.keyCode==13)
        {
        	$('#LoginBtn').trigger('click');        	
        }        
    });
    
	$('#Response').empty();
	$('#Response').css("display","none");
	
	$('#LoginBtn').click(function()
	{		
		var username,pass,flag=true;
		
		username=$('#txtUserName').val();
		pass=$('#txtPassword').val();
		
		if($.trim(username)=="" || $.trim(pass)=="")
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
			flag=false;
			var JSON_Data={};
			
			JSON_Data['username']=$('#txtUserName').val();
			JSON_Data['password']=$('#txtPassword').val();
			
			var LoginData=JSON.stringify(JSON_Data);
			
			$.ajax
			({
				type:"POST",
				dataType:"json",
				url:"User-Authentication.htm",
				data:LoginData,
				mimeType:"application/json",
				contentType:"application/json",  
				
				success: function(response)
				{		
					$('#Response').empty();				
					
					if(response.status)
					{												
						$('#Response').fadeIn(function()
						{
							$('#Response').addClass("alert alert-success fade in");
							$('#Response').append("<strong>Success : </strong>Login succeded . . . !");							
							$('#Response').css("display","block");														
							$('#Response').fadeOut(6000);								
						});		
						
						window.location.href="Page_Outward.htm";	
							
					}				
					else
					{
						$('#Response').fadeIn(function()
						{
							$('#Response').addClass("alert alert-danger fade in");
							$('#Response').append("<strong>Error : </strong>Invalid credentials . . . !")
							$('#Response').css("display","block");							
							$('#Response').fadeOut(6000);	
						});
					}
					$('#Response').empty();
				},
				error: function (data, status, error) 
				{
					console.log("Error : From Login - " + data + " Status : " + status + " -  Error : " + error);
				}
			});                    		
		}				
	});		
});