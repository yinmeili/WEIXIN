// const formatMsg = require('./fmtwxmsg');

// function help() {
//     return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
// }

// function userMsg(wxmsg, retmsg) {
//     /*
//         检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
//     */
//     if (wxmsg.MsgType == 'text') {
//         if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
//             retmsg.msg = help();
//             retmsg.msgtype = 'text';
//             return formatMsg(retmsg);
//         } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

//             retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
//             retmsg.msgtype = 'text';
//             return formatMsg(retmsg);

//         } 
//         //else if(wxmsg.Content == 'who'){
//         //     retmsg.msg = 'yyy';
//         //     retmsg.msgtype = 'text';
//             // return formatMsg(retmsg);
//         //}
//         else {
//             retmsg.msg = wxmsg.Content;
//             retmsg.msgtype = wxmsg.MsgType;
//             return formatMsg(retmsg);
//         }
//     } else {
//         switch(wxmsg.MsgType) {
//             case 'image':
//             case 'voice':
//                 retmsg.msg = wxmsg.MediaId;
//                 retmsg.msgtype = wxmsg.MsgType;
//                 break;
//             default:
//                 retmsg.msg = '不支持的类型';
//         }

//         return formatMsg(retmsg);
//     }
// }

// exports.userMsg = userMsg;
// exports.help = help;

// exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
//     return userMsg(wxmsg, retmsg);
// };
const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

//处理用户发过来的消息(解析后的用户消息，要返回的消息对象)
//基本处理过程：根据用户发过来的消息判断消息类型并进行处理
function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？' || wxmsg.Content == '帮助') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';//设置返回消息的类型为text
            return formatMsg(retmsg); //格式化消息并返回
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else if(wxmsg.Content == 'who'){
            retmsg.msg = '银美丽2017011698';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }else if(wxmsg.Content == 'about'){
            retmsg.msg = '我是开发者';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        }else {
            //非关键词是消息原样返回
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        /**
         * 非文本类型的消息处理
         */
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                /**因为发送的消息类型为空，所以返回默认的文本类型*/
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};
