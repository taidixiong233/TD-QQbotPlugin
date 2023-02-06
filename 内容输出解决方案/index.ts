import { log, Plugin_info } from '../index'
import { Client, Quotable, Sendable } from 'oicq'
import { puterror, use } from '../../src/function'

export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: '内容输出解决方案',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './内容输出解决方案/index.ts',
    uuid: 'a5915382-0bce-43e0-8c20-89a65576d48a',
    lib: []
}

function Setup(client: Client) {
    use(client)
}
//{"app":"com.tencent.imagetextbot","config":{"ctime":1675303875,"token":"7bfd1aa4c3b9e0aa2568683aa913b230"},"extra":{"app_type":1,"appid":100951776,"msg_seq":1675303878061996,"uin":2964163802},"meta":{"robot":{"cover":"https://veeg.top/api/ip.php?group=236172566"}},"prompt":"[色色图片]","ver":"1.0.0.11","view":"index"}

export function sendPrivateMsg(type: "private", userid: number, msg: Sendable, client: Client, groupid: undefined, quotable?: Quotable): void
export function sendPrivateMsg(type: "usertemp", userid: number, msg: Sendable, client: Client, groupid: number, quotable?: Quotable): void
export function sendPrivateMsg(type: "private" | "usertemp", userid: number, msg: Sendable, client: Client, groupid?: number, quotable?: Quotable): void {
    if (type == 'private') {
        if (!client.fl.has(userid)) {
            puterror(`没有找到用户${userid}其不是机器人${client.uin}的好友`, config.name)
            return
        }
        client.sendPrivateMsg(userid, msg, quotable).catch(err => {
            puterror(`消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err},将尝试转发消息`)
            client.makeForwardMsg([{ user_id: client.uin, message: msg, time: Math.floor(new Date().getTime() / 1000), nickname: client.nickname }]).then(xml => {
                client.sendPrivateMsg(userid, xml).catch(err => {
                    puterror(`转发消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
                    puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
                    return
                })
            }).catch(err => {
                puterror(`转发消息制作失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
                puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
                return
            })
        })
    } else {
        client.sendTempMsg(groupid as number, userid, msg).catch(err => {
            puterror(`消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err},将尝试转发消息`)
            client.makeForwardMsg([{ user_id: client.uin, message: msg, time: Math.floor(new Date().getTime() / 1000), nickname: client.nickname }]).then(xml => {
                client.sendTempMsg(groupid as number, userid, xml).catch(err => {
                    puterror(`转发消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
                    puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
                    return
                })
            }).catch(err => {
                puterror(`转发消息制作失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
                puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
                return
            })
        })
    }
}


export function sendGroupMsg(groupid: number, msg: Sendable, client: Client, quotable?: Quotable): void {
    client.sendGroupMsg(groupid, msg, quotable).catch(err => {
        puterror(`消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err},将尝试转发消息`)
        client.makeForwardMsg([{ user_id: client.uin, message: msg, time: Math.floor(new Date().getTime() / 1000), nickname: client.nickname }]).then(xml => {
            client.sendGroupMsg(groupid, xml, quotable).catch(err => {
                puterror(`转发消息发送失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
                puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
                return
            })
        }).catch(err => {
            puterror(`转发消息制作失败${typeof err == 'object' ? JSON.stringify(err) : err}`, config.name)
            puterror(`消息内容${typeof msg == 'object' ? JSON.stringify(msg) : msg}`, config.name)
            return
        })
    })
}