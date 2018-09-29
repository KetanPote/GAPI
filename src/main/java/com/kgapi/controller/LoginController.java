package com.kgapi.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.math.BigInteger;
import java.net.URL;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.kgapi.beans.AjaxBean;

@Controller 
public class LoginController 
{
	/*
	private AjaxBean ajaxBean=new AjaxBean();

	
    private final String APPLICATION_NAME = "QuickStart";
	private static final Collection<String> SCOPES = Arrays.asList("email", "profile");
	private static final JsonFactory JSON_FACTORY = new JacksonFactory();
	private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    private static final java.io.File DATA_STORE_DIR = new java.io.File(System.getProperty("user.home"), ".store/CreditData");
    private final String LAST_LETTER = "N";
    private String spreadsheetId = "1AcD4rnZtjmtk26JAsogg5pN-HzAGBkK4meLIvfWwy90";
    private final String CLIENT_SECRET_DIR = "/Alexander.json";
    private static FileDataStoreFactory dataStoreFactory;
    private static HttpTransport httpTransport;

	private GoogleAuthorizationCodeFlow flow;

	@RequestMapping(value="/Page_Login.htm")
	public String pageLogin(Model m,HttpServletRequest request,HttpServletResponse response)
	{
		return "Page_Login";
	}
	
	@RequestMapping(value="/GAPI-Scene.htm",  method= RequestMethod.POST)
	public @ResponseBody AjaxBean authenticate(Model m,HttpServletRequest request,HttpServletResponse response)throws FileNotFoundException,IOException
	{
		AjaxBean AB = new AjaxBean();

        dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

  	  	String path = request.getServletContext().getRealPath("/");  	  
  	  
  	  	InputStream in = LoginController.class.getResourceAsStream("/credential.json");
  	  	GoogleClientSecrets clientSecrets = GoogleClientSecrets.load( JSON_FACTORY,new InputStreamReader(in));    	
        
    	System.out.println(clientSecrets.getWeb().getRedirectUris().toString());
    	
		GoogleAuthorizationCodeFlow flow =
	            new GoogleAuthorizationCodeFlow.Builder(
	                    HTTP_TRANSPORT, JSON_FACTORY,clientSecrets, SCOPES)
	                    .setDataStoreFactory(dataStoreFactory)
	                    .setAccessType("offline")
	                    .build();
		
	    Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");

	    System.out.println(credential.getAccessToken()); 
	    
		return AB;	
	}
	
	@RequestMapping(value="/GAPICallback.htm",  method= RequestMethod.POST)
	public @ResponseBody AjaxBean gapiCallback(Model m,HttpServletRequest request,HttpServletResponse response)throws FileNotFoundException,IOException
	{
		AjaxBean AB = new AjaxBean();

        dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

  	  	String path = request.getServletContext().getRealPath("/");  	  
  	  
  	  	InputStream in = LoginController.class.getResourceAsStream("/credential.json");
  	  	GoogleClientSecrets clientSecrets = GoogleClientSecrets.load( JSON_FACTORY,new InputStreamReader(in));    	
        
    	System.out.println(clientSecrets.getWeb().getRedirectUris().toString());
    	
		GoogleAuthorizationCodeFlow flow =
	            new GoogleAuthorizationCodeFlow.Builder(
	                    HTTP_TRANSPORT, JSON_FACTORY,clientSecrets, SCOPES)
	                    .setDataStoreFactory(dataStoreFactory)
	                    .setAccessType("offline")
	                    .build();
		
	    Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");

	    System.out.println(credential.getAccessToken()); 
	    
		return AB;	
	}
	/*
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
	*/
}