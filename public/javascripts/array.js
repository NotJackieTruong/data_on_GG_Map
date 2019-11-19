// test tach string coordinate thanh array coordinate objects *OK*
var str = '105.855157080083,21.0436808088276,0 105.849150258914,21.041204895272,0 105.848745000141,21.0410395367652,0 105.848056298363,21.04171828349,0 105.848303168218,21.0419127973244,0 105.847569041461,21.0426288037065,0 105.847228030522,21.0429352788099,0 105.846797173818,21.0433100383053,0 105.846474636128,21.0436841669566,0 105.846223943841,21.0440071713095,0 105.845901897781,21.0444830091914,0 105.845705053594,21.0447717809269,0 105.845489890849,21.0449929859892,0 105.845185074266,21.0453163493982,0 105.84478966075,21.0455892159563,0 105.844306363277,21.045926832972,0 105.843837450196,21.0462544415939,0 105.843029058894,21.0468680028678,0 105.842490508478,21.047344907617,0 105.841767071334,21.0481369856371,0 105.841534787065,21.0483917837651,0 105.840520033253,21.0497259258941,0 105.841852358616,21.0504334821852,0 105.84545336713,21.0528471107296,0 105.847270735452,21.0545508975372,0 105.847673218367,21.0538274224627,0 105.85025590489,21.0505377019582,0 105.852742698231,21.0470956759401,0 105.854140781739,21.0452321004746,0 105.855157080083,21.0436808088276,0'
var arr = str.split(/,| /)
for( var i = 0; i < arr.length; i++){ 
    arr[i] = arr[i]*1 
}
for( var i = 0; i < arr.length; i++){ 
    if ( arr[i] === 0) {
    arr.splice(i, 1); 
    }   
}
function storeCoordinate(xVal,yVal, array){
    array.push({lng: xVal, lat: yVal})
}
var arrCoor = new Array()
for( var i = 0; i < arr.length; ){
    storeCoordinate(arr[i],arr[i+1],arrCoor);
    i  = i+2
}
function initMap(){
    var center ={lat: 21.0453913, lng:105.8172996};
    var map = new google.maps.Map(
        document.getElementById('map'),{
            zoom: 6,
            center: center
        }
    );
    var phucxaPolygon = new google.maps.Polygon({
        paths: arrCoor,
        strokeColor: 'blue',
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: 'blue',
        fillOpacity: 0.35
    });
    phucxaPolygon.setMap(map);
}