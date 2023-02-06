import { log, Plugin_info } from '../index'
import { Client } from 'oicq'
import { use } from '../../src/function'
import axios from 'axios'
export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: '群收款',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './群收款/index.ts',
    uuid: '730a1791-cff7-4144-9ca5-cb6f2723eaca',
    lib: []
}


function Setup(client: Client) {
    console.log(client.cookies['tenpay.com'])
    use(client)
}

export async function newPay(memo: number, amount: number, client: Client, group_id: number, payer: { uin: number, amount: number }[]) {
    let cookies = strcookies2obj(client.cookies["tenpay.com"])
    if (cookies.p_skey == undefined) return new Promise((res, rej) => {
        use(res)
        rej('获取cookies失败')
    })
    const body = {
        type: 2,
        recv_type: 1,
        mum: 1,
        skey_type: 2,
        memo: memo,
        amount: amount,
        group_id: group_id,
        uin: client.uin,
        pskey: cookies?.p_skey,
        skey: cookies?.skey,
        payer_list: JSON.stringify(payer)
    }

    try {
        let res = await axios.get(`https://mqq.tenpay.com/cgi-bin/qcollect/qpay_collect_create.cgi?${objget2string(body)}`)
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}

function strcookies2obj(cookies: string): { uin: string, skey: string, p_uin?: string, p_skey?: string } {
    let data_arr: string[] = cookies.split(' ')
    let data_arr2: string[] = []
    for (let i of data_arr) {
        data_arr2.push(...i.split('='))
    }
    if (data_arr2.length == 4) {
        let json = `{"uin":"${data_arr2[1].split(';')[0]}", "skey":"${data_arr2[3].split(';')[0]}"}`
        return JSON.parse(json)
    }
    let json = `{"uin":"${data_arr2[1].split(';')[0]}", "skey":"${data_arr2[3].split(';')[0]}", "p_uin":"${data_arr2[5].split(';')[0]}", "p_skey":"${data_arr2[7].split(';')[0]}"}`
    return JSON.parse(json)
}

function objget2string(body: object): string {
    let bodystr = ''
    for (let key in body) {
        bodystr += `${key}=${body[key as keyof typeof body]}&`
    }
    return bodystr.slice(0, -1)
}
