<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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

<title>

<tiles:insertAttribute name="title"></tiles:insertAttribute>

</title>

 <!-- Bootstrap Core CSS -->
 <link href="CSS/bootstrap.min.css" rel="stylesheet">

 <!-- Custom CSS -->
 <link href="CSS/sb-admin.css" rel="stylesheet">

 <!-- Morris Charts CSS -->
 <link href="CSS/plugins/morris.css" rel="stylesheet">

 <!-- Custom Fonts -->
 <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">


</head>

<body>

<tiles:insertAttribute name="body" flush="true"></tiles:insertAttribute> 

</body>

</html>