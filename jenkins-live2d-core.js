var message_Path = 'http://172.16.1.98:8083/userContent/live2d-core';
var home_Path = 'http://172.16.1.98:8083/';
//loadlive2d("live2d", "http://172.16.1.98:8083/userContent/live2d-core/model/tia/model.json");
Q(window).load(function () {
    console.log('window load!!!!');
    //var canvas=Q("<canvas id='mycanvas' width=300px height=500px class='live2d-canvas'></canvas>");
    //Q('body').append(canvas);
    //var audio=Q("<audio id='my_audio' class='live2d-audio'></audio>");
    //Q('body').append(audio);
    //var button=Q("<button id='Change' class='live2d-button active'>click</button>")
    //Q('canvas').append(button)
    //var message=Q("<span class='message'></span>")
    //Q('body').append(message)
    var div = Q("<div id='landlord'></div>");
    Q('body').append(div);
    var message = Q("<div class='message' style='opacity:0'></div>");
    Q('div#landlord').append(message);
    var canvas = Q("<canvas id='live2d' width=300 height=600 class='live2d-canvas'></canvas>");
    Q('div#landlord').append(canvas);
    var audio = Q("<audio id='my_audio' class='live2d-audio'></audio>");
    Q('body').append(audio);
    var hideBtn = Q("<button class='hide-button'>隐藏</button>");
    Q('div#landlord').append(hideBtn);
    var changeModelBtn = Q("<button id='Change'>切换</button>");
    Q('div#landlord').append(changeModelBtn);
    var changeTextureBtn = Q("<button id='Texture'>换装</button>");
    Q('div#landlord').append(changeTextureBtn);
    Q(hideBtn).click(function () {
        console.log('隐藏了！');
        Q(div).hide();
    });
    InitLive2D();
});
