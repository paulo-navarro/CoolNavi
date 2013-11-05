var defaultColor = '#fff';
var defaultExitAnimation = 'fade';
var defaultEntryAnimation = 'fade';

window.onpageshow = function(evt) {
     if (evt.persisted) {
        document.body.style.display = "none";
        location.reload();
    }
};


function coolNaviEntry(){
    var color = (localStorage.color === '')? defaultColor : localStorage.color;
    var entry = (localStorage.entry === '')? defaultEntryAnimation +' ' : localStorage.entry + ' ';
    $('html').css('backgroundColor', color);
    entry = entry.split(" ");
    $('body').css('position', 'relative');
        $.each(entry, function(index, value){
            switch(value){
                case 'fade' : $('body').css('opacity', 0); break;
                case 'slideDown' : $('body').css('top', '-100%'); break;
                case 'slideUp' : $('body').css('top', '100%'); break;
                case 'slideLeft' : $('body').css('left', '100%'); break;
                case 'slideRight' : $('body').css('left', '-100%'); break;
            }
            
        });
                
        $('body').animate({
            opacity: 1,
            top: 0,
            left: 0
            
        }, 500);
        localStorage.color = '';
        localStorage.entry = '';
        $('body').css('display', 'block');
}

function coolNaviExit(href, exitAnimation, entryAnimation, color){
     $('html').css('backgroundColor', color);
     $('body').css('position', 'relative');
     localStorage.color = color;
     localStorage.entry = entryAnimation;
     if ((event.ctrlKey === false) && (event.shiftKey === false)){
        var height = $('body').height();
        exit = exitAnimation.split(" ");
        ani = new Object();
        $.each(exit, function(index, value){
            switch(value){
                case 'fade' : ani.opacity = 0; break;
                case 'slideDown' : ani.top = height + 40; break;
                case 'slideUp' : ani.top = - height - 40; break;
                case 'slideLeft' : ani.left = '-100%'; break;
                case 'slideRight' : ani.left = '100%'; break;
            }
            
        });
                
        $('body').animate(ani, 500, function(){
           window.location.href = href;
        });
     }
}

$("body").ready(function(){
    coolNaviEntry();
    $("a").click(function( event ){
        
 
        if(($(this).data('exit') !== undefined) || $(this).data('entry') !== undefined){
            if ((event.ctrlKey === false) && (event.shiftKey === false))
               event.preventDefault();
            
            
            var color = ($(this).data('color') !== undefined)? $(this).data('color') : defaultColor;
            var exit = ($(this).data('exit') !== undefined) ? $(this).data('exit') : defaultExitAnimation;
            var entry = ($(this).data('entry') !== undefined) ? $(this).data('entry') : '';
            var href = $(this).attr('href');

            coolNaviExit(href, exit, entry, color);       
        }
    });
   
});
