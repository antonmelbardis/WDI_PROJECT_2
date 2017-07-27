$(init);

function init(){
  console.log('Hello from the client side!');
  // getCarouselInfo();
  getHead();
  getData();
  // reAlign();
}

function getLatestHeadlines (){
  $
  .get(`https://newsapi.org/v1/articles?source=football-italia&sortBy=latest&apiKey=0be3820b0c504a99b398e8e09463baee`)
  .done(data2 =>{
    console.log(data2.articles);
    for (var i = 0; i < 8; i++) {
      $(`<img src="${data2.articles[i].urlToImage}" class="img-responsive" style="margin-top: 15px">
      <h2 class="title" style="text-align: left">${data2.articles[i].title}</h2></br>
      <p style="text-align: left">${data2.articles[i].description}</p>
      <h1 hidden>${data2.articles[i].url}</h1>
      <div type="button" id="but" class="btn btn-secondary btn-lg btn-block head pull-down" style="padding-bottom:15px; position:relative; bottom:5px">Read more...</div>`).appendTo($(`#${i}`));
    }
  });

}




function getHead (){
  setTimeout(getLatestHeadlines, 200);
}

function getData (){
  setTimeout(addListeners, 1000);
}

function reAlign (){
  setTimeout(buttonRealign(), 1000);
}

function addListeners() {
  $('.head').click(function(e) {
    // var txt = $(e.target).text();
    var newImg = $(e.target).siblings('img').attr('src');
    console.log(newImg);
    var newTitle = $(e.target).parent().children('h2').text();
    console.log(newTitle);
    var newTxt = $(e.target).parent().children('p').text();
    console.log(newTxt);
    var newUrl = $(e.target).parent().children('h1').text();
    var objToSend = {
      images: newImg,
      name: newTitle,
      description: newTxt,
      APIarticle: true,
      url: newUrl
    };

    $
    .post(`${window.location.origin}/articles`, objToSend)
    .then((response) => {
      console.log(response);
      window.location.href = `${window.location.origin}/articles/${response.id}`;
    });
  });
}

function buttonRealign(){
  $('.btn-secondary').each(function() {
    var $this=$(this);
    console.log('run');
    $this.css('margin-top', $this.parent().height()-$this.height());
  });
}
