package com.lanihuang.simplewebapp.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.lanihuang.simplewebapp.beans.Product;
import com.lanihuang.simplewebapp.utils.DBUtils;
import com.lanihuang.simplewebapp.utils.MyUtils;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;

@Controller
public class AnotherController
{
	 private static final String APPLICATION_NAME = "QuickStart";
	 private static HttpTransport httpTransport;
	 private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	 private static Sheets sheet;

	 GoogleClientSecrets clientSecrets;
	 GoogleAuthorizationCodeFlow flow; 
	 Credential credential;

	 private final java.util.List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS);
	 
	 //private String clientId="938131041382-1ipm0ee7r3rp4hjl81m9grqh6ri5mspa.apps.googleusercontent.com";
	 //private String clientSecret="j0fedvM7dHbgru-pMr0JDA-t";

	 private String clientId="938131041382-jtjhvm46iamtjeigf49m2k61nfjrn0pb.apps.googleusercontent.com";
	 private String clientSecret="-_JPtLYK2ilBWcksFMKUCpRV";

	 //private String redirectURI="http://localhost:8045/GAPI/Page_Load.htm";
	 private String redirectURI="http://september26.herokuapp.com/Page_Load.htm";
	 
	 @RequestMapping(value="/Page_Home.htm")
	 public String pageHome(Model m)
	 {
		 return "Page_Home";
	 }
	 
	 @RequestMapping(value="/Page_Load.htm")
	 public RedirectView googleConnectionStatus(HttpServletRequest request) throws Exception 
	 {
		 return new RedirectView(authorize());
	 }

	 @RequestMapping(value="/Page_Load.htm", params="code" )
	 public String oauth2Callback(@RequestParam(value="code") String code, ModelAndView mv,HttpServletRequest request,RedirectAttributes RA,HttpServletResponse resp) 
	 {		 
		 HttpSession session=request.getSession();
		 
		 try 
		 {
			 TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectURI).execute();
			 credential=flow.createAndStoreCredential(response, "userID");
			 
			 sheet = new Sheets.Builder(httpTransport, JacksonFactory.getDefaultInstance(), credential).setApplicationName("QuickStart").build();
			
			 System.out.println("Code Received Succeded : " + code);
			 System.out.println("Applicaton Name From Sheet Object  : " + sheet.getApplicationName());
			 
			 session.setAttribute("Credential_Object", credential);
			 
			 System.out.println("Accesstoken  From Credential Object Before Redirection : " + credential.getAccessToken());
			 System.out.println("RefreshToken From Credential Object Object Before Redirection : " + credential.getRefreshToken());
			 
			 //resp.getWriter().write("Success");
			 
			 request.setAttribute("GoogleStatus", "Success");
			 			
		 } 
		 catch (Exception e) 
		 {
			 System.out.println("Exception while handling OAuth2 callback (" + e.getMessage() + ")."+ " Redirecting to google connection status page.");
		 }		 
					 
	 	return "Page_Load";
	 }

	 private String authorize() throws Exception 
	 {
		 AuthorizationCodeRequestUrl authorizationUrl; 

		 if(flow==null)
		 { 
			 Details web=new Details(); 
			 web.setClientId(clientId); 
			 web.setClientSecret(clientSecret); 
			 clientSecrets = new GoogleClientSecrets().setWeb(web); 
			 httpTransport = GoogleNetHttpTransport.newTrustedTransport(); 
			   		 
			 flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, clientSecrets,SCOPES).build(); 
		 }
		 
		 authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectURI); 
		 return authorizationUrl.build(); 
	 }
}