

var innerHTMLText = ``

Promise.all([
  fetch("https://api.npoint.io/af1c6d6c7ae84d939ae7")
  .then(function(response){
    return response.json();
}),
  fetch("https://api.npoint.io/9c37b57c34eb6fc78d18")
  .then(function(response){
    return response.json();
}),
]).then(([sectionList, sectionDetails]) => {
    for(var i = 0; i<sectionList.length; i++){
    var keyName = sectionList[i]
    innerHTMLText += `
    <h2 class="hs__headline">${keyName}
    </h2>
    <div class="hs__arrows"><a class="arrow disabled arrow-prev"></a><a class="arrow arrow-next"></a></div>
    <ul class="hs">`
    var singleObject = JSON.parse(JSON.stringify(sectionDetails[i][keyName]))  
      for (let j in singleObject) {
        innerHTMLText += `
        <li class="hs__item"> 
        <div class="hs__item__image__wrapper">
        <img class="hs__item__image" src="https://picsum.photos/id/103/300/300" alt=""/>
        </div>
        <div class="hs__item__description"><span class="hs__item__title">${singleObject[j].name}</span><span class="hs__item__subtitle">${singleObject[j].url}</span></div>
      </li>
        `
        console.log(singleObject[j])
      }
      innerHTMLText += '</ul>'
    }
    return innerHTMLText;
}).then(function(innerHTMLData){
  document.getElementsByClassName("hs__wrapper")[0].innerHTML = innerHTMLData
}).catch((err) => {
    console.log(err);
});

var instance = $(".hs__wrapper");

$.each( instance, function(key, value) {
    
  var arrows = $(instance[key]).find(".arrow"),
      prevArrow = arrows.filter('.arrow-prev'),
      nextArrow = arrows.filter('.arrow-next'),
      box = $(instance[key]).find(".hs"), 
      x = 0,
      mx = 0,
      maxScrollWidth = box[0].scrollWidth - (box[0].clientWidth / 2) - (box.width() / 2);

  $(arrows).on('click', function() {
      
    if ($(this).hasClass("arrow-next")) {
      x = ((box.width() / 2)) + box.scrollLeft() - 10;
      box.animate({
        scrollLeft: x,
      })
    } else {
      x = ((box.width() / 2)) - box.scrollLeft() -10;
      box.animate({
        scrollLeft: -x,
      })
    }
      
  });
    
  $(box).on({
    mousemove: function(e) {
      var mx2 = e.pageX - this.offsetLeft;
      if(mx) this.scrollLeft = this.sx + mx - mx2;
    },
    mousedown: function(e) {
      this.sx = this.scrollLeft;
      mx = e.pageX - this.offsetLeft;
    },
    scroll: function() {
      toggleArrows();
    }
  });

  $(document).on("mouseup", function(){
    mx = 0;
  });
  
  function toggleArrows() {
    if(box.scrollLeft() > maxScrollWidth - 10) {
        // disable next button when right end has reached 
        nextArrow.addClass('disabled');
      } else if(box.scrollLeft() < 10) {
        // disable prev button when left end has reached 
        prevArrow.addClass('disabled')
      } else{
        // both are enabled
        nextArrow.removeClass('disabled');
        prevArrow.removeClass('disabled');
      }
  }
  
});