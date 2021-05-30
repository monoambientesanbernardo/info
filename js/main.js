(function ($) {

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
	
	// local scroll


	
	// portfolio
    if($('.isotopeWrapper').length){

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }


            
        });

        $('#filter a').click(function(){



            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        $(window).smartresize(function(){
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
        

}  


	// fancybox
	jQuery(".fancybox").fancybox();


	if (Modernizr.mq("screen and (max-width:1024px)")) {
			jQuery("body").toggleClass("body");
			
	} else {
		var s = skrollr.init({
			mobileDeceleration: 1,
			edgeStrategy: 'set',
			forceHeight: true,
			smoothScrolling: true,
			smoothScrollingDuration: 300,
				easing: {
					WTF: Math.random,
					inverted: function(p) {
						return 1-p;
					}
				}
			});	
	}



	//scroll menu
	jQuery('.appear').appear();
	jQuery(".appear").on("appear", function(data) {
			var id = $(this).attr("id");
			jQuery('.nav li').removeClass('active');
			jQuery(".nav a[href='#" + id + "']").parent().addClass("active");					
		});


		//parallax
        var isMobile = false;

        if(Modernizr.mq('only all and (max-width: 1024px)') ) {
            isMobile = true;
        }

        
        if (isMobile == false && ($('#parallax1').length  ||isMobile == false &&  $('#parallax2').length ||isMobile == false &&  $('#testimonials').length))
        {


            $(window).stellar({
                responsive:true,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalScrolling: false,
                horizontalOffset: 0,
                verticalOffset: 0
            });

		}
		

		    //Contact Us
			$("#submit_btn_contact").click(function () {

                window.verifyRecaptchaCallback = function (response) {
                    $('input[data-recaptcha]').val(response).trigger('change')
                }
            
                window.expiredRecaptchaCallback = function () {
                    $('input[data-recaptcha]').val("").trigger('change')
                }

                //get input field values
                var user_name       = $('input[name=namecontact]').val();
                var user_email = $('input[name=emailcontact]').val();
                var user_telephone = $('input[name=phonecontact]').val();
                var user_subject = $('input[name=subjectcontact]').val();
                var user_message = $('textarea[name=messagecontact]').val();
                var captcha = $('textarea[name=g-recaptcha-response]').val();

                //simple validation at client's end
                var post_data, output;
                var proceed = true;
                if(user_name==""){
                        proceed = false;
                }
                if(user_email==""){
                        proceed = false;
                }
                if(user_subject==""){
                        proceed = false;
                }
                if(user_message=="") {
                        proceed = false;
                }
                if(captcha=="") {
                        proceed = false;
                        output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">Completa la casilla de verificación.</div>';
                }
                

                //everything looks good! proceed...
                if(proceed)
                {
                        //data to be sent to server
                        post_data = {'userName':user_name, 'userEmail':user_email,
                         'userTelephone':user_telephone, 'userSubject':user_subject,
                         'userMessage':user_message, 'g-recaptcha-response' :captcha };

                        //Ajax post data to server
                        $.post('contact.php', post_data, function(response){

                                //load json data from server and output message
                                if(response.type == 'error')
                                {
                                    output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">'+response.text+'</div>';
                                }else{
                                    output = '<div class="alert-success" style="padding:10px; margin-bottom:25px;">'+response.text+'</div>';
                
                                    //reset values in all input fields
                                    $('.callus input').val('');
                                    $('.callus textarea').val('');
                                    grecaptcha.reset();
                                }
                                
                
                                $("#result").hide().html(output).slideDown();
                        }, 'json');

                }
                else{
                    $("#result").hide().html(output).slideDown();
                }
        });

        //reset previously set border colors and hide all message on .keyup()
        $(".callus input, .callus textarea").keyup(function() {
                $("#result").slideUp();
        });
	
	//nicescroll
	$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#191919",cursoropacitymin:.5});
	function initNice() {
		if($(window).innerWidth() <= 960) {
			$('html').niceScroll().remove();
		} else {
			$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#191919",cursoropacitymin:.5});
		}
	}
	$(window).load(initNice);
	$(window).resize(initNice);



})(jQuery);