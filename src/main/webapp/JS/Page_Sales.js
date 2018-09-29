$(document).ready(function()
{
	Global_DD_Loader("Get-Entities.htm","#EntitiesList");	
});

$(document).ready(function($)
{
	$('#txtSalesID').prop("disabled",true);
	
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

	$(document).on('click', "#SalesTable tbody  #RemoveBtn", function()
	{
		var arrayParameters={};
		
		arrayParameters[0]=$(this);
		arrayParameters[1]="SalesTable";
		arrayParameters[2]="Response";
		
		deleteRowTable(arrayParameters);
		GrandTotalCalculate();	
		
	});
	
	$('#CustomerList').change(function()
	{
		var Temp=$('#CustomerList option:selected').val().split("-");
		
		var CustomerID=Temp[0];
		CustomerStateCode=Temp[1];
		
		$('#txtCustomerID').val(CustomerID);
		$('#txtCustomerStateCode').val(CustomerStateCode); 
	});	 
});

$(document).ready(function()
{
	var Flag=true;
		
	var ItemName,Quantity,Rate,Total,ID;
	
	$('#AddBtn').click(function()
	{
		//alert("Rate : " + $('#txtRate').val()) ;
		var Stock=parseInt($('#DivStock').text());
		//alert("Stock : " + Stock);
		StockStatus=true;
		var Tax,GST;
		var Customer;
		var CustomerStateCode=0;
		
		//alert("Stock : " + Stock);
		
		Customer=$('#txtCustomerID').val();
		CustomerStateCode=parseInt($('#txtCustomerStateCode').val());
		
		Tax=$('#TaxList option:selected').val();
		GST=$('#GSTList option:selected').val();
				
		if(Customer=="" || CustomerStateCode=="")
		{
			$('#Response').text("Please select customer before adding item. . .!").css("text-align","center").css("color","red");
		}
		else if(Tax=="Select" || Tax=="" || GST=="" || GST=="Select")
		{
			$('#Response').text("Please select tax information. . .!").css("text-align","center").css("color","red");			
		}
		else if(Stock<=0)
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
	    	
	    	AP[0]=$('#txtName').val();
	    	AP[1]=$('#txtID').val();
	    	AP[2]=$('#txtQuantity').val();
	    	AP[3]=$('#txtRate').val();
	    	AP[4]=0;
	    	AP[5]="No";
	    	
	    	var GST=$('#GSTList option:selected').val();
	    	var Percent=parseInt($('#TaxList option:selected').val());
	    	var SGST=0,CGST=0,IGST=0;
	    	
	    	if(CustomerStateCode!=27)
	    	GST="WithIGST";
	    	
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
	    	
	    	$('#EntitiesList').prop("disabled",true);
			$('#spanStock').text("Stock : " + 0).css("font-weight","bold");
			$('#DivStock').text(0);
			$('#spanHSN').text("HSN     : " + 0).css("font-weight","bold");
			
			$('#txtDiscount').val(0);

		}
	});
	
	$('#SaveBtn').click(function()
	{
		var Supplier=0,TableLength=0,GrandTotal=0;
		var Flag=true;
		
		Supplier=$('#txtCustomerID').val();
		TableLength=$('#SalesTable tbody').length;
		GrandTotal=$('#txtGT').val();
		
		if(Supplier<=0 || TableLength<=0 || GrandTotal<=0)
		{
			flag=false;
			$('#Response').text("Please enter valid information . . . !");
		}
		else
		{
			$("#WIP").show();
			
			var JSON_Data={};
			
			var RCA_ROW=[];

			$("#SalesTable tbody").find("tr").each(function() 
			{						
			    Details={}
			    			    			   
			    Details['salesID']=parseInt($('#txtSalesID').val());
			    Details['customerID']=parseInt($('#txtCustomerID').val());
			    Details['itemID']=parseInt($(this).find('#divItemID').text());			    
			    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
			    Details['rate']=parseFloat($(this).find('#divRate').text());
			    Details['total']=parseInt($(this).find('#divTotal').text());
			    Details['discount']= parseInt($('#txtDiscount').val());
			    Details['grandTotal']= parseInt($('#txtGT').val());		
			    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
			    
			    /* Details Getting From Modal Dialogue*/
			    
			    Details['pONo']= $('#txtPONo').val();	
			    Details['pODate']= $('#txtPODate').val();	
			    Details['challanNo']= $('#txtChallanNo').val();	
			    Details['challanDate']= $('#txtChallanDate').val();	
			    Details['vehicleNo']= $('#txtVehicleNo').val();	
			    Details['transportMode']= $('#txtTransportMode').val();
			    Details['supplyDate']= $('#txtSupplyDate').val();	
			    Details['supplyPlace']= $('#txtSupplyPlace').val();	
			    Details['contactNo']= $('#txtContact').val();	
			    Details['termDays']= parseInt($('#txtTermDays').val());	
			    
			    /* Details Getting From Modal Dialogue */
			    
			    Details['transporterID']= $('#txtTransporterID').val(); 
			    //Details['charges']= parseInt($('#txtCharges').val());
			    Details['sgst']= parseFloat($(this).find('#divSGST').text());
			    Details['cgst']= parseFloat($(this).find('#divCGST').text());
			    Details['igst']=parseFloat($(this).find('#divIGST').text());
			    			    
			    RCA_ROW.push(Details);
			});			 
				        
		    JSON_Data['RCD']=RCA_ROW;			
					
		    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
		    
		    var Contract=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
			
			$.ajax(
		    {
				url:"Create-Sales.htm",
				type:"POST",
				data:Contract,
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{				
					if(response.extra=="Success")
					{
						$('#Response').text("Order successfully saved . . . !");						
						$('#CancelBtn').trigger("click");
						
						$('#txtSalesID').val(response.code);
						$('#ItemList').empty();
						$('#ItemList').append("<option value='Select'>Select</option>");
						Global_DD_Loader("Get-Books.htm","#ItemList");
						
						$("#WIP").hide();
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
		var BillNo=$('#txtSalesID').val();
		
		$("#WIP").show();
		
		$.ajax(
		{
			url:"Delete-Sales/"+BillNo+".htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  		
			success:function(response)
			{
				if(response.extra=="Success")
				{
					$('#Response').text("Order successfully deleted . . . !");
					
					$('#CustomerList').prop("disabled",false);
					$('#txtCustomerID').val("");
					$('#txtCustomerStateCode').val("");
					
					$('#SalesTable tbody').empty();
					
					$("#txtGT").val(0);
					$("#txtDiscount").val(0);
					$('#TransporterList').val("Select").trigger("change");
					$("#txtChargeName").val("");
					
					$("#txtCharges").val(0);
					$("#txtSalesID").val(0);
					$('#txtSalesID').prop("disabled",true);
					$('#SaveBtn').prop("disabled",false);	
					
					Global_DD_Loader("Get-Items.htm","#ItemList");
					
					$("#WIP").hide();
				}
			},
			error:function(err)
			{
				console.log("Page_Counter.js : " + err);
			}
		});		
	});
	
	$('#MailBtn').click(function()
	{
		$("#WIP").show();
		
		$.ajax(
		{
			url:"Send-Mail.htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  		
			success:function(response)
			{
				if(resposne.extra=="Success")
				{
					$('#Resposne').text("E-Mail sent successfully . . . !");
					$("#WIP").hide();
				}
				else
				{
					$('#Resposne').text("Error while sending email. . . !");
				}
			},
			error:function(err)
			{
				console.log("Page_Sales.js : " + err);
			}
		});				
	});
	
	$('#CopyList').change(function()
	{	
		var CopyName=$('#CopyList option:selected').text();
		
		if(CopyName!="Select")
		{
			if(CopyName=="Original")
			{
				sessionStorage.setItem("CopyName","Original For Recepient");
				OpenInNewTab("Page_Report.htm");
			}
			else if(CopyName=="Duplicate")
			{
				sessionStorage.setItem("CopyName","Original For Recepient");
				OpenInNewTab("Page_Report.htm");
				sessionStorage.setItem("CopyName","Duplicate For Transporter");
				OpenInNewTab("Page_Report.htm");			
			}
			else if(CopyName=="Triplicate")
			{
				sessionStorage.setItem("CopyName","Original For Recepient");
				OpenInNewTab("Page_Report.htm");
				sessionStorage.setItem("CopyName","Duplicate For Transporter");
				OpenInNewTab("Page_Report.htm");			
				sessionStorage.setItem("CopyName","Triplicate For Supplier");
				OpenInNewTab("Page_Report.htm");			
			}
		}
	});
		
	$('#EditBtn').click(function()
	{
		var Caption=$('#EditBtn').val();
		//alert("Caption : " + Caption);
		
		if(Caption=="Modify")
		{
			$('#SaveBtn').prop("disabled",true);
						
			
			$('#EditBtn').val("Edit");
			
			//alert("Modify");
			
			$('#txtSalesID').prop("disabled",false);
			$('#txtSalesID').focus();
			
			sessionStorage.setItem("Original_SalesID",$('#txtSalesID').val());
			
		}
		else if(Caption=="Edit")
		{
			$("#WIP").show();
			
			var Supplier=0,TableLength=0,GrandTotal=0;
			var Flag=true;
			
			Supplier=$('#txtSupplierID').val();
			TableLength=$('#SalesTable tbody').length;
			GrandTotal=$('#txtGT').val();
			
			if(Supplier<=0 || TableLength<=0 || GrandTotal<=0)
			{
				flag=false;
				$('#Response').text("Please enter valid information . . . !");
				
				$('#CustomerList').prop("disabled",false);
				$('#txtCustomerID').val("");
				$('#txtCustomerStateCode').val("");
				
				$('#SalesTable tbody').empty();
				
				$("#txtGT").val(0);				
				//$('#txtSalesID').prop("disabled",true);
				//$('#SaveBtn').prop("disabled",false);				
			}
			else
			{
				var JSON_Data={};
				
				var RCA_ROW=[];

				$("#SalesTable tbody").find("tr").each(function() 
				{						
				    Details={}
				    			    			   
				    Details['salesID']=parseInt($('#txtSalesID').val());
				    Details['customerID']=parseInt($('#txtCustomerID').val());
				    Details['itemID']=parseInt($(this).find('#divItemID').text());			    
				    Details['quantity']=parseInt($(this).find('#txtQty').val()); 
				    Details['rate']=parseFloat($(this).find('#divRate').text());
				    Details['total']=parseInt($(this).find('#divTotal').text());
				    Details['grandTotal']= parseInt($('#txtGT').val());	
				    Details['discount']= parseInt($('#txtDiscount').val());
				    Details['dateTime']=moment($('#txtDate').val(),"DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
				    			
				    Details['pONo']= $('#txtPONo').val();	
				    Details['pODate']= $('#txtPODate').val();	
				    Details['challanNo']= $('#txtChallanNo').val();	
				    Details['challanDate']= $('#txtChallanDate').val();	
				    Details['vehicleNo']= $('#txtVehicleNo').val();	
				    Details['transportMode']= $('#txtTransportMode').val();
				    Details['supplyDate']= $('#txtSupplyDate').val();	
				    Details['supplyPlace']= $('#txtSupplyPlace').val();	
				    Details['contactNo']= $('#txtContact').val();	
				    Details['termDays']= parseInt($('#txtTermDays').val());	
				    
				    Details['transporterID']= $('#txtTransporterID').val();
				    Details['charges']= parseInt($('#txtCharges').val());
				    Details['sgst']= parseFloat($(this).find('#divSGST').text());
				    Details['cgst']= parseFloat($(this).find('#divCGST').text());
				    Details['igst']=parseFloat($(this).find('#divIGST').text());
				    
				    RCA_ROW.push(Details);
				});			 
					        
			    JSON_Data['RCD']=RCA_ROW;			
						
			    //alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
			    
			    var Contract=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
				
				$.ajax(
			    {
					url:"Edit-Sales.htm",
					type:"POST",
					data:Contract,
					dataType:"json",		
					mimeType:"application/json",
					contentType:"application/json",  
					
					success:function(response)
					{				
						if(response.extra=="Success")
						{
							$('#Response').text("Order successfully updated . . . !");
							
							$('#CustomerList').prop("disabled",false);
							$('#txtCustomerID').val("");
							$('#txtCustomerStateCode').val("");
							
							$('#SalesTable tbody').empty();
							
							$("#txtGT").val(0);
							$("#txtDiscount").val(0);
							$('#TransporterList').val("Select").trigger("change");
							$("#txtTransporterID").val(0);
							
							$("#txtCharges").val(0);
							$("#txtSalesID").val(sessionStorage.getItem("Original_SalesID"));
							$('#txtSalesID').prop("disabled",true);
							$('#SaveBtn').prop("disabled",false);
														
							Global_DD_Loader("Get-Items.htm","#ItemList");
							
							$("#WIP").hide();
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
	
	$('#txtSalesID').bind('keypress', function(e) 
	{
		 if(e.keyCode==13) 
		 {
			 var BillID=$('#txtSalesID').val();
			 $('#SalesTable tbody').empty();
			 Vintage_Getter(BillID);
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


	$('#TransporterList').change(function()
	{
		var TransporterID=$('#TransporterList option:selected').val();
		
		$('#txtTransporterID').val(TransporterID);
		
		//alert("Transporter DI : " + $('#txtTransporterID').val());
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
	
	$('#txtRate').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtRate').val("");
			$('#txtRate').focus();
			return false;
		}
		else
		{
			return true;
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
	
	$('#CancelBtn').click(function()
	{
		$("#txtSalesID").val(sessionStorage.getItem("Original_SalesID"));
		
		$('#txtRate').val(0);
		$('#txtQuantity').val(0);
		$('#TaxList').val("Select").trigger("change");
		$('#GSTList').val("Select").trigger("change");
		$('#txtGT').val(0);		
		$('#CustomerList').val("Select").trigger("change");
		$('#TransporterList').val("Select").trigger("change");
		$('#txtTransporterID').val(0);
		
		$('#EditBtn').val("Modify");
		$('#SalesTable tbody').empty();
		$('#CustomerList').prop("disabled",false);
		$('#SaveBtn').prop("disabled",false);
		$('#txtSalesID').prop("disabled",true);
		
	    $('#txtPONo').val("");	
	    $('#txtPODate').val("");	
	    $('#txtChallanNo').val("");	
	    $('#txtChallanDate').val("");	
	    $('#txtVehicleNo').val("");	
	    $('#txtTransportMode').val("");
	    $('#txtSupplyDate').val("");	
	    $('#txtSupplyPlace').val("");	
	    $('#txtContact').val("");	
	    $('#txtTermDays').val("");	
	});
	
	$('#NewBtn').click(function()
	{
		OpenInNewTab("Page_Customer.htm");
	});
});

function OpenInNewTab(URL)
{
  var win=window.open(URL, '_blank');
  win.focus();
}

function RowAppender(ArrayParameters)
{
	var Quantity,Rate,ID,Code,Total=0,Discount=0,isReading;
	var ItemName="";
	
	var SGST,CGST,IGST;
	
	var SrNo=0;	
	var Len= $("#SalesTable > tbody").children().length;

	if(Len<=0)
	sessionStorage.setItem("SrNo",0);	
		
	if(isNaN(parseInt(sessionStorage.getItem("SrNo")))) 	
	SrNo= 1;
	else
	SrNo=parseInt(sessionStorage.getItem("SrNo")) + 1;
	
	ItemName=ArrayParameters[0];
	ID=ArrayParameters[1];
	Quantity=ArrayParameters[2];
	Rate=ArrayParameters[3];
	Total=ArrayParameters[4];
	isReading=ArrayParameters[5];
	
	SGST=ArrayParameters[6];
	CGST=ArrayParameters[7];
	IGST=ArrayParameters[8];
	Discount=parseInt(ArrayParameters[9]);
	
	Total=parseFloat(parseInt(Quantity)* parseFloat(Rate));
	Total = parseInt(Total) -  parseInt(Discount);
	
	//alert("Item Name : " + ItemName);
	$('#SalesTable tbody').append
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

function GrandTotalCalculate()
{
	var GrandTotal=0;
	$('#txtGT').val(0);
	var SubTotal=0,SGST=0,CGST=0,IGST=0,Tax=0;
	var TaxSGST=0,TaxCGST=0,TaxIGST=0;
	var Temp=0;
	
	$("#SalesTable tbody").find("tr").each(function() 
	{			
	    SubTotal = parseFloat($(this).find('#divTotal').text());	
	    
	    SGST=parseFloat($(this).find('#divSGST').text());
	    CGST=parseFloat($(this).find('#divCGST').text());
	    IGST=parseFloat($(this).find('#divIGST').text());
	    	    	    
	    TaxSGST=parseFloat(TaxSGST) + (parseFloat(SubTotal) * parseFloat(SGST) / 100 );
	    TaxCGST=parseFloat(TaxCGST) + (parseFloat(SubTotal) * parseFloat(CGST) / 100 );
	    TaxIGST=parseFloat(TaxIGST) + (parseFloat(SubTotal) * parseFloat(IGST) / 100 );
	    
	    Temp = Temp + SubTotal;
	});
	
	var abc=parseFloat(SGST) + parseFloat(CGST) + parseFloat(IGST);
	console.log("Single    : - " + SubTotal + "-" + (parseFloat(SubTotal) * parseFloat(abc) / 100 ));
	//console.log("Addition  : - " + Temp + "-" + TaxIGST);
	//GrandTotal= Temp + Math.round(TaxSGST) + Math.round(TaxCGST) + Math.round(TaxIGST);
	
	GrandTotal= parseFloat(Temp + TaxSGST + TaxCGST + TaxIGST).toFixed(2);
	
	var Parts=GrandTotal.split(".");
	var IntDecimal=parseInt(Parts[1]);
	
	console.log("GrandTotal : " + GrandTotal);
	console.log("IntDecimal : " + IntDecimal);	
	
	if(IntDecimal >=50 )
	GrandTotal = Math.round(GrandTotal);
	else
	GrandTotal = Math.round(GrandTotal);
	
	$('#txtGT').val(parseFloat(GrandTotal));
	sessionStorage.setItem("GT",GrandTotal);
}

function Vintage_Getter(BillNo)
{		
	$("#WIP").show();
	
	$.ajax(
	{
		url:'Getting-VintageOutward/'+ BillNo +'.htm',
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
				var BillNo=Data_List[0].field1;
				var ToPay=Data_List[0].field2;
				var Transporter=Data_List[0].stringF10;
				
				var Customer=Data_List[0].stringF11;
				
				var Temp=Customer.split("-");
				
				//alert("Getting-Cart CustomerID : " + Temp[0]);
				
				$('#txtSalesID').val(BillNo);
				BillDate=moment(BillDate,"YYYY/MM/DD hh:mm:ss").format("DD/MM/YYYY hh:mm:ss");
				$('#txtDate').val(BillDate);
				$('#txtGT').text(ToPay);

				$('#TransporterList').val(Transporter).trigger("change");
				$('#txtTransporterID').val(Transporter);

				$('#CustomerList').val(Customer).trigger("change");
				$('#txtCustomerID').val(Temp[0]);
				$('#txtCustomerStateCode').val(Temp[1]);
				
				/* Loading Sales Related Data To The Modal Dialogue*/

			    $('#txtContact').val(Data_List[0].stringF18);
				
				//$('#txtCharges').val(Charges);
				
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
		        	ArrayParameters[9]=Data_List[i].field3;

		        	RowAppender(ArrayParameters);		        	
				}				
				$('#Response').text("Bill Found . . . !");
				
				$("#WIP").hide();
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