var message_Path = 'http://172.16.1.98:8083/userContent/live2d-core';
var home_Path = 'http://172.16.1.98:8083/';

function sendChatToBot(chatContent) {
    var reqJson = {
        "reqType": 0,
        "perception": {
            "inputText": {
                "text": chatContent
            },
            "selfInfo": {
                "location": {
                    "city": "北京",
                    "province": "北京",
                    "street": "信息路"
                }
            }
        },
        "userInfo": {
            "apiKey": "1e2a0c44b3994b4ab0679704f2588591",
            "userId": "dmc"
        }
    };

    Q.ajax(
        {
            url: "http://openapi.tuling123.com/openapi/api/v2",
            data: reqJson,
            type: POST,
            dataType: json,
            success: function (data) {
                console.log(data);
                var code = data.intent.code;
                if (code === 5000) {
                    showMessage('妹子无fuck说', 5000);
                    return;
                }
                /*
                {
                    "intent": {
                        "code": 10005,
                        "intentName": "",
                        "actionName": "",
                        "parameters": {
                            "nearby_place": "酒店"
                        }
                    },
                    "results": [
                        {
                            "groupType": 1,
                            "resultType": "url",
                            "values": {
                                "url": "http://m.elong.com/hotel/0101/nlist/#indate=2016-12-10&outdate=2016-12-11&keywords=%E4%BF%A1%E6%81%AF%E8%B7%AF"
                            }
                        },
                        {
                            "groupType": 1,
                            "resultType": "text",
                            "values": {
                                "text": "亲，已帮你找到相关酒店信息"
                            }
                        }
                    ]
                }
                */
                if (data !== '') {
                    for (var resultObj in results.results) {
                        if (resultObj.resultType === 'text') {
                            showMessage(resultObj.values.text, 5000);
                        }
                    }
                    // for (var i = 0; i < results.results.length; i++) {
                    // }
                    showMessage(data, 5000);
                } else {
                    showMessage('妹子笑而不语', 5000);
                }
            },
            error: function () {
                showMessage('妹子短路啦！', 5000);
            }
        }
    );
}

function chatUILogic() {
    var showChatBtn = Q("<button class='chat-button'>聊天</button>");
    Q('div#landlord').append(showChatBtn);
    Q(showChatBtn).show();
    var hideChatBtn = Q("<button class='chat-button'>不聊了</button>");
    Q('div#landlord').append(hideChatBtn);
    var sendChatBtn = Q("<button class='chat-button'>发送</button>");
    Q('div#landlord').append(sendChatBtn);
    var chatInput = Q("<input class='chatInput' style='opacity:50' />");
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

    Q(sendChatBtn).click(function () {
        var chatContent = Q(chatInput).val();
        console.log(chatContent);
        var reply = sendChatToBot(chatContent);
        if (reply !== '') {
            showMessage(reply, 5000);
        } else {
            showMessage(chatContent, 5000);
        }
    })
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
