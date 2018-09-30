package com.lanihuang.simplewebapp.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.fasterxml.jackson.annotation.JsonValue;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.lanihuang.simplewebapp.beans.Product;
import com.lanihuang.simplewebapp.controller.Controlleri;
import com.lanihuang.simplewebapp.utils.DBUtils;
import com.lanihuang.simplewebapp.utils.MyUtils;
import com.lanihuang.simplewebapp.spreadSheet.SpreadSheetApi;

//@WebServlet(urlPatterns = { "/productList" })
@org.springframework.stereotype.Controller
public class ProductListServlet extends HttpServlet 
{
  private static final long serialVersionUID = 1L;
    
  public ProductListServlet() 
  {
    super();
  }
  
  @RequestMapping(value="/Page_ProductList.htm")
  public String pageHome(Model m,HttpServletRequest request, HttpServletResponse response)
  {	 
	  Credential credits=null;
	  HttpSession session = request.getSession();
	  
	  try
	  {
		  Controlleri controller = new Controlleri();
		  
		  String Out[]= new String[2];
		  
		  credits = (Credential)session.getAttribute("Credential_Object"); 		  
		 
		  System.out.println("Credential Object After Redirection Page_ProductList.htm : " + credits.getAccessToken());
		
		  ServletContext  SC=null;
		  controller.scrapWrite(SC,Out,credits);
		
		  Connection conn = MyUtils.getStoredConnection(request);

		  String errorString = null;
		  List<Product> list = null;
	    
	      list = DBUtils.queryProduct(conn);
	  }
	  catch(Exception E)
	  {
		  E.printStackTrace();
	  }
	  
	  return "Page_ProductList";
  }   
}