let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({ transform: 'translateX(-200px)' })
bindEvents()
const goToSlide$ = throttle(goToSlide, 1000);
$(next).on('click', function () {
    goToSlide$(current + 1);
})
$(previous).on('click', function () {
    goToSlide$(current - 1);
})

let timer = setInterval(function () {
    goToSlide$(current + 1)
}, 2000)
$('#container').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide$(current + 1)
    }, 2000)
})

function bindEvents() {
    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)  //取当前目标
        let index = $button.index()
        goToSlide$(index)
    })
}

function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 200}px)` })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 200}px)` })
                    .show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 200}px)` })
                    .show()
            })
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 200}px)` })
    }
    current = index
}

//克隆图片
function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)  //插入最后
    $slides.prepend($lastCopy)  //插入最前
}

//节流函数
function throttle(fn, delay) {
    var delay = delay || 1000; //没有传入delay，默认延迟1s
    let canRun = true;
    // 通过闭包保存一个标记，当作一个开关，只有setTimeout执行后,开关才为开启，标志变为ture;
    return function () {
        //在函数开头判断标志是否为 true，不为 true 则中断函数
        if (!canRun) {
            return;
        }
        canRun = false; //将 canRun 设置为 false，防止执行之前再被执行
        fn.apply(this,arguments);
        setTimeout(()=>{
            canRun = true;
        },delay);
    };
}