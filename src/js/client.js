$(init);

function init(){
  console.log('Hello from the client side!');
  // getCarouselInfo();
  getHead();
  getData();

  // $.ajax({
  //   url: 'http://news.bbc.co.uk',
  //   type: 'GET',
  //   success: function(res) {
  //       var headline = $(res.responseText).find('a.tsh').text();
  //       alert(headline);
  //   }
  // });

  // $.ajax({
  //      url:"http://rus.delfi.lv",
  //      dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
  //      success:function(json){
  //          // do stuff with json (in this case an array)
  //          alert("Success");
  //      },
  //      error:function(){
  //          alert("Error");
  //      }
  // });

}


function getLatestHeadlines (){
  $
  .get(`https://newsapi.org/v1/articles?source=football-italia&sortBy=latest&apiKey=0be3820b0c504a99b398e8e09463baee`)
  .done(data2 =>{
    console.log(data2.articles);
    for (var i = 0; i < 9; i++) {
      $(`<img src="${data2.articles[i].urlToImage}"><h2 class="head" >${data2.articles[i].title}</h2><p>${data2.articles[i].description} ...</p><h1 hidden>${data2.articles[i].url}</h1>`).appendTo($(`#${i}`));
    }
  });
}

function getHead (){
  setTimeout(getLatestHeadlines, 200);
}

function getData (){
  setTimeout(addListeners, 1000);
}

function addListeners() {
  $('.head').click(function(e) {
    var txt = $(e.target).text();
    console.log(txt);
    var newImg = $(e.target).siblings('img').attr('src');
    console.log(newImg);
    var newTitle = $(e.target).text();
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



// function addToBE () {
//   $('#addToBackend').on('click', function() {
//
//   })
// }
// <div class="carousel-caption">
//   <h3>Chicago</h3>
//   <p>Thank you, Chicago!</p>
//   </div>
//
// <img src="https://www.fillmurray.com/300/200"><h2>huuuuj</h2><p>some description</p>
