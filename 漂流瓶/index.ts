import { log, Plugin_info } from '../index'
import { config as TDconfig } from '../../config/config'
import { Client } from 'oicq'

export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: '漂流瓶',
    author: 'taidixiong233',
    version: '1.1',
    website: 'maohaoji.com',
    start_filename: './漂流瓶/index.ts',
    uuid: '6224eec1-5d98-447e-bd47-8155d4849d16',
    lib: [{
        name: '违禁词检测',
        author: 'taidixiong233',
        version: '1.0',
        website: 'maohaoji.com',
        start_filename: './违禁词检测/index.ts',
        uuid: 'd1c75927-fe58-492f-99d6-023e80060ad8',
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
    }]
}

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
    }
}


import * as mysql from "mysql"
import { GroupMessageEvent, TextElem, ImageElem, XmlElem, Forwardable, segment } from 'oicq'
import { v4 } from 'uuid'
import { IsBanWord } from '../违禁词检测'
import * as request from 'request-promise'
import Power from '../[前置]权限系统'

function Setup(client: Client) {
    /** 单位秒 */
    const timeout = 3600;

    const get_timeout = 3600;

    const maximgnum: number = 0;
    //最大照片数

    const power = new Power()

    power.add_action('扔漂流瓶', '<=50')
    power.add_action('捡漂流瓶', '<=50')
    power.add_action('漂流瓶帮助', '<=90')
    power.add_action('添加漂流瓶', '<=25')
    power.add_action('漂流瓶数量', '<=30')

    power.add_key(/扔漂流瓶|捡漂流瓶|漂流瓶|漂流瓶帮助|添加漂流瓶|漂流瓶数量/g)

    client.on("message.group", message => {

        //过滤非设定群的消息
        if (!settings.groupId.includes(message.group_id)) return;
        if (message.message[0].type === 'text' && /漂流瓶|漂流瓶帮助/.test(message.message[0].text) && !/扔漂流瓶|捡漂流瓶|添加漂流瓶|漂流瓶数量/.test(message.message[0].text)) {
            power.query_power(message.sender.user_id, '漂流瓶帮助', message.raw_message, async data => {
                if (!data.allow) {
                    if (data.message.length != 0) {
                        message.reply(data.message)
                        return
                    }
                } else {
                    message.reply(`这是漂流瓶 版本${config.version}
使用方法：
扔漂流瓶 内容
机器人会返回编号
投稿内容机器人会自动过滤违禁内容，请勿投稿任何违法违规内容，否则后果自负`, true)
                    return
                }
            })
        }



        if (message.message[0].type === 'text' && /扔漂流瓶/.test(message.message[0].text)) {
            power.query_power(message.sender.user_id, '扔漂流瓶', message.raw_message, async data => {
                if (!data.allow) {
                    if (data.message.length != 0) {
                        message.reply(data.message)
                        return
                    }
                } else {
                    if ((message.message[0] as TextElem).text.length <= 4 && message.message.length === 1) {
                        message.reply(`想发什么都不说的吗，这么高冷？`, true)
                        return
                    } else {
                        let sql = mysql.createPool(settings.database)
                        sql.query({
                            sql: `SELECT * FROM drifting_bottle WHERE QQid='${message.sender.user_id}' ORDER BY timeout DESC;`
                        }, (err, res) => {
                            sql.end()
                            if (err) {
                                message.reply(`数据库错误: ${err}`)
                                return;
                            } else {
                                if (res.length <= 0) {
                                    add_button(message).then(res => {
                                        if (res.success) {
                                            message.reply(`你扔出了一个漂流瓶了，编号是${res.msg}`)
                                        } else {
                                            message.reply(`发送失败，错误:
${res.msg}`)
                                        }
                                    })
                                } else {
                                    if ((new Date().getTime() - res[0].timeout) / 1000 <= timeout) {
                                        message.reply(`扔慢一点嘛，我都反应不过来了
现在的速度限制是${time_out_set(timeout)}一条`)
                                        return;
                                    } else {
                                        add_button(message).then(res => {
                                            if (res.success) {
                                                message.reply(`你扔出了一个漂流瓶了，编号是${res.msg}`)
                                            } else {
                                                message.reply(`发送失败，错误:
${res.msg}`)
                                            }
                                        })
                                    }
                                    return;
                                }
                            }
                        })
                    }
                }
            })

        }

        if (message.message[0].type === 'text' && /捡漂流瓶/.test(message.message[0].text)) {
            power.query_power(message.sender.user_id, '捡漂流瓶', message.raw_message, async data => {
                if (!data.allow) {
                    if (data.message.length != 0) {
                        message.reply(data.message)
                        return
                    }
                } else {
                    get_button(message).then(res => {
                        if (res.success) {
                            make_message(res.button_msg as Msg).then(res => {
                                if (res.success) {
                                    message.reply(segment.xml(res.data, res.id))
                                } else {
                                    message.reply(`错误: ${res.msg}`)
                                }
                            })
                        } else {
                            message.reply(`错误：${res.msg}`)
                        }
                    })
                }
            })

        }

        if (message.message[0].type === 'text' && /添加漂流瓶/.test(message.message[0].text) && message.sender.user_id === settings.masterId) {
            power.query_power(message.sender.user_id, '添加漂流瓶', message.raw_message, async data => {
                if (!data.allow) {
                    if (data.message.length != 0) {
                        message.reply(data.message)
                        return
                    }
                } else {
                    if (/[0-9]+/.test((message.message[0] as TextElem).text)) {
                        add_one_ask_button(Number(/[0-9]+/.exec((message.message[0] as TextElem).text))).then(res => {
                            if (res.success) {
                                message.reply(res.msg as string, true)
                            } else {
                                message.reply(res.msg as string, true)
                            }
                        })
                    } else {
                        add_one_ask_button(1).then(res => {
                            if (res.success) {
                                message.reply(res.msg as string, true)
                            } else {
                                message.reply(res.msg as string, true)
                            }
                        })
                    }
                }
            })

        }

        if (message.message[0].type === 'text' && message.sender.user_id === settings.masterId && /漂流瓶数量/.test(message.message[0].text)) {
            power.query_power(message.sender.user_id, '漂流瓶数量', message.raw_message, async data => {
                if (!data.allow) {
                    if (data.message.length != 0) {
                        message.reply(data.message)
                        return
                    }
                } else {
                    get_button_num().then(res => {
                        if (res.success) {
                            message.reply(res.msg as string, true)
                        } else {
                            message.reply(res.msg as string, true)
                        }
                    })
                }
            })

        }
    })

    interface Base_res {
        success: boolean,
        msg?: String
    }


    function add_button(message: GroupMessageEvent): Promise<Base_res> {
        return new Promise((resolve) => {
            var msg: Msg = {
                text: '',
                img: []
            }
            for (let i = 0; i < message.message.length; i++) {
                if (message.message[i].type === 'text') {
                    (msg.text as string) += clean0x20(clean_扔漂流瓶((message.message[i] as TextElem).text))
                }
                if (message.message[i].type === 'image') {
                    if ((msg.img as string[]).length < maximgnum) (msg.img as String[])[(msg.img as String[]).length] = (message.message[i] as ImageElem).url as String
                }
            }
            if ((msg.img as string[]).length === maximgnum) message.reply([((maximgnum as number) === 0) ? `暂不支持图片` : `最多支持${maximgnum}张图片`])

            if ((msg.text as string).length <= 0 && (msg.img as string[]).length <= 0) {
                resolve({
                    success: false,
                    msg: `没有需要发送的内容`
                })
            } else {
                IsBanWord(msg.text as string).then(res => {
                    if (res.state === 'success' && res.msg.type != '正常') {
                        resolve({
                            success: false,
                            msg: `敏感词警报: ${res.msg.msg as string}`
                        })
                    } else {
                        if (res.state === 'error') {
                            resolve({
                                success: false,
                                msg: `文本关键词审核错误${res.msg?.msg}`
                            })
                        } else {
                            let sql = mysql.createPool(settings.database)
                            let uuid: String = v4()
                            sql.query({
                                sql: `INSERT INTO drifting_bottle (QQid, id, msg, stat, timeout) VALUES ('${message.sender.user_id}', '${uuid}', '${JSON.stringify(msg)}', '0', '${new Date().getTime()}')`
                            }, (err) => {
                                if (err) {
                                    sql.end()
                                    resolve({
                                        success: false,
                                        msg: String(err)
                                    })
                                } else {
                                    sql.end()
                                    resolve({
                                        success: true,
                                        msg: uuid
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    function clean_扔漂流瓶(str: String): String {
        if (str.slice(0, 4) === '扔漂流瓶') return str.slice(4, str.length)
        else return str
    }

    function clean0x20(str: String): String {
        if (str.slice(0, 1) != ' ') return str;
        if (str.length <= 2) return str.slice(1, 2)
        for (let i = 0; i < str.length; i++) {
            if (str.slice(i, i + 1) != ' ') return str.slice(i, str.length)
        }
        return str
    }

    interface basebutton extends Base_res {
        sendid?: number,
        button_msg?: Msg,
        ts?: number
    }

    function get_button(message: GroupMessageEvent): Promise<basebutton> {
        return new Promise((resolve) => {
            let sql = mysql.createPool(settings.database)
            sql.query({
                sql: `SELECT * FROM drifting_bottle WHERE QQid='${message.sender.user_id}' ORDER BY timeout DESC;`
            }, (err, res) => {
                sql.end()
                if (err) {
                    resolve({
                        success: false,
                        msg: `连接数据库错误: ${err}`
                    })
                } else {
                    if (res.length <= 0) {
                        //new user
                        add_button_user(message).then(res => {
                            if (res.success) {
                                get_button_base().then(msg => {
                                    if (msg.success) {
                                        resolve(msg)
                                    } else {
                                        msg.success = false
                                        resolve(msg)
                                    }
                                })
                            } else {
                                resolve({
                                    success: false,
                                    msg: `获取漂流瓶错误: ${res.msg}`
                                })
                            }
                        })
                    } else {
                        if ((new Date().getTime() - res[0].timeout) / 1000 < get_timeout) {
                            resolve({
                                success: false,
                                msg: `你的扔漂流瓶和捡漂流瓶速度太快了哦，暂定的速度是${time_out_set(get_timeout)}/次`
                            })
                        } else {
                            get_button_base().then(msg => {
                                if (msg.success) {
                                    resolve(msg)
                                } else {
                                    msg.success = false
                                    resolve(msg)
                                }
                            })
                        }
                    }
                }
            })
        })
    }

    function get_button_base(): Promise<basebutton> {
        return new Promise((resolve) => {
            let sql = mysql.createPool(settings.database)
            sql.query({
                sql: `SELECT * FROM drifting_bottle WHERE stat=0;`
            }, (err, res) => {
                sql.end()
                if (err) {
                    resolve({
                        success: false,
                        msg: `读取数据库错误：${err}`
                    })
                } else {
                    if (res.length < 5) {
                        resolve({
                            success: false,
                            msg: `漂流瓶数量太少了`
                        })
                    } else {
                        let no: number = Math.floor(Math.random() * res.length)
                        if (no < 1) no = 1
                        if (no > res.length) no = res.length
                        let sql = mysql.createPool(settings.database)
                        sql.query({
                            sql: `UPDATE drifting_bottle SET stat=1 WHERE id='${res[no].id}' AND QQid='${res[no].QQid}'`
                        }, (err) => {
                            if (err) {
                                resolve({
                                    success: false,
                                    msg: `读取数据库错误：${err}`
                                })
                            } else {
                                resolve({
                                    success: true,
                                    button_msg: JSON.parse(res[no].msg)
                                })
                            }
                        })
                    }
                }
            })
        })
    }

    function add_button_user(message: GroupMessageEvent): Promise<Base_res> {
        return new Promise((resolve) => {
            let msg: Msg = {
                text: ''
            }
            get_one_ask().then(one_ask => {
                if (one_ask.success) {
                    msg.text += (one_ask.msg as string)
                    msg.img = []
                    let sql = mysql.createPool(settings.database)
                    sql.query({
                        sql: `INSERT INTO drifting_bottle (QQid, id, msg, stat, timeout) VALUES ('${message.sender.user_id}', '${v4()}', '${JSON.stringify(msg)}', '0', '${new Date().getTime()}')`
                    }, (err) => {
                        sql.end()
                        if (err) {
                            resolve({
                                success: false,
                                msg: `连接数据库错误: ${err}`
                            })
                        } else {
                            resolve({
                                success: true
                            })
                        }
                    })
                } else {
                    resolve({
                        success: false,
                        msg: `连接服务器错误: ${one_ask.msg}`
                    })
                }
            })
        })
    }

    function get_one_ask(): Promise<Base_res> {
        return new Promise((resolve) => {
            request({
                uri: `https://v1.hitokoto.cn/`
            }).then(res => {
                resolve({
                    success: true,
                    msg: JSON.parse(res).hitokoto
                })
            }).catch(err => {
                resolve({
                    success: false,
                    msg: err
                })
            })
        })
    }

    interface Msg {
        text?: String,
        img?: String[]
    }

    function time_out_set(time: number): String {
        if (time < 60) return `${time}秒`
        if (time < 3600 && Math.floor(time / 60) === (time / 60)) return `${time / 60}分钟`
        if (time < 3600 && Math.floor(time / 60) != (time / 60)) return `${Math.floor(time / 60)}分${time - Math.floor(time / 60) * 60}秒`
        return `约${time / 3600}小时`
    }

    function make_message(info: Msg): Promise<Base_res & XmlElem> {
        return new Promise((resolve) => {
            let message: Forwardable[] = []

            message[0] = {
                message: ((info.text as string) === '') ? ' ' : info.text as string,
                user_id: 80000000
            }
            if ((info.img as string[]).length <= 0) {
                client.makeForwardMsg(message).then(res => {
                    resolve({
                        success: true,
                        type: res.type,
                        id: res.id,
                        data: res.data
                    })
                }).catch(err => {
                    resolve({
                        success: false,
                        msg: err,
                        type: 'xml',
                        data: ``
                    })
                })
            } else {
                for (let i = 0; i < (info.img as String[]).length; i++) {
                    message[message.length] = {
                        message: segment.image((info.img as string[])[i]),
                        user_id: 80000000
                    }
                    if (i === ((info.img as String[]).length - 1)) {
                        client.makeForwardMsg(message).then(res => {
                            resolve({
                                success: true,
                                type: res.type,
                                id: res.id,
                                data: res.data
                            })
                        }).catch(err => {
                            resolve({
                                success: false,
                                msg: err,
                                type: 'xml',
                                data: ``
                            })
                        })
                    }
                }
            }
        })
    }

    function add_one_ask_button(num: number): Promise<Base_res> {
        return new Promise((resolve) => {
            let sql = mysql.createPool(settings.database)
            let error: number = 0
            for (let i = 0; i < num; i++) {
                setTimeout(() => {
                    get_one_ask().then(one_ask => {
                        if (one_ask.success) {
                            sql.query({
                                sql: `INSERT INTO drifting_bottle (QQid, id, msg, stat, timeout) VALUES ('80000000', '${v4()}', '{"text":"${one_ask.msg}","img":[]}', '0', '${new Date().getTime()}')`
                            }, (err) => {
                                if (err) {
                                    error++
                                }
                            })
                        } else error++
                        if (i === (num - 1)) {
                            sql.end()
                            if (error === num) {
                                resolve({
                                    success: false,
                                    msg: `失败次数${error}`
                                })
                            } else {
                                resolve({
                                    success: true,
                                    msg: `成功${num - error}个，失败${error}个`
                                })
                            }
                        }
                    })
                }, 20000)
            }
        })
    }

    function get_button_num(): Promise<Base_res> {
        return new Promise((resolve) => {
            let sql = mysql.createPool(settings.database)
            sql.query({
                sql: `SELECT * FROM drifting_bottle`
            }, (err, res) => {
                if (err) {
                    sql.end()
                    resolve({
                        success: false,
                        msg: `数据库错误: ${err}`
                    })
                } else {
                    sql.query({
                        sql: `SELECT * FROM drifting_bottle WHERE stat='0'`
                    }, (err, res0) => {
                        if (err) {
                            sql.end()
                            resolve({
                                success: false,
                                msg: `数据库错误: ${err}`
                            })
                        } else {
                            sql.query({
                                sql: `SELECT * FROM drifting_bottle WHERE stat='1'`
                            }, (err, res1) => {
                                if (err) {
                                    sql.end()
                                    resolve({
                                        success: false,
                                        msg: `数据库错误: ${err}`
                                    })
                                } else {
                                    sql.end()
                                    resolve({
                                        success: true,
                                        msg: `共${res.length}个漂流瓶,其中未被捡拾的有${res0.length}个，已被捡拾的有${res1.length}个，状态异常的有${res.length - res1.length - res0.length}个`
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

