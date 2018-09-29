$(document).ready(function()
{
	Bill();
});
function Bill()
{
	$.ajax(
    {
		url:"Print-SalesBill.htm",
		type:"POST",
		dataType:"json",		
		mimeType:"application/json",
		contentType:"application/json",  
		
		success:function(response)
		{	
			var Raw=JSON.stringify(response);
			var Obj=JSON.parse(Raw);
			
			var CopyName=sessionStorage.getItem("CopyName");
			//alert("Copy Name  : " + CopyName);
			
			$('#CopyName').text(CopyName);
			$('#invoiceNo').text(": "+Obj.invoiceNo);
			$('#invoiceDate').text(": "+moment(Obj.dateInvoice).format("DD-MMM-YYYY"));
			$('#State').text(": "+Obj.state);
			$('#StateCode').text(": "+Obj.stateCode);
			$('#divTransporterName').text(": "+Obj.transporterName);
			
			$('#divReceiverName').text(": "+Obj.nameReceiver);
			$('#receiverAddress').text(": "+Obj.addressReceiver);
			$('#divReceiverGSTIN').text(": "+Obj.gstinReceiver);
			$('#divReceiverState').text(": "+Obj.stateReciever);
			$('#divReceiverStateCode').text(": "+Obj.stateCodeReciever);
			$('#divReceiverPAN').text(": "+Obj.panReceiver);
			$('#divReceiverContact').text(": "+Obj.landLineReceiver);
			$('#divReceiverEmail').text(": "+Obj.emailReceiver);
			
			$('#divCosigneeName').text(": "+Obj.nameCosignee);
			$('#cosigneeAddress').text(": "+Obj.addressCosignee);
			$('#divCosigneeGSTIN').text(": "+Obj.gstinCosignee);
			$('#divCosigneeState').text(": "+Obj.stateCosingnee);
			$('#divCosigneeStateCode').text(": "+Obj.stateCodeCosingnee);
			$('#divCosigneePAN').text(": "+Obj.panCosignee);
			$('#divCosigneeContact').text(": "+Obj.landLineCosignee);
			$('#divCosigneeEmail').text(": "+Obj.emailCosignee);
			
			$('#divChallanNo').text(": "+Obj.challanNo);
			$('#divChallanDate').text(": "+Obj.challanDate);
			$('#divPONo').text(": "+Obj.poNo);
			$('#divPODate').text(": "+Obj.poDate);
			$('#divTransportMode').text(": "+Obj.transportMode);
			$('#divVehicle').text(": "+Obj.vehicleNo);
			$('#divDateSupply').text(": "+Obj.dateSupply);
			$('#divPlaceSupply').text(": "+Obj.placeSupply);
			$('#divTransportContactNo').text(": "+Obj.contactNo);
			
			var TermDays=parseInt(Obj.termDays);
			var BillDate=moment(Obj.dateInvoice).format("DD-MM-YYYY");
			
			var DueDate=moment(BillDate, "DD-MM-YYYY").add(TermDays, 'days');
			DueDate=moment(DueDate).format("DD-MMM-YYYY");
			//alert("DueDate Date : " + DueDate);
			
			$('#divActualTerm').text(": Credit For : "+TermDays +" days & Due Date : " + DueDate);	
			
			var Data={};
			var Len=0,i=0;
			
			Data=Obj.list_Items;
			Len=Data.length;
			
			$('#ItemsTable tbody').empty();
			var srno=1;
			
			var ExtraPosition=-1;
			var Item="";
			var ItemsCounter=0;
			
			for(i=0;i<Len;i++)
			{
				ItemsCounter++;
				
				Item=Data[i].itemName;
								
				if(Item=="Courier Charges" || Item=="Transporting Charges" || Item=="Packing & Forwarding")
				{					
					ExtraPosition=i;
				}
				else
				{				
					$('#ItemsTable tbody').append
					(
					'<tr >'+
					
						'<td class="ddLR" align="center">'+ srno +'</td>'+
						
						'<td align="left">'+ Data[i].itemName +'</td>'+
						'<td class="AR ddLR">'+ Data[i].hsn +'</td>'+
						'<td class="AR ddLR">Nos</td>'+
						'<td class="AR ddLR">'+ Data[i].quantity +'</td>'+
						'<td class="AR ddLR">'+ Data[i].rate +'</td>'+
						'<td class="AR ddLR">'+ Data[i].amount +'</td>'+
						'<td class="AR ddLR">'+ Data[i].discount +'</td>'+
						'<td class="AR ddLR">'+ Data[i].taxableValue +'</td>'+
						'<td class="AR ddLR">'+ Data[i].cgstRate +' %</td>'+
						'<td class="AR ddLR">'+ Data[i].cgstAmount +'</td>'+
						'<td class="AR ddLR">'+ Data[i].sgstRate +' %</td>'+
						'<td class="AR ddLR">'+ Data[i].sgstAmount +'</td>'+
						'<td class="AR ddLR">'+ Data[i].igstRate +' %</td>'+
						'<td class="AR ddLR ">'+ Data[i].igstAmount +'</td>'+
						
					'</tr>'
					);	
					srno++;
				}
				
			}
			//alert("Total CGST Amoun :  " + Obj.amountBeforeTax);
			
			$("#ItemsTable tbody tr:last").clone().appendTo('#ItemsTable tbody').find("td").empty();
			$("#ItemsTable tbody tr:last").clone().appendTo('#ItemsTable tbody').find("td").empty();
			$("#ItemsTable tbody tr:last").clone().appendTo('#ItemsTable tbody').find("td").empty();
			$("#ItemsTable tbody tr:last").clone().appendTo('#ItemsTable tbody').find("td").empty();
			
			if(ExtraPosition>=0)
			{
				var i=parseInt(ExtraPosition);
				
				//alert( Data[i].itemName);
				
				$('#ItemsTable tbody').append
				(
				'<tr >'+
				
					'<td class="ddLR" align="center">***</td>'+
					
					'<td align="left">'+ Data[i].itemName +'</td>'+
					'<td class="AR ddLR">'+ Data[i].hsn +'</td>'+
					'<td class="AR ddLR">Nos</td>'+
					'<td class="AR ddLR">'+ Data[i].quantity +'</td>'+
					'<td class="AR ddLR">'+ Data[i].rate +'</td>'+
					'<td class="AR ddLR">'+ Data[i].amount +'</td>'+
					'<td class="AR ddLR">-</td>'+
					'<td class="AR ddLR">'+ Data[i].taxableValue +'</td>'+
					'<td class="AR ddLR">'+ Data[i].cgstRate +' %</td>'+
					'<td class="AR ddLR">'+ Data[i].cgstAmount +'</td>'+
					'<td class="AR ddLR">'+ Data[i].sgstRate +' %</td>'+
					'<td class="AR ddLR">'+ Data[i].sgstAmount +'</td>'+
					'<td class="AR ddLR">'+ Data[i].igstRate +' %</td>'+
					'<td class="AR ddLR ">'+ Data[i].igstAmount +'</td>'+					
				'</tr>'
				);					
			}
			
			var Starter=parseInt(35) - parseInt(ItemsCounter);
		
			//alert("Starter : " + Starter);
			for(var i=0;i<Starter;i++)
			$("#ItemsTable tbody tr:last").clone().appendTo('#ItemsTable tbody').find("td").empty();				
			
			$('#ItemsTable tbody').append
			(
				'<tr class="ddLRTB">'+
				
					'<td colspan="2" align="right">Total : </td>'+
					'<td colspan="3" id="TotalQuantities" class="AR">'+ Obj.totalQuantity +'</td>'+
					'<td align="center">&nbsp;</td>'+
					'<td id="TotalAmounts" class="AR">'+ Obj.totalAmount +'</td>'+
					'<td align="center">-</td>'+
					'<td id="TotalTaxableValues" align="right" class="AR">'+ Obj.totalTaxableValue +'</td>'+
					'<td align="center"></td>'+
					'<td id="TotalCGST" class="AR">'+ Obj.totalCGSTAmount +'</td>'+
					'<td align="center">&nbsp;</td>'+
					'<td id="TotalSGST" align="right" class="AR">'+ Obj.totalSGSTAmount +'</td>'+										
					'<td align="center">&nbsp;</td>'+
					'<td id="TotalIGST" align="right" class="AR">'+ Obj.totalIGSTAmount +'</td>'+						
				'</tr>'
			);				
							
			var AmountBeforeTax=parseInt(Obj.amountBeforeTax);
			
			$('#amountBeforeTax').text(AmountBeforeTax).css("font-weight","bold");
			$('#addCGST').text(Obj.addCGST);
			$('#addSGST').text(Obj.addSGST);
			$('#addIGST').text(Obj.addIGST);
			
			var RoundingOffStatus=Obj.roundingOffStatus;
			var ZeroPrefix="";
			
			if(Obj.roundingOff.length<=1)
			ZeroPrefix="0";
			
			if(RoundingOffStatus=="Forward")
			$('#roundingOff').text("(+) ." + ZeroPrefix + Obj.roundingOff);
			else
			$('#roundingOff').text("(-) ." + ZeroPrefix + Obj.roundingOff);	
			
			$('#taxAmount').text(Obj.amountTax).css("font-weight","bold");;
			$('#amountAfterTax').text(Obj.amountAfterTax).css("font-weight","bold");
			$('#gstPayableReverse').text(Obj.gstPayableReverse).css("font-weight","bold");
			$('#forFirmName').text("For, "+ Obj.owner);
			
			$('#bankAccNo').text(": "+Obj.accNo);
			$('#bankIFSC').text(": "+Obj.ifsc);
			$('#bankName').text(": "+Obj.bank);
			$('#bankBranch').text(": "+Obj.branch);
			
			$('#amountLine').text(Obj.amountLine +" Only.").css("font-weight","bold");
			$('#taxLine').text("Tax Amount In Words : " + Obj.taxLine +" Only.").css("font-weight","bold");
			
			Tax=sessionStorage.setItem("Tax",null);
			GST=sessionStorage.setItem("GST",null);
		},
		error:function(er)
		{
			console.log("Sales Printing While :  " + er);
		}
    });
}