$(document).ready(function($)
{
	$('#CheckBoxes').hide();
	
	$('#txtOutwardID').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 var BillID=$('#txtOutwardID').val();
			 $('#OutwardTable tbody').empty();
			 
			 Vintage_Getter(BillID);
			 
			 $('#DeleteBtn').text("Delete");
			 $('#OrderBtn').prop("disabled",true);
		 }		
	});	

	$('#txtQuantity').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtQuantity').val("");
			$('#txtQuantity').focus();
			return false;
		}
		else
		{
			return true;
		}
	});	
	
	$('#ChkAlgebra').change(function()
	{
		if($(this).is(":checked")) 
		{
			$('#CheckBoxes').hide();
			$('#ChkGrades').prop("disabled",true);
		}    		
		else
		{
			//$('#CheckBoxes').show();
			$('#ChkGrades').prop("disabled",false);
		}
	});

	$('#ChkGrades').change(function()
	{
		if($(this).is(":checked")) 
		{
			$('.ABC').prop("checked", true);
			$('#CheckBoxes').show();
			$('#ChkAlgebra').prop("disabled",true);
			
		}    		
		else
		{
			$('.ABC').prop("checked", false);
			$('#ChkAlgebra').prop("disabled",false);
			$('#CheckBoxes').hide();
		}
	});
	
	$('#txtOutwardID').prop("disabled",true);
	
	$("input:text").focus(function() 
	{ 
		$(this).select(); 
	});
	
	sessionStorage.setItem("SrNo","0");
	
	var HistoricDropDown={};
	var HistoricRow=[];
	var DArray=[];
	var Data;
	
	var Today=moment().format("DD/MM/YYYY hh:mm:ss");
	var Today=moment(Today,"DD/MM/YYYY hh:mm:ss").format("DD/MM/YYYY hh:mm:ss");
	$('#txtDate').val(Today);

	var Data,Code,ID,Rate;

	$(document).on('click', "#OutwardTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="OutwardTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);		
		grandTotalCalculate();
	});	
});

$(document).ready(function()
{
	$('#EntityList').change(function()
	{
		var Entity = $('#EntityList option:selected').val();
		
		//alert("Entity ID : " + Entity);
		
		$('#IndiList').empty();
		$('#IndiList').append("<option value='Select'>Select</option>");
		
		if(Entity==1)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==2)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==3)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");			
		else if(Entity==4)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");
		else if(Entity==5)
		Global_DD_Loader("Get-Individuals/"+ Entity +".htm","#IndiList");			
	});
	
	var Flag=true;		
	var ItemName,Quantity,Rate,Total,ID;
	
	$('#AddBtn').click(function()
	{
		var Type,Entity,Individual;
		
		Type=$('#TypeList option:selected').val();
		Entity=$('#EntityList option:selected').val();
		Individual=$('#IndiList option:selected').val();
		var Quantity=$('#txtQuantity').val();
		
		var BookName = "Vol: " + $('#VolumeList option:selected').val();
		
		var Grades=""; 
		var BookList=""; 
		
		var GradesChecked=$('#ChkGrades').prop("checked");
		var SomethingChecked=false;
		var AlgebraChecked=$('#ChkAlgebra').prop("checked");
		var i=1,Grade=0;
		
		if(GradesChecked)
		{
			$("#CheckBoxes input[type=checkbox]").each(function() 
			{
				  if($(this).is(':checked')) 
				  {
					 	SomethingChecked = true;
					 	Grade = $(this).val();
						Grades +=Grade + ",";					
						BookList += Grade + "@" + $('#VolumeList option:selected').val() + ",";
				  }
			});
			BookName += " : Grades:- " + Grades;
		}
		else if(AlgebraChecked)
		{
			BookName += " : Algebra";
			BookList += "-100" + "@" + $('#VolumeList option:selected').val() + ",";
		}
		
		if(Type=="Select" || Entity=="Select" || Individual=="Select" || !SomethingChecked && !AlgebraChecked || Quantity<0)
		{
			$('#Response').text("Please select correct data before adding item . . .!").css("text-align","center").css("color","red");
		}
		else
		{
			$('#Response').text("");
			 
			sessionStorage.setItem("BookName",BookName);
			var BookIDZ="";
			
			$.ajax(
		    {
				url:"Get-BooksIDZ/"+ BookList +".htm",
				type:"POST",
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{			
					var Raw = JSON.stringify(response)
					var Data = JSON.parse(Raw);

					BookIDZ = Data.extra;
					
			    	var AP={};
			    	AP[0]=sessionStorage.getItem("BookName");
			    	AP[1]=$('#txtQuantity').val();
			    	AP[2]=$('#txtAmount').val();
			    	AP[3]=BookIDZ;
			    	AP[4]="No"; /*  isReading Parameter */ 
			    	
			    	RowAppender(AP);
			    	
			    	grandTotalCalculate();
				},
				error:function(er)
				{
					console.log("Sales While :  " + er);
				}
		    });									
		}
	});
				
	$('#OrderBtn').click(function()
	{
		var Supplier=0,TableLength=0,GrandTotal=0;
		var Flag=true;
		
		Supplier=1;
		TableLength=$('#OutwardTable tbody').length;
		var OutwardID = $('#txtOutwardID').val();
		
		TypeList = $('#TypeList option:selected').val();
		EntityList = $('#EntityList option:selected').val();
		IndiList = $('#IndiList option:selected').val();
				
		if(OutwardID<=0 || TypeList=="Select" || EntityList=="Select" || IndiList=="Select" || TableLength<0)
		{
			$('#Response').text("Please enter valid information. . . !");
		}	
		else
		{
			var JSON_Data={};			
			var RCA_ROW=[];

			$("#OutwardTable tbody").find("tr").each(function() 
			{						
			    Details={}
			    			    			   
			    Details['outwardID']=parseInt($('#txtOutwardID').val());
			    Details['typeID']=$('#TypeList option:selected').val();
			    Details['entityID']=$('#EntityList option:selected').val();
			    Details['individualID']=$('#IndiList option:selected').val();
			     
			    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
			    Details['bookID'] = $(this).find('#divItemID').text();
			    Details['bookNames'] = $(this).find('#divItemName').text();
			    Details['quantity'] = $(this).find('#txtQty').val();
			    Details['discount'] = $('#divDiscount').val();
			    Details['amount'] = $(this).find('#divTotal').text();	
			    Details['grandTotal'] = $('#txtGrandTotal').val();
			    
			    RCA_ROW.push(Details);
			});			 
				        
		    JSON_Data['RCD']=RCA_ROW;			
					
		    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
		    
		    var Inward=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
			
			$.ajax(
		    {
				url:"Create-Outward.htm",
				type:"POST",
				data:Inward,
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{				
					if(response.extra=="Success")
					{
						$('#Response').css("display","block");
						$('#Response').empty();
						
						$('#Response').fadeIn(function()
						{
							$('#Response').empty();
							$('#Response').addClass("alert alert-success fade in");
							$('#Response').append("<strong>Order successfully saved . . . !</strong>").css("color","green");							
							$('#Response').fadeOut(5000);										
						});	
												
						$('#OutwardTable tbody').empty();
						$('#txtOutwardID').val(response.code);
						
						//window.location.reload(true);	
					}
					else if(response.extra=="Duplicate")
					{
						$('#Response').css("display","block");
						$('#Response').empty();
						
						$('#Response').fadeIn(function()
						{
							$('#Response').empty();
							$('#Response').addClass("alert alert-danger fade in");
							$('#Response').append("<strong>Enter outward id is already exist.</strong>").css("color","red");							
							$('#Response').fadeOut(5000);										 
						});	
						$('#TypeList').focus();
					}
					else if(response.extra=="Stock")
					{
						$('#Response').css("display","block");
						$('#Response').empty();
						
						$('#Response').fadeIn(function()
						{
							$('#Response').empty();
							$('#Response').addClass("alert alert-danger fade in");
							$('#Response').append("<strong>Sorry, The stock is not available.</strong>").css("color","red");							
							$('#Response').fadeOut(5000);										 
						});	
						$('#TypeList').focus();
					}

				},
				error:function(er)
				{
					console.log("Outward While :  " + er);
				}
		    });			
		}		
	});
	
	$('#DeleteBtn').click(function()
	{
		var Caption=$('#DeleteBtn').text();
		//alert("Caption : " + Caption);
		
		if(Caption=="Search")
		{
			$('#OrderbtnBtn').prop("disabled",true);
			$('#DeleteBtn').text("Delete");
			
			$('#txtOutwardID').prop("disabled",false);
			$('#txtOutwardID').focus();
			
			sessionStorage.setItem("ActionMode","Edit");			
		}
		else if(Caption=="Delete")
		{			
			var BillNo=$('#txtOutwardID').val();
			
			$.ajax(
			{
				url:"Delete-Outward/"+BillNo+".htm",
				type:"POST",
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  		
				success:function(response)
				{
					if(response.extra=="Success")
					{
						$('#Response').css("display","block");
						$('#Response').empty();
						
						$('#Response').fadeIn(function()
						{
							$('#Response').empty();
							$('#Response').addClass("alert alert-success fade in");
							$('#Response').append("<strong>Order successfully deleted . . . !</strong>").css("color","blue");							
							$('#Response').fadeOut(5000);									 
						});						
						
						$('#OutwoardTable tbody').empty();
						$('#TypeList').prop("disabled",false)
						$('#EntityList').val("Select").trigger("change");
						$('#IndiList').val("Select").trigger("change");
						$('#OrderBtn').prop("disabled",false);
						$('#DeleteBtn').text("Search");
						
						window.location.reload(true);						
					}
				},
				error:function(err)
				{
					console.log("Page_Counter.js : " + err);
				}
			});	
		}
	});
	
	/*
	$('#EditBtn').click(function()
	{
		var Caption=$('#EditBtn').val();
		//alert("Caption : " + Caption);
		
		if(Caption=="Modify")
		{
			$('#SaveBtn').prop("disabled",true);
			$('#EditBtn').val("Edit");
			
			$('#txtOutwardID').prop("disabled",false);
			$('#txtOutwardID').focus();
			
			sessionStorage.setItem("ActionMode","Edit");
			
		}
		else if(Caption=="Edit")
		{
			var Supplier=0,TableLength=0,GrandTotal=0;
			var Flag=true;
			
			Supplier=1;
			TableLength=$('#OutwardTable tbody').length;
			
			if(Supplier<=0 || TableLength<=0)
			{
				flag=false;
				$('#Response').css("display","block");
				$('#Response').empty();
				
				$('#Response').fadeIn(function()
				{
					$('#Response').empty();
					$('#Response').addClass("alert alert-danger fade in");
					$('#Response').append("<strong>Please enter valid information . . . !</strong>").css("color","red");							
					$('#Response').fadeOut(5000);									 
				});		
			}
			else
			{
				var JSON_Data={};
				
				var RCA_ROW=[];

				$("#OutwardTable tbody").find("tr").each(function() 
				{						
				    Details={}
				    			    			   
				    Details['outwardID']=parseInt($('#txtOutwardID').val());
				    Details['typeID']=$('#TypeList option:selected').val();
				    Details['entityID']=$('#EntityList option:selected').val();
				    Details['individualID']=$('#IndiList option:selected').val();
				     
				    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
				    Details['bookID'] = $(this).find('#divItemID').text();
				    Details['bookNames'] = $(this).find('#divItemName').text();
				    Details['quantity'] = $(this).find('#txtQty').val();
				    Details['discount'] = $('#divDiscount').val();
				    Details['amount'] = $(this).find('#divTotal').text();	
				    Details['grandTotal'] = $('#txtGrandTotal').val();
				    
				    RCA_ROW.push(Details);
				});			 
					        
			    JSON_Data['RCD']=RCA_ROW;			
						
			    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
			    
			    var Outward=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
				
				$.ajax(
			    {
					url:"Edit-Outward.htm",
					type:"POST",
					data:Outward,
					dataType:"json",		
					mimeType:"application/json",
					contentType:"application/json",  
					
					success:function(response)
					{				
						if(response.extra=="Success")
						{							
							$('#Response').css("display","block");
							$('#Response').empty();
							
							$('#Response').fadeIn(function()
							{
								$('#Response').empty();
								$('#Response').addClass("alert alert-success fade in");
								$('#Response').append("<strong>Order successfully updated . . . !</strong>").css("color","green");							
								$('#Response').fadeOut(5000);											 
							});								
							
							$('#OutwardTable tbody').empty();
							
							$('#SaveBtn').prop("disabled",false); 
							$('#txtOutwardID').val(0);  	 
							
							sessionStorage.setItem("ActionMode","New"); 
						}
					},
					error:function(er)
					{
						console.log("Outward While :  " + er);
					}
			    });			
			}					
			$('#EditBtn').val("Modify");
		}		
	});		
	*/
	
	$(document).on('click', "#OutwardTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="OutwardTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);		
	});
	
	$('#CancelBtn').click(function()
	{
		$('#txtOutwardID').val(0);
		$('#txtQuantity').val(0);
		$('#txtDiscount').val(0);
		$('#txtGrandTotal').val(0);
				
		$('#OutwardTable tbody').empty();
		$('#OrderBtn').prop("disabled",false);
		$('#txtOutwardID').prop("disabled",true);
		$('#DeleteBtn').text("Search");
		window.location.reload(true);
		
		sessionStorage.setItem("ActionMode","New");		
	});
});

function RowAppender(ArrayParameters)
{
	var Quantity,ID,isReading;
	var ItemName="";
	
	ItemName=ArrayParameters[0];
	Quantity=ArrayParameters[1];
	ID=ArrayParameters[2];
	isReading=ArrayParameters[3];
	
	var Grades= {},BookIDZ={};
	Grades=ItemName.split("-")[1].split(",");
	BookIDZ = ID.split(",");
	
	/*
	alert("Grades : " + Grades);
	alert("Total Grades : " + Grades.length);
	*/
	
	var GradeLength = Grades.length;
	
	if(GradeLength>1)
	{
		for(var i=0;i<GradeLength-1;i++)
		{
			var Individual_BookName = ItemName.split("-")[0] + "-" + Grades[i];
			var Individual_BookID = BookIDZ[i];
			
			BitMore(Individual_BookName,Quantity,Individual_BookID);
		}
	}
	else
	{
		BitMore(ItemName,Quantity,ID);
	}	
}

function BitMore(ItemName,Quantity,ID)
{
	var SrNo=0;	
	var Len= $("#InwardTable > tbody").children().length;

	if(Len<=0)
	sessionStorage.setItem("SrNo",0);	
		
	if(isNaN(parseInt(sessionStorage.getItem("SrNo")))) 	
	SrNo= 1;
	else
	SrNo=parseInt(sessionStorage.getItem("SrNo")) + 1;
	
	$('#InwardTable tbody').append
	(
		'<tr>'+	
			
			'<td class="Centered"><div id="divSrNo" class="Centered">'+ SrNo +'</div></td>' + 
			'<td class="Centered"><div id="divItemName">'+ ItemName +'</div></td>' + 
			
			'<td>' +				
			   '<div class="input-group spinner">'+
			   '<input type="text" class="form-control" value="'+ Quantity +'" id="txtQty" style="background: rgb(225,230,246);">'+
			  '</div>'+
				
			'</td>'+			
			'<td style="display:none;"><div id="divItemID" class="Centered">'+ ID +'</div></td>'+
			'<td style="margin:auto;"><button class="btn btn-danger" id="RemoveBtn">X</button></td>' 	+
			
		'</tr>'   
	);	
	
	sessionStorage.setItem("SrNo",SrNo);
}
function OpenInNewTab(URL)
{
  var win=window.open(URL, '_blank');
  win.focus();
}

function Vintage_Getter(OutwardID)
{	
	$.ajax(
	{
		url:'Getting-VintageOutward/'+ OutwardID +'.htm',
		dataType:"json",
		cache: false,
		contentType:'application/json; charset=utf-8', 
		mimeType:"application/json",
		type:'POST',
		
		success:function(response)
		{
			var Raw=JSON.stringify(response);
			//alert("Raw : " + Raw);
			
			var Obj=JSON.parse(Raw);
							
			if(Obj.one=="NonEmpty")
			{
				var Data_List={};				
				Data_List=Obj.list_Mini;
				var Limit=Data_List.length;
								
				var BillDate=Data_List[0].stringF5;
				
				var OutwardID=Data_List[0].field1;								
				
				$('#txtOutwardID').val(OutwardID);
				
				BillDate=moment(BillDate,"YYYY/MM/DD hh:mm:ss").format("DD/MM/YYYY hh:mm:ss");
				
				$('#txtDate').val(BillDate);
				
				$('#txtGrandTotal').val(Data_List[0].field2);
				$('#txtTypeID').val(Data_List[0].field3);
				$('#txtEntityID').val(Data_List[0].field4);
				$('#txtIndividualID').val(Data_List[0].field5);
				$('#txtDiscount').val(Data_List[0].field6);	
				
				$('[name=TypeList] option').filter(function() 
				{ 
					return ($(this).val() == Data_List[0].field3);
				}).prop('selected', true);
				  
				$('#TypeList').trigger('change');

				$('[name=EntityList] option').filter(function() 
				{ 
					return ($(this).val() == Data_List[0].field4);
				}).prop('selected', true);
				  
				$('#EntityList').trigger('change');
				
				
				$('#IndiList').fadeIn(function()
				{
					$('[name=IndiList] option').filter(function() 
					{ 
						return ($(this).val() == Data_List[0].field5);
					}).prop('selected', true);
					$(this).fadeOut(5000);
					
				});					

				$('#IndiList').fadeIn();
				$('#IndiList').trigger('change');				
				
				for(var i=0;i<Limit;i++)
				{
					var ArrayParameters={};
					
		        	ArrayParameters[0]=Data_List[i].stringF2;
		        	ArrayParameters[1]=Data_List[i].stringF3;
		        	ArrayParameters[2]=Data_List[i].stringF4;
		        	ArrayParameters[3]=Data_List[i].stringF1;
		        	ArrayParameters[4]="Yes";
		        	 
		        	RowAppender(ArrayParameters);		        	
				}				
				$('#Response').text("Bill Found . . . !");				
			}
			else
			{
				$('#Response').text("Bill not found . . . !").css("color","red"); 
			}
		},
		error:function(err)
		{
			console.log(err);
		}
	});
} 

function grandTotalCalculate()
{
	var SubTotal=0,SGST=0,CGST=0,IGST=0,Tax=0;
	var TaxSGST=0,TaxCGST=0,TaxIGST=0;
	var Temp=0;
	
	$("#OutwardTable tbody").find("tr").each(function() 
	{		
		$('#txtGrandTotal').val(0);
		
	    SubTotal = parseFloat($(this).find('#divTotal').text());	

	    Temp = parseInt(Temp) + parseInt(SubTotal);
	});
	
	$('#txtGrandTotal').val(Temp);
}