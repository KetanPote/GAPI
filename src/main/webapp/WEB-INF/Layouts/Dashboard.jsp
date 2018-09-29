<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


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
	
	<link 	href="<c:url value='CSS/Styling.css'/>" type="text/css" rel="stylesheet">
	<link 	href="<c:url value='CSS/style.css'/>" type="text/css" rel="stylesheet">
	
	<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>
	<script src="<c:url value="JS/bootstrap.min.js"/>" type="text/javascript" lang="javascript"></script>
	
	<script src="<c:url value="JS/jquery-1.11.3.js"/>" type="text/javascript" lang="javascript"></script>
	
	<script type="text/javascript">
	
	$(document).ready(function()
	{	
		$('#LogoutBtn').click(function()
		{
			$.ajax(
			{
				url:'Logout-User.htm',
				dataType:"json",
				cache: false,
				contentType:'application/json; charset=utf-8', 
				type:'POST',						
		
				success:function(response)
				{
					if(response.extra=="Success")
					window.location.href="Page_Login.htm";
				},
				error:function(error)
				{
					console.log("From Feedback : " + error);
				}
			}); 		
			
		});
	
		$('.Mine ul li').hover(function()
		{
			$(this).children('ul').stop(true,false,true).slideToggle('400');
		});
	});
	
	</script>

</head>

<body>
	

	<hr width="100%">
	<br><br>
	
	<!-- Dynamic Contents. . .   --> 
 	<tiles:insertAttribute name="body" flush="true"></tiles:insertAttribute>
 	<!-- Dynamic Contents. . .  ! --> 	
 	
 	<hr width="100%">
 	<!-- Footer Area -->
	
<div style="text-align: center;">

  <p class="footnote">Copyright &copy; 2018 <a href="Page_Home.htm">AcumenToday Pvt. Ltd. </a> All rights reserved </p>

</div>

</body>

</html>