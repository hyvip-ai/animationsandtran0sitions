const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect:'coverflow',//coverflow,slide,cube,flip
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type:"progressbar", //fraction,progressbar,custom,bullets
      clickable:true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: "none",
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
  });


  
  window.onload = function () {
    lax.init()

    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    // Add animation bindings to elements

  }
 
