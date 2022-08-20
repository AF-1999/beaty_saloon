$(document).ready(function(){ 
    $("#widther").html(window.innerWidth);
})
$(window).resize(function(){
    $("#widther").html(window.innerWidth);
});

$(document).ready(function(){

    $(".header_burger, .header_list div, .header_list div a ").click(function(event){
        $(".header_menu").toggleClass("active");
        $("body").toggleClass("lock");
    })
});





$(document).on("click", '#1', function(){
    $("#1a img:first-child").toggle();
    $("#1a img:last-child").toggle();
    $("#1p").slideToggle();
})

$(document).on("click", '#2', function(){
    $("#2a img:first-child").toggle();
    $("#2a img:last-child").toggle();
    $("#2p").slideToggle();
})

$(document).on("click", '#3', function(){
    $("#3a img:first-child").toggle();
    $("#3a img:last-child").toggle();
    $("#3p").slideToggle();
})

$(document).on("click", '#4', function(){
    $("#4a img:first-child").toggle();
    $("#4a img:last-child").toggle();
    $("#4p").slideToggle();
})

$(document).on("click", '#5', function(){
    $("#5a img:first-child").toggle();
    $("#5a img:last-child").toggle();
    $("#5p").slideToggle();
})

$(document).on("click", '#6', function(){
    $("#6a img:first-child").toggle();
    $("#6a img:last-child").toggle();
    $("#6p").slideToggle();
})

$(document).on("click", '#7', function(){
    $("#7a img:first-child").toggle();
    $("#7a img:last-child").toggle();
    $("#7p").slideToggle();
})

$(document).ready(function(){

    let $page = $('html, body');
        $('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

});

$(document).ready(function(){
    let position = 0;
    let currentSlide = 1;
    const slidesToShow = 1;
    const sliderToScroll = 1;
    const slider = $('.slider');
    const line = $('.slider_line');
    const slide = $('.slide');
    const slideCount = slide.length;
    const btnPrev = $('.prev');
    const btnNext = $('.next');
    const slideWidth = slider.width() / slidesToShow;
    const movePosition = sliderToScroll * slideWidth;    
    const counterTotal = Math.ceil(line.width() / slide.width()) ;

    slide.each(function(index, slide){
        $(slide).css({
            minwidth: slideWidth,
        });
    });

    btnPrev.click(function(){
        position += movePosition;

        setPosition();
        checkBtns();
        counterDown();
    });

    btnNext.click(function(){
        position -= movePosition;
        
        setPosition();
        checkBtns();
        counterUp();
    });

    const setPosition = function(){
        line.css({
            transform: `translateX(${position}px)`
        });
    };

    const checkBtns = function(){
        btnPrev.prop('disabled', position === 0);
        btnNext.prop(
            'disabled',
            position <= -(slideCount - slidesToShow) * slideWidth
        );
    };

    const counterUp = function(){
        if (currentSlide <= counterTotal){
            currentSlide++;
            $(".count__current").text(currentSlide);
        }
    }

    const counterDown = function(){
        if (currentSlide >0){
            currentSlide--;
            $(".count__current").text(currentSlide);
        }
    }

    const counterAll = function(){
        $(".count__total").text(counterTotal);
    }

    const sliderLineWidth = function(){
        $('.slider_line').css({
            width: slideWidth*counterTotal
        });
    }

    sliderLineWidth();
    counterAll();
    checkBtns();

});

$(document).ready(function () {
    let slideCount = 1;
    const line = $('.slider_line');
    const slide = $('.slide');
    const slideWidth = slider.width() / slidesToShow;
    const slidesToShow = 1;
    const slideCountTotal = line.width() / slide.width();


    function showSlide($slides) {
        //count image
        var currentNum = slide.attr('index');
        $('.count_total').html(currentNum );
   }

   showSlide();
});

$(document).on("mouseenter", ".category", function(){
    $(this).find(".price").stop(false,true).fadeIn(300);
    $(this).find(".lid").stop(false,true).fadeIn(300);
})

$(document).on("mouseleave", ".category", function(){
    $(this).find(".price").stop(false,true).fadeOut(300);
    $(this).find(".lid").stop(false,true).fadeOut(300);
})

$(document).on("mouseenter", ".category2", function(){
    $(this).find(".price2").stop(false,true).fadeIn(300);
    $(this).find(".lid2").stop(false,true).fadeIn(300);
})

$(document).on("mouseleave", ".category2", function(){
    $(this).find(".price2").stop(false,true).fadeOut(300);
    $(this).find(".lid2").stop(false,true).fadeOut(300);
})

$(document).on("click", "button.works", function(){
    $("button.works").addClass("bg_active");
    $("p.works").removeClass("text_inactive");
    $("button.studio").removeClass("bg_active");
    $("p.studio").addClass("text_inactive");
    $(".images").find(".works_photo").stop(false,true).fadeIn();
})

$(document).on("click", "button.studio", function(){
    $("button.studio").addClass("bg_active");
    $("p.studio").removeClass("text_inactive");
    $("button.works").removeClass("bg_active");
    $("p.works").addClass("text_inactive");
    $(".images").find(".works_photo").stop(false,true).fadeOut();
})