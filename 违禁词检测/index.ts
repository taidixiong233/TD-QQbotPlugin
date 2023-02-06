import { log, Plugin_info } from '../index'
import { Client } from 'oicq'
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
    name: '违禁词检测',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './违禁词检测/index.ts',
    uuid: 'd1c75927-fe58-492f-99d6-023e80060ad8',
    lib: []
}

import { 违禁词 } from './lib/wordconfig'

function Setup(client:Client) {use(client)}

interface Res {
    state : 'success'|'error',
    msg : Msg
}

interface Msg {
    type : '暴恐'|'反动'|'民生'|'色情'|'其他'|'正常'|String,
    msg? : String
}

export function IsBanWord(message:String):Promise<Res> {
    return new Promise((resolve) => {
        var res : Res = {
            state : 'success',
            msg : {
                type : '正常',
            }
        }

        if (res.msg.type === '正常') {
            for (let i = 0;i<= 违禁词.暴恐.length;i++) {
                if (message.indexOf(违禁词.暴恐[i]) != -1) {
                    res.msg.type = '暴恐'
                    res.msg.msg = `第${message.indexOf(违禁词.暴恐[i])+1}到第${message.indexOf(违禁词.暴恐[i])+1+违禁词.暴恐[i].length}个字符是${res.msg.type}违禁词`
                }
            }
            if (res.msg.type === '正常') {
                for (let i = 0;i<= 违禁词.反动.length;i++) {
                    if (message.indexOf(违禁词.反动[i]) != -1) {
                        res.msg.type = '反动'
                        res.msg.msg = `第${message.indexOf(违禁词.反动[i])+1}到第${message.indexOf(违禁词.反动[i])+1+违禁词.反动[i].length}个字符是${res.msg.type}违禁词`
                    }
                }
                if (res.msg.type === '正常') {
                    for (let i = 0;i<= 违禁词.民生.length;i++) {
                        if (message.indexOf(违禁词.民生[i]) != -1) {
                            res.msg.type = '民生'
                            res.msg.msg = `第${message.indexOf(违禁词.民生[i])+1}到第${message.indexOf(违禁词.暴恐[i])+1+违禁词.民生[i].length}个字符是${res.msg.type}违禁词`
                        }
                    }
                    if (res.msg.type === '正常') {
                        for (let i = 0;i<= 违禁词.色情.length;i++) {
                            if (message.indexOf(违禁词.色情[i]) != -1) {
                                res.msg.type = '色情'
                                res.msg.msg = `第${message.indexOf(违禁词.色情[i])+1}到第${message.indexOf(违禁词.色情[i])+1+违禁词.色情[i].length}个字符是${res.msg.type}违禁词`
                            }
                        }
                        if (res.msg.type === '正常') {
                            for (let i = 0;i<= 违禁词.其他.length;i++) {
                                if (message.indexOf(违禁词.其他[i]) != -1) {
                                    res.msg.type = '其他'
                                    res.msg.msg = `第${message.indexOf(违禁词.其他[i])+1}到第${message.indexOf(违禁词.其他[i])+1+违禁词.其他[i].length}个字符是${res.msg.type}违禁词`
                                }
                            }
                            resolve(res)
                        } else resolve(res)
                    } else resolve(res)
                } else resolve
            } else resolve(res)
        }
    });
}



