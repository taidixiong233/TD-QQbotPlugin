import { log, error, Plugin_info } from '../index'
import { config as TDconfig } from '../../config/config'
import { Client, GroupMessageEvent, segment, TextElem } from 'oicq'
import { use } from '../../src/function'

export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: '查天气',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './查天气/index.ts',
    uuid: 'ac0b56f4-c3fe-4591-b175-0f0acdd0e736',
    lib: [
        {
            name: 'ffmpeg',
            author: 'FFmpeg developers',
            version: 'N-109530-g4a80db5fc2-20230105',
            website: 'maohaoji.com',
            start_filename: './ffmpeg/index.ts',
            uuid: '22fdbec0-e870-4c1b-9d5b-e33bb7ca7389',
            lib: []
        },
        {
            name: '[前置]权限系统',
            author: 'taidixiong233',
            version: '1.0',
            website: 'maohaoji.com',
            start_filename: './[前置]权限系统/index.ts',
            uuid: '3e4b568d-bd47-4580-8a97-f98b808d01f4',
            lib: []
        }
    ]
}
import ffmpeg from '../ffmpeg'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import { getTime } from '../../src/function'
import * as child_process from 'child_process'
import Power from '../[前置]权限系统'

let settings = {
    groupId: TDconfig.groupId,
    key: '92be956685ef45fd82572b2081a*****',
    ffmpeg: ffmpeg
}
function Setup(client: Client) {
    const power = new Power()
    power.add_action('query_weather', '<=50')

    power.add_key(/^查+.+天气$|查天气/g)
    power.add_key(/^播报+.+天气$|播报天气/g)

    client.on('message.group', e => group_message.call(client, e, power))
}



async function group_message(this: Client, message: GroupMessageEvent, power: Power): Promise<void> {
    //过滤非设定群的消息
    if (!settings.groupId.includes(message.group_id)) return;

    if (message.message[0].type == 'at') message.message.splice(0, 1)
    if (message.message[0].type == 'reply') message.message.splice(0, 1)

    if (message.message[0].type == 'text' && /^查+.+天气$|查天气/g.test(message.message[0].text) && !/^播报+.+天气$|播报天气/g.test(message.message[0].text)) {
        power.query_power(message.sender.user_id, 'query_weather', message.raw_message, async data => {
            if (!data.allow) {
                if (data.message.length != 0) {
                    message.reply(data.message)
                    return
                }
                return
            } else {
                let locat = (function (str: string) {
                    let 查 = false, 天 = false, 气 = false, newstr = '';
                    for (let i of str) {
                        if (i == '查' && !查) 查 = true;
                        else if (i == '天' && !天) 天 = true;
                        else if (i == '气' && !气) 气 = true;
                        else newstr += i;
                    }
                    return newstr.replace(/\s*/g, "");
                }((message.message[0] as TextElem).text))

                if (locat == '') locat = '陈仓'

                try {
                    let location = await search(locat)
                    switch (location.code) {
                        case '200': {
                            let weather = await queryweather(location.location[0].id)
                            if (weather.code == '200') {
                                message.reply(make_result_string(location, weather), true)
                                return
                            } else {
                                message.reply(`api接口错误,请等待机器主人修复`, true)
                                putLog(weather, 'ERROR')
                                return
                            }
                        }
                        case '203': {
                            message.reply(`抱歉,没有找到地区"${locat}",暂不支持查询某个省的整体天气状况`, true)
                            return
                        }
                        default:
                            message.reply(`api接口错误,请等待机器主人修复`, true)
                            putLog(location, 'ERROR')
                    }
                } catch (err) {
                    message.reply(`api接口错误,请等待机器主人修复`, true)
                    putLog(err, 'ERROR')
                }
            }
        })
    }

    if (message.message[0].type == 'text' && /^播报+.+天气$|播报天气/g.test(message.message[0].text)) {
        power.query_power(message.sender.user_id, 'query_weather', message.raw_message, async data => {
            if (!data.allow) {
                if (data.message.length != 0) {
                    message.reply(data.message)
                    return
                }
                return
            } else {
                let locat = (function (str: string) {
                    let 天 = false, 气 = false, 播 = false, 报 = false, newstr = '';
                    for (let i of str) {
                        if (i == '天' && !天) 天 = true;
                        else if (i == '气' && !气) 气 = true;
                        else if (i == '播' && !播) 播 = true;
                        else if (i == '报' && !报) 报 = true;
                        else newstr += i;
                    }
                    return newstr.replace(/\s*/g, "");
                }((message.message[0] as TextElem).text))

                if (locat == '') locat = '陈仓'

                try {
                    let location = await search(locat)
                    switch (location.code) {
                        case '200': {
                            let weather = await queryweather(location.location[0].id)
                            if (weather.code == '200') {
                                let msg = make_result_string(location, weather)
                                if (!fs.existsSync(path.join(__dirname, './tmp'))) fs.mkdirSync(path.join(__dirname, './tmp'))
                                if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
                                if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
                                child_process.execSync(`curl -o "${path.join(__dirname, './tmp', 'input.mp3')}" "https://tts.youdao.com/fanyivoice?word=${url_encode(msg)}&le=zh&keyfrom=speaker-target"`);

                                child_process.execSync(`${settings.ffmpeg} -i "${path.join(__dirname, './tmp', 'input.mp3')}" -ac 1 -ar 8000 "${path.join(__dirname, './tmp', 'output.amr')}" -y`);
                                message.reply([segment.record(path.join(__dirname, './tmp', 'output.amr'))]).then(() => setTimeout(() => {
                                    if (fs.existsSync(path.join(__dirname, './tmp', 'input.mp3'))) fs.unlinkSync(path.join(__dirname, './tmp', 'input.mp3'))
                                    if (fs.existsSync(path.join(__dirname, './tmp', 'output.amr'))) fs.unlinkSync(path.join(__dirname, './tmp', 'output.amr'))
                                }, 1000)).catch(err => console.log(err))
                                return;
                            } else {
                                message.reply(`api接口错误,请等待机器主人修复`, true)
                                putLog(weather, 'ERROR')
                                return
                            }
                        }
                        case '203': {
                            message.reply(`抱歉,没有找到地区"${locat}",暂不支持查询某个省的整体天气状况`, true)
                            return
                        }
                        default:
                            message.reply(`api接口错误,请等待机器主人修复`, true)
                            putLog(location, 'ERROR')
                    }
                } catch (err) {
                    message.reply(`api接口错误,请等待机器主人修复`, true)
                    putLog(err, 'ERROR')
                }
            }
        })

    }
}





async function putLog(str: any, type = 'LOG'): Promise<void> {
    if (!fs.existsSync(path.join(__dirname, './log'))) fs.mkdirSync(path.join(__dirname, './log'))
    let time = new Date()
    let filename = `[LOG]${time.getFullYear()}-${time.getMonth() + 1}-${time.getDay()}.log`
    let log = ''
    if (fs.existsSync(path.join(__dirname, './log', filename))) log = fs.readFileSync(path.join(__dirname, './log', filename)).toString()
    if (log.length != 0) log += '\n\r'
    try {
        log += `[${type}] ${getTime()} ${(typeof str == 'object') ? JSON.stringify(str) : str}`
        fs.writeFileSync(path.join(__dirname, './log', filename), log)
    } catch {
        error('写log文件错误')
    }

}
/**
 * 查询某地的id
 * @param location 地区的字符串
 * @returns 接口返回的数据
 */
async function search(location: string): Promise<any> {
    try {
        let res = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${settings.key}&location=${url_encode(location)}`, { decompress: true })
        return new Promise(resolve => resolve({ ...res.data }))
    } catch (err) {
        return new Promise((resolve, reject) => {
            use(resolve)
            reject(err)
        })
    }
}

/**
 * 通过id获取某地的实时天气信息
 * @param location 某地的id
 * @returns 接口返回的数据
 */
async function queryweather(location: number): Promise<any> {
    try {
        let res = await axios.get(`https://devapi.qweather.com/v7/weather/now?key=${settings.key}&location=${location}&lang=zh`, { decompress: true })
        return new Promise(resolve => resolve({ ...res.data }))
    } catch (err) {
        return new Promise((resolve, reject) => {
            use(resolve)
            reject(err)
        })
    }
}

function make_result_string(location: any, weather: any): string {
    let res = `位于${location.location[0].country}${location.location[0].adm1}${location.location[0].adm2}的${location.location[0].name}实时天气情况如下:
${location.location[0].name}, ${weather.now.text}, 温度:${weather.now.temp}度, 体感温度:${weather.now.feelsLike}度, ${weather.now.windDir}${weather.now.windScale}级, 风速:${weather.now.windSpeed}千米每小时, 大气压强:${weather.now.pressure}百帕,`
    if (weather.refer.sources) res += `\n原始数据来源${weather.refer.sources}`
    if (weather.refer.license) res += `\n版权许可${weather.refer.license}`
    res += `\n数据于观测于${weather.now.obsTime}`
    return res
}


function url_encode(url: string) {
    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&amp;");

    return url;
}
