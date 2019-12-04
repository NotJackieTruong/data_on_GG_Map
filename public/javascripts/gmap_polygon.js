// test tach string coordinate thanh array coordinate objects *OK*
function storeCoordinate(xVal,yVal, array){
    array.push({lng: xVal, lat: yVal})
}
function getCoordinate(id){
    var CoordinateString = ObjectData[id].Coordinates
    var arr = CoordinateString.split(/,| /)
    for( var i = 0; i < arr.length; i++){ 
        arr[i] = arr[i]*1 
    }
    for( var i = 0; i < arr.length; i++){ 
        if ( arr[i] === 0) {
        arr.splice(i, 1); 
        }   
    }
    var Coordinate = []
    for( var i = 0; i < arr.length; ){
        storeCoordinate(arr[i],arr[i+1],Coordinate);
        i  = i+2
    }
    return Coordinate
}

var map;
var maxPopulation = 81690
var minPopulation = 0
var polygonArray = []
var setPolygon;


//Hiện thông tin polygon
var addListenersOnPolygon = function(polygon) {
    google.maps.event.addListener(polygon, 'click', function (event) {
        console.log(polygon.getPaths())
        $('#population').val(polygon.tag);
        openNav();
        // if(polygon.getVisible() == true){
        //     polygon.setVisible(false)
        // }
        // else{
        //     polygon.setVisible(true)
        // }
    });  
  }

//lấy population từ database
function getPopulation(P){
    if(isNaN(P)){
        var a = P.replace(/\,/g,'')
        a = parseInt(a)
        return a
    }
    else{
        return P
    }
}

//đổi độ đậm nhạt
function opacityOverlay(population){
    var opacity = (population - minPopulation)/(maxPopulation-minPopulation)
    return opacity;
}

//Đổi màu polygon
function colorOverlay(population){
    var heso = (population - minPopulation)/(maxPopulation-minPopulation)//dân số tăng hệ số tăng
    var colorchange = heso*510 //dân số tăng colorchange tăng
    var red = green = 0
    var blue = 100

    if( colorchange < 100){
        red = colorchange*2.55
        green = 255
    }
    else{
        red = 255
        green = (-51/82)*colorchange+13005/41
    }
    return ["rgb(",red,",",green,",",blue,")"].join("")
}

//Lẩy center polygon
function polygonCenter(poly) {
    var latitudes = [];
    var longitudes = [];
    var vertices = poly.getPath();

    // put all latitudes and longitudes in arrays
    for (var i = 0; i < vertices.length; i++) {
        longitudes.push(vertices.getAt(i).lng());
        latitudes.push(vertices.getAt(i).lat());
    }

    // sort the arrays low to high
    latitudes.sort();
    longitudes.sort();

    // get the min and max of each
    var lowX = latitudes[0];
    var highX = latitudes[latitudes.length - 1];
    var lowy = longitudes[0];
    var highy = longitudes[latitudes.length - 1];

    // center of the polygon is the starting point plus the midpoint
    var centerX = lowX + ((highX - lowX) / 2);
    var centerY = lowy + ((highy - lowy) / 2);

    return (new google.maps.LatLng(centerX, centerY));
}

// function ve polygon
function drawPolygon(googlemap, Pathcoordinate, id){
    setPolygon = new google.maps.Polygon({
        paths: Pathcoordinate,
        strokeColor: 'purple',
        strokeOpacity: 10,
        strokeWeight: 0.2,
        visible: true,
        fillColor: colorOverlay(getPopulation(ObjectData[id].Population)),
        fillOpacity: 5,
        tag: "Phường: "+ObjectData[id].Ward+"\nThành phố: "+ ObjectData[id].City+"\nTỉnh: "+ObjectData[id].Province+"\nDân Số: "+ObjectData[id].Population ,
    
    });
  
    polygonArray.push(setPolygon);
    setPolygon.setMap(googlemap);
    addListenersOnPolygon(setPolygon);
    // const marker = new google.maps.Marker({
    //     map: map,
    //     label: 'name',
    //     position: polygonCenter(setPolygon),
    //     icon: {
    //         path: google.maps.SymbolPath.CIRCLE,
    //         scale: 0
    //     }
    //   });
}
function removePolygon(){
    for(var i = 0; i<polygonArray.length; i++){
        var removePolygon = polygonArray.pop(setPolygon)
        removePolygon.setMap(null)

    }
}


//initialize gg map on the website

function initMap() {
    initialize();
}