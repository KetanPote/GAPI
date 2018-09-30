package com.lanihuang.simplewebapp.controller;


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