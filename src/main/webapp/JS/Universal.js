function Ajax_PaginationLoader(TableName,PageIndex,URL,ArrayParams) 
{    	
	/* Setting In JQuery Session */
	
	var Data=[];
	
	Data=JSON.stringify(ArrayParams);
	
	sessionStorage.setItem("TableName",TableName);
	sessionStorage.setItem("PageIndex",PageIndex);
	sessionStorage.setItem("URL",URL);
	sessionStorage.setItem("ArrayParams",Data);
	sessionStorage.setItem("PaginationMethod","First");
	
	/* Setting In JQuery Session */
	
	//alert("Showing ArrayParams - URL - Table Name : " + ArrayParams + " - " + URL + " - " + TableName);
	
	var Buttons=0,ID1,ID2,ID3,ID4,Capt1,Capt2,Capt3,Capt4,Style,Button1,Button2,Button3,MergeButtons;
	var BSC1,BSC2,BSC3,BSC4;
	
	var ButtonsPositions;
	var FinalButtons;
	
	if(ArrayParams!=null)
	{
		Buttons=ArrayParams[0]; /* Number of Buttons */
	
		if(Buttons==1)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */
			
			Style=ArrayParams[4]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==2)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			Style=ArrayParams[7]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==3)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			

			Style=ArrayParams[10]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==4)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			
			
			ID4=ArrayParams[10]; /* Button ID */
			Capt4=ArrayParams[11]; /* Button Caption */
			BSC4=ArrayParams[12]; /* Bootstrap Class */

			Style=ArrayParams[13]; /* Single,Joint OR Individual Twos */
		}
		
		if(Style=="Joint")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';
			
			FinalButtons=MergeButtons;			
		}
		else if(Style=="Single")
		{
			Button1='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			
			ButtonsPositions='<div class="BTN_1"></div>'+
			'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>'+
			'<div class="BTN_2"></div>'+
			'<div class="BTN_3"></div>';
			
			FinalButtons=Button1;
			
		}
		else if(Style=="Joint_One")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';
			
			FinalButtons=MergeButtons + Button1;
			
		}
		else if(Style=="Joint_Two")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';
			Button2='<button type="button" class="'+ BSC4 +'" id="'+ ID4 +'">'+ Capt4 +'</button>';
			
			FinalButtons=MergeButtons + Button1 + Button2;
		}
	}
	
	$('#'+TableName).DataTable();
	
	$('#'+ TableName +'_info').remove();
	$('#'+ TableName +'_length').remove(); 
	$('#'+ TableName +'_paginate').remove();
	
    $.ajax
    ({ 
    	url:URL+"/" + PageIndex + ".htm",
    	type:"POST",
        dataType:"json",        
        mimeType:"application/json",
        contentType:"application/json",  
        
        success: function(response)
        {   
        	var Raw_Data=JSON.stringify(response);
        	var obj=JSON.parse(Raw_Data);
        	
        	var Source_List={}; 
        	var NPages=0; 
        	
        	Source_List=obj.list_Table;

        	//alert("Showing Raw_Data : " + Raw_Data);
        	//alert("Showing List_Table : " + Source_List.length);
        	
        	NPages=response.one;
        	
        	var index=0;           	
        	
        	var limit=Source_List.length;

        	var Table=$('#'+TableName).DataTable();
        	
        	Table.clear().draw();
        	
        	var ColumnsCounter=response.two;
        	
        	if(ColumnsCounter==2)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,													
    					Source_List[index].a1,    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',
    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==3)
        	{        
        		//alert("ColumnsCounter==3 : " + ColumnsCounter);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',
				  	
    				]).draw();
    				
    				//alert("Showing Row Wise PK ID : " + Source_List[index].a0);
    			}              		        		
        	}
        	else if(ColumnsCounter==4)
        	{
        		//alert("ColumnsCounter==4 : " + ColumnsCounter + " - " + FinalButtons);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==5)
        	{
        		//alert("ColumnsCounter==5 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==6)
        	{
        		//alert("ColumnsCounter==6 : " + ColumnsCounter + " - " + FinalButtons);

        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==7)
        	{
        		//alert("ColumnsCounter==7 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==8)
        	{
        		//alert("ColumnsCounter==8 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}        	
        	else if(ColumnsCounter==9)
        	{
        		//alert("ColumnsCounter==9 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					Source_List[index].a8,
    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	} 
        	else if(ColumnsCounter==10)
        	{
        		//alert("ColumnsCounter==10 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					Source_List[index].a8,
    					Source_List[index].a9,
    					Source_List[index].a10,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',   				  	
    				]).draw();
    			}              		        		
        	}         	
        	       	
        	$("#"+TableName).find("tr td").each(function() 
			{
        		if($(this).find('.Hider').attr('class')=="Hider")
        		{
        			$(this).css('display','none');
        			
        			var values=$(this).text();
        			
        			if(values=="Y")
    				{        				
        				$(this).next().find("#SetBtn").text("UnSet").removeClass("btn btn-success").addClass("btn btn-warning");
    				}        			
        			else if(values="N")
    				{
        				$(this).parent().next().find("#SetBtn").text("Set").removeClass("btn btn-warning").addClass("btn btn-success");        				
    				}        			
        		}        		
			});
			
        	/* Adding Buttons To The Columns If Having Any */
        	
        	if(Buttons==0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		//alert($(this).find("div").attr("class"));
            		
            		var Division=$(this).find("div").attr("class");
            		
            		if(typeof(Division)!="undefined")
            		{
                		if(Division.startsWith("BTN"))
                		{
                    		if(Division.substr(0,5)=="BTN_")
        		    		$(this).css('display','none');            			
                		}            			
            		}
				});        		
        	}
        	else if(Buttons>0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		var Div=$(this).find("div").attr("class");
            		
            		if(typeof(Div)!="undefined")
            		{
                		var Temp=Div.substr(4,5);
                		
                		if(Style=="Joint")
            			{                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);     
                				$(".BTN_1").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();
                			}                			
            			}
                		else if(Style=="Single")
            			{
                			if(Div=="BTN_1")
                			{
                				$(this).prev().find("div").remove();
                				$(this).removeAttr("style");
                				$(this).append(Button1);
                				
                				$(".BTN_Merge").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();
                				
                			}                		     			
            			}            			
                		else if(Style=="Joint_One")
            			{
                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}  
                			
            			}            			
                		else if(Style=="Joint_Two")
            			{
                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}  
                			
                			if(Div=="BTN_2")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button2);                       				
                			}                		     			
            			}            			
            		}
				});        		
        	}        	
        	/* Adding Pagination Bar To The Table ! Important */
        	
        	addPagination(TableName,NPages);
        },
        
        error: function (e) 
        {
        	console.log("Error From Generalization : " + e);
        }            
    });
}

function Ajax_PaginationRequestBody(TableName,PageIndex,URL,ArrayParams,RequestData) 
{    	
	/* Setting In JQuery Session */
	
	var Data=[];
	
	Data=JSON.stringify(ArrayParams);
	
	sessionStorage.setItem("TableName",TableName);
	sessionStorage.setItem("PageIndex",PageIndex);
	sessionStorage.setItem("URL",URL);
	sessionStorage.setItem("ArrayParams",Data);
	sessionStorage.setItem("PaginationMethod","First");
	
	/* Setting In JQuery Session */
	
	//alert("Showing ArrayParams - URL - Table Name : " + ArrayParams + " - " + URL + " - " + TableName);
	
	var Buttons=0,ID1,ID2,ID3,ID4,Capt1,Capt2,Capt3,Capt4,Style,Button1,Button2,Button3,MergeButtons;
	var BSC1,BSC2,BSC3,BSC4;
	
	var ButtonsPositions;
	var FinalButtons;
	
	if(ArrayParams!=null)
	{
		Buttons=ArrayParams[0]; /* Number of Buttons */
	
		if(Buttons==1)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */
			
			Style=ArrayParams[4]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==2)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			Style=ArrayParams[7]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==3)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			

			Style=ArrayParams[10]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==4)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			
			
			ID4=ArrayParams[10]; /* Button ID */
			Capt4=ArrayParams[11]; /* Button Caption */
			BSC4=ArrayParams[12]; /* Bootstrap Class */

			Style=ArrayParams[13]; /* Single,Joint OR Individual Twos */
		}
		
		if(Style=="Joint")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';
			
			FinalButtons=MergeButtons;			
		}
		else if(Style=="Single")
		{
			Button1='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			
			ButtonsPositions='<div class="BTN_1"></div>'+
			'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>'+
			'<div class="BTN_2"></div>'+
			'<div class="BTN_3"></div>';
			
			FinalButtons=Button1;
			
		}
		else if(Style=="Joint_One")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';
			
			FinalButtons=MergeButtons + Button1;
			
		}
		else if(Style=="Joint_Two")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';
			Button2='<button type="button" class="'+ BSC4 +'" id="'+ ID4 +'">'+ Capt4 +'</button>';
			
			FinalButtons=MergeButtons + Button1 + Button2;
		}
	}
	
	$('#'+TableName).DataTable();
	
	$('#'+ TableName +'_info').remove();
	$('#'+ TableName +'_length').remove(); 
	$('#'+ TableName +'_paginate').remove();
	
    $.ajax
    ({ 
    	url:URL+"/" + PageIndex + ".htm",
    	type:"POST",
        dataType:"json",        
        data:RequestData,
        mimeType:"application/json",
        contentType:"application/json",  
        
        success: function(response)
        {   
        	var Raw_Data=JSON.stringify(response);
        	var obj=JSON.parse(Raw_Data);
        	
        	var Source_List={}; 
        	var NPages=0; 
        	
        	Source_List=obj.list_Table;

        	//alert("Showing Raw_Data : " + Raw_Data);
        	//alert("Showing List_Table : " + Source_List.length);
        	
        	NPages=response.one;
        	
        	var index=0;           	
        	
        	var limit=Source_List.length;

        	var Table=$('#'+TableName).DataTable();
        	
        	Table.clear().draw();
        	
        	var ColumnsCounter=response.two;
        	
        	if(ColumnsCounter==2)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,													
    					Source_List[index].a1,    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',
    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==3)
        	{        
        		//alert("ColumnsCounter==3 : " + ColumnsCounter);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',
				  	
    				]).draw();
    				
    				//alert("Showing Row Wise PK ID : " + Source_List[index].a0);
    			}              		        		
        	}
        	else if(ColumnsCounter==4)
        	{
        		//alert("ColumnsCounter==4 : " + ColumnsCounter + " - " + FinalButtons);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==5)
        	{
        		//alert("ColumnsCounter==5 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==6)
        	{
        		//alert("ColumnsCounter==6 : " + ColumnsCounter + " - " + FinalButtons);
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==7)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					
    					FinalButtons,
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==8)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}        	
        	else if(ColumnsCounter==9)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					Source_List[index].a8,
    					
    					FinalButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t1+'</div>',
    				  	'<div class="Hider">'+ Source_List[index].t2+'</div>',    				  	
    				]).draw();
    			}              		        		
        	} 
        	else if(ColumnsCounter==10)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4, 
    					Source_List[index].a5, 
    					Source_List[index].a6, 
    					Source_List[index].a7, 
    					Source_List[index].a8, 
    					Source_List[index].a9, 

    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}         	
        	       	
        	$("#"+TableName).find("tr td").each(function() 
			{
        		if($(this).find('.Hider').attr('class')=="Hider")
        		{
        			$(this).css('display','none');
        			
        			var values=$(this).text();
        			
        			if(values=="Y")
    				{        				
        				$(this).next().find("#SetBtn").text("UnSet").removeClass("btn btn-success").addClass("btn btn-warning");
    				}        			
        			else if(values="N")
    				{
        				$(this).parent().next().find("#SetBtn").text("Set").removeClass("btn btn-warning").addClass("btn btn-success");        				
    				}        			
        		}        		
			});
			
        	/* Adding Buttons To The Columns If Having Any */
        	
        	if(Buttons==0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		//alert($(this).find("div").attr("class"));
            		
            		var Division=$(this).find("div").attr("class");
            		
            		if(typeof(Division)!="undefined")
            		{
                		if(Division.startsWith("BTN"))
                		{
                    		if(Division.substr(0,5)=="BTN_")
        		    		$(this).css('display','none');            			
                		}            			
            		}
				});        		
        	}
        	else if(Buttons>0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		var Div=$(this).find("div").attr("class");
            		
            		if(typeof(Div)!="undefined")
            		{
                		var Temp=Div.substr(4,5);
                		
                		if(Style=="Joint")
            			{                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);     
                				$(".BTN_1").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();
                			}                			
            			}
                		else if(Style=="Single")
            			{
                			if(Div=="BTN_1")
                			{
                				$(this).prev().find("div").remove();
                				$(this).removeAttr("style");
                				$(this).append(Button1);
                				
                				$(".BTN_Merge").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();                				
                			}                		     			
            			}            			
                		else if(Style=="Joint_One")
            			{
                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}  
                			
            			}            			
                		else if(Style=="Joint_Two")
            			{
                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}  
                			
                			if(Div=="BTN_2")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button2);                       				
                			}                		     			
            			}            			
            		}
				});        		
        	}        	
        	/* Adding Pagination Bar To The Table ! Important */
        	
        	addPagination(TableName,NPages);
        },
        
        error: function (e) 
        {
        	console.log("Error From Generalization : " + e);
        }            
    });
}

/* Overloading Above Method */
Ajax_PaginationLoaderMultiParam=function(TableName,PageIndex,URL,Options,PK1,PK2,ArrayParams) 
{    	
	/* Setting In JQuery Session */
	
	var Data=[];
	
	Data=JSON.stringify(ArrayParams);
	
	sessionStorage.setItem("TableName",TableName);
	sessionStorage.setItem("PageIndex",PageIndex);
	sessionStorage.setItem("URL",URL);
	sessionStorage.setItem("ArrayParams",Data);
	sessionStorage.setItem("PaginationMethod","Second");
	sessionStorage.setItem("Options",Options);
	sessionStorage.setItem("PK1",PK1);
	sessionStorage.setItem("PK2",PK2);	
	
	/* Setting In JQuery Session */
	
	//alert("Showing ArrayParams - URL - Table Name : " + ArrayParams + " - " + URL + " - " + TableName);
	
	var Buttons=0,ID1,ID2,ID3,ID4,Capt1,Capt2,Capt3,Capt4,Style,Button1,Button2,Button3,MergeButtons;
	var BSC1,BSC2,BSC3,BSC4;
	
	var ButtonsPositions;
	
	var FinalButtons;
	
	if(ArrayParams!=null)
	{
		Buttons=ArrayParams[0]; /* Number of Buttons */
	
		if(Buttons==1)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */
			
			Style=ArrayParams[4]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==2)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			Style=ArrayParams[7]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==3)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			

			Style=ArrayParams[10]; /* Single,Joint OR Individual Twos */
		}
		else if(Buttons==4)
		{
			ID1=ArrayParams[1]; /* Button ID */
			Capt1=ArrayParams[2]; /* Button Caption */
			BSC1=ArrayParams[3]; /* Button Caption */			

			ID2=ArrayParams[4]; /* Button ID */
			Capt2=ArrayParams[5]; /* Button Caption */
			BSC2=ArrayParams[6]; /* Bootstrap Class */
			
			ID3=ArrayParams[7]; /* Button ID */
			Capt3=ArrayParams[8]; /* Button Caption */
			BSC3=ArrayParams[9]; /* Bootstrap Class */			
			
			ID4=ArrayParams[10]; /* Button ID */
			Capt4=ArrayParams[11]; /* Button Caption */
			BSC4=ArrayParams[12]; /* Bootstrap Class */

			Style=ArrayParams[13]; /* Single,Joint OR Individual Twos */
		}
		
		if(Style=="Joint")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';
			
			FinalButtons=MergeButtons;
			
		}
		else if(Style=="Single")
		{
			Button1='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			
			ButtonsPositions='<div class="BTN_1"></div>'+
			'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>'+
			'<div class="BTN_2"></div>'+
			'<div class="BTN_3"></div>';
			
			FinalButtons=Button1;
			
		}
		else if(Style=="Joint_One")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';

			FinalButtons=MergeButtons + Button1;
		}
		else if(Style=="Joint_Two")
		{
			MergeButtons='<button type="button" class="'+ BSC1 +'" id="'+ ID1 +'">'+ Capt1 +'</button>';
			MergeButtons=MergeButtons + '<button type="button" class="'+ BSC2 +'" id="'+ ID2 +'">'+ Capt2 +'</button>';

			Button1='<button type="button" class="'+ BSC3 +'" id="'+ ID3 +'">'+ Capt3 +'</button>';
			Button2='<button type="button" class="'+ BSC4 +'" id="'+ ID4 +'">'+ Capt4 +'</button>';
			
			FinalButtons=MergeButtons + Button1 + Button2;
		}
	}
		
	$('#'+TableName).DataTable();
	
	$('#'+ TableName +'_info').remove();
	$('#'+ TableName +'_length').remove(); 
	$('#'+ TableName +'_paginate').remove();
	
    $.ajax
    ({ 
    	url:URL+"/" + PageIndex + "/" + Options + "/" + PK1 + "/" + PK2 +".htm",
    	type:"POST",
        dataType:"json",        
        mimeType:"application/json",
        contentType:"application/json",  
        
        success: function(response)
        {   
        	var Raw_Data=JSON.stringify(response);
        	var obj=JSON.parse(Raw_Data);
        	
        	var Source_List={}; 
        	var NPages=0; 
        	
        	Source_List=obj.list_Table;

        	//alert("Showing Raw_Data : " + Raw_Data);
        	//alert("Showing List_Table : " + Source_List.length);
        	
        	NPages=response.one;
        	
        	var index=0;           	
        	
        	var limit=Source_List.length;

        	var Table=$('#'+TableName).DataTable();
        	
        	Table.clear().draw();
        	
        	var ColumnsCounter=response.two;
        	
        	if(ColumnsCounter==2)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,													
    					Source_List[index].a1,
    					
    					ButtonsPositions,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==3)
        	{        
        		//alert("ColumnsCounter==3 : " + ColumnsCounter);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					'<div class="Hider">'+ Source_List[index].a2 +'</div>',
    					
    					MergeButtons,
    					
    				  	'<div class="Hider">'+ Source_List[index].a0 +'</div>'    				  	
    				]).draw();
    				
    				//alert("Showing Row Wise PK ID : " + Source_List[index].a0);
    			}              		        		
        	}
        	else if(ColumnsCounter==4)
        	{
        		//alert("ColumnsCounter==4 : " + ColumnsCounter + " - " + FinalButtons);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,    					
    					FinalButtons,  					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==5)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					
    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',
    					
    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==6)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					
    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==7)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					
    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}
        	else if(ColumnsCounter==8)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					
    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	}        	
        	else if(ColumnsCounter==9)
        	{
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1,												
    					Source_List[index].a1,
    					Source_List[index].a2,
    					Source_List[index].a3,
    					Source_List[index].a4,
    					Source_List[index].a5,
    					Source_List[index].a6,
    					Source_List[index].a7,
    					Source_List[index].a8,
    					
    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>',    				  	
    				]).draw();
    			}              		        		
        	} 
        	else if(ColumnsCounter==10)
        	{
        		alert("ColumnsCounter==10 : " + ColumnsCounter + " - " + FinalButtons);
        		
        		for(index=0;index<limit;index++)
    			{
    				Table.row.add
    				([
    					index+1, 												
    					Source_List[index].a1, 
    					Source_List[index].a2, 
    					Source_List[index].a3, 
    					Source_List[index].a4, 
    					Source_List[index].a5, 
    					Source_List[index].a6, 
    					Source_List[index].a7, 
    					Source_List[index].a8, 
    					Source_List[index].a9, 

    					'<div class="BTN_Merge"></div>'+ '<div class="BTN_Merge"></div>',
    					'<div class="BTN_1"></div>',
    					'<div class="BTN_2"></div>',
    					'<div class="BTN_3"></div>',

    				  	'<div class="Hider">'+ Source_List[index].a0+'</div>', 
    				  	
    				]).draw();
    			}              		        		
        	}         	
        	       	
        	$("#"+TableName).find("tr td").each(function() 
			{
        		if($(this).find('.Hider').attr('class')=="Hider")
        		{
        			$(this).css('display','none');
        			
        			var values=$(this).text();
        			
        			if(values=="Y")
    				{        				
        				$(this).next().find("#SetBtn").text("UnSet").removeClass("btn btn-success").addClass("btn btn-warning");
    				}        			
        			else if(values="N")
    				{
        				$(this).parent().next().find("#SetBtn").text("Set").removeClass("btn btn-warning").addClass("btn btn-success");        				
    				}        			
        		}        		
			});
			
        	/* Adding Buttons To The Columns If Having Any */
        	
        	if(Buttons==0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		//alert($(this).find("div").attr("class"));
            		
            		var Division=$(this).find("div").attr("class");
            		
            		if(typeof(Division)!="undefined")
            		{
                		if(Division.startsWith("BTN"))
                		{
                    		if(Division.substr(0,5)=="BTN_")
        		    		$(this).css('display','none');            			
                		}            			
            		}
				});        		
        	}
        	else if(Buttons>0)
        	{
            	$("#"+TableName).find("tr td").each(function() 
				{
            		var Div=$(this).find("div").attr("class");
            		
            		if(typeof(Div)!="undefined")
            		{
                		var Temp=Div.substr(4,5);
                		
                		if(Style=="Joint")
            			{                			
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);     
                				$(".BTN_1").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();
                			}                			
            			}
                		else if(Style=="Single")
            			{
                			if(Div=="BTN_1")
                			{
                				$(this).prev().find("div").remove();
                				$(this).removeAttr("style");
                				$(this).append(Button1);
                				
                				$(".BTN_Merge").remove();
                				$(".BTN_2").remove();
                				$(".BTN_3").remove();                				
                			}                		     			
            			}            			
                		else if(Style=="Joint_One")
            			{
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}                		     			                			
            			}            			
                		else if(Style=="Joint_Two")
            			{
                			if(Temp=="Merge")
                			{
                				$(this).removeAttr("style");
                				$(this).append(MergeButtons);                				
                			}
                			if(Div=="BTN_1")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button1);                       				
                			}                		     			
                			if(Div=="BTN_2")
                			{
                				$(this).removeAttr("style");
                				$(this).append(Button2);                       				
                			}                		     			
            			}            			
            		}
				});        		
        	}        	
        	/* Adding Pagination Bar To The Table ! Important */
        	
        	addPagination(TableName,NPages);
        },
        
        error: function (e) 
        {
        	console.log("Error From Generalization : " + e);
        }            
    });
}

function addPagination(TableName,NPages)
{
	$('#PaginationArea_'+TableName).remove();
	
	var MainDivStart="<div id='PaginationArea_"+ TableName +"'>"
	
	var pageNumberDiv="<div id='Page_Numbers_"+ TableName +"'>";
	var unOrderedList="<nav><ul class='pagination' id='Pagination_"+ TableName +"'></ul></nav></div>";
	var historicNumbers="<input type='hidden' name='JSP_Page_Number_"+ TableName +"' id='JSP_Page_Number_"+ TableName +"' value='0' />";
	var historicPages="<input type='hidden' name='NPages_"+ TableName +"' id='NPages_"+ TableName +"' value='0' />";
	
	var MainDivEnds="</div>";
	
	var Paginating=MainDivStart + pageNumberDiv + unOrderedList + historicNumbers + historicPages + MainDivEnds;
	
	$('#'+TableName).append(Paginating);
	
	var ID=$('#'+TableName).find('ul').attr('id');

	$("#Pagination_"+TableName).empty();
	$("#Pagination_"+TableName).append("<li><a href='#' aria-label='Previous' id='Previous_"+ TableName +"'><span aria-hidden='true'>&laquo;</span></a></li>");

	var index=1;

	for(index=1;index<=NPages;index++)
	{
		var PinID='PN_'+TableName+'_'+index;
		$("#Pagination_"+TableName).append("<li><a href='#' id='"+ PinID +"'>"+ index +"</a></li>");
	}
	
	$('#Pagination_'+TableName).append("<li><a href='#' aria-label='Next' id='Next_"+ TableName +"'><span aria-hidden='true'>&raquo;</span></a></li>");
		
	$('#NPages_'+TableName).val(NPages);
	
	sessionStorage.setItem("TotalPages",NPages);
}

function pageClicking(ThisObject,TableName,URL)
{
	var PageNumber;
	var PN;
	var TotalPages=0;
	
	TableName=sessionStorage.getItem("TableName");
	URL=sessionStorage.getItem("URL");
	Temp=JSON.parse(sessionStorage.getItem("ArrayParams"));
	
	TotalPages=$('#NPages_'+TableName).val();
	
	var ID=$(ThisObject).attr('id');
	
	if(ID=="Next_"+TableName)
	{			
		if($('#JSP_Page_Number_'+TableName).val()=='0')
		PageNumber=parseInt($('#JSP_Page_Number_'+TableName).val()) + 2;
		else
		PageNumber=parseInt($('#JSP_Page_Number_'+TableName).val()) + 1;
		
		$('#JSP_Page_Number_'+TableName).val(PageNumber);

		if(PageNumber>TotalPages)
		PageNumber=TotalPages;
	}
	else if(ID=="Previous_"+TableName)
	{
		PageNumber=parseInt($('#JSP_Page_Number_'+TableName).val()) - 1;
		$('#JSP_Page_Number_'+TableName).val(PageNumber);
		
		if(PageNumber<TotalPages)
		PageNumber=1;	
	}
	else if(ID!="Next_"+TableName && ID!="Previous_"+TableName)
	{
		PN=$(ThisObject).attr('id');
		var lengthPN=PN.length;

		PageNumber=PN.substr(lengthPN-2,2);
		if(PageNumber.indexOf("_")!=-1)  
		PageNumber=PN.substr(lengthPN-1,2);
		
		if(PageNumber.length>=2)
		PageNumber=PN.substr(lengthPN-2,2);
		else
		PageNumber=PN.substr(lengthPN-1,2);
	}

	var JSP_Page_Number=$('#JSP_Page_Number_'+TableName).val();
	
	//alert(JSP_Page_Number + " - " + PageNumber);	
	//if(JSP_Page_Number!=PageNumber)
	
	sessionStorage.setItem("PageIndex",PageNumber);	
	SessionGetter();
	
	$('#JSP_Page_Number_'+TableName).val(PageNumber);
}

function deleteRowDatabase(arrayParameters)
{
	/*
	var arrayParameters={};
	
	arrayParameters[0]=$(this);
	arrayParameters[1]="StudentTable";
	arrayParameters[2]="ResponsiveDivName";
	arrayParameters[3]="URL";
	
	deleteRowDatabase(arrayParameters);
	
	For Table Reloading, Please call the ajaxLoaderxxxx() function here . . . !
	
	 */

	var ThisObject,TableName,ResponseDiv;
	
	ThisObject=arrayParameters[0];
	TableName=arrayParameters[1];
	ResponseDiv=arrayParameters[2];
	URL=arrayParameters[3]; /* Without PK ID For Deleting Row In Table(Database) ''*/ 
	
	//alert("Delete Row Database : " + JSON.stringify(arrayParameters));
	
	var PKID=$(ThisObject).parent().next().text();
	
	var count = $('#'+ TableName +' tbody').children('tr').length;
	var flag=false;
	
	//alert("Table Name : " + TableName);
	
	var TotalPaginationPages=sessionStorage.getItem("TotalPages"); /* If Table has multiple pages */
	
	//alert("TotalPaginationPages & Count : " + TotalPaginationPages + " - " + count);
	
			
	var temp="Value Before Ajax Call . . . !";
	sessionStorage.setItem("Data",temp);
	
	sessionStorage.setItem("ResponseDiv",ResponseDiv);
	
	$.ajax(
	{
		url:URL+'/'+ PKID +'.htm',
		dataType:"json",
		cache: false,
		contentType:'application/json; charset=utf-8', 
		type:'POST',						

		success:function(response)
		{
			ResponseDiv=sessionStorage.getItem("ResponseDiv"); 				
			$('#'+ResponseDiv).empty();				
			
			if(response.extra=="Success")
			{	
				SessionGetter();
				
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-success fade in");
					$('#'+ResponseDiv).append("<strong>Success : </strong>Information deleted successfully . . . !");							
					$('#'+ResponseDiv).css("display","block");														
					$('#'+ResponseDiv).fadeOut(6000);
				});
				
			}				
			else
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Error deleting information . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			$('#'+ResponseDiv).empty();		
		},
		error:function(error)
		{
			console.log(" From Page_Feedback.jsp : " + error);
		}
	});
}

function deleteRowTable(arrayParameters)
{
	/*
	var arrayParameters={};
	
	arrayParameters[0]=$(this);
	arrayParameters[1]="StudentTable";
	arrayParameters[2]="ResponsiveDivName";
	
	deleteRowTable(arrayParameters);
	
	*/
	
	var ThisObject,TableName,ResponseDiv;
	
	ThisObject=arrayParameters[0];
	TableName=arrayParameters[1];
	ResponseDiv=arrayParameters[2];
	
	$(ThisObject).parent().parent().remove();	
}

function getSelectedRowID()
{

}
function ajaxSave(arrayParameters)
{
	var FRM,URL,ResponseDiv,duplicateName;
	
	FRM=arrayParameters[0];
	ResponseDiv=arrayParameters[1];
	duplicateName=arrayParameters[2];
	URL=arrayParameters[3]; /* With PK ID For Deleting Row In Table(Database) ''*/ 
	
	var keyValue={};

	$("#"+ FRM +" :input").each(function()
	{
		keyValue[$(this).attr("name")]=$(this).val();			
	});
		
	sessionStorage.setItem("ResponseDiv",ResponseDiv);
	
	
	//alert("Data : " + JSON.stringify(keyValue) + " - " + arrayParameters);
	
	$.ajax(
	{ 
		url:URL,
		data: JSON.stringify(keyValue), 
		dataType:"json",
		cache: false,
		contentType:"application/json; charset=utf-8",
		type:"POST",	
	
		success:function(response)
		{				
			ResponseDiv=sessionStorage.getItem("ResponseDiv");
							
			$('#'+ResponseDiv).empty();				

			if(response.extra=="Success")
			{								
				SessionGetter();
				
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-success fade in");
					$('#'+ResponseDiv).append("<strong>Success : </strong>Information saved successfully . . . !");							
					$('#'+ResponseDiv).css("display","block");														
					$('#'+ResponseDiv).fadeOut(6000);
				});
				
			}				
			else if(response.extra=="Duplicate")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Entered "+ duplicateName +" already exist, try different . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			else if(response.extra=="Failed")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Error while saving information . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			
			$('#'+ResponseDiv).empty();
		},
		error: function (data, status, error) 
        {
        	console.log("From Universal : " + data + " Status : " + status + " -  Error : " + error);
        }
	});			
}

function numericValidator(ThisObject)
{
	$('#'+ThisObject).keyup(function()
	{
		if(isNaN(this.value) && this.value.length==0)
		{
			$('#'+ThisObject).val("");
			$('#'+ThisObject).focus();
			return false;
		}
		else
		{
			return true;
		}
	});
}
function ajaxSavePathVariableSingle(ArrayParams)
{
	var URL,ResponseDiv,duplicateName;
	
	ResponseDiv=ArrayParams[0];
	duplicateName=ArrayParams[1];
	data1=ArrayParams[2];
	data2=ArrayParams[3];
	data3=ArrayParams[4];
	URL=ArrayParams[5]; 
	
	var CustomURL;
	
	if(data2=="*" && data3=="*")
	CustomURL=URL+'/'+data1+'.htm';
	else if(data3=="*")
	CustomURL=URL+'/'+ data1 +'/'+ data2 +'.htm';	
	else
	CustomURL=URL+'/'+data1+'/'+ data2 +'/'+ data3 +'.htm';
	
	//alert("Showing Custom URL : " + CustomURL);
	
	sessionStorage.setItem("ResponseDiv",ResponseDiv);
	
	$.ajax(
	{ 
		url:CustomURL,
		dataType:"json",
		cache: false,
		contentType:"application/json; charset=utf-8",
		type:"POST",	
	
		success:function(response)
		{	
			ResponseDiv=sessionStorage.getItem("ResponseDiv");
			$('#'+ResponseDiv).empty();				
			
			if(response.extra=="Success")
			{												
				SessionGetter();

				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-success fade in");
					$('#'+ResponseDiv).append("<strong>Success : </strong>Information saved successfully . . . !");							
					$('#'+ResponseDiv).css("display","block");														
					$('#'+ResponseDiv).fadeOut(6000);
				});
				
			}				
			else if(response.extra=="Duplicate")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Entered "+ duplicateName +" already exist, try different . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			else if(response.extra=="Failed")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Error while saving information . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			
			$('#'+ResponseDiv).empty();
		},
		error: function (data, status, error) 
        {
        	console.log("From Universal : " + data + " Status : " + status + " -  Error : " + error);
        }
	});				
}
function SessionGetter() // Helps to call Pagination Loader.
{
	var TableName,PageIndex,URL;
	var Temp=[];
	
	TableName=sessionStorage.getItem("TableName");
	PageIndex=sessionStorage.getItem("PageIndex");
	URL=sessionStorage.getItem("URL");
	Temp=JSON.parse(sessionStorage.getItem("ArrayParams"));
	
	//alert("Table-URL-Temp : "+ TableName +"-"+ URL +"-"+JSON.stringify(sessionStorage.getItem("ArrayParams")));
	
	//alert("Testing JQuery Session After Ajax Cal  : " + sessionStorage.getItem("Data"));
	
	//for(var i=0;i<Temp.length;i++)
	//console.log(Temp[i]);
	if(sessionStorage.getItem("PaginationMethod")=="First") 
	{
		Ajax_PaginationLoader(TableName,PageIndex,URL,Temp);
		
		//sessionStorage.setItem("TableName","");
		//sessionStorage.setItem("PageIndex","");
		//sessionStorage.setItem("URL","");
		//sessionStorage.setItem("ArrayParams","");
		//sessionStorage.setItem("PaginationMethod","First");

		
	}
	else if(sessionStorage.getItem("PaginationMethod")=="Second")
	{
		var Options,PK1,PK2;
		
		Options=sessionStorage.getItem("Options");
		PK1=sessionStorage.getItem("PK1");
		PK2=sessionStorage.getItem("PK2");
		Ajax_PaginationLoaderMultiParam(TableName,PageIndex,URL,Options,PK1,PK2,Temp);
		
	}
}
/* Made In NeelRashi */

function Global_DD_Loader(URL,DropDown)
{
	$.ajax(
	{
		url:URL,
		contentType:"application/json",
		type:"POST",
		dataType: 'json',
		success:function(response)
		{
			var raw=JSON.stringify(response);
			var data=JSON.parse(raw);
			var len=data.result.length;
				
			if(len>0)
			for(var i=0;i<len;i++)
			{
			//alert("Data : " + data.result[i].data);
			//alert("DropDown Name : " + DropDown);
			$(DropDown).append('<option value="'+ data.result[i].key +'">'+ data.result[i].data +'</option>');
			}
		},
		error: function (e) 
	    {
	       	console.log("From Global_DD.JS : " + e);
	    }
	});		
}

function Global_DD_Child(URL,DropDown)
{
	$.ajax(
	{
		url:URL,
		contentType:"application/json",
		type:"POST",
		dataType: 'json',
		   
		success:function(response)
		{
			var raw=JSON.stringify(response);
			var data=JSON.parse(raw);
			var len=data.result.length;
	
			if(len>0)
			for(var i=0;i<len;i++)
			$(DropDown).append('<option value="'+ data.result[i].key +'">'+ data.result[i].data +'</option>');
		},
		error: function (e) 
	    {
	       	console.log("From Global_DD.JS : " + e);
	    }
	});		
}	
function DD_Change(DropDown)
{
	var returnValue;		
	returnValue=$(DropDown +" option:selected").val();
}

function setID_For_Editing(URL,RedirectURL,Mode,ID)
{	
	sessionStorage.setItem("Editing_Mode_RedirectURL",RedirectURL);	
	
	$.ajax
	({
	    type:"POST",
	    dataType:"json",
	    url:URL+"/"+ ID +"/"+ Mode +".htm",
	    contentType:"application/json",  
	    
	    success:function(response)
	    {       	   
	       if(response.status)      
    	   {
	    	   RedirectURL=sessionStorage.getItem("Editing_Mode_RedirectURL");
	    	   document.location.href=RedirectURL;	    	   
    	   }
	    },
	    error: function (data, status, error) 
	    {
	        console.log(data + " Status : " + status + " -  Error : " + error);
	    }
	}); 
}

function ajaxDetailsSaver(arrayParameters)
{	
	var URL,ResponseDiv;
	var Data;
	
	
	ResponseDiv=arrayParameters[0];
	URL=arrayParameters[1]; /* With PK ID For Deleting Row In Table(Database) ''*/
	Data=arrayParameters[2];
	
	/*
	var keyValue={};

	$("#"+ FRM +" :input").each(function()
	{
		keyValue[$(this).attr("name")]=$(this).val();			
	});
	*/
	sessionStorage.setItem("ResponseDiv",ResponseDiv);
		
	//alert("Data : " + Data + " - " + arrayParameters);
	
	$.ajax(
	{ 
        type:"POST",
        dataType:"json",	        
        url:URL,	  
        data:Data,
        mimeType:"application/json",
        contentType:"application/json", 
	
		success:function(response)
		{				
			ResponseDiv=sessionStorage.getItem("ResponseDiv");
							
			$('#'+ResponseDiv).empty();				

			if(response.extra=="Success")
			{								
				SessionGetter();
				
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-success fade in");
					$('#'+ResponseDiv).append("<strong>Success : </strong>Information saved successfully . . . !");							
					$('#'+ResponseDiv).css("display","block");														
					$('#'+ResponseDiv).fadeOut(6000);
				});
				
			}				
			else if(response.extra=="Duplicate")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Entered "+ duplicateName +" already exist, try different . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			else if(response.extra=="Failed")
			{
				$('#'+ResponseDiv).fadeIn(function()
				{
					$('#'+ResponseDiv).addClass("alert alert-danger fade in");
					$('#'+ResponseDiv).append("<strong>Error : </strong>Error while saving information . . . !")
					$('#'+ResponseDiv).css("display","block");							
					$('#'+ResponseDiv).fadeOut(6000);	
				});
			}
			
			$('#'+ResponseDiv).empty();
		},
		error: function (data, status, error) 
        {
        	console.log("From Universal : " + data + " Status : " + status + " -  Error : " + error);
        }
	});			
}
/*
function RowGenerator(ArrayParameters)
{	
	var limit,Source_List,FinalButtons,Table;	
	var index=0;	
	var Row="";
	
	
	limit=ArrayParameters[0];
	Source_List=ArrayParameters[1];
	FinalButtons=ArrayParameters[2];
	Table=ArrayParameters[3];
	ColumnsCounter=ArrayParameters[4];	
	var Counter=1;

	for(index=0;index<ColumnsCounter;index++)
	{
	
		Row=(index + 1) + 'Source_List[index].a'+Counter
		
	}
	
	
	for(index=0;index<limit;index++)
	{
		Table.row.add
		([
			index+1,													
			Source_List[index].a1,    					
			FinalButtons,
			
		  	'<div class="Hider">'+ Source_List[index].a0+'</div>',
		  	
		]).draw();
	}           	
}
*/
function ajaxDataGetter(ArrayParams)
{
	//alert("ArrayParams  : " + ArrayParams);
	
	var URL
	
	data1=ArrayParams[0];
	data2=ArrayParams[1];
	data3=ArrayParams[2];
	URL=ArrayParams[3]; 
	
	var CustomURL;
	
	var ReturnVal;
	
	if(data2=="*" && data3=="*")
	CustomURL=URL+'/'+data1+'.htm';
	else if(data3=="*")
	CustomURL=URL+'/'+ data1 +'/'+ data2 +'.htm';	
	else
	CustomURL=URL+'/'+data1+'/'+ data2 +'/'+ data3 +'.htm';
	
	//alert("Custom URL : " + CustomURL);
	
	$.ajax(
	{
		url:CustomURL,
		dataType:"json",
		cache: false,
		contentType:"application/json; charset=utf-8",
		type:"POST",
		async: false,
		
		success:function(response)
		{
			ReturnVal=response.one;
			return ReturnVal;
		},
		error:function(e)
		{
			console.log(e);
		}		
	});
	
	//alert("Return Array : " + ReturnVal);
	return ReturnVal;
	
}

/* Changes Made By Ketan S. Pote On : 10-September-2017.*/


