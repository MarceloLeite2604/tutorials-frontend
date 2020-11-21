(
  function () {
    var onScrollThrottle = false;
    var imgs = document.querySelectorAll('img[data-src]');
    var windowInnerHeight = window.innerHeight;
    var cache = [];

    for (var index = 0; index < imgs.length; index++) {
      cache.push({
        top: imgs[index].getBoundingClientRect().top + window.pageYOffset,
        element: imgs[index]
      });
    }

    window.addEventListener('scroll', function scrollListener() {

      /* Throttles the event listener */
      if (onScrollThrottle) return;
      onScrollThrottle = true;
      setTimeout( function(){
        onScrollThrottle = false;
      }, 100);
    
      while(cache.length && cache[0].top < windowInnerHeight + window.pageYOffset + 200) {
        var img = cache.shift().element;
        img.src = img.getAttribute('data-src');
      }

      if (cache.length == 0) {
        window.removeEventListener('scroll', scrollListener);
      }
    });
  }
)();