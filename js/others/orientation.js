/* orientation onchage event */
$(window).on("load orientationchange",function(){		
	if( /iPhone/i.test(navigator.userAgent) ) { /* checks whether it's iPhone or not*/
		if (window.orientation == 0 ){ /* checks whether it's portrait or not*/
		
			$('.ui-content').css('margin-top','10px'); 
			$('#email').css('font-size','small');  	
			$('#password').css('font-size','small'); 		
			$('.ui-mini ').css('font-size','small');
			$('#logo').css('height','40px'); 
			$('#logo').css('width','40px');  			
		  }else{
			$('.ui-content').css('margin-top','0px'); 
			$('#email').css('font-size','small');  	
			$('#password').css('font-size','small'); 		
			$('.ui-mini ').css('font-size','small'); 
			$('#logo').css('height','40px'); 
			$('#logo').css('width','40px');  			
		}
	}else if (/iPad/i.test(navigator.userAgent) ){/* checks whether it's iPad or not*/
		if (window.orientation == 0 ){ /* checks whether it's portrait or not*/
 
			$('.ui-content').css('margin-top','100px'); 
			$('#email').css('font-size','large');  	
			$('#password').css('font-size','large'); 		
			$('.ui-mini ').css('font-size','large'); 	
			$('#logo').css('height','85px'); 
			$('#logo').css('width','85px');  			
		  }else{
	 
			$('.ui-content').css('margin-top','70px'); 
			$('#email').css('font-size','large');  	
			$('#password').css('font-size','large'); 		
			$('.ui-mini ').css('font-size','large'); 
			$('#logo').css('height','85px'); 
			$('#logo').css('width','85px');  	
	
		}
	} 
});