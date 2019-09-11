let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')

let current = 0

$buttons.eq(0).on('click',function(){
    console.log(current)
    $slides.css({transform:'translateX(0px)'})
    current = 0
})
$buttons.eq(1).on('click',function(){
    console.log(current)
    $slides.css({transform:'translateX(-300px)'})
    current = 1
})
$buttons.eq(2).on('click',function(){
    console.log(current)
    $slides.css({transform:'translateX(-600px)'})
    current = 2
})
$buttons.eq(3).on('click',function(){
    console.log(current)
    $slides.css({transform:'translateX(-900px)'})
    current = 3
})


