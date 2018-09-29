$(document).ready(function($)
{
	 $('#OrderBtn').prop("disabled",false);
	 $('#EditBtn').prop("disabled",false);
	 $('#DeleteBtn').prop("disabled",true);
	 
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
	
	$('#txtInwardID').prop("disabled",true);
	
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

	$(document).on('click', "#InwardTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="InwardTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);		
	});	
});

$(document).ready(function()
{		
	var Flag=true;		
	var ItemName,Quantity,Rate,Total,ID;
	
	$('#AddBtn').click(function()
	{
		var Supplier=1;
		var SupplierName=$('#FromList option:selected').text();
		
		if(SupplierName=="Select")
		{
			$('#Response').text("Please select Supplier Before adding item . . .!").css("text-align","center").css("color","red");
		}
		else
		{
			$('#Response').text("");
			
			var BookName = "Vol: " + $('#VolumeList option:selected').val();
			
			var Grades="";
			var BookList="";
			Quantity = $('#txtQuantity').val();
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
				
				//alert("Algebra Checked : " + BookName);
			}
			
			if(!SomethingChecked && !AlgebraChecked || Quantity<=0)
			{
				$('#Response').text("Please select correct data before adding item . . .!").css("text-align","center").css("color","red");
			}
			else
			{
				sessionStorage.setItem("BookName",BookName);
				var BookIDZ="";
				
				//alert("BookList : " + BookList);
				
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
				    	AP[2]=BookIDZ;
				    	AP[3]="No"; 
				    	
				    	RowAppender_Inward(AP);				    		    	
						
					},
					error:function(er)
					{
						console.log("Inward While :  " + er);
					}
			    });	
			}			
		}
	});
				
	$('#OrderBtn').click(function()
	{
		var Supplier=0,TableLength=0,GrandTotal=0;
		var Flag=true;
		
		Supplier=1
		TableLength=$('#InwardTable tbody').length;
		var InvoiceNo = $('#txtInvoiceID').val();
		
		var TableData = $('#InwardTable tbody td').length;			
		
		//alert(TableData);
		
		if(TableData<=0)
		{
			$('#Response').text("Unable to save empty Inward . . . !");
		}
		else if(InvoiceNo<=0)
		{
			$('#Response').text("Please enter valid Invoice Number . . . !");
		}	
		else if(Supplier<=0 || TableLength<=0)
		{
			flag=false;
			$('#Response').text("Please enter valid information . . . !");
		}
		else
		{
			var JSON_Data={};			
			var RCA_ROW=[];

			$("#InwardTable tbody").find("tr").each(function() 
			{						
			    Details={}
			    			    			   
			    Details['inwardID']=parseInt($('#txtInwardID').val());
			    Details['invoiceNo']=parseInt($('#txtInvoiceID').val());
			    Details['supplierID']=1;			    
			    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
			    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
			    Details['bookID'] = $(this).find('#divItemID').text();
			    Details['bookNames'] = $(this).find('#divItemName').text();
			    
			    RCA_ROW.push(Details);
			});			 
				        
		    JSON_Data['RCD']=RCA_ROW;			
					
		   //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
		    
		    var Inward=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
			
			$.ajax(
		    {
				url:"Create-Inward.htm",
				type:"POST",
				data:Inward,
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{				
					//alert(response.extra);
					
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
												
						$('#InwardTable tbody').empty();
						$('#txtInvoiceID').val(0).focus();
						$('#txtInwardID').val(response.code);
						//window.location.reload(true);	
						
						 $('#OrderBtn').prop("disabled",false);
						 $('#EditBtn').prop("disabled",false);
						 $('#DeleteBtn').prop("disabled",true);
						
					}
					else if(response.extra=="Duplicate")
					{
						$('#Response').css("display","block");
						$('#Response').empty();
						
						$('#Response').fadeIn(function()
						{
							$('#Response').empty();
							$('#Response').addClass("alert alert-danger fade in");
							$('#Response').append("<strong>Enter invoice no is already exist.</strong>").css("color","red");							
							$('#Response').fadeOut(5000);		
								 
						});	
						$('#txtInvoiceID').focus();
						
						 $('#OrderBtn').prop("disabled",false);
						 $('#EditBtn').prop("disabled",false);
						 $('#DeleteBtn').prop("disabled",false);
						
					}
				},
				error:function(er)
				{
					console.log("Inward while :  " + er);
				}
		    });			
		}		
	});
	
	$('#DeleteBtn').click(function()
	{
		var BillNo=$('#txtInwardID').val();
		
		$.ajax(
		{
			url:"Delete-Inward/"+BillNo+".htm",
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
					
					$('#InwardTable tbody').empty();
					$('#SaveBtn').prop("disabled",false);
					$('#txtInwardID').val(extra.code);
					$('#txtInvoiceID').val(0);	
					
					$('#EditBtn').val("Search");
					$('#EditBtn').text("Search");
					
					$('#OrderBtn').prop("disabled",false);
					$('#EditBtn').prop("disabled",true);
					$('#DeleteBtn').prop("disabled",true);		
					$('#txtInvoiceID').prop("disabled",false);
					$('#txtInvoiceID').focus();
				}
			},
			error:function(err)
			{
				console.log("Page_Counter.js : " + err);
			}
		});		
	});
	
	$('#EditBtn').click(function()
	{
		var Caption=$('#EditBtn').val();
		//alert("Caption : " + Caption);
		$('#Response').text("*");
		
		if(Caption=="Search")
		{
			var SessionMode=sessionStorage.getItem("ActionMode");

			$('#Response').text("*");
			
			 var InvoiceNo=$('#txtInvoiceID').val();
			 $('#InwardTable tbody').empty();
			 Vintage_Getter_Inward(InvoiceNo);	
			 sessionStorage.setItem("ActionMode","New");
			 
			 $('#OrderBtn').prop("disabled",true);
			 $('#EditBtn').prop("disabled",false);
			 $('#DeleteBtn').prop("disabled",false);		
		}		
		else if(Caption=="Modify")
		{
			var Supplier=0,TableLength=0,GrandTotal=0;
			var Flag=true;
			
			Supplier=1;
			TableLength=$('#InwardTable tbody').length;
			
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

				$("#InwardTable tbody").find("tr").each(function() 
				{						
				    Details={}
				    			    			   
				    Details['inwardID']=parseInt($('#txtInwardID').val());
				    Details['invoiceNo']=parseInt($('#txtInvoiceID').val());
				    Details['supplierID']=1;
				    Details['bookID']=parseInt($(this).find('#divItemID').text());			    
				    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
				    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
				    Details['bookNames'] = $(this).find('#divItemName').text();
				    
				    RCA_ROW.push(Details);
				});			 
					        
			    JSON_Data['RCD']=RCA_ROW;			
						
			    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
			    
			    var Inward=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
				
				$.ajax(
			    {
					url:"Edit-Inward.htm",
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
								$('#Response').append("<strong>Order successfully updated . . . !</strong>").css("color","green");							
								$('#Response').fadeOut(5000);											 
							});								
							
							$('#InwardTable tbody').empty();
							$('#SupplierList').prop("disabled",false);
							$('#SupplierList').val("Select").trigger("change"); 
							
							$('#SaveBtn').prop("disabled",false); 
							$('#txtInwardID').val(0); 
							$('#txtInvoiceID').val(0); 	
							$('#SupplierList').focus(); 
							
							sessionStorage.setItem("ActionMode","New"); 
							
							 $('#OrderBtn').prop("disabled",false);
							 $('#EditBtn').prop("disabled",true);
							 $('#DeleteBtn').prop("disabled",true);
							 $('#txtInvoiceID').prop("disabled",false);
							 
							 $('#EditBtn').val("Search");
							 $('#EditBtn').text("Search");
							 $('#txtInvoiceID').prop("disabled",false);
						}
					},
					error:function(er)
					{
						console.log("Inward While :  " + er);
					}
			    });			
			}					
		}		
	});		
		
	$(document).on('click', "#InwardTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="InwardTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);		
	});
	
	$('#CancelBtn').click(function()
	{
		$('#txtInvoiceID').val(0);
		$('#txtQuantity').val(100);
				
		$('#EditBtn').val("Search");
		$('#EditBtn').text("Search");
		
		$('#InwardTable tbody').empty();
		$('#SaveBtn').prop("disabled",false);
		$('#txtInwardID').prop("disabled",true);
		
		 $('#OrderBtn').prop("disabled",false);
		 $('#EditBtn').prop("disabled",false);
		 $('#DeleteBtn').prop("disabled",true);

		sessionStorage.setItem("ActionMode","New");		
	});
});

function RowAppender_Inward(ArrayParameters)
{
	var Quantity,ID,isReading;
	var ItemName="";
	
	ItemName=ArrayParameters[0];
	Quantity=ArrayParameters[1];
	ID=ArrayParameters[2];
	isReading=ArrayParameters[3];
	//alert(ItemName.match(/Algebra/g));
	
	if(ItemName.match(/Algebra/g)!="Algebra")
	{
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

function Vintage_Getter_Inward(InvoiceNo)
{	
	$.ajax(
	{
		url:'Getting-VintageInward/'+ InvoiceNo +'.htm',
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
								
				var BillDate=Data_List[0].stringF1;
				
				var InwardID=Data_List[0].field1;
				var InvoiceNo=Data_List[0].field2;

				var Supplier=Data_List[0].stringF5;								
				
				$('#txtInwardID').val(InwardID);
				$('#txtInvoiceID').val(InvoiceNo);
				
				BillDate=moment(BillDate,"YYYY/MM/DD hh:mm:ss").format("DD/MM/YYYY hh:mm:ss");
				
				$('#txtDate').val(BillDate);
				
				$('#txtSupplierID').val(1);								
				
				$('#InwardTable tbody').empty();
				
				for(var i=0;i<Limit;i++)
				{
					var ArrayParameters={};
					
		        	ArrayParameters[0]=Data_List[i].stringF2;
		        	ArrayParameters[1]=Data_List[i].stringF3;
		        	ArrayParameters[2]=Data_List[i].stringF4;
		        	ArrayParameters[3]="Yes";
		        	
		        	RowAppender_Inward(ArrayParameters);		        	
				}				
				
				$('#Response').text("Bill Found . . . !");
				
				$('#EditBtn').val("Modify");
				$('#EditBtn').text("Modify");
				
				$('#OrderBtn').prop("disabled",true);
				$('#DeleteBtn').prop("disabled",false);
				$('#txtInvoiceID').prop("disabled",true);
			}
			else
			{
				$('#Response').text("Bill not found . . . !").css("color","red"); 
				$('#EditBtn').val("Search");
				$('#OrderBtn').prop("disabled",false);
				$('#DeleteBtn').prop("disabled",true);
			}
		},
		error:function(err)
		{
			console.log(err);
		}
	});		
} 