// JavaScript Document

var channel = 'pubnub-mapbox';

eon.map({
  id: 'map',
  mb_token: 'pk.eyJ1IjoiaWFuamVubmluZ3MiLCJhIjoiZExwb0p5WSJ9.XLi48h-NOyJOCJuu1-h-Jg',
  mb_id: 'ianjennings.l896mh2e',
  channel: channel,
  connect: connect
});

function connect() {

var point = {
  latlng: [37.370375, -97.756138]
};

var pn = PUBNUB.init({
  publish_key: 'demo'
});

setInterval(function(){

  var new_point = JSON.parse(JSON.stringify(point));

  new_point.latlng = [
    new_point.latlng[0] + (getNonZeroRandomNumber() * 0.1),
    new_point.latlng[1] + (getNonZeroRandomNumber() * 0.2)
  ];

  pn.publish({
    channel: channel,
    message: [new_point] // even a single point should be an array
  });

}, 500);

};

var map = eon.map({
  id: 'map',
  mb_id: 'ianjennings.l896mh2e',
  //...
  message: function (data) {
    map.setView(data[3].latlng, 13);
  }
});