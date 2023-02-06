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
    name: '飞机大作战',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './飞机大作战/index.ts',
    uuid: 'a7a89165-ca2a-4991-8949-7d0007524f6c',
    lib: []
}

import { sendGroupMsg, sendPrivateMsg } from '../内容输出解决方案'
const setup = require('./bin')

function Setup(client: Client) {
    setup(client, TDconfig, sendGroupMsg, sendPrivateMsg)
}

