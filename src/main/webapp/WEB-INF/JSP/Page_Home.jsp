<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="SForm" uri="http://www.springframework.org/tags/form" %>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Home Page</title>

<link 	href="<c:url value='CSS/bootstrap.min.css'/>" type="text/css" rel="stylesheet">
<link 	href="<c:url value='CSS/jquery-confirm.min.css'/>" type="text/css" rel="stylesheet">

<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>
<script src="<c:url value="JS/bootstrap.min.js"/>" type="text/javascript" lang="javascript"></script>

<script type="text/javascript">

$(document).ready(function()
{
	var Status = $('#HiddenGoogle').text();

	//alert("Being Work On Scrap . . . !");
	
	if(Status=="Success")
	{
		$.ajax
		({
			type:"POST",
			dataType:"json",
			url:"Page_ProductList.htm",
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
		
	}	
});

</script>

</head>

<body>

	<div id="HiddenGoogle" style="display:none;"> <%= request.getAttribute("GoogleStatus") %> </div>
		
 	<h2>
		<center>
			Welcome, The data scrapping section . . . ! 
		</center> 	
 	</h2>	
	
</body>

</html>