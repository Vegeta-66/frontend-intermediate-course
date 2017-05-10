var totalSteamNumber = 20;
var URLs = "https://api.twitch.tv/kraken/streams/";

$.ajax({
  url: URLs,
  data: {game: "League of Legends", limit: totalSteamNumber},
  dataType: "json",
  beforeSend: setHeader,
  success: succes,
  error: error
})
.done(function(resutls){
  var count=0;
  resutls.streams.forEach(function (stream){
    addItem(stream, count++);
  });
});

function setHeader(xhr){
  xhr.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json")
  xhr.setRequestHeader("Client-ID","rul619nx20kr8zdqtjp4zc5pa1umf5");
}

function succes(){
  console.log("succes!");
}

function error(xhr, ajaxOptions, thrownError){
  console.log(ajaxOptions);
  console.log(thrownError);
}

function addItem(stream, count){
  //`<div class=view-item-col'><div class='box-animation'><img src='{0}' class='preview' alt='preview'><div class='detial-container'><img src='{1}' class='icon' alt='icon'><div class='info'><span class='chanel'>{2}</span><span class='name'>{3}</span></div></div></div></div>`
  var appendString = `
    <div class="view-item-col">
      <div class="box-animation">
        <img src="${stream.preview.medium}" class="preview" alt="preview">
        <div class="detial-container">
          <img src="${stream.channel.logo}" class="icon" alt="icon">
          <div class="info">
            <span class="chanel">${stream.channel.status}</span>
            <span class="name">${stream.channel.name}</span>
          </div>
        </div>
      </div>
    </div>`;
  var rowNum = Math.floor(count/3);
  if (count%3 == 0){
    $(".view-container").append(`<div class="view-item-row" id="{$rowNum}"></div>`);
  }
  //console.log("count:{0}, row{1}".format(count, rowNum));
  $("#"+rowNum).append(appendString);
  console.log();
}
