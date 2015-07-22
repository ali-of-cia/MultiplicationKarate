$(document).ready(function(){

	var count = 0;
	var duration;
	var counter;

	/* Prevent the default form submit when users hit enter */
    $(window).keypress(preventSubmit);
    $(window).keydown(preventSubmit);
    $(window).keyup(preventSubmit);

    /* Puff up belt image when hovering over for emphasis */
    $(".belt").hover(makeBigger,returnToOriginalSize);


    /* When a user makes their belt selection */
    $(".belt").click(function(event){

    	 $(".navbar-collapse").collapse('hide');

         /* Set properties associated with Belt Object */
         var beltId = event.target.id;
         curBeltObj = getBelt(beltId);

         /* Hide belts other than selected */
         showOne(curBeltObj.id);
         
         if($(".progress").length == 0) {
             createDojo();
         }

         duration = curBeltObj.time;
         nextQuestion();
   
    });  

    /* A user can hit enter or click Hi-ya! button to check their answer */
    $('#dojo-container').on('keydown','input.userAnswer', function(event){
    	 if(event.keyCode == 13){
    		 evaluateAnswer();
    	}
    });
    $('#dojo-container').on('click','button.hi-ya', evaluateAnswer);


   $(".run-away").click(function(){
     	location.reload();
     }); 

   /* Show hamburger menu items */
   $(".navbar-toggle").click(function(){
       $('.mobile-belt').removeClass('hide');
   });

   /* Hide hamburger menu items at a certain size */
   $(window).resize(function(){
       if ($(window).width() > 768){
       	$('.mobile-belt').addClass('hide');
       }
   });


    function preventSubmit(){
    	if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }

    function nextQuestion(){
    	 count = -1; 
    	 $(".userAnswer").val('');
         clearInterval(counter);     
         countDown();    
         getEquation();              
    }


    function countDown(){
    	 counter = setInterval(function () {
             count++;
             if (duration < count){
      	         alert("Times up!");
      	         nextQuestion();
             }
             var percent = (parseInt(count) / parseInt(duration)) * 100; 
    	     $('.progress-bar').css("width", percent + "%");
         }, 1000); 
    }


    function evaluateAnswer(){
         var userAnswer = $('.userAnswer').val();
         if(userAnswer === ""){
         	 alert("Karate is fought with numbers!");
         	 (".userAnswer").focus();
         	 return;
         }
         var x = $('#equation').text();
         var equation = x.split(" ");
         var correctAnswer = parseInt(equation[0]) * parseInt(equation[2]);
             if (userAnswer == correctAnswer){
         	     alert("You are aweseome!");
         	     nextQuestion();
             } else {
         	     alert("Try again!");
         	     $(".userAnswer").focus();
             }
    }

 
    function getEquation(){
    	 var x = Math.floor((Math.random() * 10) + 1);
    	 var y = Math.floor((Math.random() * 10) + 1);
    	 $('#equation > p').text(x  + ' x ' + y);
    }

    function makeBigger() {
         $(this).css({height: '+=10%', width: '+=10%'});
    }

    function returnToOriginalSize() {
         $(this).css({height: "", width: ""});
    }

	function showOne(beltId){
         $('.selectHide').not('#' + beltId).hide("explode", { direction: "down" }, "slow" );
         $('.run-away').removeClass("hide");
	}

	function createDojo(){
	     /* Progress bar timer */
         $("#dojo-container").append(
      	                         '<div class="progress">' 
                                 +  '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"' 
                                 +  'style="width:0%"></div></div>').addClass("dojo col-xs-4 col-xs-offset-4");

         /* Awesome looking ninja gate */
         $("#dojo-container").append('<img class="img-responsive" src="img/ninjagate.png" />').addClass("dojo col-xs-4 col-xs-offset-4");

         $("#dojo-container").append('<div id="equation"></div>').addClass("col-xs-4");
         $("#equation").append("<p></p>");

         /* Form for user to enter equation answer */
         $("#dojo-container").append(
      	                          '<form>'
      	                         +   '<div class="form-group">'
      	                         +      '<label>Your move!</label>' 
                                 +      '<input type="number" placeholder="Answer here" class="form-control userAnswer">'
                                 +      '</div><button type="button" class="btn btn-default hi-ya">Hi-YA!</button>' 
                                 +'</form>').addClass("dojo");
         $(".userAnswer").focus();

	}

	function getBelt(beltId) {
   	     var curBeltObj = {};
         switch(beltId) {
			 case "white":
			 curBeltObj = {
				 id : "white",
                 time : 30
              };		
			  break;

			 case "yellow":
             curBeltObj = {
            	 id : "yellow",
	             time : 25
	         };
			 break;
	
			 case "orange":
			 curBeltObj  = {
				 id : "orange",
	             time : 20
	         }; 
			 break;
			
			 case "green":
			 curBeltObj = {
				 id : "green",
				 time : 15
			 };
			 break;

			 case "blue":
			 curBeltObj = {
				 id : "blue",
				 time : 10
			 };
			 break;	

			 case "purple":
			 curBeltObj = {
				 id : "purple",
				 time : 8
			 }; 
			 break;	
			
			 case "brown":
			 curBeltObj = {
				 id : "brown",
				 time : 6
			 };
			 break;

			 case "red":
			 curBeltObj = {
				id : "red",
				time : 4
			 };
			 break;
				
			 case "black":
			 curBeltObj = {
				 id : "black",
				 time : 2
			 };  
			 break;							
		}
		return curBeltObj;
	} 

});




