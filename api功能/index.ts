import { log, Plugin_info} from '../index'
import {config as TDconfig} from '../../config/config'
import { Client } from 'oicq'
import axios from 'axios'

import * as path from 'path'
import * as fs from 'fs'
export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: 'api功能',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './api功能/index.ts',
    uuid: 'dac56ea3-1d82-4140-ac2a-13aa2534ad5d',
    lib: [{
        name: 'ffmpeg',
        author: 'FFmpeg developers',
        version: 'N-109530-g4a80db5fc2-20230105',
        website: 'maohaoji.com',
        start_filename: './ffmpeg/index.ts',
        uuid: '22fdbec0-e870-4c1b-9d5b-e33bb7ca7389',
        lib: []
    }]
}
import ffmpeg from '../ffmpeg'
let settings = {
    groupId: TDconfig.groupId,
    version: config.version,
    onlymaster: false,
    masterId: TDconfig.masterId,
    database: {
        host: '121.196.233.**',
        port: 3306,
        user: 'root',
        password: 'JxPWJRSAa2*******',
        database: 'qqgroupmsg'
    },
    ffmpeg: ffmpeg
}

import * as request from 'request-promise'
import { segment } from "oicq";
import * as child_process from 'child_process'

function Setup(client: Client) {
    client.on('message.group', message => {

        if (message.message[0].type === 'text' && /基友证/.test(message.message[0].text)) {
            if (message.message.length > 2 && message.message[1].type == 'at') {
                message.reply(segment.image(`https://xiaobapi.top/api/xb/api/stickers_certificate.php?qq=${message.message[1].qq}`), true)
            } else if (/[0-9]+/.test(message.message[0].text)) {
                message.reply(segment.image(`https://xiaobapi.top/api/xb/api/stickers_certificate.php?qq=${/[0-9]+/.exec(message.message[0].text)}`), true)
            } else {
                message.reply(segment.image(`https://xiaobapi.top/api/xb/api/stickers_certificate.php?qq=${message.sender.user_id}`), true)
            }
        }

        if (message.message[0].type === 'text' && /壁纸/.test(message.message[0].text)) {
            message.reply(segment.image(`https://xiaobapi.top/api/xb/api/bilibili_start_image.php?type=image`), true)
        }

        if (message.message[0].type === 'text' && /王者英雄/.test(message.message[0].text)) {
            if (/艾琳|阿古朵|阿轲|安琪拉|白起|百里守约|百里玄策|扁鹊|蔡文姬|曹操|成吉思汗|程咬金|嫦娥|达摩|妲己|大乔|狄仁杰|典韦|貂蝉|东皇太一|暃|干将莫邪|高渐离|公孙离|关羽|鬼谷子|宫本武藏|伽罗|戈娅|韩信|后羿|花木兰|黄忠|金蝉|姜子牙|镜|铠|狂铁|澜|兰陵王|李白|老夫子|李元芳|廉颇|刘邦|刘备|刘禅|鲁班大师|鲁班|露娜|吕布|李信|马可波罗|蒙犽|蒙恬|米莱迪|马超|芈月|明世隐|墨子|哪吒|牛魔|女娲|盘古|裴擒虎|上官婉儿|沈梦溪|司马懿|苏烈|孙膑|孙悟空|孙策|孙尚香|司空震|桑启|太乙真人|王昭君|武则天|夏侯敦|项羽|小乔|西施|夏洛特|瑶|曜|云中君|雅典娜|云缨|亚瑟|杨戬|杨玉环|弈星|嬴政|虞姬|元歌|张飞|张良|赵云|甄姬|钟馗|钟无艳|周瑜|诸葛亮|猪八戒|庄周/.test(message.message[0].text)) {
                axios.get(`https://xiaobapi.top/api/xb/api/wangzhe_music.php?msg=${url_encode(String(/艾琳|阿古朵|阿轲|安琪拉|白起|百里守约|百里玄策|扁鹊|蔡文姬|曹操|成吉思汗|程咬金|嫦娥|达摩|妲己|大乔|狄仁杰|典韦|貂蝉|东皇太一|暃|干将莫邪|高渐离|公孙离|关羽|鬼谷子|宫本武藏|伽罗|戈娅|韩信|后羿|花木兰|黄忠|金蝉|姜子牙|镜|铠|狂铁|澜|兰陵王|李白|老夫子|李元芳|廉颇|刘邦|刘备|刘禅|鲁班大师|鲁班|露娜|吕布|李信|马可波罗|蒙犽|蒙恬|米莱迪|马超|芈月|明世隐|墨子|哪吒|牛魔|女娲|盘古|裴擒虎|上官婉儿|沈梦溪|司马懿|苏烈|孙膑|孙悟空|孙策|孙尚香|司空震|桑启|太乙真人|王昭君|武则天|夏侯敦|项羽|小乔|西施|夏洛特|瑶|曜|云中君|雅典娜|云缨|亚瑟|杨戬|杨玉环|弈星|嬴政|虞姬|元歌|张飞|张良|赵云|甄姬|钟馗|钟无艳|周瑜|诸葛亮|猪八戒|庄周/.exec(message.message[0].text)))}`).then(res => {
                    if (res.data.code === 1 && res.data.text === "获取成功") {
                        let num = Math.floor(Math.random() * (res.data.data.length + 1))
                        if (num >= res.data.data.length) num = res.data.data.length
                        else if (num < 0) num = 0
                        message.reply([`查询到${res.data.hero}的${res.data.data.length}个语音，将随机播放一条: ${res.data.data[num].lines}`, segment.image(res.data.img)], true)

                        if (!fs.existsSync(path.join(__dirname, './tmp'))) fs.mkdirSync(path.join(__dirname, './tmp'))
                        if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
                        if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
                        child_process.execSync(`curl -o "${path.join(__dirname, './tmp', 'input.mp3')}" "${res.data.data[num].voice}"`);
                        child_process.execSync(`${settings.ffmpeg} -i "${path.join(__dirname, './tmp', 'input.mp3')}" -ac 1 -ar 8000 "${path.join(__dirname, './tmp', 'output.amr')}" -y`);

                        message.reply([segment.record(path.join(__dirname, './tmp', 'output.amr'))]).then(() => setTimeout(() => {
                            if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
                            if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
                        }, 1000)).catch(err => console.log(err))

                        return;
                    } else {
                        message.reply(`获取失败，错误信息${JSON.stringify(res)}`)
                    }
                }).catch(err => {
                    message.reply(`API接口错误，错误码:${err}`, true)
                })
            } else {
                message.reply(`暂时没有他的数据哦`, true)
            }
        }

        if (message.message[0].type === 'text' && /原神角色查询/.test(message.message[0].text)) {
            message.reply(segment.image(`https://xiaobapi.top/api/xb/api/ys-role.php?type=image&n=1&msg=${url_encode(clean0x20(message.message[0].text.slice(6, message.message[0].text.length) as string) as string)}`))
        }

        if (message.message[0].type === 'text' && /原神武器查询/.test(message.message[0].text)) {
            message.reply(segment.image(`https://xiaobapi.top/api/xb/api/ys-weapon.php?n=1&type=image&msg=${url_encode(clean0x20(message.message[0].text.slice(6, message.message[0].text.length) as string) as string)}`))
        }

        if (message.message[0].type === 'text' && /原神语音/.test(message.message[0].text)) {
            if (/七七|丽莎|九条裟罗|五郎|优菈|凝光|刻晴|可莉|宵宫|托马|旅行者|枫原万叶|温迪|烟绯|珊瑚宫心海|班尼特|琴|申鹤|砂糖|神里绫华|罗莎莉亚|胡桃|芭芭拉|荒泷一斗|莫娜|菲谢尔|行秋|诺艾尔|达达利亚|迪卢克|迪奥娜|重云|钟离|阿贝多|雷泽|雷电将军|香菱|魈/.test(message.message[0].text)) {
                message.reply(segment.record(`https://xiaobapi.top/api/xb/api/ysmusic_2.php?msg=${url_encode(String(/七七|丽莎|九条裟罗|五郎|优菈|凝光|刻晴|可莉|宵宫|托马|旅行者|枫原万叶|温迪|烟绯|珊瑚宫心海|班尼特|琴|申鹤|砂糖|神里绫华|罗莎莉亚|胡桃|芭芭拉|荒泷一斗|莫娜|菲谢尔|行秋|诺艾尔|达达利亚|迪卢克|迪奥娜|重云|钟离|阿贝多|雷泽|雷电将军|香菱|魈/.exec(message.message[0].text)))}`))
            } else {
                message.reply(`暂时没有这个角色的语音`, true)
            }
        }

        if (message.message[0].type === 'text' && /百度/.test(message.message[0].text)) {

            request({
                uri: `https://xiaobapi.top/api/xb/api/word.php?msg=${url_encode(clean0x20(message.message[0].text.slice(2, message.message[0].text.length) as string) as string)}&type=json`
            }).then(res => {
                res = JSON.parse(res)
                console.log(res)
                if (res.code == -2) {
                    message.reply(res.msg)
                } else {
                    client.makeForwardMsg(
                        [
                            {
                                user_id: settings.masterId,
                                message: [
                                    `搜索结果:\n${res.msg}`
                                ],
                                nickname: `百度搜索`
                            },
                            {
                                user_id: settings.masterId,
                                message: [
                                    res.url
                                ],
                                nickname: `百度搜索`
                            }
                        ]
                    ).then(res => {
                        message.reply(res)
                    }).catch(err => {
                        message.reply(`查询失败：${err}`)
                    })
                }
            }).catch(err => {
                message.reply(`API接口错误，错误码:${err}`, true)
            })
        }

        if (message.message[0].type === 'text' && message.message[0].text === '今天') {
            message.reply(segment.image(`https://xiaobapi.top/api/xb/api/60_3.php`), true)
        }

        if (message.message[0].type == 'text' && /绿茶/g.test(message.message[0].text)) {
            if (!fs.existsSync(path.join(__dirname, './tmp'))) fs.mkdirSync(path.join(__dirname, './tmp'))
            if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
            if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
            child_process.execSync(`curl -o "${path.join(__dirname, './tmp', 'input.mp3')}" "https://xiaobapi.top/api/xb/api/lvcha.php"`);

            child_process.execSync(`${settings.ffmpeg} -i "${path.join(__dirname, './tmp', 'input.mp3')}" -ac 1 -ar 8000 "${path.join(__dirname, './tmp', 'output.amr')}" -y`);
            message.reply([segment.record(path.join(__dirname, './tmp', 'output.amr'))]).then(() => setTimeout(() => {
                if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
                if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
            }, 1000)).catch(err => console.log(err))
        }
    })


    function url_encode(url: string): string {
        url = encodeURIComponent(url);
        url = url.replace(/\%3A/g, ":");
        url = url.replace(/\%2F/g, "/");
        url = url.replace(/\%3F/g, "?");
        url = url.replace(/\%3D/g, "=");
        url = url.replace(/\%26/g, "&amp;");

        return url;
    }

    function clean0x20(str: String): String {
        if (str.slice(0, 1) != ' ') return str;
        if (str.length <= 2) return str.slice(1, 2)
        for (let i = 0; i < str.length; i++) {
            if (str.slice(i, i + 1) != ' ') return str.slice(i, str.length)
        }
        return str
    }
}

