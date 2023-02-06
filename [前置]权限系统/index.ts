import { log, Plugin_info } from '../index'
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
    name: '[前置]权限系统',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './[前置]权限系统/index.ts',
    uuid: '3e4b568d-bd47-4580-8a97-f98b808d01f4',
    lib: []
}


function Setup(client: Client) {
    const power = new Power()
    power.add_action('权限查询', '<=90')
    power.add_key(/权限查询/g)

    client.on('message.group', e => power.query_power(e.sender.user_id, '权限查询', e.raw_message, async data => {
        if (!data.allow) {
            if (data.message.length!=0) {
                e.reply(data.message)
                return
            }
            return
        } else {
            if (e.message.length === 1 && e.message[0].type == 'text' && /权限查询/g.test(e.message[0].text)) {
                e.reply(`你的权限为: ${data.user_power.name}`, true)
            }
        }
    }))

}


import * as mysql from 'mysql'

export default class Power {
    /**
     * 设置类实例化时的所有者权限
     * @param power 创建者的权限
     */
    constructor() {
        this.use(this.use)
        this.action.set('sign_in', {
            name: 'sign_in',
            level: '<=50'
        })
        this.action.set('remove_group_member', {
            name: 'remove_group_member',
            level: '<=30'
        })
    }

    private readonly UserGroup = [
        {
            name: '被禁用的用户',
            level: 90
        },
        {
            name: '普通用户',
            level: 50
        },
        {
            name: '群管理员',
            level: 30
        },
        {
            name: '群主',
            level: 25
        },
        {
            name: '机器人主人',
            level: 1
        }
    ]

    private readonly database = {
        host: '121.196.233.**',
        port: 3306,
        user: 'root',
        password: 'JxPWJRSAa2*******',
        database: 'qqgroupmsg'
    }

    private action: Map<string, { name: string, level: string }> = new Map()

    private key: RegExp[] = []

    private query_user_power(uin: number, callback: (data: UserType) => void) {
        let sql = mysql.createPool(this.database)
        sql.query(`SELECT * FROM user WHERE QQid = '${uin}'`, (err, row) => {
            sql.end()
            if (err) callback({
                name: '普通用户',
                level: 50
            })
            else {
                for (let i of this.UserGroup) {
                    if (row[0].ban == i.level) {
                        callback(i)
                        return
                    }

                }
                callback({
                    name: '普通用户',
                    level: 50
                })
            }
        })
    }

    public add_key(key: RegExp | string) {
        let key_regexp: RegExp;
        if (typeof key == 'string') key_regexp = RegExp(key, 'g')
        else key_regexp = key

        for (let i of this.key) {
            if (i == key_regexp) return
        }

        this.key.push(key_regexp)
    }

    private query_need_power(action: string): UserType[] {
        for (let i of this.action) {
            if (action == i[1].name) {
                if (/<=/g.test(i[1].level)) {
                    let res: UserType[] = []
                    for (let p of this.UserGroup) {
                        if (p.level <= Number(i[1].level.slice(2, i[1].level.length))) res.push(p)
                    }
                    return res
                } else if (/>=/g.test(i[1].level)) {
                    let res: UserType[] = []
                    for (let p of this.UserGroup) {
                        if (p.level >= Number(i[1].level.slice(2, i[1].level.length))) res.push(p)
                    }
                    return res
                } else if (/</g.test(i[1].level)) {
                    let res: UserType[] = []
                    for (let p of this.UserGroup) {
                        if (p.level < Number(i[1].level.slice(1, i[1].level.length))) res.push(p)
                    }
                    return res
                } else if (/>/g.test(i[1].level)) {
                    let res: UserType[] = []
                    for (let p of this.UserGroup) {
                        if (p.level > Number(i[1].level.slice(1, i[1].level.length))) res.push(p)
                    }
                    return res
                } else if (/=/g.test(i[1].level)) {
                    let res: UserType[] = []
                    for (let p of this.UserGroup) {
                        if (p.level == Number(i[1].level.slice(1, i[1].level.length))) res.push(p)
                    }
                    return res
                }
            }
        }
        return [{
            name: '机器人主人',
            level: 1
        }]
    }

    public query_power(uin: number, action: string, messgae: string = '', callback?: (data: QueryPowerResult) => void): Promise<QueryPowerResult | void> {
        return new Promise(res => {
            this.query_user_power(uin, (data) => {
                let need = this.query_need_power(action)
                let allow = false
                let res_message = ''
                for (let i of need) {
                    if (i.level == data.level) allow = true
                }

                if (!allow) {
                    for (let i of this.key) {
                        if (i.test(messgae)) res_message = `权限不足,你需要${(function () {
                            let need_arr: string[] = []

                            for (let p of need) {
                                need_arr.push(p.name)
                            }

                            let str = ''

                            for (let i in need_arr) {
                                if ((Number(i)+1) != need_arr.length) str = str + need_arr[i] + '、'
                                else str += need_arr[i]
                            }

                            return str
                        }())}权限`
                    }
                }
                if (callback) callback({
                    uin: uin,
                    action: action,
                    user_power: data,
                    need_power: need,
                    allow: allow,
                    message: res_message
                })
                else res({
                    uin: uin,
                    action: action,
                    user_power: data,
                    need_power: need,
                    allow: allow,
                    message: res_message
                })
            })
        })
    }

    private use = (data: any): void => { new Promise(res => res(data)) }

    public add_action(name: string, level: string): void {
        this.action.set(String(name), {
            name: name,
            level: level
        })

    }
}

interface QueryPowerResult {
    uin: number,
    action: string,
    allow: boolean,
    user_power: UserType,
    need_power: UserType[],
    message: string
}

interface UserType {
    name: string,
    level: number
}