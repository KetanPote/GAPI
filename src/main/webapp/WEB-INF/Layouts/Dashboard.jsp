<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="SForm" uri="http://www.springframework.org/tags/form" %>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<link 	href="<c:url value='CSS/bootstrap.min.css'/>" type="text/css" rel="stylesheet">
<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>
<script src="<c:url value="JS/bootstrap.min.js"/>" type="text/javascript" lang="javascript"></script>

<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>

<script>

$(document).ready(function()
{
	$('#ScrapBtn').click(function()
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
	});	
});

</script>

<style typel="text/css">

.SW
{
	color:white !important;
}

ul li ul li a
{
	color:black !important;
}
	
</style>

</head>

<body>
	
	<div class="navbar navbar-inverse navbar-static-top">
	
		<div class="container">
			
			<a href="Page_Home.htm" class="navbar-brand">Trainerize</a>
			
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-targer=".navHeaderCollapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button> 
						
			<div class="collapse navbar-collapse navHeaderCollapse Mine">

				<ul class="nav navbar-nav navbar-right">
					
					<li><a href="Page_Home.htm" class="">Home</a></li>
					<li><a href="#" class="" id="ScrapBtn">Scrape</a></li>  
												
				</ul>

			</div>
						
		</div>
		
	</div>

	<!-- Dynamic Contents. . .   --> 
 		<tiles:insertAttribute name="body" flush="true"></tiles:insertAttribute>
 	<!-- Dynamic Contents. . .  ! -->
 	
</body>

</html>