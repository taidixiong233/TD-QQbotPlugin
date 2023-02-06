//#region 插件头部
import { log, Plugin_info } from "../index";
import { Client } from "oicq";
import { config as TDconfig } from "../../config/config";
import * as f from "../../src/function";
import puppeteer from "puppeteer"; // 引入
// import compressing from 'compressing'
export const config: Plugin_info = {
  start(client_map: Map<number, Client>): void {
    setTimeout(() => {
      log(
        `来自 ${this.author} 的插件 ${this.name} 版本${this.version} 已加载完毕！`
      );
      for (let i of client_map) {
        Setup(i[1]);
      }
    }, 10);
  },
  name: "群聊娱乐",
  author: "taidixiong233",
  version: "2.1.3",
  website: "maohaoji.com",
  start_filename: "./群聊娱乐/index.ts",
  uuid: "2c42b1f1-f17e-40a9-8c0f-dc960cd7ee43",
  lib: [
    {
      name: "json签名",
      author: "未知",
      version: "1.1",
      website: "maohaoji.com",
      start_filename: "./json签名/index.ts",
      uuid: "82e5b961-7b15-45ca-b606-52ac27aef014",
      lib: [],
    },
    {
      name: "ffmpeg",
      author: "FFmpeg developers",
      version: "N-109530-g4a80db5fc2-20230105",
      website: "maohaoji.com",
      start_filename: "./ffmpeg/index.ts",
      uuid: "22fdbec0-e870-4c1b-9d5b-e33bb7ca7389",
      lib: [],
    }
  ],
};
//#endregion
//const share = require('../json签名/new.js')
import share from "../json签名";
import * as mysql from "mysql";
import { AtElem, segment, TextElem } from "oicq";
import * as request from "request-promise";
import * as child_process from "child_process";
import { core } from "oicq";
import * as fs from "fs";
import * as path from "path";
import ffmpeg from "../ffmpeg";
import axios from "axios";

let settings = {
  groupId: TDconfig.groupId,
  version: config.version,
  onlymaster: false,
  masterId: TDconfig.masterId,
  database: {
    host: "121.196.233.**",
    port: 3306,
    user: "root",
    password: "JxPWJRSAa2*******",
    database: "qqgroupmsg",
  },
  ffmpeg: ffmpeg,
};

function Setup(client: Client) {

  client.on("message.group", async (message) => {
    //过滤非设定群的消息
    if (!settings.groupId.includes(message.group_id)) return;

    if (settings.onlymaster)
      if (message.sender.user_id != settings.masterId) return;

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /菜单|帮助|关于机器人|关于/.test(message.message[0].text)
    ) {
      share('group', `{"app":"com.tencent.bot.paly.boss","config":{"autosize":1,"ctime":1666282883,"token":"5382d968570f945c8a4c46eefe58f8c2"},"meta":{"detail":{"appID":"","botName":"氢气机器人","cmdList":[{"cmd":"签到","cmdDesc":"获取积分和签到","cmdTitle":"发送"},{"cmd":"ffmpeg授权","cmdDesc":"查看授权文件","cmdTitle":"发送"},{"cmd":"创建角色","cmdDesc":"开始飞机大作战游戏","cmdTitle":"发送"},{"cmd":"飞机大作战游戏帮助","cmdDesc":"获取游戏帮助","cmdTitle":"发送"}],"cmdTitle":"精彩功能展示:","content":"氢气机器人${config.version}\\n基于TD-QQbot 0.2.0\\n编写语言: TypeScript\\n","contentColor":"green","guildID":"","iconLeft":[],"iconRight":[],"receiverName":"@${message.sender.nickname}","subGuildID":"SUBGUILDID#"}},"prompt":"关于机器人","ver":"2.0.4.0","view":"index"}`, client, core, message.group_id)
        .catch(() => {
          message.reply([
            `泰迪熊的机器人${settings.version}
 基于TD-QQbot 0.2.0
 编写语言：TypeScript
 本产品使用了ffmpeg,发送:"ffmpeg授权"查看授权
 CopyRight 2020-2023 maohaoji.com 版权所有`,
          ]);
        })
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /钓鱼|钓鱼帮助/.test(message.message[0].text)
    ) {
      message.reply(
        [
          `机器人钓鱼项目正在筹备中...
预计在2024年前运行
by maohaoji.com`,
        ],
        true
      );
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /拍一拍/.test(message.message[0].text)
    ) {
      if (/.*[0-9].*/.test(message.message[0].text)) {
        client.getGroupMemberList(message.group_id).then((GroupMessage) => {
          if (
            message.message[0].type === "text" &&
            /\d+/g.exec(message.message[0].text) != null &&
            GroupMessage.get(
              Number(/\d+/g.exec(message.message[0].text) as RegExpExecArray)
            )
          ) {
            client
              .sendGroupPoke(
                message.group_id,
                Number(/\d+/g.exec(message.message[0].text) as RegExpExecArray)
              )
              .then((star) => {
                if (!star) {
                  message.reply(`拍一拍失败，原因未知`, true);
                  return;
                }
              });
          } else {
            message.reply(`这个群应该没有这个人吧`, true);
            return;
          }
        });
      } else {
        client.sendGroupPoke(message.group_id, message.sender.user_id);
        return;
      }
    }

    if (
      message.message.length >= 2 &&
      message.message[0].type === "text" &&
      message.message[1].type === "at" &&
      /拍一拍/.test(message.message[0].text)
    ) {
      if (message.message[1].qq != "all") {
        client.sendGroupPoke(message.group_id, message.message[1].qq);
      }
      return;
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /查积分/.test(message.message[0].text) &&
      message.message[0].text.length <= 3
    ) {
      let sql = mysql.createPool(settings.database);
      sql.query(
        {
          sql: `SELECT * FROM user WHERE QQid='${message.sender.user_id}'`,
        },
        async (err, res) => {
          if (err) {
            message.reply(`读取数据库错误: ${err}`, true);
            sql.end();
            return;
          } else {
            if (Array(res).length <= 0) {
              sql.query(
                {
                  sql: `INSERT INTO user (QQid,score,sign_Date,dayN,ban) values ('${message.sender.user_id}','0','1970-01-01','0','0')`,
                },
                async (err) => {
                  if (err) {
                    message.reply(`数据库写入失败： ${err}`, true);
                    sql.end();
                    return;
                  } else {
                    //1.3.3版本增加卡片输出
                    // message.reply(`你有0积分欸`, true)
                    share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${message.sender.user_id}"},{"name":"签到天数: 0天"},{"name":"积分: 0"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${message.sender.user_id}&s=640"},"title":"个人信息"}},"prompt":"个人信息","ver":"1.0.0.9","view":"index"}`,
                      client,
                      core,
                      message.group_id)
                      .catch(() => {
                        message.reply(`你有0积分欸`, true);
                      })
                    sql.end();
                    return;
                  }
                }
              );
            } else {
              //1.3.3版本增加卡片输出
              // message.reply(`你有${res[0].score}积分欸`, true)
              share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${message.sender.user_id}"},{"name":"签到天数: ${res[0].dayN}天"},{"name":"积分: ${res[0].score}"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${message.sender.user_id}&s=640"},"title":"个人信息"}},"prompt":"个人信息","ver":"1.0.0.9","view":"index"}`,
                client,
                core,
                message.group_id)
                .catch(() => {
                  message.reply(`你有${res[0].score}积分欸`, true);
                })
              sql.end();
              return;
            }
          }
          return;
        }
      );
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      String(
        Number(message.message[0].text.slice(3, message.message[0].text.length))
      ) != "NaN" &&
      message.message[0].text.slice(0, 3) === "查积分" &&
      message.message[0].text.length != 3
    ) {
      let sql = mysql.createPool(settings.database);
      sql.query(
        {
          sql: `SELECT * FROM user WHERE QQid='${Number(
            message.message[0].text.slice(3, message.message[0].text.length)
          )}'`,
        },
        async (err, res) => {
          if (err) {
            message.reply(`数据库错误：${err}`, true);
            sql.end();
            return;
          } else {
            if (res.length <= 0) {
              //1.3.3版本增加卡片输出
              // message.reply(`他(她)有0积分欸`, true)
              share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${Number(
                (message.message[0] as TextElem).text.slice(
                  3,
                  (message.message[0] as TextElem).text.length
                )
              )}"},{"name":"签到天数: 0天"},{"name":"积分: 0"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${Number(
                (message.message[0] as TextElem).text.slice(
                  3,
                  (message.message[0] as TextElem).text.length
                )
              )}&s=640"},"title":"用户信息"}},"prompt":"用户信息","ver":"1.0.0.9","view":"index"}`,
                client,
                core,
                message.group_id)
                .catch(() => {
                  message.reply(`他(她)有0积分欸`, true);
                })
              sql.end();
              return;
            } else {
              //1.3.3版本增加卡片输出
              //message.reply(`他(她)有${res[0].score}积分欸`, true)
              share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${Number(
                (message.message[0] as TextElem).text.slice(
                  3,
                  (message.message[0] as TextElem).text.length
                )
              )}"},{"name":"签到天数: ${res[0].dayN}天"},{"name":"积分: ${res[0].score
                }"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${Number(
                  (message.message[0] as TextElem).text.slice(
                    3,
                    (message.message[0] as TextElem).text.length
                  )
                )}&s=640"},"title":"用户信息"}},"prompt":"用户信息","ver":"1.0.0.9","view":"index"}`,
                client,
                core,
                message.group_id)
                .catch(() => {
                  message.reply(`他(她)有${res[0].score}积分欸`, true);
                })
              sql.end();
              return;
            }
          }
        }
      );
    }

    if (
      message.message.length >= 2 &&
      message.message[0].type === "text" &&
      message.message[1].type === "at" &&
      message.message[0].text.slice(0, 3) === "查积分" &&
      message.message[1].qq != "all"
    ) {
      let sql = mysql.createPool(settings.database);
      sql.query(
        {
          sql: `SELECT * FROM user WHERE QQid='${message.message[1].qq}'`,
        },
        async (err, res) => {
          if (err) {
            message.reply(`数据库错误：${err}`, true);
            sql.end();
            return;
          } else {
            if (res.length <= 0) {
              //1.3.3版本增加卡片输出
              //message.reply(`他(她)有0积分欸`, true)
              share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${(message.message[1] as AtElem).qq
                }"},{"name":"签到天数: 0天"},{"name":"积分: 0"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${(message.message[1] as AtElem).qq
                }&s=640"},"title":"用户信息"}},"prompt":"用户信息","ver":"1.0.0.9","view":"index"}`,
                client,
                core,
                message.group_id)
                .catch(() => {
                  message.reply(`他(她)有0积分欸`, true);
                })
              sql.end();
              return;
            } else {
              //1.3.3版本增加卡片输出
              //message.reply(`他(她)有${res[0].score}积分欸`, true)
              share('group', `{"app":"com.tencent.bot.groupbot","config":{"round":0,"type":"normal"},"meta":{"embed":{"fields":[{"name":"账号: ${(message.message[1] as AtElem).qq
                }"},{"name":"签到天数: ${res[0].dayN}天"},{"name":"积分: ${res[0].score
                }"}],"thumbnail":{"url":"https://q1.qlogo.cn/g?b=qq&nk=${(message.message[1] as AtElem).qq
                }&s=640"},"title":"用户信息"}},"prompt":"用户信息","ver":"1.0.0.9","view":"index"}`,
                client,
                core,
                message.group_id)
                .catch(() => {
                  message.reply(`他(她)有${res[0].score}积分欸`, true);
                })
              sql.end();
              return;
            }
          }
        }
      );
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /签到/.test(message.message[0].text)
    ) {
      let today = f.getTime_format(new Date().getTime(), "YYYY-MM-DD");
      let sql = mysql.createPool(settings.database);

      sql.query(
        {
          sql: `SELECT * FROM user WHERE QQid='${message.sender.user_id}';`,
        },
        (err, res) => {
          if (err) {
            message.reply(`数据库错误: ${err}`, true);
            sql.end();
          } else {
            if (res.length <= 0) {
              sql.query(
                {
                  sql: `INSERT INTO user (QQid,score,sign_Date,dayN,ban) values ('${message.sender.user_id}','66','${today}','0','0')`,
                },
                (err) => {
                  if (err) {
                    message.reply(`数据库写入失败： ${err}`, true);
                    sql.end();
                    return;
                  } else {
                    client.sendGroupPoke(
                      message.group_id,
                      message.sender.user_id
                    );
                    client.sendLike(message.sender.user_id);
                    message.reply(
                      [
                        `签到成功！
共签到： 1天
本次签到增加66积分
你现在有 :66积分
已为你点赞！`,
                      ],
                      true
                    );
                    sql.end();
                  }
                }
              );
            } else {
              if (
                f.getTime_format(Number(res[0].sign_Date), "YYYY-MM-DD") ===
                today
              ) {
                message.reply([`你今天已经签到过了哦`], true);
                sql.end();
                return;
              } else {
                sql.query(
                  {
                    sql: `UPDATE user SET score='${res[0].score + 66
                      }', sign_Date='${today}', dayN='${res[0].dayN + 1
                      }' WHERE QQid='${message.sender.user_id}';`,
                  },
                  (err) => {
                    if (err) {
                      message.reply(`数据库写入失败： ${err}`, true);
                      sql.end();
                      return;
                    } else {
                      message.reply(
                        [
                          `签到成功！
共签到： ${res[0].dayN + 1}天
本次签到增加66积分
你现在有 :${res[0].score + 66}积分
已为你点赞！`,
                        ],
                        true
                      );
                      sql.end();
                      client.sendGroupPoke(
                        message.group_id,
                        message.sender.user_id
                      );
                      client.sendLike(message.sender.user_id);
                      return;
                    }
                  }
                );
              }
            }
          }
        }
      );
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text.slice(0, 4) === "stat"
    ) {
      message.reply([
        `机器人目前存活
启动时间：${f.getTime_format(
          Number(String(client.stat.start_time) + "000"),
          "YYYY-MM-DD HH:mm:ss"
        )}
掉线次数：${client.stat.lost_times}次
总共收到消息：${client.stat.recv_msg_cnt}条
总共发送信息：${client.stat.sent_msg_cnt}条
总共收到的数据包：${client.stat.recv_pkt_cnt}个
总共发送的数据包: ${client.stat.sent_pkt_cnt}个
丢失的数据包：${client.stat.lost_pkt_cnt}个
消息服务器IP：${client.stat.remote_ip}
端口：${client.stat.remote_port}
消息速率：${client.stat.msg_cnt_per_min}条/分钟
${f.getTime_format(new Date().getTime(), "YYYY-MM-DD HH:mm:ss")}`,
      ]);
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "全体禁言"
    ) {
      if (message.sender.user_id != settings.masterId) {
        message.reply(`权限不够！`, true);
        return;
      } else {
        client.setGroupWholeBan(message.group_id).then((stat) => {
          if (stat) {
            message.reply(`群聊${message.group_name}已经开启了全体禁言`);
            return;
          } else {
            message.reply(`开启失败，未知错误`, true);
            return;
          }
        });
      }
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "关闭全体禁言"
    ) {
      if (message.sender.user_id != settings.masterId) {
        message.reply(`权限不够`, true);
        return;
      } else {
        client.setGroupWholeBan(message.group_id, false).then((stat) => {
          if (stat) {
            message.reply(`群聊${message.group_name}已经关闭了全体禁言`);
            return;
          } else {
            message.reply(`关闭失败，未知错误`, true);
            return;
          }
        });
      }
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text.slice(0, 3) === "扔色子"
    ) {
      if (message.message[0].text.length === 3) {
        message.reply(segment.dice());
      } else {
        message
          .reply(
            segment.dice(
              Number(
                message.message[0].text.slice(3, message.message[0].text.length)
              )
            )
          )
          .then((stat) => {
            if (stat.message_id) {
              return;
            } else {
              message.reply(`发送错误`);
              return;
            }
          });
      }
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "已发送项目重启指令！\n来自机器人监护程序" &&
      message.sender.user_id === 2332820469
    )
      process.exit();

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text.slice(0, 3) === "二维码"
    ) {
      if (message.message[0].text.length === 3) {
        message.reply([`请在’二维码‘后添加需要转化为二维码的内容`], true);
        return;
      } else {
        message.reply([
          segment.at(message.sender.user_id),
          `\n以下二维码由用户指令生成，安全性本人不作任何保证，请在确认安全后进行扫描`,
          segment.image(
            `https://api.oick.cn/qrcode/api.php?text=${String(
              message.message[0].text.slice(3, message.message[0].text.length)
            )}`
          ),
        ]);
      }
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "一言"
    ) {
      request({
        uri: `https://v1.hitokoto.cn/`,
      })
        .then((res) => {
          message.reply([JSON.parse(res).hitokoto], true);
        })
        .catch((err) => {
          message.reply(`API接口错误，错误码:${err}`, true);
        });
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "舔狗日记"
    ) {
      request({
        uri: `https://api.oick.cn/dog/api.php`,
      })
        .then((res) => {
          message.reply(res, true);
        })
        .catch((err) => {
          message.reply(`API接口错误，错误码:${err}`, true);
        });
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "毒鸡汤"
    ) {
      request({
        uri: `https://api.oick.cn/dutang/api.php`,
      })
        .then((res) => {
          message.reply(res, true);
        })
        .catch((err) => {
          message.reply(`API接口错误，错误码:${err}`, true);
        });
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      message.message[0].text === "说一言"
    ) {
      request({
        uri: "https://v1.hitokoto.cn/",
      })
        .then((res) => {
          if (!fs.existsSync(path.join(__dirname, "./tmp")))
            fs.mkdirSync(path.join(__dirname, "./tmp"));
          if (fs.existsSync(path.join(__dirname, "./tmp", "input.mp3")))
            fs.unlinkSync(path.join(__dirname, "./tmp", "input.mp3"));
          if (fs.existsSync(path.join(__dirname, "./tmp", "output.amr")))
            fs.unlinkSync(path.join(__dirname, "./tmp", "output.amr"));

          child_process.execSync(
            `curl -o "${path.join(
              __dirname,
              "./tmp",
              "input.mp3"
            )}" "https://tts.youdao.com/fanyivoice?word=${url_encode(
              JSON.parse(res).hitokoto
            )}&le=zh&keyfrom=speaker-target"`
          );

          child_process.execSync(
            `${settings.ffmpeg} -i "${path.join(
              __dirname,
              "./tmp",
              "input.mp3"
            )}" -ac 1 -ar 8000 "${path.join(
              __dirname,
              "./tmp",
              "output.amr"
            )}" -y`
          );

          message
            .reply([
              segment.record(path.join(__dirname, "./tmp", "output.amr")),
            ])
            .then(() =>
              setTimeout(() => {
                if (fs.existsSync(path.join(__dirname, "./tmp", "input.mp3")))
                  fs.unlinkSync(path.join(__dirname, "./tmp", "input.mp3"));
                if (fs.existsSync(path.join(__dirname, "./tmp", "output.amr")))
                  fs.unlinkSync(path.join(__dirname, "./tmp", "output.amr"));
              }, 1000)
            )
            .catch((err) => console.log(err));
          return;
        })
        .catch((err) => {
          message.reply(`API接口错误，错误码:${err}`, true);
          return;
        });
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /积分排行/g.test(message.message[0].text)
    ) {
      let sql = mysql.createPool(settings.database);
      sql.query(
        { sql: `SELECT * FROM user ORDER BY score DESC LIMIT 0,5` },
        (err, row) => {
          sql.end();
          if (err) {
            message.reply(`数据库错误: ${err}`, true);
            return;
          } else {
            const score_fun = (score: number): string => {
              if (score < 10000) return String(score);
              else if (score < 10000000)
                return String(Math.floor(score / 10000) + "w");
              else if (score < 100000000000)
                return String(Math.floor(score / 100000000) + "亿");
              return String(Math.floor(score / 1000000000000) + "万亿");
            };

            const data = [
              {
                uin: row[0].QQid,
                score: score_fun(row[0].score),
              },
              {
                uin: row[1].QQid,
                score: score_fun(row[1].score),
              },
              {
                uin: row[2].QQid,
                score: score_fun(row[2].score),
              },
              {
                uin: row[3].QQid,
                score: score_fun(row[3].score),
              },
              {
                uin: row[4].QQid,
                score: score_fun(row[4].score),
              },
            ];

            const html = `<!DOCTYPE html>
                    <html lang="">
                    
                    <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    </head>
                    
                    <body>
                        <div>
                            <div style="margin-left: 85px;">
                                <span>积分排行</span>
                            </div>
                    
                            <div style="margin: 0 auto;text-align:center">
                                <table style="margin-left: 30px;">
                                    <tr>
                                        <td>名次</td>
                                        <td>QQ号</td>
                                        <td>积分数</td>
                                    </tr>
                                    <tr>
                                        <td>①</td>
                                        <td id="uin1"></td>
                                        <td id="score1"></td>
                                    </tr>
                                    <tr>
                                        <td>②</td>
                                        <td id="uin2"></td>
                                        <td id="score2"></td>
                                    </tr>
                                    <tr>
                                        <td>③</td>
                                        <td id="uin3"></td>
                                        <td id="score3"></td>
                                    </tr>
                                    <tr>
                                        <td>④</td>
                                        <td id="uin4"></td>
                                        <td id="score4"></td>
                                    </tr>
                                    <tr>
                                        <td>⑤</td>
                                        <td id="uin5"></td>
                                        <td id="score5"></td>
                                    </tr>
                    
                                </table>
                            </div>
                            <div class="time">
                                <span id="time"></span>
                            </div>
                    
                        </div>
                        <script>
                            const getTime_format = (timestamp = new Date().getTime(),
                                type = 'YYYY-MM-DD HH:mm:ss') => {
                                let time = new Date(timestamp)
                                let month = '', date = '', hour = '', minutes = '', seconds = '', milliseconds = ''
                    
                                if ((time.getMonth() + 1) < 10) month = '0' + String(time.getMonth() + 1)
                                else month = String(time.getMonth() + 1)
                    
                                if (time.getDate() < 10) date = '0' + String(time.getDate())
                                else date = String(time.getDate())
                    
                                if (time.getHours() < 10) hour = '0' + String(time.getHours())
                                else hour = String(time.getHours())
                    
                                if (time.getMinutes() < 10) minutes = '0' + String(time.getMinutes())
                                else minutes = String(time.getMinutes())
                    
                                if (time.getSeconds() < 10) seconds = '0' + String(time.getSeconds())
                                else seconds = String(time.getSeconds())
                    
                                if (time.getMilliseconds() < 10) milliseconds = '00' + String(time.getMilliseconds())
                                else if (time.getMilliseconds() < 100) milliseconds = '0' + String(time.getMilliseconds())
                                else milliseconds = String(time.getMilliseconds())
                    
                                switch (type) {
                                    case 'YYYY-MM-DD HH:mm:ss':
                                        return time.getFullYear() + '-' + month + '-' + date+ ' ' + hour + ':' + minutes + ':' + seconds
                                    case 'YYYY-MM-DDTHH:mm:ss:mmm':
                                        return time.getFullYear() + '-' + month + '-' + date+ ' ' + hour + ':' + minutes + ':' + seconds + ':' + milliseconds
                                    case 'YYYY-MM-DD':
                                        return time.getFullYear() + '-' + month + '-' + date
                                }
                            }
                    
                            const data = ${JSON.stringify(data)}
                    
                            document.getElementById('time').innerText = getTime_format()
                            document.getElementById('uin1').innerText = data[0].uin
                            document.getElementById('uin2').innerText = data[1].uin
                            document.getElementById('uin3').innerText = data[2].uin
                            document.getElementById('uin4').innerText = data[3].uin
                            document.getElementById('uin5').innerText = data[4].uin
                            document.getElementById('score1').innerText = data[0].score
                            document.getElementById('score2').innerText = data[1].score
                            document.getElementById('score3').innerText = data[2].score
                            document.getElementById('score4').innerText = data[3].score
                            document.getElementById('score5').innerText = data[4].score
                        </script>
                    
                        <style>
                            .time {
                                margin-top: 10px;
                                font-size: 12px;
                                margin-left: 60px;
                            }
                        </style>
                    </body>
                    
                    </html>`;

            const filename = new Date().getTime();
            if (!fs.existsSync(path.join(__dirname, "./tmp")))
              fs.mkdirSync(path.join(__dirname, "./tmp"));
            if (
              fs.existsSync(path.join(__dirname, "./tmp", `${filename}.html`))
            )
              fs.unlinkSync(path.join(__dirname, "./tmp", `${filename}.html`));

            fs.writeFileSync(
              path.join(__dirname, "./tmp", `${filename}.html`),
              html
            );

            (async function () {
              // 启动浏览器
              const browser = await puppeteer.launch({
                headless: true, // 本地测试先关掉无头模式
              });
              // 创建一个页面
              const page = await browser.newPage();
              // 设置浏览器视窗
              page.setViewport({
                width: 250,
                height: 210,
              });
              // 输入网页地址
              await page.goto(
                path.join(__dirname, "./tmp", `./${filename}.html`),
                { waitUntil: "networkidle0" }
              );

              // console.log('-> 开始截图')
              await page.screenshot({
                path: path.join(__dirname, "./tmp", `./${filename}.png`),
                fullPage: true,
              });
              // 关闭浏览器
              await browser.close();

              message.reply(
                segment.image(
                  path.join(__dirname, "./tmp", `./${filename}.png`)
                )
              );

              setTimeout(() => {
                try {
                  fs.unlinkSync(
                    path.join(__dirname, "./tmp", `./${filename}.png`)
                  );
                  fs.unlinkSync(
                    path.join(__dirname, "./tmp", `./${filename}.html`)
                  );
                } catch {
                  console.log("删除文件失败");
                }
              }, 10000);
            })();
          }
        }
      );
    }

    //debug
    if (message.sender.user_id != settings.masterId) return;

    if (
      message.message.length === 1 &&
      message.message[0].type == "text" &&
      message.message[0].text == "抛出错误"
    ) {
      throw new Error();
    }

    if (
      message.message.length === 1 &&
      message.message[0].type === "text" &&
      /飞行排行/g.test(message.message[0].text)
    ) {
      let sql = mysql.createPool(settings.database);
      sql.query(
        { sql: `SELECT * FROM game_a_sky ORDER BY timestamp LIMIT 0,5` },
        (err, row) => {
          sql.end();
          if (err) {
            message.reply(`数据库错误: ${err}`, true);
            return;
          } else {
            const ts_fun = (ts: number): string => {
              var time = new Date().getTime();
              var newtime = Math.floor((time - ts) / 60000);
              if (newtime < 60) return `${newtime}分钟`;
              else if (newtime < 14440)
                return `${Math.floor(newtime / 60)}小时`;
              else if (newtime < 433200)
                return `${Math.floor(newtime / 1440)}天`;
              else return `${Math.floor(newtime / 43200)}月`;
            };

            const data = [
              {
                uin: row[0].QQid,
                timestamp: ts_fun(row[0].timestamp),
              },
              {
                uin: row[1].QQid,
                timestamp: ts_fun(row[1].timestamp),
              },
              {
                uin: row[2].QQid,
                timestamp: ts_fun(row[2].timestamp),
              },
              {
                uin: row[3].QQid,
                timestamp: ts_fun(row[3].timestamp),
              },
              {
                uin: row[4].QQid,
                timestamp: ts_fun(row[4].timestamp),
              },
            ];

            const html = `<!DOCTYPE html>
                    <html lang="">
                    
                    <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    </head>
                    
                    <body>
                        <div>
                            <div style="margin-left: 85px;">
                                <span>飞行排行</span>
                            </div>
                    
                            <div style="margin: 0 auto;text-align:center">
                                <table style="margin-left: 30px;">
                                    <tr>
                                        <td>名次</td>
                                        <td>QQ号</td>
                                        <td>飞机时长</td>
                                    </tr>
                                    <tr>
                                        <td>①</td>
                                        <td id="uin1"></td>
                                        <td id="time1"></td>
                                    </tr>
                                    <tr>
                                        <td>②</td>
                                        <td id="uin2"></td>
                                        <td id="time2"></td>
                                    </tr>
                                    <tr>
                                        <td>③</td>
                                        <td id="uin3"></td>
                                        <td id="time3"></td>
                                    </tr>
                                    <tr>
                                        <td>④</td>
                                        <td id="uin4"></td>
                                        <td id="time4"></td>
                                    </tr>
                                    <tr>
                                        <td>⑤</td>
                                        <td id="uin5"></td>
                                        <td id="time5"></td>
                                    </tr>
                    
                                </table>
                            </div>
                            <div class="time">
                                <span id="time"></span>
                            </div>
                    
                        </div>
                        <script>
                            const getTime_format = (timestamp = new Date().getTime(),
                                type = 'YYYY-MM-DD HH:mm:ss') => {
                                let time = new Date(timestamp)
                                let month = '', date = '', hour = '', minutes = '', seconds = '', milliseconds = ''
                    
                                if ((time.getMonth() + 1) < 10) month = '0' + String(time.getMonth() + 1)
                                else month = String(time.getMonth() + 1)
                    
                                if (time.getDate() < 10) date = '0' + String(time.getDate())
                                else date = String(time.getDate())
                    
                                if (time.getHours() < 10) hour = '0' + String(time.getHours())
                                else hour = String(time.getHours())
                    
                                if (time.getMinutes() < 10) minutes = '0' + String(time.getMinutes())
                                else minutes = String(time.getMinutes())
                    
                                if (time.getSeconds() < 10) seconds = '0' + String(time.getSeconds())
                                else seconds = String(time.getSeconds())
                    
                                if (time.getMilliseconds() < 10) milliseconds = '00' + String(time.getMilliseconds())
                                else if (time.getMilliseconds() < 100) milliseconds = '0' + String(time.getMilliseconds())
                                else milliseconds = String(time.getMilliseconds())
                    
                                switch (type) {
                                    case 'YYYY-MM-DD HH:mm:ss':
                                        return time.getFullYear() + '-' + month + '-' + date+ ' ' + hour + ':' + minutes + ':' + seconds
                                    case 'YYYY-MM-DDTHH:mm:ss:mmm':
                                        return time.getFullYear() + '-' + month + '-' + date+ ' ' + hour + ':' + minutes + ':' + seconds + ':' + milliseconds
                                    case 'YYYY-MM-DD':
                                        return time.getFullYear() + '-' + month + '-' + date
                                }
                            }
                    
                            const data = ${JSON.stringify(data)}
                    
                            document.getElementById('time').innerText = getTime_format()
                            document.getElementById('uin1').innerText = data[0].uin
                            document.getElementById('uin2').innerText = data[1].uin
                            document.getElementById('uin3').innerText = data[2].uin
                            document.getElementById('uin4').innerText = data[3].uin
                            document.getElementById('uin5').innerText = data[4].uin
                            document.getElementById('time1').innerText = data[0].timestamp
                            document.getElementById('time2').innerText = data[1].timestamp
                            document.getElementById('time3').innerText = data[2].timestamp
                            document.getElementById('time4').innerText = data[3].timestamp
                            document.getElementById('time5').innerText = data[4].timestamp
                        </script>
                    
                        <style>
                            .time {
                                margin-top: 10px;
                                font-size: 12px;
                                margin-left: 60px;
                            }
                        </style>
                    </body>
                    
                    </html>`;

            const filename = new Date().getTime();
            if (!fs.existsSync(path.join(__dirname, "./tmp")))
              fs.mkdirSync(path.join(__dirname, "./tmp"));
            if (
              fs.existsSync(path.join(__dirname, "./tmp", `${filename}.html`))
            )
              fs.unlinkSync(path.join(__dirname, "./tmp", `${filename}.html`));

            fs.writeFileSync(
              path.join(__dirname, "./tmp", `${filename}.html`),
              html
            );

            (async function () {
              // 启动浏览器
              const browser = await puppeteer.launch({
                headless: true, // 本地测试先关掉无头模式
              });
              // 创建一个页面
              const page = await browser.newPage();
              // 设置浏览器视窗
              page.setViewport({
                width: 250,
                height: 210,
              });
              // 输入网页地址
              await page.goto(
                path.join(__dirname, "./tmp", `./${filename}.html`),
                { waitUntil: "networkidle0" }
              );

              // console.log('-> 开始截图')
              await page.screenshot({
                path: path.join(__dirname, "./tmp", `./${filename}.png`),
                fullPage: true,
              });
              // 关闭浏览器
              await browser.close();

              message.reply(
                segment.image(
                  path.join(__dirname, "./tmp", `./${filename}.png`)
                )
              );

              setTimeout(() => {
                try {
                  fs.unlinkSync(
                    path.join(__dirname, "./tmp", `./${filename}.png`)
                  );
                  fs.unlinkSync(
                    path.join(__dirname, "./tmp", `./${filename}.html`)
                  );
                } catch {
                  console.log("删除文件失败");
                }
              }, 10000);
            })();
          }
        }
      );
    }

    //以下为机器人主人测试机器人用的
    if (message.sender.user_id != TDconfig.masterId) return

    if (message.message[0].type == 'text' && /json复述/.test(message.message[0].text)) {
      if (message.message[0].text.replace(/json复述/, '').trim() == '') message.reply('请输入json')
      else {
        share('group', message.message[0].text.replace(/json复述/, '').trim(), client, core, message.group_id)
          .catch(err => message.reply(JSON.stringify(err)))
      }
    }

    if (message.message[0].type == 'text' && /取ark/.test(message.message[0].text)) {
      if (message.message[0].text.replace(/取ark/, '').trim() == '') {
        message.reply(`获取ark源码\n用法:\n取ark [类名]`)
        return
      }

      let body_json = {
        "os": "android",
        "platformVer": 35,
        "minPlatformVer": 2,
        "apps": [
          {
            "app": message.message[0].text.replace(/取ark/, '').trim(),
            "ver": "0.0.0.0",
            "expectVersion": "0.0.0.0",
            "cfgver": 0
          }
        ],
        "qqVer": "8.9.28",
        "supportTemplate": 0
      };
      const bin = await client.sendUni('ArkAppInfo.QueryAppInfo', Buffer.from(JSON.stringify(body_json)));

      var res: string[] = []
      var nav: string[] = []
      var ver: string = ''
      var url: string = ''

      try {
        console.log(typeof bin.toString())
        console.log(JSON.parse(bin.toString()))
        const app = JSON.parse(bin.toString())
        const time = Math.floor(new Date().getTime() / 1000)

        if (app?.msg != 'ok' && app?.ret != 0) {
          client.makeForwardMsg([
            { user_id: client.uin, message: `获取ark失败,类名${message.message[0].text.replace(/取ark/, '').trim()}`, nickname: client.nickname, time: time - 10 },
            { user_id: client.uin, message: `原始数据:`, nickname: client.nickname, time: time - 5 },
            { user_id: client.uin, message: JSON.stringify(app), nickname: client.nickname, time: time },
          ]).then(xml => {
            message.reply(xml)
            return
          }).catch((err) => {
            message.reply(`消息概要: 获取失败 生成转发消息失败\n原因(如果有):\n${typeof err == 'object' ? JSON.stringify(err) : err}`)
            return
          })
          return
        }

        if (app?.ret == 0 && app?.data != undefined) {
          nav = app?.data?.apps[0]?.config?.urlWhitelist?.nav
          res = app?.data?.apps[0]?.config?.urlWhitelist?.res
          ver = app?.data?.apps[0]?.ver
          url = app?.data?.apps[0]?.url

          if (nav.length == 0) nav = ['无限制']
          if (res.length == 0) res = ['无限制']

          const arr2str = (arr: string[]): string => {
            let ret = ''
            for (let i in arr) {
              if (Number(i) == arr.length - 1) ret += arr[i]
              else ret = `${ret}${arr[i]},\n`
            }
            return ret
          }
          client.makeForwardMsg([
            { user_id: client.uin, message: `类名${message.message[0].text.replace(/取ark/, '').trim()}`, nickname: client.nickname, time: time - 25 },
            { user_id: client.uin, message: JSON.stringify(app), nickname: client.nickname, time: time - 15 },
            { user_id: client.uin, message: `资源白名单:\n${arr2str(res)}`, nickname: client.nickname, time: time - 10 },
            { user_id: client.uin, message: `跳转白名单:\n${arr2str(nav)}`, nickname: client.nickname, time: time - 5 },
            { user_id: client.uin, message: `json复述{"app":"${message.message[0].text.replace(/取ark/, '').trim()}","desc":"氢气","config":{"forward":1,"round":0,"type":"normal","showSender":0,"menuMode":0},"meta":{},"prompt":"氢气","ver":"${ver}","view":"detail_1"}`, nickname: client.nickname, time: time },
            { user_id: client.uin, message: `源代码地址: ${url.slice(0, -4).trim()}.app`, nickname: client.nickname, time: time + 5 }
          ]).then(xml => {
            message.reply(xml)
            return
          }).catch((err) => {
            message.reply(`消息概要: 获取失败 生成转发消息失败\n原因(如果有):\n${typeof err == 'object' ? JSON.stringify(err) : err}`)
            return
          })
        }
      } catch {
        message.reply('解析json失败')
      }

    }
  });

  function url_encode(url: string): string {
    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&amp;");

    return url;
  }

  client.on("request.group.add", (event) => {
    if (!settings.groupId.includes(event.group_id)) return;
    client.sendGroupMsg(
      event.group_id,
      `${event.nickname}(${event.user_id})申请进入群聊${event.group_name}(${event.group_id})`
    );
    client.setGroupAddRequest(event.flag, true).then((res) => {
      if (res && event.group_id)
        client.sendGroupMsg(event.group_id, [
          segment.at(event.user_id),
          segment.image(`https://q1.qlogo.cn/g?b=qq&s=1&nk=${event.user_id}`),
          `欢迎加入本群,点击查看本群协议https://czqiang.com/archives/38/`,
        ]);
    });
  });

  client.on("notice.group.ban", (event) => {
    if (!settings.groupId.includes(event.group_id)) return;
    if (event.user_id === 0) {
      if (event.duration === 0) {
        client.sendGroupMsg(
          event.group_id,
          `${event.operator_id} 关闭了全体禁言`
        );
        return;
      } else {
        client.sendGroupMsg(
          event.group_id,
          `${event.operator_id} 开启了全体禁言`
        );
        return;
      }
    } else {
      if (event.duration === 0) {
        client.sendGroupMsg(
          event.group_id,
          `${event.user_id}被${event.operator_id}解除禁言`
        );
        return;
      } else {
        client.sendGroupMsg(
          event.group_id,
          `${event.user_id}被${event.operator_id}禁言${event.duration}秒`
        );
        return;
      }
    }
  });
}
