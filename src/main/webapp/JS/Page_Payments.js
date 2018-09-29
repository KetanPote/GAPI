jQuery(document).ready(function($)
{	
	var ModeSelected="";
		
	var DefaultButton;

	var Today=moment().format("DD-MM-YYYY");
	$('#txtDate').val(Today);
    
    $('#SectionList').change(function()
    {
    	var Section=$('#SectionList option:selected').val();
    	
    	$('#PartyList').empty();
    	$('#PartyList').append("<option value='Select'>Select</option>")
    	
    	if(Section=="Sales")
    	Global_DD_Loader("Get-Customers.htm",'#PartyList');
    	else if(Section=="Purchase")
    	Global_DD_Loader("Get-Suppliers.htm",'#PartyList');    		
    });    

    $('#SearchBtn').click(function()
	{
    	$('#Response').text("Searching started. . . !");
    	
    	$('#PaymentTable tbody').empty();
    	$('#DivDueAmount').text("");
    	
		var Data={};
		
		var Section=$('#SectionList option:selected').val();
		var URL="";
		
		if(Section=="Sales")
		{
			URL="Get-CustomerData.htm";

			var Temp=$('#txtPersonID').val().split("-");
			$('#PersonID').val(Temp[0]);
		}
		
		else if(Section=="Purchase")
		URL="Get-SupplierData.htm";

		Data['userID']=$('#txtPersonID').val(); // CustomerID  / SupplierID as PersonID
		Data['fromDate']=null;
		Data['toDate']=null;

		var JSON_Data=JSON.stringify(Data);

		//alert("JSON Data : " + JSON_Data);
		
		sessionStorage.setItem("PersonID",$('#txtPersonID').val());
		sessionStorage.setItem("Section",Section);
		
		$.ajax(
		{
			url:URL,
			data:JSON_Data,
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  
			
			success:function(response)
			{				
				var Raw=JSON.stringify(response);
				var Obj=JSON.parse(Raw);

				$('#DueAmount').text("");
				$('#DueAmount').text(Obj.one);
				var Data={};
				var Len=0;
				var index=1;
				
				var Flag="Paid",Color="blue";
				
				Data=Obj.list_Table;
				Len=Data.length;
				
				var ClassName="";
				
				for(var i=0;i<Len;i++)
				{
					if(Data[i].a4=="PartialPaid") ClassName="SR_PP"; else ClassName="SR_UP";
						
					$('#PaymentTable tbody').append
					(
						'<tr>'+
							
							'<td class="'+ ClassName +'">'+ index +'</td>'+
							
							'<td id="DivBillID" class="'+ ClassName +'">'+ Data[i].a1 +'</td>'+
							'<td id="DivBillDate" class="'+ ClassName +'">'+ Data[i].a2 +'</td>'+
							'<td id="DivBillAmount" class="'+ ClassName +'">'+ Data[i].a3 +'</td>'+

							'<td class="'+ ClassName +'" id="DivDues" style="color:red; font-weight:bold;">'+ Data[i].a5 +'</td>'+
							'<td class="'+ ClassName +'" id="DivDues">'+ Data[i].a6 +'</td>'+

							'<td style="display:none;" id="DivSGST">'+ Data[i].a0 +'</td>'+
							'<td style="display:none;" id="DivCGST">'+ Data[i].t1 +'</td>'+
							'<td style="display:none;" id="DivIGST">'+ Data[i].t2 +'</td>'+
							'<td style="display:none;" id="DivFlag">'+ Data[i].a4 +'</td>'+
							
						'</tr>'
					);
					
					index++;
					
				}					
			},
			error:function(er)
			{
				console.log("Payment While :  " + er);
			}
		});	
		
		/*-------------------------------------------------------
		
		var PersonID,Section;
		
		PersonID=sessionStorage.getItem("PersonID");
		Section=sessionStorage.getItem("Section");
		
		$.ajax(
	    {
			url:"Get-DueAmount/"+ PersonID +"/"+ Section +".htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",
			contentType:"application/json",  
			
			success:function(response)
			{				
				var DueAmount=0;
				DueAmount=parseInt(response.extra);
				
				var TotalBills=parseInt($('#DueAmount').text());
				TotalBills=TotalBills + DueAmount;
				$('#DueAmount').text(TotalBills);
				
			},
			error:function(er)
			{
				console.log("Sales While :  " + er);
			}
	    });			
	    */
		
	});		
	$('#CancelBtn').click(function()
	{
		
		$('#txtItemID').val("");
		$('#txtItem').val("");
		$('#txtRate').val("");
		$('#txtItem').focus();
		
	});

	$('#txtPaidAmount').keyup(function()
	{		
		if(isNaN($(this).val()) || $.trim($(this).val()).length==0)
		{
			$('#txtPaidAmount').val("");
			$('#txtPaidAmount').focus();
			return false;
		}
		else
		{
			return true;
		}
	});		
	
	$('#PayBtn').click(function()
	{
		$.ajax(
	    {
			url:"Pay-Payments/0/0/Core.htm",
			type:"POST",
			dataType:"json",		
			mimeType:"application/json",	
			contentType:"application/json",  
			
			success:function(response)
			{			
				alert("Status : " + response.status);
				if(response.extra=="Success")
				$('#Response').text("Payment successfully made . . . !");
				else if(response.extra=="Paid")
				$('#Response').text("Payment already made with this cheque . . . !");
			},
			error:function(er)
			{
				console.log("Sales While :  " + er);
			}
	    });						
		
	});
	
	$('#SaveBtn').click(function()
	{
		var ChequeNo,ChequeAmount,Amount,BillNo,BillDate,Remark,Mode,BillAmount;
		var flag=true;
		
		ChequeNo=$('#txtChequeNo').val();
		ChequeAmount=$('#txtAmount').val();
		Amount=$('#txtAmount').val();
		Mode=$('#PayList option:selected').val();
		BillAmount=parseInt($('#DivAmount').text());
		var PayMode=$('#PayList option:selected').val();
		var Section=$('#SectionList option:selected').val();
		var PersonID=$('#txtPersonID').val();
		
		var flag=true; 		

		//alert("Flag : " + flag);
		
		if(Mode=="Cheque")
		{
			if($.trim(ChequeNo)=="" || ChequeNo<=0 || Amount<=0)
			flag=false;
		}
		else if(PersonID=="" || PersonID <=0)
		flag=false;
		
		if(flag)
		{
			var JSON_Data={};
			
			var RCA_ROW=[];

			$("#PaymentTable tbody").find("tr").each(function() 
			{						
			    Details={};
			    			    			   
			    Details['personID']=parseInt(PersonID);
			    Details['paidAmount']=parseInt($('#txtPaidAmount').val());			    
			    Details['billAmount']=parseInt($('#DueAmount').text());
			    Details['oneBillAmount']=parseInt($(this).find('#DivBillAmount').text());
			    Details['dueAmount']=parseInt($('#DueAmount').text());			 
			    Details['payDate']=moment($(this).find('#txtDate').val()).format("YYYY-MM-DD");
			    Details['billDate']=moment($(this).find('#DivBillDate').text(),"DD-MM-YYYY").format("YYYY-MM-DD");
			    Details['chequeDate']=moment($(this).find('#txtChequeDate').val()).format("YYYY-MM-DD");					    
			    Details['chequeNo']=$('#txtChequeNo').val();
			    Details['section']=Section;
			    Details['payMode']=PayMode;
			    Details['flag']=$(this).find('#DivFlag').text();
			    
			    if(Section=="Purchase")
			    Details['billNo']= $('#ChargesList option:selected').val();
			    else
			    Details['billNo']= 0;
			    
			    Details['billID']= parseInt($(this).find('#DivBillID').text());
			    Details['totalSGST']= parseInt($(this).find('#DivSGST').text());
			    Details['totalCGST']= parseInt($(this).find('#DivCGST').text());
			    Details['totalIGST']=parseInt($(this).find('#DivIGST').text());
			    			    
			    RCA_ROW.push(Details);
			});			 
				        
		    JSON_Data['RCD']=RCA_ROW;			
					
		   // alert("Data Showing Print Btn : " + JSON.stringify(RCA_ROW));
		    
		    var Contract=JSON.stringify(RCA_ROW); // PO Stands for Purchase order.
			
			$.ajax(
		    {
				url:"Create-Payment.htm",
				type:"POST",
				data:Contract,
				dataType:"json",		
				mimeType:"application/json",
				contentType:"application/json",  
				
				success:function(response)
				{				
					if(response.extra=="Success")
						$('#Response').text("Order successfully saved . . . !");					
					else if(response.extra=="Duplicate")
						$('#Response').text("Duplicate Cheque Number . . . !");
					else
						$('#Response').text("Error Occured While Saving Payment Information . . . !");
				},
				error:function(er)
				{
					console.log("Sales While :  " + er);
				}
		    });						
		}
		else
		{
			$('#Response').text("Please enter valid information . . . !");
		}
	});
	
	$(document).on('click', "#Page_Numbers_PaymentTable ul li a", function() 
	{
		pageClicking($(this),"PaymentTable","Get-Paginated-Payment");
	});		

	$(document).on('click', "#PaymentTable tbody  #RemoveBtn", function()
	{
		var Params={};
		
		Params[0]=$(this);
		Params[1]="PaymentTable";
		Params[2]="Response"
		Params[3]="Delete-Payment"; /* Without ID */

		deleteRowDatabase(Params);
	});
	
	$('#PayList').change(function()
	{
		var Mode=$('#PayList option:selected').text();
		
		if(Mode=="Cheque")
		{
			$('#DivAmount').show();
			$('#DivDate').show();
			$('#DivCheque').show();
		}
		else if(Mode=="Cash")
		{
			$('#DivAmount').show();
			$('#DivDate').show();
			$('#DivCheque').hide();
			$('#txtChequeNo').val("");
		}
		else if(Mode=="Transfer")
		{
			$('#DivAmount').show();
			$('#DivDate').show();
			$('#DivCheque').hide();
			$('#txtChequeNo').val("");
		}
		$('#txtPayMode').val(Mode);
		
		ModeSelected=Mode; // Assigning to the global variable for further use.
	});
	
	$('#PartyList').change(function()
	{
		var Temp=$('#PartyList option:selected').val();
		var Section=$('#SectionList option:selected').val();
		var PersonID=0;
		
		if(Section=="Sales")
		PersonID=Temp[0];
		else
		PersonID=Temp;
		
		$('#txtPersonID').val(PersonID);
	});	
});