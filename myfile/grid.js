window.onload = function(){

var mapSketch = function(p5j){
    p5j.earthquakes;
    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.map = L.map('map').setView([0,0], 2); // 經緯度 比例

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(p5j.map); // 將openstreetmap資料下載到 畫面中

    p5j.preload = function() { // 需要先讀取 json
      // 取得日期段內的強度大於3的地震
      let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
        'format=geojson&starttime=2020-03-01&endtime=2020-04-12&minmagnitude=3';

      p5j.httpGet(url, 'jsonp', false, function(response) {
        p5j.earthquakes = response; // 會把所有回呼資料存於 earthquakes
      });
    }

    p5j.setup = function(){
    }

    p5j.draw = function(){
      if (!p5j.earthquakes) {
        // Wait until the earthquake data has loaded before drawing.
        return;
      }else {
          if (p5j.loaded === 1){
          p5j.earthquakes.features.forEach((val)=>{
            L.circle([val.geometry.coordinates[1], val.geometry.coordinates[0]], { // 緯度在前面
                color: 'yellow',
                fillColor: '#fff100',
                fillOpacity: 0.1,
                stroke: false, // 取消邊線
                radius: val.properties.mag*100000 // 強度 乘上大小單位為公尺    
            }).addTo(p5j.map).bindPopup('Here is '+val.geometry.coordinates[1]+','+val.geometry.coordinates[0]);
          });

        }
    
        p5j.loaded +=1;
      }    
  }
}
  
new p5(mapSketch, 'map');
}