//var canvas = document.getElementById("canvas")
//document.getElementById("backyard")

//var ctx = canvas.getContext('2d')

var rawimg = new Image();
var url = null;

var width = 10;
var height = 10;

document.getElementById("raw_image").onchange = function(e) {
    console.log("0");
    var backyard = document.createElement("canvas");
    var bctx = backyard.getContext('2d')

    var reader = new FileReader();
    reader.onload = function(ev) {
        rawimg.onload = function () {
            width = rawimg.width;
            height = rawimg.height;
            backyard.width = width;
            backyard.height = height;
            bctx.drawImage(rawimg, 0,0);

            console.log("1");
            var imgd = bctx.getImageData(0, 0, width, height);
            
            imgd.data.forEach( function (value, index, array) {
                if(array[index]>127) {
                    array[index] = 255;
                }
                else {
                    array[index] = 0;
                }
            });
            
            bctx.putImageData(imgd, 0, 0);
            url = backyard.toDataURL('image/png');

            document.getElementById("result_img").src = url;

        }
        rawimg.src = ev.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
};

