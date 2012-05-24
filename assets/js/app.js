(function($) {
  $().ready(function (){
  
  	/* TABS ------------ */
  	function activateTab($tab) {
  		var $activeTab = $tab.closest('dl').find('a.active'),
  				contentLocation = $tab.attr("href") + 'Tab';
  				
  		// Strip off the current url that IE adds
  		contentLocation = contentLocation.replace(/^.+#/, '#');
  
  		//Make Tab Active
  		$activeTab.removeClass('active');
  		$tab.addClass('active');
  
      //Show Tab Content
  		$(contentLocation).closest('.tabs-content').children('li').hide();
  		$(contentLocation).css('display', 'block');
  	}
  
    $('nav dl.tabs dd a').live('click', function (event) {
      activateTab($(this));
    });
  
  	if (window.location.hash) {
  		activateTab($('a[href="' + window.location.hash + '"]'));
  		$.foundation.customForms.appendCustomMarkup();
  	}
  
  	/* ALERT BOXES ------------ */
  	$(".alert-box").delegate("a.close", "click", function(event) {
      event.preventDefault();
  	  $(this).closest(".alert-box").fadeOut(function(event){
  	    $(this).remove();
  	  });
  	});
  
  	/* PLACEHOLDER FOR FORMS ------------- */
  	$('input, textarea').placeholder();
  
  	/* TOOLTIPS ------------ */
  	$(this).tooltips();
  	
  	/* Display Running Clock ------------ */
  	setInterval('updateClock()', 1000);  
  });
})(jQuery);

function updateClock ( ) {
  /** From http://www.jquery4u.com/snippets/create-jquery-digital-clock-jquery4u/ **/
  var currentTime = new Date ( );
  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
   
  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
     
  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
     
  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
     
  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;
     
  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
   
  $("#clock").html(currentTimeString);
}
 