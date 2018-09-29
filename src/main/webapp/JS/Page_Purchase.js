$(document).ready(function()
{
	$('#ItemList').dropdown({ fullTextSearch: true });
	
	Global_DD_Loader("Get-Items.htm","#ItemList");
	Global_DD_Loader("Get-Suppliers.htm","#SupplierList");	
});

$(document).ready(function($)
{
	//Uploader();
	
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

	$(document).on('click','#UpBtn',function()
	{
		$(this).parent().prev().val(parseInt($(this).parent().prev().val()) + 1);
		
		var Total=0;
		var Qty,Rate=0;
		
		Qty=parseInt($(this).parent().prev().val());
		Rate=parseInt($(this).parent().parent().parent().next().text());
		
		Total=parseInt(Qty * Rate);
		$(this).parent().parent().parent().next().next().find('#divTotal').text(Total);
		
		//alert("Rate * Qty = Total : " + Rate + "*" + Qty + "=" + Total);
		GrandTotalCalculate();
	});

	$('#NewBtn').click(function()
	{
		OpenInNewTab("Page_Masters.htm");
	});
	
	$(document).on('click','#DownBtn',function() 
	{
		$(this).parent().prev().val(parseInt($(this).parent().prev().val()) - 1);
		
		if($(this).parent().prev().val()<=0)
		$(this).parent().prev().val(1);
		
		var Total=0;
		var Qty,Rate;
		
		Qty=parseInt($(this).parent().prev().val());
		Rate=parseInt($(this).parent().parent().parent().next().text());
		
		Total=parseInt(Qty * Rate);
		$(this).parent().parent().parent().next().next().find('#divTotal').text(Total);
		
		GrandTotalCalculate();	
	});

	var Data,Code,ID,Rate;

	$('#ItemList').change(function()
	{
		var Source=$('#ItemList').find(":selected").val();
		var Data=Source.split("|");
				
		//alert(Data);
		
		var Name,ID=0,Quantity=0,HSN=0;
		
		if(Data=="Select")
		{
			$('#txtID').val("");
			$('#spanStock').text("Stock : " + 0).css("font-weight","bold");
			$('#spanHSN').text("HSN : " + 0).css("font-weight","bold");
			$('#txtName').val("");
		}
		else
		{
			ID=Data[0];
			Name=Data[1];
			Quantity=Data[2];
			HSN=Data[3];
			
			$('#txtID').val(ID);
			$('#spanStock').text("Stock : " + Quantity).css("font-weight","bold");
			$('#spanHSN').text("HSN     : " + HSN).css("font-weight","bold");
			$('#txtName').val(Name);
		}
		$('#txtQuantity').focus();
		//alert("Item Name : " + Name);
	});
			
	
	$('#SupplierList').change(function()
	{
		var SupplierID=$('#SupplierList option:selected').val();
		
		if(SupplierID!="Select" || SupplierID!="")
		{
			$('#txtSupplierID').val(SupplierID);
			
			var SessionMode=sessionStorage.getItem("ActionMode");
			
			if(SessionMode=="Edit")
			{
				 var InvoiceNo=$('#txtInvoiceNo').val();
				 $('#PurchaseTable tbody').empty();
				 Vintage_Getter(InvoiceNo,SupplierID);	
				 sessionStorage.setItem("ActionMode","New");
			}				
			
		}
	});
});

$(document).ready(function()
{
	//$('#txtInvoiceNo').prop("disabled",true);
	
	var Flag=true;
	
	var SrNo=0;	
	var Len= $("#PurchaseTable > tbody").children().length;
	
	var ItemName,Quantity,Rate,Total,ID;
		
	if(Len<=0)
	sessionStorage.setItem("SrNo",0);	
		
	if(isNaN(parseInt(sessionStorage.getItem("SrNo")))) 	
	SrNo= 1;
	else
	SrNo=parseInt(sessionStorage.getItem("SrNo")) + 1;
	
	$('#AddBtn').click(function()
	{
		//alert("Rate : " + $('#txtRate').val()) ;
		var Stock=$('#spanStock').text();
		//alert("Stock : " + Stock);
		StockStatus=true;
		var Tax,GST;
		var Supplier=parseInt($('#txtSupplierID').val());
		var SupplierName=$('#SupplierList option:selected').text();
		
		Tax=$('#TaxList option:selected').val();
		GST=$('#GSTList option:selected').val();
		
		if(Supplier=="" || Supplier<=0 || SupplierName=="" || SupplierName=="Select")
		{
			$('#Response').text("Please select Supplier Before adding item . . .!").css("text-align","center").css("color","red");
		}
		else if(Tax=="Select" || Tax=="" || GST=="" || GST=="Select")
		{
			$('#Response').text("Please select tax information. . .!").css("text-align","center").css("color","red");			
		}
		else if(parseInt(Stock)<=0)
		{
			StockStatus=false;
			$('#Response').text("Stock is not sufficient. . .!").css("text-align","center").css("color","red");
		}
		else if($('#txtRate').val()<=0)
		{
			$('#Response').text("Please enter valid information . . .!").css("text-align","center").css("color","red");
		}
		else if(StockStatus)
		{
			$('#Response').text("");
			
	    	var AP={};
	    	AP[0]=$('#txtName').val().replace("\'", '"');
	    	AP[1]=$('#txtID').val();
	    	AP[2]=$('#txtQuantity').val();
	    	AP[3]=$('#txtRate').val();
	    	AP[4]=0;
	    	AP[5]="No";
	    		    		    		    
	    	var GST=$('#GSTList option:selected').val();
	    	var Percent=parseInt($('#TaxList option:selected').val());
	    	var SGST=0,CGST=0,IGST=0;
	    	
	    	if(GST=="WithIGST")
	    	{
	    		SGST=0;
	    		CGST=0;
	    		IGST=Percent;
	    	}
	    	else if(GST=="WithoutIGST")
	    	{
	    		SGST=Percent / 2;
	    		CGST=Percent / 2;
	    		IGST=0;
	    	}
	    	
    		AP[6]=SGST;
	    	AP[7]=CGST
	    	AP[8]=IGST;	    	
	    	
	    	if($('#txtDiscount').val()=="")
	    	AP[9]=0;
	    	else
	    	AP[9]=$('#txtDiscount').val();
	    	
	    	RowAppender(AP);				    	
	    	
	    	$('#SupplierList').prop("disabled",true);
	    	$('#ItemList').focus();
	    	//$('#ItemList').simulate('mousedown');
		}
	});
				
	$('#SaveBtn').click(function()
	{
		var Supplier=0,TableLength=0,GrandTotal=0;
		var Flag=true;
		
		Supplier=$('#txtSupplierID').val();
		TableLength=$('#PurchaseTable tbody').length;
		GrandTotal=$('#txtGT').val();
		var InvoiceNo = $('#txtInvoiceNo').val();
		
		if(InvoiceNo<=0)
		{
			$('#Response').text("Please enter valid Invoice Number . . . !");
		}	
		else if(Supplier<=0 || TableLength<=0 || GrandTotal<=0)
		{
			flag=false;
			$('#Response').text("Please enter valid information . . . !");
		}
		else
		{
			var JSON_Data={};
			
			var RCA_ROW=[];

			$("#PurchaseTable tbody").find("tr").each(function() 
			{						
			    Details={}
			    			    			   
			    Details['purchaseID']=parseInt($('#txtPurchaseID').val());
			    Details['invoiceNo']=parseInt($('#txtInvoiceNo').val());
			    Details['supplierID']=parseInt($('#txtSupplierID').val());
			    Details['itemID']=parseInt($(this).find('#divItemID').text());			    
			    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
			    Details['rate']=parseFloat($(this).find('#divRate').text());
			    Details['total']=parseInt($(this).find('#divTotal').text());
			    Details['grandTotal']= parseInt($('#txtGT').val());
			    Details['discount']= parseInt($('#txtDiscount').val());	
			    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");

			    Details['sgst']= parseInt($(this).find('#divSGST').text());
			    Details['cgst']= parseInt($(this).find('#divCGST').text());
			    Details['igst']=parseInt($(this).find('#divIGST').text());			    
			    	
			    RCA_ROW.push(Details);
			});			 
				        
		    JSON_Data['RCD']=RCA_ROW;			
					
		    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
		    
		    var Contract=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
			
			$.ajax(
		    {
				url:"Create-Purchase.htm",
				type:"POST",
				data:Contract,
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{				
					if(response.extra=="Success")
					{
						$('#Response').text("Order successfully saved . . . !")	
												
						$('#PurchaseTable tbody').empty();
						$('#SupplierList').val("Select").trigger("change");
						$('#ItemList').val("Select").trigger("change");
						$('#TaxList').val("Select").trigger("change");
						$('#GSTList').val("Select").trigger("change");
						$('#txtGT').val(0);
						$("#txtDiscount").val(0);
						$('#SupplierList').prop("disabled",false);
						$('#txtInvoiceNo').val(0).focus();
						
						//Synchronizer();
						
						$('#ItemList').empty();
						$('#ItemList').append("<option value='Select'>Select</option>");
						Global_DD_Loader("Get-Items.htm","#ItemList");
					}
					else if(response.extra=="Duplicate")
					{
						$('#Response').text("Entered Invoice Number With Selected Supplier Already Exist . . . !");
						$('#txtInvoiceNo').focus();
					}
				},
				error:function(er)
				{
					console.log("Sales While :  " + er);
				}
		    });			
		}		
	});
	
	$('#DeleteBtn').click(function()
	{
		var BillNo=$('#txtPurchaseID').val();
		
		$.ajax(
		{
			url:"Delete-Purchase/"+BillNo+".htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  		
			success:function(response)
			{
				if(response.extra=="Success")
				{
					$('#Response').text("Order successfully deleted . . . !")
					
					$('#PurchaseTable tbody').empty();
					$('#SupplierList').prop("disabled",false)
					$('#SupplierList').val("Select").trigger("change");
					$('#ItemList').val("Select").trigger("change");
					$('#TaxList').val("Select").trigger("change");
					$('#GSTList').val("Select").trigger("change");
					$('#txtGT').val(0)
					
					$('#SaveBtn').prop("disabled",false);
					$('#txtPurchaseID').val(0);
					$('#txtInvoiceNo').val(0);	
					
					$('#ItemList').empty();
					$('#ItemList').append("<option value='Select'>Select</option>");
					Global_DD_Loader("Get-Items.htm","#ItemList");
					
					//Synchronizer();
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
		
		if(Caption=="Modify")
		{
			$('#SaveBtn').prop("disabled",true);
			$('#EditBtn').val("Edit");
			
			$('#txtInvoiceNo').prop("disabled",false);
			$('#txtInvoiceNo').focus();
			
			sessionStorage.setItem("ActionMode","Edit");
			
		}
		else if(Caption=="Edit")
		{
			var Supplier=0,TableLength=0,GrandTotal=0;
			var Flag=true;
			
			Supplier=$('#txtSupplierID').val();
			TableLength=$('#PurchaseTable tbody').length;
			GrandTotal=$('#txtGT').val();
			
			if(Supplier<=0 || TableLength<=0 || GrandTotal<=0)
			{
				flag=false;
				$('#Response').text("Please enter valid information . . . !");
			}
			else
			{
				var JSON_Data={};
				
				var RCA_ROW=[];

				$("#PurchaseTable tbody").find("tr").each(function() 
				{						
				    Details={}
				    			    			   
				    Details['purchaseID']=parseInt($('#txtPurchaseID').val());
				    Details['invoiceNo']=parseInt($('#txtInvoiceNo').val());
				    Details['supplierID']=parseInt($('#txtSupplierID').val());
				    Details['itemID']=parseInt($(this).find('#divItemID').text());			    
				    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
				    Details['rate']=parseFloat($(this).find('#divRate').text());
				    Details['total']=parseInt($(this).find('#divTotal').text());
				    Details['grandTotal']= parseInt($('#txtGT').val());		
				    Details['discount']= parseInt($('#txtDiscount').val());
				    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
				    
				    Details['sgst']= parseInt($(this).find('#divSGST').text());
				    Details['cgst']= parseInt($(this).find('#divCGST').text());
				    Details['igst']=parseInt($(this).find('#divIGST').text());
				    
				    RCA_ROW.push(Details);
				});			 
					        
			    JSON_Data['RCD']=RCA_ROW;			
						
			    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
			    
			    var Contract=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
				
				$.ajax(
			    {
					url:"Edit-Purchase.htm",
					type:"POST",
					data:Contract,
					dataType:"json",		
					mimeType:"application/json",
					contentType:"application/json",  
					
					success:function(response)
					{				
						if(response.extra=="Success")
						{
							$('#Response').text("Order successfully updated . . . !").css("color","green");
							
							$('#PurchaseTable tbody').empty();
							$('#SupplierList').prop("disabled",false)
							$('#SupplierList').val("Select").trigger("change");
							$('#ItemList').val("Select").trigger("change");
							$('#TaxList').val("Select").trigger("change");
							$('#GSTList').val("Select").trigger("change");
							$('#txtGT').val(0);
							$("#txtDiscount").val(0);
							
							$('#SaveBtn').prop("disabled",false);
							$('#txtPurchaseID').val(0);
							$('#txtInvoiceNo').val(0);	
							$('#SupplierList').focus();
							
							sessionStorage.setItem("ActionMode","New");
							
							$('#ItemList').empty();
							$('#ItemList').append("<option value='Select'>Select</option>");
							Global_DD_Loader("Get-Items.htm","#ItemList");
							
							//Synchronizer();
						}
					},
					error:function(er)
					{
						console.log("Sales While :  " + er);
					}
			    });			
			}					
			$('#EditBtn').val("Modify");
		}		
	});		
	
	$('#txtDiscount').focusout(function()
	{		
		GrandTotalCalculate();
	});
	
	$('#txtDiscount').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtDiscount').val("");
			$('#txtDiscount').focus();
			return false;
		}
		else
		{
			return true;
		}
	});	
	
	$('#txtQuantity').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 $('#txtRate').focus();
		 }		
	});
	
	$('#txtRate').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 $('#TaxList').focus();
		 }		
	});

	$('#TaxList').change(function()
	{
		$('#GSTList').focus();
	}); 	
	
	$('#TaxList').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 $('#GSTList').focus();
		 }		
	});	

	$('#GSTList').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 $('#AddBtn').trigger("click");
		 }		
	});	

	$(document).on('click', "#PurchaseTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="PurchaseTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);
		GrandTotalCalculate();	
		
	});
	
	$('#CancelBtn').click(function()
	{
		$('#txtPurchaseID').val(0);
		$('#txtInvoiceNo').val(0);
		$('#txtRate').val(0);
		$('#txtQuantity').val(0);
		$('#TaxList').val("Select").trigger("change");
		$('#GSTList').val("Select").trigger("change");
		$('#txtGT').val(0);		
		$('#SupplierList').prop("disabled",false);
		$('#SupplierList').val("Select").trigger("change");
		
		
		$('#EditBtn').val("Modify");
		$('#PurchaseTable tbody').empty();
		$('#SaveBtn').prop("disabled",false);
		$('#txtSalesID').prop("disabled",true);
		
		sessionStorage.setItem("ActionMode","New");
		
	});

});

function RowAppender(ArrayParameters)
{
	var Quantity,Rate,ID,Code,Total=0,Discount=0,isReading;
	var ItemName="";
	
	var SGST,CGST,IGST;
	
	var SrNo=0;	
	var Len= $("#PurchaseTable > tbody").children().length;

	if(Len<=0)
	sessionStorage.setItem("SrNo",0);	
		
	if(isNaN(parseInt(sessionStorage.getItem("SrNo")))) 	
	SrNo= 1;
	else
	SrNo=parseInt(sessionStorage.getItem("SrNo")) + 1;
	
	ItemName=ArrayParameters[0];
	ID=ArrayParameters[1];
	Quantity=ArrayParameters[2];
	Rate=parseFloat(ArrayParameters[3]);
	Total=ArrayParameters[4];
	isReading=ArrayParameters[5];
	
	SGST=parseFloat(ArrayParameters[6]);
	CGST=parseFloat(ArrayParameters[7]);
	IGST=parseFloat(ArrayParameters[8]);
	Discount=parseInt(ArrayParameters[9]);
	
	Total=parseFloat(parseInt(Quantity) * parseFloat(Rate));
	Total = parseFloat(Total) - parseInt(Discount);
	
	//alert("Item Name : " + ItemName);
	
	$('#PurchaseTable tbody').append
	(
		'<tr>'+	
			
			'<td class="Centered"><div id="divSrNo" class="Centered">'+ SrNo +'</div></td>' + 
			'<td class="Centered"><div id="divItemName">'+ ItemName +'</div></td>' + 
			
			'<td>' +				
			   '<div class="input-group spinner">'+
			   '<input type="text" class="form-control" value="'+ Quantity +'" id="txtQty" style="background: rgb(225,230,246);">'+
			   '<div class="input-group-btn-vertical">'+
			      '<button class="btn btn-default" type="button" id="UpBtn"><i class="fa fa-caret-up"></i></button>'+
			      '<button class="btn btn-default" type="button" id="DownBtn"><i class="fa fa-caret-down"></i></button>'+
			    '</div>'+
			  '</div>'+
				
			'</td>'+			
			
			'<td><div id="divRate" class="Centered">'+ Rate +'</div></td>' 							+
			'<td><div id="divTotal" class="Centered">'+ Total +'</div></td>' 						+
			'<td><div id="divDiscount" class="Centered">'+ Discount +'</div></td>'     +
			
			'<td style="display:none;"><div id="divItemID" class="Centered">'+ ID +'</div></td>'     +
			
			'<td style="display:none;"><div id="divSGST" class="Centered">'+ SGST +'</div></td>'     +
			'<td style="display:none;"><div id="divCGST" class="Centered">'+ CGST +'</div></td>'     +
			'<td style="display:none;"><div id="divIGST" class="Centered">'+ IGST +'</div></td>'     +
			
			'<td style="margin:auto;"><button class="btn btn-danger" id="RemoveBtn">X</button></td>' 	+
			
		'</tr>'   
	);	
	
	sessionStorage.setItem("SrNo",SrNo);
	GrandTotalCalculate();	
}

function OpenInNewTab(URL)
{
  var win=window.open(URL, '_blank');
  win.focus();
}

function GrandTotalCalculate()
{
	var GrandTotal=0;
	$('#txtGT').val(0);
	var SubTotal=0,SGST=0,CGST=0,IGST=0,Tax=0;
	var TaxSGST=0,TaxCGST=0,TaxIGST=0;
	var Temp=0;
	
	var Part_SGST=0,Part_CGST=0,Part_IGST=0;
	var Decimal=0;
	
	$("#PurchaseTable tbody").find("tr").each(function() 
	{			
	    SubTotal = parseFloat($(this).find('#divTotal').text());	
	    
	    SGST		=	parseFloat($(this).find('#divSGST').text());
	    CGST		=	parseFloat($(this).find('#divCGST').text());
	    IGST		=	parseFloat($(this).find('#divIGST').text());
	    	    	
	    Part_SGST	=	parseFloat(SubTotal) * parseFloat(SGST) / 100 ;
	    //Part_SGST	=	getRoundOff(Part_SGST.toFixed(2));	    
	    TaxSGST		=	parseFloat(TaxSGST) + Part_SGST;

	    Part_CGST	=	parseFloat(SubTotal) * parseFloat(CGST) / 100 ;
	    //Part_CGST	=	getRoundOff(Part_CGST.toFixed(2));	    
	    TaxCGST		=	parseFloat(TaxCGST) + Part_CGST;

	    Part_IGST	=	parseFloat(SubTotal) * parseFloat(IGST) / 100 ;
	    //Part_IGST	=	getRoundOff(Part_IGST.toFixed(2));	    
	    TaxIGST		=	parseFloat(TaxIGST) + Part_IGST;

	    Temp = Temp + SubTotal;
	});
	
	var abc=parseFloat(SGST) + parseFloat(CGST) + parseFloat(IGST);
	console.log("Single    : - " + SubTotal + "-" + (parseFloat(SubTotal) * parseFloat(abc) / 100 ));
	console.log("Addition  : - " + Temp + "-" + TaxIGST);
	//GrandTotal= Temp + Math.round(TaxSGST) + Math.round(TaxCGST) + Math.round(TaxIGST);
	
	GrandTotal= parseFloat(Temp + parseFloat(TaxSGST) + parseFloat(TaxCGST) + parseFloat(TaxIGST)).toFixed(2);
	
	var Parts=GrandTotal.split(".");
	var IntDecimal=parseInt(Parts[1]);
	
	if(IntDecimal >=50 )
	GrandTotal = Math.round(GrandTotal);
	else
	GrandTotal = Math.round(GrandTotal);
	
	$('#txtGT').val(parseFloat(GrandTotal));
}

function Vintage_Getter(InvoiceNo,SupplierID)
{	
	$.ajax(
	{
		url:'Getting-VintagePurchase/'+ InvoiceNo +'/'+ SupplierID +'.htm',
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
				
				var PurchaseID=Data_List[0].field1;
				var InvoiceNo=Data_List[0].field2;
				var ToPay=Data_List[0].field3;
								
				var Supplier=Data_List[0].stringF10;								
				
				$('#txtPurchaseID').val(PurchaseID);
				$('#txtInvoiceNo').val(InvoiceNo);
				
				BillDate=moment(BillDate,"YYYY/MM/DD hh:mm:ss").format("DD/MM/YYYY hh:mm:ss");
				
				$('#txtDate').val(BillDate);
				$('#txtGT').text(ToPay);
				
				$('#SupplierList').val(Supplier).trigger("change");
				$('#txtSupplierID').val(Supplier);								
				
				for(var i=0;i<Limit;i++)
				{
					var ArrayParameters={};
					
		        	ArrayParameters[0]=Data_List[i].stringF3;
		        	ArrayParameters[1]=Data_List[i].stringF2;
		        	ArrayParameters[2]=Data_List[i].stringF4;
		        	ArrayParameters[3]=Data_List[i].stringF5;
		        	ArrayParameters[4]=Data_List[i].stringF6;
		        	ArrayParameters[5]="Yes";
		        	ArrayParameters[6]=Data_List[i].stringF7;
		        	ArrayParameters[7]=Data_List[i].stringF8;
		        	ArrayParameters[8]=Data_List[i].stringF9;
		        	ArrayParameters[9]=Data_List[i].field4;
		        	
		        	RowAppender(ArrayParameters);		        	
				}				
				$('#Response').text("Bill Found . . . !");
				
				//$('#txtDiscount').val(Discount);
				GrandTotalCalculate();
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

function getRoundOff(Amount)
{
	Amount = parseFloat(Amount).toFixed(2);
	
	var Parts=Amount.split(".");
	var IntDecimal=parseInt(Parts[1]);
	
	if(IntDecimal >=50 )
	Amount 	= Math.round(Amount);
	else
	Amount	= Math.round(Amount);
	
	return Amount;

}

/*
function Synchronizer()
{
	$.ajax
	({
		type:"POST",
		dataType:"json",
		url:"Download/Both.htm",
		mimeType:"application/json",
		contentType:"application/json",
		success:function(response)
		{
			//if(response.extra=="Success" || response.extra=="Already-Downloaded")	
		},
		error:function(err)
		{
			console.log(err)
		}
		
	});
}

function Uploader()
{
	$.ajax(
	{
		url:'Upload/Stocks.htm',
		dataType:"json",
		cache: false,
		contentType:'application/json; charset=utf-8', 
		type:'POST',						

		success:function(response)
		{
			if(response.extra=="Success")
			alert("Database Successfully Synchronized . . . !");
			else if(response.extra=="Failed")
			alert("Database Synchronization Failed . . . !");
			else if(response.extra=="Already-Uploaded")
			alert("Database already synchronzied . . . !");
				
		},
		error:function(error)
		{
			console.log("From Feedback : " + error);
		}
	}); 
}
*/