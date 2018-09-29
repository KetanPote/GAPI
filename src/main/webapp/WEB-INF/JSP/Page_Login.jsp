<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="SForm" uri="http://www.springframework.org/tags/form" %>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Authentication Zone</title>

<link rel="stylesheet" type="text/css" href="<c:url value='CSS/bootstrap.min.css'/>">
<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>
<script src="<c:url value="JS/bootstrap.min.js"/>" type="text/javascript" lang="javascript"></script>
<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>

<style type="text/css">

#main
{
	margin-top:30px !important;
}

@media only screen and (max-width: 480px)
{
	#col4
	{
		max-width:100% !important;
	}
}
</style>


<script>

$(document).ready(function()
{
	$('#LoginBtn').click(function()
	{
		$.ajax
		({
			type:"POST",
			dataType:"json",
			url:"Page_Load.htm",
			mimeType:"application/json",
			contentType:"application/json",  
			
			success: function(response)
			{		
			},
			error: function (data, status, error) 
			{
				console.log("Error : From Login - " + data + " Status : " + status + " -  Error : " + error);
			}
		});                    		
		
	});	
});

</script>

  
</head>

<body style="background:#f5f5f5;">


<!-- Add where you want your sign-in button to render -->
<!-- Use an image that follows the branding guidelines in a real app -->
<button id="signinButton">Sign in with Google</button>

<section id="main">

<div class="container">

	<div class="col-md-4 col-md-offset-4" id="col4">
	
		<input type="button" name="LoginBtn" id="LoginBtn" value="Login" class="btn btn-success btn-block"/>
		
		<div class="modal-footer">	
			<div id="Response" style="text-align:center !important;" class="alert alert-success fade in">
			</div>		  
		</div>				

	</div>			
	
	</div>
	
</section>

</body>

</html>