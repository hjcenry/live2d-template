var message_Path = 'http://172.16.1.98:8083/userContent/live2d-core';
var home_Path = 'http://172.16.1.98:8083/';

/**
 * 青云客机器人
 * http://api.qingyunke.com/
 * @param chatContent
 */
function sendChatToQingyunkeBot(chatContent) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://172.16.1.98:5000/robot2?key=free&appid=0&msg=" + chatContent,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
        }
    };

    Q.ajax(settings).done(function (response) {
        console.log(response);
        var jsonData = JSON.parse(response);
        var code = jsonData.result;
        var content = jsonData.content;
        if (code !== 0) {
            showMessage("我不知道说什么，并报了一个错:" + code + "-" + content, 5000);
        } else {
            showMessage(content, 5000);
        }
    });
}

/**
 * 图灵机器人
 * http://www.tuling123.com/
 * @param chatContent
 */
function sendChatToTulingBot(chatContent) {
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
            "apiKey": "1ddda776a4b9477683692035d3729845",
            "userId": "dmc"
        }
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://172.16.1.98:5000/robot",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
        },
        "data": JSON.stringify(reqJson)
    };

    Q.ajax(settings).done(function (response) {
        console.log(response);
        var jsonData = JSON.parse(response);
        var code = jsonData.intent.code;
        console.log("code:" + code);
        if (code === 4003) {
            // showMessage('今天的陪聊服务结束啦，明天再来吧', 5000);
            console.log('图灵机器人陪聊结束，转接青云客机器人');
            sendChatToQingyunkeBot(chatContent);
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
        if (jsonData !== '') {
            for (var i = 0, l = jsonData.results.length; i < l; i++) {
                if (jsonData.results[i].resultType === 'text') {
                    var text = jsonData.results[i].values.text;
                    showMessage(text, 5000);
                }
                // for (var key in jsonData.results[i]) {
                //     var resultObj = jsonData.results[i][key];
                //     showMessage(resultObj.values.text, 5000);
                // }
            }
        } else {
            showMessage('妹子笑而不语', 5000);
        }
    });
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
        sendChatToTulingBot(chatContent);
        // sendChatToQingyunkeBot(chatContent);
        Q(chatInput).val('');
    });

    //回车事件绑定
    Q(chatInput).bind('keyup', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            Q(sendChatBtn).click();
        }
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
