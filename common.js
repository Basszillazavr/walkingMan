var curr;
var swapped = 0;
var $W = $(window);
var $man = $('.footer-walk-man');
var mw = $man.width();
var max = $W.width() - mw;
var time = $W.width()/(mw*1.2);

var walk = {
    init: function (){
        walk.right();
        walk.counters();
        $W.on('resize', function (){
            max = walk.getMax();
            time = $W.width()/mw;
        });
    },
    getMax: function (){
        return $W.width() - mw;
    },
    swap: function(){
        swapped = swapped ? false : true;
        curr = curr == '180deg' ? '0deg' : '180deg';
        TweenMax.set($man, {transform: 'rotateY('+ curr +')'});
    },
    left: function (){
        curr = swapped ? '0deg' : '180deg';
        TweenMax.set($man, {transform: 'rotateY('+ curr +')'});
        TweenMax.to(
            $man,
            time,
            {
                left: 0,
                ease: Power0.easeNone,
                onComplete: function(){
                    TweenLite.killTweensOf($man);
                    walk.right();
                }
            }
        );
    },
    right: function (){
        curr = swapped ? '180deg' : '0deg';
        TweenMax.set($man, {transform: 'rotateY('+ curr +')'});
        TweenMax.to(
            $man,
            time,
            {
                left: max,
                ease: Power0.easeNone,
                onComplete: function(){
                    TweenLite.killTweensOf($man);
                    walk.left();
                }
            }
        );
    },
    counters: function (){
        var $metr, $cal,
            _timer;
      
        $metr = $('.footer-walk-metr');
        $cal = $('.footer-walk-cal');
      
      console.log($metr.text());

        clearInterval(_timer);
        _timer = setInterval(function (){
            $metr.text(parseInt($metr.text())+1);
            $cal.text(Number(parseFloat($cal.text())+0.087).toFixed(2));
        }, 1000);
    }
};
  
walk.init();