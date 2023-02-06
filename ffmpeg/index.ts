//#region 插件头部
import { log, error, Plugin_info} from '../index'
import { Client } from 'oicq'
import {config as TDconfig} from '../../config/config'

export const config: Plugin_info = {
    start(client_map: Map<number, Client>): void {
        setTimeout(() => {
            log(`来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`)
            for (let i of client_map) {
                Setup(i[1])
            }
        }, 10)
    },
    name: 'ffmpeg',
    author: 'FFmpeg developers',
    version: 'N-109530-g4a80db5fc2-20230105',
    website: 'maohaoji.com',
    start_filename: './ffmpeg/index.ts',
    uuid: '22fdbec0-e870-4c1b-9d5b-e33bb7ca7389',
    lib: []
}
import * as fs from 'fs'
import * as path from 'path'

function Setup(client: Client) {
    client.on('message.group', (e) => {
        //过滤非设定群的消息
        if (!TDconfig.groupId.includes(e.group_id)) return;

        if (e.message.length == 1 && e.message[0].type == 'text' && e.message[0].text == 'ffmpeg授权') {
            const gfs = client.acquireGfs(e.group_id)
            let LICENSE = Buffer.from('没有找到声明文件')
            if (fs.existsSync(path.join(__dirname, './LICENSE.txt'))) LICENSE = fs.readFileSync(path.join(__dirname, './LICENSE.txt'))
            gfs.upload(LICENSE, undefined, 'ffmpeg的声明文件.txt').then(() => { }).catch(() => error('上传文件失败'))
        }
    })
}
let ffmpeg = ''
switch (process.platform) {
    case 'win32':
        ffmpeg = path.join(__dirname, './win/ffmpeg.exe')
        break;
    case 'linux':
    case 'openbsd':
    case 'android':
    case 'sunos':
        ffmpeg = path.join(__dirname, './linux/ffmpeg')
        break;
    case 'darwin':
        ffmpeg = path.join(__dirname, './mac/ffmpeg')
        break;
    default:
        error(`暂不支持应用为${process.platform}的ffmpeg`)
}

export default ffmpeg
if (!fs.existsSync(path.join(__dirname, './win/ffmpeg.exe'))) log(`没有找到文件 ${path.join(__dirname, './win/ffmpeg.exe')}`)
if (!fs.existsSync(path.join(__dirname, './linux/ffmpeg'))) log(`没有找到文件 ${path.join(__dirname, './linux/ffmpeg')}`)
if (!fs.existsSync(path.join(__dirname, './mac/ffmpeg'))) log(`没有找到文件 ${path.join(__dirname, './mac/ffmpeg')}`)
//#endregion