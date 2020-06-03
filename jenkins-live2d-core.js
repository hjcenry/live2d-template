var message_Path = 'http://172.16.1.98:8083/userContent/live2d-core';
var home_Path = 'http://172.16.1.98:8083/';

function chatUILogic() {
    var showChatBtn = Q("<button class='chat-button'>聊天</button>");
    Q('div#landlord').append(showChatBtn);
    Q(showChatBtn).show();
    var hideChatBtn = Q("<button class='chat-button'>不聊了</button>");
    Q('div#landlord').append(hideChatBtn);
    var sendChatBtn = Q("<button class='chat-button'>发送</button>");
    Q('div#landlord').append(sendChatBtn);
    var chatInput = Q("<input class='chatInput' style='opacity:0' />");
    Q('div#landlord').append(chatInput);

    Q(showChatBtn).click(function () {
        console.log('来聊天吧！');
        Q(chatInput).show();
        Q(sendChatBtn).show();
        Q(showChatBtn).hide();
        Q(hideChatBtn).show();
    });

    Q(hideChatBtn).click(function () {
        console.log('关闭聊天！');
        Q(chatInput).hide();
        Q(sendChatBtn).hide();
        Q(showChatBtn).show();
        Q(hideChatBtn).hide();
    });
}

//loadlive2d("live2d", "http://172.16.1.98:8083/userContent/live2d-core/model/tia/model.json");
Q(window).load(function () {
    console.log('window load!!!!');
    var div = Q("<div id='landlord'></div>");
    Q('body').append(div);
    var message = Q("<div class='message' style='opacity:0'></div>");
    Q('div#landlord').append(message);
    var canvas = Q("<canvas id='live2d' width=300 height=500 class='live2d-canvas'></canvas>");
    Q('div#landlord').append(canvas);
    var audio = Q("<audio id='my_audio' class='live2d-audio'></audio>");
    Q('body').append(audio);
    var hideBtn = Q("<button class='hide-button'>隐藏</button>");
    Q('div#landlord').append(hideBtn);
    var changeModelBtn = Q("<button id='Change'>切换</button>");
    Q('div#landlord').append(changeModelBtn);
    // var changeTextureBtn = Q("<button id='Texture'>换装</button>");
    // Q('div#landlord').append(changeTextureBtn);
    Q(hideBtn).click(function () {
        console.log('隐藏了！');
        Q(div).hide();
    });

    chatUILogic();

    InitLive2D();
});
