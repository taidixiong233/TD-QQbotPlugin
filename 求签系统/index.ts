import { log,  Plugin_info} from '../index'
import {config as TDconfig} from '../../config/config'
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
    name: '求签系统',
    author: 'taidixiong233',
    version: '1.0',
    website: 'maohaoji.com',
    start_filename: './求签系统/index.ts',
    uuid: '461a250c-6574-4818-ad97-f789d15bde97',
    lib: []
}

function Setup(client: Client) {
    client.on('message.group', e => {
        //过滤非设定群的消息
        if (!TDconfig.groupId.includes(e.group_id)) return;

        const fromGroup = e.group_id;
        const message = e.raw_message;
        const command = message.split(' ').length > 1 ? message.split(' ') : [message];
        const bot = client


        if (command[0] == '求签') {
            var N = 384;
            var a = Math.ceil(Math.random() * N);

            if (a == 1) { bot.sendGroupMsg(fromGroup, '求签结果：\n天门一挂榜，预定夺标人，马嘶芳草地，秋高听鹿鸣 \n【解签】大吉，事业、财运、健康、婚姻均顺遂 '); return; }
            if (a == 2) { bot.sendGroupMsg(fromGroup, '求签结果：\n地有神，甚威灵，兴邦辅国，尊主庇民 \n【解签】神护签，言行循规蹈矩，事业上必有贵人相助，婚姻得人，健康亦佳 '); return; }
            if (a == 3) { bot.sendGroupMsg(fromGroup, '求签结果：\n长安花不可及，春风中马蹄疾，急早加鞭，骤然生色 \n【解签】惕励不可好高骛远，目前情况不理想 '); return; }
            if (a == 4) { bot.sendGroupMsg(fromGroup, '求签结果：\n春花娇媚，不禁雨打风飘，秋菊幽芳，反耐霜雪傲 \n【解签】勉惕类，诸事无法顺利，踏实或有可望 '); return; }
            if (a == 5) { bot.sendGroupMsg(fromGroup, '求签结果：\n春雷震，夏风巽，卧龙起，猛虎惊，风云会合，救济苍生 \n【解签】否极泰来，外旱逢甘雨，不过婚姻恐有波澜，出外旅游亦不宜 '); return; }
            if (a == 6) { bot.sendGroupMsg(fromGroup, '求签结果：\n非玄非奥，非浅非深，一个妙道，着意搜寻 \n【解签】心性勿急切，着意搜寻，必能如愿 '); return; }
            if (a == 7) { bot.sendGroupMsg(fromGroup, '求签结果：\n君须悟，勿误疑，有平路，任驱驰，随时变易，件件碱宜 \n【解签】应机警应变，始能左右逢源 '); return; }
            if (a == 8) { bot.sendGroupMsg(fromGroup, '求签结果：\n虎恋高山别有机，众人目下尚狐疑，雁来嘹呖黄花发，此际声名达帝畿 \n【解签】目前无人能识，日后必受众人赞颂，怀才不遇者得此签，日后必发达 '); return; }
            if (a == 9) { bot.sendGroupMsg(fromGroup, '求签结果：\n贵客相逢更可期，庭前枯木凤来仪，好将短事求长事，休听旁人说是非 \n【解签】命中得遇贵人相助，未婚男子可得佳侣，商人则应有主见，始能获利 '); return; }
            if (a == 10) { bot.sendGroupMsg(fromGroup, '求签结果：\n嘹呖征鸿独出群，高飞羽翼更纠纷\n【解签】才气出众，无奈受制，去向宜北，可获佳遇 '); return; }
            if (a == 11) { bot.sendGroupMsg(fromGroup, '求签结果：\n无踪又无迹，远近均难觅，平地起风波，似笑还成泣 \n【解签】诸事不利 '); return; }
            if (a == 12) { bot.sendGroupMsg(fromGroup, '求签结果：\n神黯黯，意悠悠，收却线，莫下钩 \n【解签】诸事暂且打住，免有失误，后悔莫及 '); return; }
            if (a == 13) { bot.sendGroupMsg(fromGroup, '求签结果：\n得意宜逢妇，前程去有缘，利名终有望，三五月团圆 \n【解签】吉，留意三、五有关月日，或有殊遇、喜事 '); return; }
            if (a == 14) { bot.sendGroupMsg(fromGroup, '求签结果：\n鼎沸起风波，孤舟要渡河，巧中却藏拙，人事转蹉跎 \n【解签】不吉，须防树大招风，问婚姻或家人相处者，并争纷颇烈 '); return; }
            if (a == 15) { bot.sendGroupMsg(fromGroup, '求签结果：\n意在闲中信未来，故人千里自徘徊，天边雁足传消息，一点梅花春色回 \n【解签】一切期待，均有可得，但须再等待一段时间 '); return; }
            if (a == 16) { bot.sendGroupMsg(fromGroup, '求签结果：\n心和同，事知同，门外好施功，交加事有终 \n【解签】得此签者，不合者必复合 '); return; }
            if (a == 17) { bot.sendGroupMsg(fromGroup, '求签结果：\n欲行还止，徘徊不已，藏玉怀珠，寸心千里 \n【解签】处于蓄势欲发又迟疑难决者，宜下定决心，完成大业 '); return; }
            if (a == 18) { bot.sendGroupMsg(fromGroup, '求签结果：\n心戚戚，口啾啾，一番思虑一番忧，说了休时又不休 \n【解签】不利，结局恐难有望 '); return; }
            if (a == 19) { bot.sendGroupMsg(fromGroup, '求签结果：\n不远不近，似易似难，等闲一事，云中笑看 \n【解签】平平，成败利钝淡然处之 '); return; }
            if (a == 20) { bot.sendGroupMsg(fromGroup, '求签结果：\n桃李谢春风，西飞又复东，家中无意绪，船在浪涛中 \n【解签】栽种不得其时，去向漂流不定，远行旅程不顺，家庭亦有风波 '); return; }
            if (a == 21) { bot.sendGroupMsg(fromGroup, '求签结果：\n一水远一水，一山旋一山，水穷山尽处，名利不为难 \n【解签】须费尽九牛二虎之力始克有成 '); return; }
            if (a == 22) { bot.sendGroupMsg(fromGroup, '求签结果：\n事相扶，在半途，翻覆终可免，风波一点无 \n【解签】目前不顺，惟亦不致有风险 '); return; }
            if (a == 23) { bot.sendGroupMsg(fromGroup, '求签结果：\n喜喜喜，春风生桃李，不用强忧煎，明月人千里 \n【解签】喜讯已到，故人安然无恙，健康痊愈在即，婚姻可期 '); return; }
            if (a == 24) { bot.sendGroupMsg(fromGroup, '求签结果：\n意孜孜，心戚戚，要平安，防出入 \n【解签】谨言慎行，始得平安 '); return; }
            if (a == 25) { bot.sendGroupMsg(fromGroup, '求签结果：\n见不见，也防人背面，遇不遇，到底无凭据 \n【解签】应防来自西方之暗箭，所问之事尚无征候 '); return; }
            if (a == 26) { bot.sendGroupMsg(fromGroup, '求签结果：\n一番桃李一番春，谁识当初气象新，林下水边寻活计，见山了了称心意 \n【解签】或可任新职，经营事业以农林渔牧为宜，患病者宜换医生并到山水处静养 '); return; }
            if (a == 27) { bot.sendGroupMsg(fromGroup, '求签结果：\n莫怪我见错，心性自成屙，偏僻不通心，真人却不魔 \n【解签】不可固执己见，心性偏执者，宜修养心性 '); return; }
            if (a == 28) { bot.sendGroupMsg(fromGroup, '求签结果：\n禄马交驰，男儿得志时，行程早办，荣归乐期颐 \n【解签】吉祥，若卜仕途宦海之事，尤称合适 '); return; }
            if (a == 29) { bot.sendGroupMsg(fromGroup, '求签结果：\n了却心头事，三生夙有缘，香开十里桂，移步入天边 \n【解签】大吉大利，尤对男女姻缘，桂香之时，约为秋季为宜 '); return; }
            if (a == 30) { bot.sendGroupMsg(fromGroup, '求签结果：\n缘黄阁白了头，毕竟成何济，不如趁此精神，犹好买些真气\n【解签】攀权附贵者宜回头，顶天立地重新做人，否则不得善终 '); return; }
            if (a == 31) { bot.sendGroupMsg(fromGroup, '求签结果：\n离别间，虽不易，同伴行，犹不滞，早早起程，免他失意 \n【解签】平平，创业须结伴 '); return; }
            if (a == 32) { bot.sendGroupMsg(fromGroup, '求签结果：\n乐之极忧将至，巽兑分明吉与凶，未能光大终幽暗，日落西山返照中 \n【解签】不祥 '); return; }
            if (a == 33) { bot.sendGroupMsg(fromGroup, '求签结果：\n历过波涛三五重，谁知浪静又无风，须教明达青云路，用舍行藏不费功 \n【解签】平平 '); return; }
            if (a == 34) { bot.sendGroupMsg(fromGroup, '求签结果：\n缺月又重圆，枯枝色更鲜，一条夷坦路，翘首望青天 \n【解签】吉'); return; }
            if (a == 35) { bot.sendGroupMsg(fromGroup, '求签结果：\n行路难行路难，今日方知行路难，前程广大何足虑，琼力今朝度此滩 \n【解签】一向平顺，今突生险，惟必可过关 '); return; }
            if (a == 36) { bot.sendGroupMsg(fromGroup, '求签结果：\n春景明，春色新，春意傍水生，春天无限好，好去宴琼林 \n【解签】事业发达，健康良好，性情豁达，交游广阔 '); return; }
            if (a == 37) { bot.sendGroupMsg(fromGroup, '求签结果：\n万马归元，千猿朝洞，虎伏龙降，道高德重 \n【解签】须以德化人 '); return; }
            if (a == 38) { bot.sendGroupMsg(fromGroup, '求签结果：\n黄鹂报上林，春色鲜明，提鞭快着，马上速行程 \n【解签】做任何事，目前时机最佳 '); return; }
            if (a == 39) { bot.sendGroupMsg(fromGroup, '求签结果：\n大肆放灵丹，救人行万千，到头登彼岸，渡过入仙班 \n【解签】行善济人，必得善果，医生得此签，必为名医，教师得此签，必为名师 '); return; }
            if (a == 40) { bot.sendGroupMsg(fromGroup, '求签结果：\n一带水，碧澄澄，舟住江上，月到天心\n【解签】塞翁失马，焉知非福，诸事均欠顺遂，惟尚未铸下大错，还能全身而退 '); return; }
            if (a == 41) { bot.sendGroupMsg(fromGroup, '求签结果：\n桃李舒姘，春光鲜丽，良辰美景君须记\n【解签】吉祥，命中注定事事顺利，多疑而缺乏自信，将辜负上天恩宠 '); return; }
            if (a == 42) { bot.sendGroupMsg(fromGroup, '求签结果：\n隐中显，显中微，个中有玄机，参得透了，直上仙梯 \n【解签】所问之事呈胶着状态，仅凭蛛丝马迹研判，是否突破就看能否参透玄机 '); return; }
            if (a == 43) { bot.sendGroupMsg(fromGroup, '求签结果：\n无上去，在前头，回头一悟，绳缰好收，千条万线路常在，自好搜求 \n【解签】所问之事可能走错方向，即改弦易辙，另觅可行之路 '); return; }
            if (a == 44) { bot.sendGroupMsg(fromGroup, '求签结果：\n四顾无门路，桃源路可通，修炼成正果，万岁寿如松 \n【解签】平平，一生行运不通，惟尚有一线之路，只要多磨练、苦修，日后自成 '); return; }
            if (a == 45) { bot.sendGroupMsg(fromGroup, '求签结果：\n不用忙，不用慌，自有驻足乡，鸣鼓响钟地，三宝见门墙 \n【解签】做事沈着稳定，自有容身之地，多热心公益，门庭自逢佳运 '); return; }
            if (a == 46) { bot.sendGroupMsg(fromGroup, '求签结果：\n奔波一世，总是虚浮，无常一到万事休，急早回头 \n【解签】一生争名夺利，最后化为乌有，回头是岸 '); return; }
            if (a == 47) { bot.sendGroupMsg(fromGroup, '求签结果：\n真真真，人不识，真真真，神有灵，归宗返本，方是元精 \n【解签】诸事假像蒙蔽，误入歧途，认清真象，转入正途 '); return; }
            if (a == 48) { bot.sendGroupMsg(fromGroup, '求签结果：\n走尽天涯，风霜历遍，不如问人三天，渐渐有回首见 \n【解签】冒目躁进必白费功夫，应就教贤达 '); return; }
            if (a == 49) { bot.sendGroupMsg(fromGroup, '求签结果：\n沈沈屙染，不见天心，雷门一震，体健身轻 \n【解签】久病者突逢良医，立即恢复健康，经营事业不佳者'); return; }
            if (a == 50) { bot.sendGroupMsg(fromGroup, '求签结果：\n财马两匆忙，官禄有定方，猪羊牛犬，自去主张 \n【解签】顺其自然 '); return; }
            if (a == 51) { bot.sendGroupMsg(fromGroup, '求签结果：\n空空空，空里得成功，蟠桃千载熟，不怕五更风 \n【解签】大器晚成，若问财运，得此签不祥，若问诉讼，则于缠讼多日可获胜诉 '); return; }
            if (a == 52) { bot.sendGroupMsg(fromGroup, '求签结果：\n愁脸放，笑颜开，秋月挂高台，人从千里来 \n【解签】吉祥，心境渐渐开朗，环境已转佳境，寻人定然相遇，其他亦有转机 '); return; }
            if (a == 53) { bot.sendGroupMsg(fromGroup, '求签结果：\n须着力，莫远游，长竿钓向蟾蜍窟，直欲云中得巨鳌 \n【解签】惕之签，凡事须全力以赴，不可贪玩疏忽，时运来临，愿望自然可成 '); return; }
            if (a == 54) { bot.sendGroupMsg(fromGroup, '求签结果：\n无踪无迹，远近难觅，旱海行舟，空劳费力 \n【解签】诸事难成 '); return; }
            if (a == 55) { bot.sendGroupMsg(fromGroup, '求签结果：\n细雨蒙蒙湿，江边路不通，道途音信远，凭仗借东风 \n【解签】时运欠佳，一切难望有成，惟有依靠仅有之一线生机 '); return; }
            if (a == 56) { bot.sendGroupMsg(fromGroup, '求签结果：\n平地起云烟，时下未能安，高处觅姻缘 \n【解签】所问之事现时现地均难有成，如问姻缘'); return; }
            if (a == 57) { bot.sendGroupMsg(fromGroup, '求签结果：\n正直宜守，妄动生灾，利通名达，叶落花开 \n【解签】应坚守本位，正直无欺 '); return; }
            if (a == 58) { bot.sendGroupMsg(fromGroup, '求签结果：\n君子升，小人阻，征战生离苦，前有吉人逢\n【解签】所问之事波折连连，有人玉成，有人破坏，无地利之便，须稳妥安排为宜 '); return; }
            if (a == 59) { bot.sendGroupMsg(fromGroup, '求签结果：\n纷纷复纷纷，欷 独掩门， 眉望灯火，伴我坐黄昏 \n【解签】须守时耐运，待机而行，不可强求  妇人求得此签，恐有夫妻失和情事 '); return; }
            if (a == 60) { bot.sendGroupMsg(fromGroup, '求签结果：\n红颜美，休挂怀，人在车中，舟行水里 \n【解签】戒之在色，凡事不可存奢望 '); return; }
            if (a == 61) { bot.sendGroupMsg(fromGroup, '求签结果：\n桥已断，路不通，登舟理楫，又遇狂风 \n【解签】大不吉，凡事宜慎 '); return; }
            if (a == 62) { bot.sendGroupMsg(fromGroup, '求签结果：\n深潭月，照镜影，一场空，安报信 \n【解签】水底月，镜中花，花蓝打水一场空 '); return; }
            if (a == 63) { bot.sendGroupMsg(fromGroup, '求签结果：\n湖海意悠悠，烟波下钓钩，若逢龙与兔，名利一齐周 \n【解签】示人胸襟以阔，达观为怀，自可名利双收  (注意龙兔年或属龙兔之人'); return; }
            if (a == 64) { bot.sendGroupMsg(fromGroup, '求签结果：\n物不牢，人断桥，重整理，慢心高 \n【解签】所问之事应重新来过，如以笃实之态度为之，或有可成 '); return; }
            if (a == 65) { bot.sendGroupMsg(fromGroup, '求签结果：\n入而易，出而难，恹恹到再三，交加意不堪 \n【解签】请神容易送神难 '); return; }
            if (a == 66) { bot.sendGroupMsg(fromGroup, '求签结果：\n事迟志速，而且反覆，直待岁寒，花残果熟 \n【解签】若时机未熟，但凭己力，尚难成就  妇女得此签，显示心意不足，青春蹉跎 '); return; }
            if (a == 67) { bot.sendGroupMsg(fromGroup, '求签结果：\n乘马前进，所求吉贞，随时谐美，缺月重明 \n【解签】一鼓作气，勇往直前，即使往昔曾犯缺失，如今亦可重获振作之机 '); return; }
            if (a == 68) { bot.sendGroupMsg(fromGroup, '求签结果：\n舟离古渡月离云，人出潼关好问津，且向前行去求住，何须疑虑两三心 \n【解签】此签主外，出远行有利，得此签者'); return; }
            if (a == 69) { bot.sendGroupMsg(fromGroup, '求签结果：\n不足不足，难伸心曲，野塘雨过月如钩，梦断邯郸眉黛愁 \n【解签】知足常乐，随遇而安，否则梦境难圆之慨'); return; }
            if (a == 70) { bot.sendGroupMsg(fromGroup, '求签结果：\n美有堪，堪有美，始有终，终有始 \n【解签】为人追求真善美方为正途，凡事必以始终一贯精神为之 '); return; }
            if (a == 71) { bot.sendGroupMsg(fromGroup, '求签结果：\n湖海悠悠，孤舟浪头，来人未渡，残照山楼 \n【解签】所问诸事尚在虚无飘渺间，当前处境未开，心绪至为郁闷，情境苍茫 '); return; }
            if (a == 72) { bot.sendGroupMsg(fromGroup, '求签结果：\n深户要牢扃，提防暗里人，莫言无外事，纵好定遭 \n【解签】无事须当有事，有事更加防范'); return; }
            if (a == 73) { bot.sendGroupMsg(fromGroup, '求签结果：\n江海悠悠，烟波下钩，六鳌连获，歌笑中流 \n【解签】此签大吉，凡谋事、创业必有望'); return; }
            if (a == 74) { bot.sendGroupMsg(fromGroup, '求签结果：\n欲济未济，欲求强求，心无一定，一车两头 \n【解签】三心二意，有违常理，动弹不得，得此签者，所问诸事均呈胶着状态 '); return; }
            if (a == 75) { bot.sendGroupMsg(fromGroup, '求签结果：\n一得一虑，退后欲先，路通大道，心自安然 \n【解签】得意之时勿忘形，失败之后勿失志，不行歪路，心境自然安适 '); return; }
            if (a == 76) { bot.sendGroupMsg(fromGroup, '求签结果：\n难难难，忽然平地起波澜，易易易，谈笑寻常终有望 \n【解签】机遇欠佳时，人在家中坐，祸从天上来'); return; }
            if (a == 77) { bot.sendGroupMsg(fromGroup, '求签结果：\n心有余，力不足，倚仗春风，一歌一曲 \n【解签】所问之事，自己心余力绌，无法独力完成，但会有外力来助，结果仍称圆满 '); return; }
            if (a == 78) { bot.sendGroupMsg(fromGroup, '求签结果：\n身不安，心不安，动静两三番，终朝事必叹 \n【解签】问健康，应多运动，问事业，则现危机'); return; }
            if (a == 79) { bot.sendGroupMsg(fromGroup, '求签结果：\n事了物未了，人圆物未圆，要知端的信，日影上琅 \n【解签】人、事问题，均了断并圆满解决，有关物则否'); return; }
            if (a == 80) { bot.sendGroupMsg(fromGroup, '求签结果：\n木向阳春发，三阴又伏根，樵夫不知道，砍去作柴薪 \n【解签】不可暴殄天物，对事物体认不够，任意扔弃滥用，岂不可惜 '); return; }
            if (a == 81) { bot.sendGroupMsg(fromGroup, '求签结果：\n一月缺，一镜缺，不团圆，无可说 \n【解签】此签不吉，月既缺镜又损，所问诸事自属不圆满，恐亦无转机 '); return; }
            if (a == 82) { bot.sendGroupMsg(fromGroup, '求签结果：\n车马到临，旌旗隐隐月分明，招安讨叛，永大前程 \n【解签】此签如问战略戎事大吉，问事业则大发，问考试则高中 '); return; }
            if (a == 83) { bot.sendGroupMsg(fromGroup, '求签结果：\n我何宿，我何宿，海东河北成名录，一段神光，直冲天渎 \n【解签】选择努力方向，如能吸取前贤经验，必能事半功倍，如得神助 '); return; }
            if (a == 84) { bot.sendGroupMsg(fromGroup, '求签结果：\n金鳞入手，得还防走，若论周旋，谨言缄口 \n【解签】金鳞影射钱财，警惕吾人谨言少语，如遇友人金钱周转，须防上当受骗 '); return; }
            if (a == 85) { bot.sendGroupMsg(fromGroup, '求签结果：\n倾一 ，展愁眉，天地合，好思为 \n【解签】愁闷事在杯酒中尽释，夫妻间之不合应尽快化解 '); return; }
            if (a == 86) { bot.sendGroupMsg(fromGroup, '求签结果：\n野鬼张弧射主人，暗中一箭鬼魂惊，忽然红日沈江海，难破空中事不明 \n【解签】得此签者如为主管，恐有欺害下属之事，结果遭到致命之报复 '); return; }
            if (a == 87) { bot.sendGroupMsg(fromGroup, '求签结果：\n福星照，吉宿临，青天有日见天真，龙飞下载到明庭 \n【解签】此签吉利，全属福佑德庇之赞 '); return; }
            if (a == 88) { bot.sendGroupMsg(fromGroup, '求签结果：\n独钓寒潭，中途兴阑，水寒鱼不饵，空载月明还 \n【解签】不祥，所处环境欠佳，所求未如理想，反生阻碍 '); return; }
            if (a == 89) { bot.sendGroupMsg(fromGroup, '求签结果：\n不归一，劳心力，贵人旁，宜借力 \n【解签】所问诸事意见纷陈，头绪杂乱，如不借助有力者，恐要白费心力 '); return; }
            if (a == 90) { bot.sendGroupMsg(fromGroup, '求签结果：\n云尽月当中，光辉到处通，路途逢水顺，千里快如风 \n【解签】转机交运之兆，时下机运甚佳，所问大吉大利 '); return; }
            if (a == 91) { bot.sendGroupMsg(fromGroup, '求签结果：\n剑戟列山林，盗贼必来侵，败走擒搜定，封侯荫子孙 \n【解签】激烈竞争中，需料敌如神，妥为布置以待敌来'); return; }
            if (a == 92) { bot.sendGroupMsg(fromGroup, '求签结果：\n岸阔水深舟易落，路遥山险步难行，蛇行自有通津日，月上天空分外明 \n【解签】所问诸事宜向宽处打算，向远途作想，最后必能成功 '); return; }
            if (a == 93) { bot.sendGroupMsg(fromGroup, '求签结果：\n拟欲迁而未可迁，提防喜处惹勾连，前途若得阴人引，变化鱼龙出大渊 \n【解签】勿为喜事冲昏头，谨防欢乐引出麻烦 '); return; }
            if (a == 94) { bot.sendGroupMsg(fromGroup, '求签结果：\n一人去，一人入，清风明月两相猜，获得金鳞下钓台 \n【解签】二人合作成功前互疑，惟风度尚在'); return; }
            if (a == 95) { bot.sendGroupMsg(fromGroup, '求签结果：\n喜未稳，悲已遭，大雨狂风吹古木，人人尽道不坚牢 \n【解签】世间悲欢无常，且悲事往往比喜事严重，常能将人击倒 '); return; }
            if (a == 96) { bot.sendGroupMsg(fromGroup, '求签结果：\n可以寄百里之命，可以托六尺之孤，钟期既遇毋迟误 \n【解签】得此签者，可望遇知音，交至友，得生死相许之配偶 '); return; }
            if (a == 97) { bot.sendGroupMsg(fromGroup, '求签结果：\n报导上林，春色鲜明，提鞭快着，马上行程 \n【解签】亨通顺利，时运好转 '); return; }
            if (a == 98) { bot.sendGroupMsg(fromGroup, '求签结果：\n鼠入土穴，最可安身，日中不见，静夜巡行 \n【解签】人各有其不同安身立命之所及最适当行动时机，选择其他恐大不利 '); return; }
            if (a == 99) { bot.sendGroupMsg(fromGroup, '求签结果：\n打起平生志，西南好去游，腰缠十万贯，骑鹤上扬州 \n【解签】得此签者，已功成名就，或者，目前从事者志趣不合'); return; }
            if (a == 100) { bot.sendGroupMsg(fromGroup, '求签结果：\n喜喜喜，终防否，获得骊龙颔下珠，忽然失却，还在水里 \n【解签】谨防有乐极生悲之事发生 '); return; }
            if (a == 101) { bot.sendGroupMsg(fromGroup, '求签结果：\n国有贤士，廷无佞臣，干戈不用，常享太平 \n【解签】太平盛世，家庭和乐 '); return; }
            if (a == 102) { bot.sendGroupMsg(fromGroup, '求签结果：\n泰来否已极，诸事莫忧心，但须 养元福\n【解签】示人以心性修养，积功好义之道理 '); return; }
            if (a == 103) { bot.sendGroupMsg(fromGroup, '求签结果：\n民乐业，官吏清，雍熙之世复见于今，告诸人千秋鸿业，仗此望明君 \n【解签】得签者为首脑时，应立求属下各安其位，各部门主管廉洁公正 '); return; }
            if (a == 104) { bot.sendGroupMsg(fromGroup, '求签结果：\n安如泰山，稳如磐石，放胆前行，中通外直 \n【解签】大吉大利 '); return; }
            if (a == 105) { bot.sendGroupMsg(fromGroup, '求签结果：\n月中有丹桂，人终攀不着，云梯足下生，此际好落脚 \n【解签】远大目标不易实现，如有匡助之力或引荐之人，也就获得成功机会 '); return; }
            if (a == 106) { bot.sendGroupMsg(fromGroup, '求签结果：\n天间一孤雁，嘹唳叹离群，试问知君者，而今有几人 \n【解签】失意者之孤寂与无奈，得此签者，宜调整处世态度，以此为诫 '); return; }
            if (a == 107) { bot.sendGroupMsg(fromGroup, '求签结果：\n红叶无颜色，凋零一夜风，邻鸡醒午梦，心事总成空 \n【解签】好运瞬即逝，理想忽受阻碍，办事难有成就 '); return; }
            if (a == 108) { bot.sendGroupMsg(fromGroup, '求签结果：\n事如麻，理多错，日掩云中，空成耽搁 \n【解签】所问之事情况混乱，时运不佳，事多蹉跎，一无所成 '); return; }
            if (a == 109) { bot.sendGroupMsg(fromGroup, '求签结果：\n勿上旧辙，甘驾新车，东西南北，稳步康衢 \n【解签】慎防勿蹈前车之覆辙，宁可改弦更张，另作他图 '); return; }
            if (a == 110) { bot.sendGroupMsg(fromGroup, '求签结果：\n夜梦被鼠惊，醒来不见人，终宵废寝，直到天明 \n【解签】不祥之兆，近时或有惊险之事，小心 '); return; }
            if (a == 111) { bot.sendGroupMsg(fromGroup, '求签结果：\n秋霜肃，夏日炎，新花鲜了旧花淹，世情看冷暖，逢者不须言 \n【解签】凡事靠自己，依赖别人不可靠 '); return; }
            if (a == 112) { bot.sendGroupMsg(fromGroup, '求签结果：\n未展英雄志，驰驱不惮劳，敢将休咎卜，西北夺前标 \n【解签】不避劳苦，慎选致力方向 '); return; }
            if (a == 113) { bot.sendGroupMsg(fromGroup, '求签结果：\n屙染沈沈，终日昏昏，雷门一震，体健身轻 \n【解签】如问疾病，暂难痊愈，尚需时日，以得名医 '); return; }
            if (a == 114) { bot.sendGroupMsg(fromGroup, '求签结果：\n易非易，难非难，忽地起波澜，欢笑两三番 \n【解签】所问之事，呈胶着状，惟会突起变化，所有问题迎刃而解 '); return; }
            if (a == 115) { bot.sendGroupMsg(fromGroup, '求签结果：\n路不通，门闭塞，谨慎提防，云藏月黑 \n【解签】不祥 '); return; }
            if (a == 116) { bot.sendGroupMsg(fromGroup, '求签结果：\n蜗角蝇头利，而今已变通，草头人笑汝，宜始不宜终 \n【解签】贪图小利，成不了大事'); return; }
            if (a == 117) { bot.sendGroupMsg(fromGroup, '求签结果：\n珠玉走盘中，田园定阜丰，休言谋未遂，此去便亨通 \n【解签】努力必有代价，但须耐心等待 '); return; }
            if (a == 118) { bot.sendGroupMsg(fromGroup, '求签结果：\n月已明，花再发，事悠悠，无不合 \n【解签】得此签者，所问诸事均处于最佳状态，事事称心如意 '); return; }
            if (a == 119) { bot.sendGroupMsg(fromGroup, '求签结果：\n朦胧秋月映朱门，林外鸟声远寺僧，自有贵人来接引，何须巧语似流莺 \n【解签】命中有贵人相助，安份守己以待机运 '); return; }
            if (a == 120) { bot.sendGroupMsg(fromGroup, '求签结果：\n事未宽，心不安，疑虑久，始安然 \n【解签】所问诸事处在急于解决却未能解决之状况，不过最后终能渡过难关 '); return; }
            if (a == 121) { bot.sendGroupMsg(fromGroup, '求签结果：\n虚名虚位久沈沈，禄马当求未见真，一片彩云秋后至，去年风物一时新 \n【解签】终年碌碌营钻，每得虚有其表之名位，但等秋后(或中年以后)将时来运转 '); return; }
            if (a == 122) { bot.sendGroupMsg(fromGroup, '求签结果：\n止止止，有终有始，似月如花，守成而已 \n【解签】成败得失，莫不缘于因果回圈之定数，不必强求 '); return; }
            if (a == 123) { bot.sendGroupMsg(fromGroup, '求签结果：\n明月全圆，颜色欣然，风云相送，和合万年 \n【解签】大吉大利，所问诸事均得圆满达成，更能得锦上添花之美 '); return; }
            if (a == 124) { bot.sendGroupMsg(fromGroup, '求签结果：\n宝镜新，照两人，心中结，合同心 \n【解签】得此签者，即将成婚，或已成婚'); return; }
            if (a == 125) { bot.sendGroupMsg(fromGroup, '求签结果：\n居下不亲上，人心易散离，事机终失一，凡百尽成灰 \n【解签】居上者倨傲、偏狭，居下者离心，最后关键时刻，招致失败 '); return; }
            if (a == 126) { bot.sendGroupMsg(fromGroup, '求签结果：\n兀兀尘埃久待时，幽窗寂静有谁知，若逢青紫人相引，财利功名自可期 \n【解签】得此签者，时运欠畅，有志未伸，须明提携之人，前途始有望 '); return; }
            if (a == 127) { bot.sendGroupMsg(fromGroup, '求签结果：\n虎伏在路途，行人莫乱呼，路旁须仔细，灾祸自然无 \n【解签】遇事小心仔细，否则有招致横祸之可能 '); return; }
            if (a == 128) { bot.sendGroupMsg(fromGroup, '求签结果：\n和不和，同不同，翻云覆雨几成空，进退须防终少功 \n【解签】不吉，如问事业，纠纷不断'); return; }
            if (a == 129) { bot.sendGroupMsg(fromGroup, '求签结果：\n东边事，西边成，风物月华明，高楼弄笛声 \n【解签】得此签者，所谋之事于闲散自在中，不期然而有所成 '); return; }
            if (a == 130) { bot.sendGroupMsg(fromGroup, '求签结果：\n事团圆，物周旋，一来一往，平步青天 \n【解签】此签大吉，所问诸事都很圆满，得此签者财运奇佳，本利相滚，财货盈仓 '); return; }
            if (a == 131) { bot.sendGroupMsg(fromGroup, '求签结果：\n浅水起风波，平地生荆棘，言语虑参商，犹恐无端的 \n【解签】衰运当头，即便慎言亦惹是非，故应少言，甚至不言 '); return; }
            if (a == 132) { bot.sendGroupMsg(fromGroup, '求签结果：\n秋月云开后，薰风雨过时，若逢楚国旧知己，等闲一荐不须疑 \n【解签】如处平顺之境遇，如有他乡旧知求己引荐则可为之'); return; }
            if (a == 133) { bot.sendGroupMsg(fromGroup, '求签结果：\n心已定，事何忧，金鳞已上钩，功名一网收 \n【解签】吉祥，所问诸事，心意已决，即可达成，同时功成名就 '); return; }
            if (a == 134) { bot.sendGroupMsg(fromGroup, '求签结果：\n意迷己不迷，事宽心不宽，要知端的信，犹隔两重山 \n【解签】凡事未可乐观 '); return; }
            if (a == 135) { bot.sendGroupMsg(fromGroup, '求签结果：\n笑中生不足，内外见愁哭，云散月光辉，转祸当成福 \n【解签】凡事仅看表面自有不足，阻碍或能排除，祸事亦能成福庇 '); return; }
            if (a == 136) { bot.sendGroupMsg(fromGroup, '求签结果：\n檐前鹊噪正翩翩，忧虑全消喜自然，一人进了一人退，下梢还有好姻缘 \n【解签】事情已安排妥当，全无冲突，若问姻缘，即可结合 '); return; }
            if (a == 137) { bot.sendGroupMsg(fromGroup, '求签结果：\n荆棘生平地，风波起四方，倚栏惆怅望，无语对斜阳 \n【解签】或有烦心之事来临，内心忧闷无人谅解 '); return; }
            if (a == 138) { bot.sendGroupMsg(fromGroup, '求签结果：\n谋已定，事何忧，照月上重楼，云中客点头 \n【解签】大局安排已定，不必多作考虑 '); return; }
            if (a == 139) { bot.sendGroupMsg(fromGroup, '求签结果：\n奇奇奇，地利与天时，灯花传信后，动静总相宜 \n【解签】所问诸事，成败在于天时与地利 '); return; }
            if (a == 140) { bot.sendGroupMsg(fromGroup, '求签结果：\n遇不遇，逢不逢，月沈海底，人在梦中 \n【解签】所问诸事均在虚无飘渺中 '); return; }
            if (a == 141) { bot.sendGroupMsg(fromGroup, '求签结果：\n暗中防霹雳，猜虑浑无实，转眼黑云收，拥出扶桑日 \n【解签】所耽忧之事均属子虚乌有，很快就能真相大白 '); return; }
            if (a == 142) { bot.sendGroupMsg(fromGroup, '求签结果：\n利在中邦出战时，一番获馈在王庭，凤衔丹诏归阳畔，得享佳名四海荣 \n【解签】此签今人问卜，不易作作妥贴解述，大意为立功异邦，归享盛名 '); return; }
            if (a == 143) { bot.sendGroupMsg(fromGroup, '求签结果：\n堪叹外边忧，更嗟门里闹，意绪更牵缠，心神亦颠倒 \n【解签】不吉之兆，得此签者处于公私纷繁，困扰重重之境 '); return; }
            if (a == 144) { bot.sendGroupMsg(fromGroup, '求签结果：\n一重山一重水，风波道坦然，壶中有别天 \n【解签】如问机构内之事，则虽风波重重'); return; }
            if (a == 145) { bot.sendGroupMsg(fromGroup, '求签结果：\n遇险不须忧，风波何足忌，若遇草头人，咫尺青云路 \n【解签】吉祥，化险为夷，若遇贵人，将可发迹  (贵人或可注意姓名有草字头者) '); return; }
            if (a == 146) { bot.sendGroupMsg(fromGroup, '求签结果：\n船棹中流急，花开春又离，事宁心不静，惹起许多疑 \n【解签】心情纷乱，办事虑深，时运犹待新春，旅外慎防不测，婚姻出现暗礁 '); return; }
            if (a == 147) { bot.sendGroupMsg(fromGroup, '求签结果：\n可蓄可储，片玉寸珠，停停稳稳，前遇良图 \n【解签】不可浪费，遇良机时始能大展鸿图 '); return; }
            if (a == 148) { bot.sendGroupMsg(fromGroup, '求签结果：\n小子早趋庭，青云久问程，贵人来助力，花谢子还成 \n【解签】早给子女适切教导，可望使其得到贵人相助，并实现愿望 '); return; }
            if (a == 149) { bot.sendGroupMsg(fromGroup, '求签结果：\n一心两事，一事两心，新花枯树，直待交春 \n【解签】得此签者有心意不专，操之过急之毛病，未改之前难有成就 '); return; }
            if (a == 150) { bot.sendGroupMsg(fromGroup, '求签结果：\n大事恐难图；残花不再鲜 \n【解签】时机已逝，时光已老，欲图大事，已不可能 '); return; }
            if (a == 151) { bot.sendGroupMsg(fromGroup, '求签结果：\n莫道事无讹，其中进退多，桂轮圆又缺，光彩更揩磨 \n【解签】好事多磨 '); return; }
            if (a == 152) { bot.sendGroupMsg(fromGroup, '求签结果：\n莫叹事迟留，休言不到头，长竿终入手，一钓上金钩 \n【解签】有耐心、恒心，最后终能如愿 '); return; }
            if (a == 153) { bot.sendGroupMsg(fromGroup, '求签结果：\n事称应有忌，未为恐先踬，欲往且迟迟，还须借势力 \n【解签】不必操之过急，须仰人相助，或有所成 '); return; }
            if (a == 154) { bot.sendGroupMsg(fromGroup, '求签结果：\n足不安，舆不安，两两事相得，忧来却又欢 \n【解签】塞翁失马，焉知非福，有时这样也不对'); return; }
            if (a == 155) { bot.sendGroupMsg(fromGroup, '求签结果：\n鼎折足，车脱辐，有贵人，重整续 \n【解签】所问诸事于开始非常不顺，命中有贵人相助，事情得以重整 '); return; }
            if (a == 156) { bot.sendGroupMsg(fromGroup, '求签结果：\n参详言语，波涛扬沸，事久无伤，时间不利 \n【解签】得此签者，恐有诉讼，或与人订约始终无法谈拢'); return; }
            if (a == 157) { bot.sendGroupMsg(fromGroup, '求签结果：\n贵客自相亲，功名唾手成，获金须积德，仰望太阳升 \n【解签】得此签者注定显达，但需注意积德，否则将很快失去一切 '); return; }
            if (a == 158) { bot.sendGroupMsg(fromGroup, '求签结果：\n平地起波澜，所求事日难，笑谈终有忌，同心事觉欢 \n【解签】目前机运欠佳，须与知心友朋共事，庶几无患 '); return; }
            if (a == 159) { bot.sendGroupMsg(fromGroup, '求签结果：\n狂风吹起墨云飞，月在天心遮不得，闲时无事暂相关，到底依然无克剥 \n【解签】所问之事或人，如天心之月，皎洁无垢，非黑云所能遮掩 '); return; }
            if (a == 160) { bot.sendGroupMsg(fromGroup, '求签结果：\n人倚楼，许多愁，澹然进步，事始无忧 \n【解签】独处深思，总觉不悦，若能眼光放远，自然无忧 '); return; }
            if (a == 161) { bot.sendGroupMsg(fromGroup, '求签结果：\n一点着阳春，枯枝朵朵新，志专方遇合，切忌二三心 \n【解签】心志专一始能受到重视，略得提携即可步入佳境 '); return; }
            if (a == 162) { bot.sendGroupMsg(fromGroup, '求签结果：\n道路迢遥，门庭闭塞，雾拥去兮，云开见日 \n【解签】应守时待运 '); return; }
            if (a == 163) { bot.sendGroupMsg(fromGroup, '求签结果：\n鱼上钩，丝纶弱，收拾难，力再着 \n【解签】将得手之机会或财物，由于条件不济，力量不足，无法承受，须再加努力 '); return; }
            if (a == 164) { bot.sendGroupMsg(fromGroup, '求签结果：\n相引更相牵，殷勤喜自然，施为无不利，愁事转团圆 \n【解签】得此签者，平时乐于助人，故人际关系良好，事事均如意 '); return; }
            if (a == 165) { bot.sendGroupMsg(fromGroup, '求签结果：\n疑疑疑，一番笑罢一番悲，落红满地无人扫，独对西风怅黛眉 \n【解签】凡猜疑之事，不可冒然尝试'); return; }
            if (a == 166) { bot.sendGroupMsg(fromGroup, '求签结果：\n上下不和同，劳而未有功，出门通大道，从此保初终 \n【解签】与其在一个意见分歧不合之团体里，不如及早退出，另创局面 '); return; }
            if (a == 167) { bot.sendGroupMsg(fromGroup, '求签结果：\n大事可成功，有益还无咎，云中执鞭人，报在三秋后 \n【解签】异人指点，凡事顺利，事成日在三秋后 '); return; }
            if (a == 168) { bot.sendGroupMsg(fromGroup, '求签结果：\n桑榆催暮景，缺月恐难圆，若遇刀锥客，方知喜自然 \n【解签】事情已到穷途末路，想有转机亦难'); return; }
            if (a == 169) { bot.sendGroupMsg(fromGroup, '求签结果：\n遍书前后事，艰险往来难，若得清风便，扁舟过远山 \n【解签】所问之事颇难如愿，须待天时 '); return; }
            if (a == 170) { bot.sendGroupMsg(fromGroup, '求签结果：\n莫叹残花，花开枯树，屋头春意，喜笑嘻嘻 \n【解签】得此签者，恐有失意事，惟转机已现 '); return; }
            if (a == 171) { bot.sendGroupMsg(fromGroup, '求签结果：\n一事总成空，一事还成喜，若遇口边人，心下堪凭委 \n【解签】凡进行之事，均属得失互参，与人交往洽事'); return; }
            if (a == 172) { bot.sendGroupMsg(fromGroup, '求签结果：\n欲得月中兔，须凭桃李拂，高山来接引，双喜照双眉 \n【解签】要得到不易到手之物，非借不凡之力 '); return; }
            if (a == 173) { bot.sendGroupMsg(fromGroup, '求签结果：\n事遂勿忧煎，春风喜自然，更垂三尺钩，得意获鳞鲜 \n【解签】大吉，所问诸事均能如愿，且喜事连连 '); return; }
            if (a == 174) { bot.sendGroupMsg(fromGroup, '求签结果：\n圆又缺，缺又圆，低低密密要周旋，时来始见缘 \n【解签】要求功德圆满，但凭个人造化，机缘如何，所问诸事均如此 '); return; }
            if (a == 175) { bot.sendGroupMsg(fromGroup, '求签结果：\n乘病马，上危坡，防失跌，见蹉跎 \n【解签】屋漏又遭连夜雨，船破偏遇当头风，衰透至极 '); return; }
            if (a == 176) { bot.sendGroupMsg(fromGroup, '求签结果：\n两事已和同，轻舟遇便风，道迷人得意，歌唱急流中 \n【解签】得意勿忘形，忘形恐有灾 '); return; }
            if (a == 177) { bot.sendGroupMsg(fromGroup, '求签结果：\n白玉蒙尘，黄金埋土，久久光辉，也须人举 \n【解签】虽有才华却遭埋没，须待有心人来提拔重用 '); return; }
            if (a == 178) { bot.sendGroupMsg(fromGroup, '求签结果：\n上接不稳，下接不和，相缠相扰，平地风波 \n【解签】无论在团体、在家庭或社会，上下皆不相容，经年纠葛不清 '); return; }
            if (a == 179) { bot.sendGroupMsg(fromGroup, '求签结果：\n背后笑嘻嘻，中行道最宜，所求终有望，不必皱双眉 \n【解签】心中所愿终可实现，何必愁眉深锁'); return; }
            if (a == 180) { bot.sendGroupMsg(fromGroup, '求签结果：\n憔悴无人问，林间听杜鹃，一声山月笛，千里泪涓涓 \n【解签】此签指一对恋人，因云山相阻，相思成疾'); return; }
            if (a == 181) { bot.sendGroupMsg(fromGroup, '求签结果：\n菱荷香里受深恩，桂魄圆时印绶新，从此威名山岳重，光辉直上位丝纶 \n【解签】此签如专就宦途而言，诚属上上大吉，可谓官运亨通，青云直上 '); return; }
            if (a == 182) { bot.sendGroupMsg(fromGroup, '求签结果：\n花落正逢春，行人在半程，事成还不就，索绊两三旬 \n【解签】任何事均不得其时，尤其最近一月内'); return; }
            if (a == 183) { bot.sendGroupMsg(fromGroup, '求签结果：\n欲行还止，徘徊不已，动摇莫强，得止且止 \n【解签】此签示人，若三心二意去做一件事，出于勉强，则一动不如一静 '); return; }
            if (a == 184) { bot.sendGroupMsg(fromGroup, '求签结果：\n心下事安然，周旋尚未全，逢龙还有吉，人月永团圆 \n【解签】所问诸事，虽未圆满解决，但必能安然无虞'); return; }
            if (a == 185) { bot.sendGroupMsg(fromGroup, '求签结果：\n梦里说关山，波深下钓难，利名终有望，目下未开颜 \n【解签】总想换个新环境或工作，然却却不知如何着手'); return; }
            if (a == 186) { bot.sendGroupMsg(fromGroup, '求签结果：\n三箭开云路，营求指日成，许多闲口语，翻作笑歌声 \n【解签】此签属机运亨通之签，尤对谋事、创业者而言 '); return; }
            if (a == 187) { bot.sendGroupMsg(fromGroup, '求签结果：\n休眷恋，误前程，终闹乱，出门庭 \n【解签】莫为意中人或原留之地恋恋不舍，而误未来大事'); return; }
            if (a == 188) { bot.sendGroupMsg(fromGroup, '求签结果：\n万里波涛静，一天风月闲，利名无阻隔，行路出重关 \n【解签】大吉 '); return; }
            if (a == 189) { bot.sendGroupMsg(fromGroup, '求签结果：\n渴望梅， 画饼，漫劳心，如捉影，遇虎龙，方可省 \n【解签】得此签者，恐有幻想之习，应即改之 '); return; }
            if (a == 190) { bot.sendGroupMsg(fromGroup, '求签结果：\n事迷心不迷，事宽心不宽，一场欢喜会，不久出重关 \n【解签】单办一项行业、活动或进行一件事，多力不从心'); return; }
            if (a == 191) { bot.sendGroupMsg(fromGroup, '求签结果：\n夜半渡无船，惊涛恐拍天，月斜云淡处，音信有人传 \n【解签】得此签者，诸事不宜冒进，宜于天时、地利、人和俱备之后再行动 '); return; }
            if (a == 192) { bot.sendGroupMsg(fromGroup, '求签结果：\n事若羁留，人不出头，往来闭塞，要见无有 \n【解签】从事任何事，以谨慎机敏为上 '); return; }
            if (a == 193) { bot.sendGroupMsg(fromGroup, '求签结果：\n万里片帆转，波平浪不惊，行行无阻滞，远处更通津 \n【解签】所问诸事一向稳妥顺利，日后扩展，更属定　胜券 '); return; }
            if (a == 194) { bot.sendGroupMsg(fromGroup, '求签结果：\n身历惊涛，东风便好，太平身退，目下还早 \n【解签】此签对告老退休者，颇合其解，如问他事'); return; }
            if (a == 195) { bot.sendGroupMsg(fromGroup, '求签结果：\n鹤自云中出，人从月下归，新欢盈脸上，不用皱双眉 \n【解签】吉祥，无所不利 '); return; }
            if (a == 196) { bot.sendGroupMsg(fromGroup, '求签结果：\n深潭鱼可钓，幽谷鸟可罗，只用久长心，不用生疑惑 \n【解签】具有耐心，任何事均可成，不必怀疑 '); return; }
            if (a == 197) { bot.sendGroupMsg(fromGroup, '求签结果：\n进不安，退不可，上下相从，明珠一颗 \n【解签】所问诸事，处于进退两难之境，须相关诸人上下一心，始有成功之望 '); return; }
            if (a == 198) { bot.sendGroupMsg(fromGroup, '求签结果：\n着着占先机，其中路不迷，目前无合意，乍免是和非 \n【解签】一向事事称心，如今却不再如意，但是非可免 '); return; }
            if (a == 199) { bot.sendGroupMsg(fromGroup, '求签结果：\n雀噪高枝上，行人古渡头，半途不了事，日暮转生愁 \n【解签】众说纷纭，莫衷一是，事情进行一半，成为日后愁苦之源 '); return; }
            if (a == 200) { bot.sendGroupMsg(fromGroup, '求签结果：\n凿石得玉，淘沙得珠，眼前目下，何用踌躇 \n【解签】得此签者，时运特佳，做任何事都会有意外之收获 '); return; }
            if (a == 201) { bot.sendGroupMsg(fromGroup, '求签结果：\n无端风雨催春去，落尽枝头桃李花，桃畔有人歌且笑，知君心事乱如麻 \n【解签】好景不长，好花不再，避免小人挑拨坏事，幸灾乐祸 '); return; }
            if (a == 202) { bot.sendGroupMsg(fromGroup, '求签结果：\n阆苑一时春，庭前花柳新，声传好信息，草木尽欣欣 \n【解签】所问诸事均吉祥如意 '); return; }
            if (a == 203) { bot.sendGroupMsg(fromGroup, '求签结果：\n门外事重叠，阴人多遇合，贤女虽助巧，渺渺终难洽 \n【解签】问卜之人处于小人当道，所负责之事又非内行'); return; }
            if (a == 204) { bot.sendGroupMsg(fromGroup, '求签结果：\n事有喜，面有光，终始好商量，壶中日月长 \n【解签】此签主得贤妻，家庭和谐，生活幸福，亦主妇女有喜 '); return; }
            if (a == 205) { bot.sendGroupMsg(fromGroup, '求签结果：\n暗去有明来，忧心事可谐，终须成一笑，目下莫疑猜 \n【解签】暗去明来，明去暗来，冥冥之中自有定数 '); return; }
            if (a == 206) { bot.sendGroupMsg(fromGroup, '求签结果：\n宝镜无尘染，金貂已剪裁，也逢天意合，终不惹尘埃 \n【解签】好事成双，得此签者，正直、高贵，受天之恩宠，事事如意 '); return; }
            if (a == 207) { bot.sendGroupMsg(fromGroup, '求签结果：\n和合事，笑谈成，喜音在半程，平步踏青云 \n【解签】吉，婚事笑谈中说定，高升喜讯已在半途，双喜临门人生至乐 '); return; }
            if (a == 208) { bot.sendGroupMsg(fromGroup, '求签结果：\n花残月缺，镜破钗分，休来休往，事始安宁 \n【解签】大不吉祥，诸事不宜，诸对婚姻论断，则尤不相宜，恐有劳燕分飞之虞 '); return; }
            if (a == 209) { bot.sendGroupMsg(fromGroup, '求签结果：\n门外好音来，生涯应有庆，名利有更迁，雁行终折阵 \n【解签】此签前段昌吉喜庆，事多有成'); return; }
            if (a == 210) { bot.sendGroupMsg(fromGroup, '求签结果：\n万里好江山，风沙尽日间，已吞钩上饵，何必遇波澜 \n【解签】变起仓悴，即将达成之希望亦被预料不到之状况破坏无遗 '); return; }
            if (a == 211) { bot.sendGroupMsg(fromGroup, '求签结果：\n双燕衔书舞，指日一齐来，寂寞淹留客，从兹下钓台 \n【解签】所期盼之事或人，已指日可待 '); return; }
            if (a == 212) { bot.sendGroupMsg(fromGroup, '求签结果：\n望去几重山，高深渐可攀，举头天上看，明月在人间 \n【解签】所问诸事看似高深莫测，只要不畏惧，终有明白一天 '); return; }
            if (a == 213) { bot.sendGroupMsg(fromGroup, '求签结果：\n用之则行，舍之则藏，一骑出重关，佳音咫尺间 \n【解签】用人应用有志节及才干之人，并放手让他施展，很快即有成就 '); return; }
            if (a == 214) { bot.sendGroupMsg(fromGroup, '求签结果：\n积德施功有子孙， 牛祭神及西邻，功名两字成全日，回首山河万物新 \n【解签】行善积德，泽被乡里，将来必有好报 '); return; }
            if (a == 215) { bot.sendGroupMsg(fromGroup, '求签结果：\n安坦路平夷，云中一雁飞，桃花逢骤雨，水畔女频啼 \n【解签】此签若对男女间相恋、婚姻、结 等，恐属大不利，如问他事，亦波折重重 '); return; }
            if (a == 216) { bot.sendGroupMsg(fromGroup, '求签结果：\n门内起干戈，亲仇两不和，朱衣临日月，始觉笑呵呵 \n【解签】谨防家人失和，手足互残，并防身边亲人成仇家，小心翼翼，终可有成 '); return; }
            if (a == 217) { bot.sendGroupMsg(fromGroup, '求签结果：\n有一人，获一鹿，事团圆，门外索 \n【解签】所问事必成，但须防后患'); return; }
            if (a == 218) { bot.sendGroupMsg(fromGroup, '求签结果：\n汝往无攸利，花开又及秋，严霜物荐至，退步不存留 \n【解签】不祥 '); return; }
            if (a == 219) { bot.sendGroupMsg(fromGroup, '求签结果：\n新月为钩，清风作线，举网烟波，锦鳞易见 \n【解签】佳，凡事得心应手，左右逢源 '); return; }
            if (a == 220) { bot.sendGroupMsg(fromGroup, '求签结果：\n先关锁，续提防，小节不知戒，因循成大殃 \n【解签】因小失大，不怕一万，只怕万一，星星之火，亦可燎原 '); return; }
            if (a == 221) { bot.sendGroupMsg(fromGroup, '求签结果：\n燕语莺啼，花开满院，倚栏春睡觉，无语　愁颜 \n【解签】时运已转，凡事可以顺利进行无阻 '); return; }
            if (a == 222) { bot.sendGroupMsg(fromGroup, '求签结果：\n劳心劳心，劳心有成，清风借力，欢笑前程 \n【解签】随时留心、深思，自必于事有补，前途开朗 '); return; }
            if (a == 223) { bot.sendGroupMsg(fromGroup, '求签结果：\n进步且徘徊，春风柳絮吹，水边行客倦，枕畔有忧怀 \n【解签】凡事求其循序渐进足矣，往往事将有成时又遭外来因素之阻扰 '); return; }
            if (a == 224) { bot.sendGroupMsg(fromGroup, '求签结果：\n玉石犹终昧，那堪小悔多，终无咎，笑呵呵 \n【解签】所问诸事由于当事人之昏昧，小错很多，但并无大碍 '); return; }
            if (a == 225) { bot.sendGroupMsg(fromGroup, '求签结果：\n垂翼遥天去，皆因避难行，一途经济意，又是满园春 \n【解签】狼狈脱逃一时，免却一场灾祸，在经过一番折腾后，终将回到安适生活中 '); return; }
            if (a == 226) { bot.sendGroupMsg(fromGroup, '求签结果：\n佳信至，开笑颜，飞腾一去，拨云上天 \n【解签】大吉大利之上上签，已有喜讯佳音，机运一到，即可平步青云，直上九重 '); return; }
            if (a == 227) { bot.sendGroupMsg(fromGroup, '求签结果：\n青毡空守旧，枝上巢生风，莫为一时喜，还疑此象凶 \n【解签】不祥，应加谨防，困窘之境依旧，且有风雨飘摇之险 '); return; }
            if (a == 228) { bot.sendGroupMsg(fromGroup, '求签结果：\n莫言荆棘恶，终为鸾凤栖，目前应有待，何用早踌躇 \n【解签】虽有阻碍，终将鸾凤合鸣，如问他事，则亦好事多磨，但终将如愿 '); return; }
            if (a == 229) { bot.sendGroupMsg(fromGroup, '求签结果：\n上下和，忧愁决，千嶂云，一轮月 \n【解签】家和万事兴 '); return; }
            if (a == 230) { bot.sendGroupMsg(fromGroup, '求签结果：\n玉出昆冈石，舟离古渡滩，行藏终有望，用舍不为难 \n【解签】某事或某人之底细即可水落石出，做抉择不会有困难 '); return; }
            if (a == 231) { bot.sendGroupMsg(fromGroup, '求签结果：\n目下意难舒，有客来徐徐，金车虽历险，吝必有终与 \n【解签】阁下心事纠结不开，待客访友迟延难遇，日后处境将留怅恨 '); return; }
            if (a == 232) { bot.sendGroupMsg(fromGroup, '求签结果：\n可以寄，可以托，事迟迟，无舛错 \n【解签】所问之事可以托付他人去办，不过进行缓慢，好在尚不至出错 '); return; }
            if (a == 233) { bot.sendGroupMsg(fromGroup, '求签结果：\n恐惧忧煎，皆在目前，若逢明鉴，指破空传 \n【解签】所问诸事忧患深重，若得人指点迷津，或可化险为夷 '); return; }
            if (a == 234) { bot.sendGroupMsg(fromGroup, '求签结果：\n月掩云间，昏迷道路，云散月明，渐宜进步 \n【解签】所问之事一时遭遇困阻，不辨路径，须排除障碍后，则再行进展可也 '); return; }
            if (a == 235) { bot.sendGroupMsg(fromGroup, '求签结果：\n道路狂招呼，风波一点无，时乖心绪乱，全仗贵人扶 \n【解签】一切条件对已有利，亦无风险'); return; }
            if (a == 236) { bot.sendGroupMsg(fromGroup, '求签结果：\n临渊放钩，清绝点埃，巨鳌随得，不用疑猜 \n【解签】要致富须走险路，做了抉择之后就应耐心以待，不必患得患失 '); return; }
            if (a == 237) { bot.sendGroupMsg(fromGroup, '求签结果：\n无中应有直，心事还成戚，云散月重圆，千里风帆急 \n【解签】平平，示人须以‘浮云散，明月照人来’之心情，进行心中之事 '); return; }
            if (a == 238) { bot.sendGroupMsg(fromGroup, '求签结果：\n造化生来信自然，师征千里福绵绵，功名得就神明助，蛇兔相逢定变迁 \n【解签】大吉，人生有些际遇必靠福份及神佑'); return; }
            if (a == 239) { bot.sendGroupMsg(fromGroup, '求签结果：\n大仗神威，群魔消灭，灭了又须威\n【解签】援引外力助达目的后，要对外力有适当控制'); return; }
            if (a == 240) { bot.sendGroupMsg(fromGroup, '求签结果：\n道必坚心，坚心必道成，建功勋，早回程\n【解签】勉人立身修业，勿图官宦之奢望，勿为功禄所贪恋 '); return; }
            if (a == 241) { bot.sendGroupMsg(fromGroup, '求签结果：\n一念上天堂，一念入地狱，地狱天堂\n【解签】荣耀或羞辱取决人之一念之间，人云亦云，昏庸一生岂不可惜'); return; }
            if (a == 242) { bot.sendGroupMsg(fromGroup, '求签结果：\n羊逸群，日对民，逢牛口，便咬人\n【解签】所显诗句近乎玄虚，不适用现代，不妨再卜一签] '); return; }
            if (a == 243) { bot.sendGroupMsg(fromGroup, '求签结果：\n若是有缘人，一指便回首，执迷不悟者，屡引也不走 \n【解签】所问事已步入歧途，是否及时省悟回头'); return; }
            if (a == 244) { bot.sendGroupMsg(fromGroup, '求签结果：\n月儿升东，清光可挹，万里无云，海天一碧 \n【解签】有好机运来，可以大放异彩，凡事均无阻塞，今后环境更趋有利 '); return; }
            if (a == 245) { bot.sendGroupMsg(fromGroup, '求签结果：\n男儿若得封侯印，不负人间走一遭\n【解签】大功告成之后，自可封侯或退隐山林，而选择后者才是大丈夫行径 '); return; }
            if (a == 246) { bot.sendGroupMsg(fromGroup, '求签结果：\n心月狐狸，迷惑世人，世人不察，延久倾身 \n【解签】世间有若干危害人体之嗜好，智者应以‘妖狐’迷人为鉴 '); return; }
            if (a == 247) { bot.sendGroupMsg(fromGroup, '求签结果：\n蓦地狂风起，大树尽掀扬，枝叶未凋零，培植终无恙 \n【解签】有惊无险 '); return; }
            if (a == 248) { bot.sendGroupMsg(fromGroup, '求签结果：\n虚日旺相，法要推寻，四围旋绕，对敌冲营 \n【解签】勿为假相所欺，应多方深入探讨真相 '); return; }
            if (a == 249) { bot.sendGroupMsg(fromGroup, '求签结果：\n荣枯早定莫嗟伤，辛苦他邦安享家乡，为他人作嫁衣裳\n【解签】荣枯天定，不要为失意伤情，应乐天知命，得此签者恐刻下时运不佳 '); return; }
            if (a == 250) { bot.sendGroupMsg(fromGroup, '求签结果：\n女儿大，喜临门，嫁良人，添子孙，同拜受，感皇恩 \n【解签】吉祥，对儿女婚嫁、男女友谊、家室人丁等，更为称庆 '); return; }
            if (a == 251) { bot.sendGroupMsg(fromGroup, '求签结果：\n木生火，口不噤，疯癫作症，寒热相侵 \n【解签】大不利，应谨言慎行，以防不测，免遭横事，此签于人为病痛，于事亦然 '); return; }
            if (a == 252) { bot.sendGroupMsg(fromGroup, '求签结果：\n休休休，过了三年又六周，不猛省，祸到头 \n【解签】在近三年半左右，尽量减少兴革异动'); return; }
            if (a == 253) { bot.sendGroupMsg(fromGroup, '求签结果：\n槛栏起火，孽畜遭殃，预防得力，灭火成康 \n【解签】凡事先防范于未然，才能安全无虑 '); return; }
            if (a == 254) { bot.sendGroupMsg(fromGroup, '求签结果：\n已遂心头愿，始知志气伸，三山须把握，频频定太平 \n【解签】事情办成后，仍应持谨慎戒惧之心，否则恐出差错，使前功尽弃 '); return; }
            if (a == 255) { bot.sendGroupMsg(fromGroup, '求签结果：\n福星照映，桂子香闻，满天星斗，光耀　人 \n【解签】大吉大利，命中注定有神明护佑，逢秋八月或有贵人相助 '); return; }
            if (a == 256) { bot.sendGroupMsg(fromGroup, '求签结果：\n东南北将来成故墟，燕蓟地苍生无存济，若要大奋雄心，水源不知何处\n【解签】环境至为险恶，既有近忧，又有远患，如想绝地求生，应先求取活命水源 '); return; }
            if (a == 257) { bot.sendGroupMsg(fromGroup, '求签结果：\n死有日，生有时，何事慢踌躇，飘然一往，心上无疑 \n【解签】人生一切莫不有定数，对事不必过于计较 '); return; }
            if (a == 258) { bot.sendGroupMsg(fromGroup, '求签结果：\n往来行僻处，猝然着一惊，豺狼若当道，斩灭方称心 \n【解签】进行之事突遇凶险，须拿勇气排除'); return; }
            if (a == 259) { bot.sendGroupMsg(fromGroup, '求签结果：\n八门分八位，九星布九方，青赤黄白黑\n【解签】此签恐系诸葛当年用兵制敌之策略，所卜之事可能双方实力相当 '); return; }
            if (a == 260) { bot.sendGroupMsg(fromGroup, '求签结果：\n终身不习上，在世却枉然，轮回不能免，永落深坑堑 \n【解签】劝人不能昏沉渡日 '); return; }
            if (a == 261) { bot.sendGroupMsg(fromGroup, '求签结果：\n两个子女，同到齐行，阴阳和合，谋作欢欣 \n【解签】得此签者可望得一子一女，亦可能一举得男女各一之双胞胎'); return; }
            if (a == 262) { bot.sendGroupMsg(fromGroup, '求签结果：\n中有玄机赋，鸡鸣方显露，猛然悟禅关，打破君门路 \n【解签】所问诸事疑难未解，但很快就能悟出解决之道 '); return; }
            if (a == 263) { bot.sendGroupMsg(fromGroup, '求签结果：\n数尾金鱼吞饵，丝竿钓了回头，家食翻嫌太贵，五湖四海遨游 \n【解签】意外之好运，有时不是福气反成负担 '); return; }
            if (a == 264) { bot.sendGroupMsg(fromGroup, '求签结果：\n卯日儿出林，午时正福临，卯生于寅，方见天心 \n【解签】天时依一定顺序运转，做任何事不能违背自然法则 '); return; }
            if (a == 265) { bot.sendGroupMsg(fromGroup, '求签结果：\n日中不决，日到方明，一场好事，六耳同成 \n【解签】所问事一两日内尚难定，日子到了事情自明朗'); return; }
            if (a == 266) { bot.sendGroupMsg(fromGroup, '求签结果：\n孤宿是妖星，猿猴及树精，入山遇此曜，迷了性和心 \n【解签】此签示人：孤独易于受惑 '); return; }
            if (a == 267) { bot.sendGroupMsg(fromGroup, '求签结果：\n滴漏声催鸡唱，趱行人逐队放，晚渡关津，前程无量 \n【解签】全力以赴，必有所成 '); return; }
            if (a == 268) { bot.sendGroupMsg(fromGroup, '求签结果：\n人在天涯外，久乏信音来，家人频望眼，草木畅胸怀 \n【解签】所念之人，远在他乡，久无讯息，对其怀念殷切 '); return; }
            if (a == 269) { bot.sendGroupMsg(fromGroup, '求签结果：\n这颗树下，一穴生成，若迁此土，福禄骈臻 \n【解签】寓意有二: 凡命运亨通者，即或居于枯树古井旁，福泽依增 勿营华屋 '); return; }
            if (a == 270) { bot.sendGroupMsg(fromGroup, '求签结果：\n躬耕陇亩，形神似劳，无拘无系，其乐陶陶 \n【解签】过不求人之生活，身体虽劳，精神却愉快 '); return; }
            if (a == 271) { bot.sendGroupMsg(fromGroup, '求签结果：\n祸来见鬼，鬼病淹缠，金羊得路，身脱灾殃 \n【解签】大祸临头，心被鬼怪的病淹没而纠缠不放'); return; }
            if (a == 272) { bot.sendGroupMsg(fromGroup, '求签结果：\n急起行，急起行，前途去，结同盟，只手擎天柱，史册好标名 \n【解签】得此签者可能于仓猝间受命，代表所属协调重大事务，并获圆满成功 '); return; }
            if (a == 273) { bot.sendGroupMsg(fromGroup, '求签结果：\n深山据猛虎，虎啸出山窝，扬威抖擞，何怕人多 \n【解签】雄壮威严，果敢勇往始可折服众人 '); return; }
            if (a == 274) { bot.sendGroupMsg(fromGroup, '求签结果：\n三天门，四地户，布阵成，明聚路，军马齐奔，鸣鼓进步 \n【解签】吾人行事，宜先制定良策，方可致胜可能 '); return; }
            if (a == 275) { bot.sendGroupMsg(fromGroup, '求签结果：\n山山山，山上建茅 ，不比人间栋宇，却如天上云昙 \n【解签】知足常乐 '); return; }
            if (a == 276) { bot.sendGroupMsg(fromGroup, '求签结果：\n来去原无定处，时来时去安身，跋涉无虑，荣辱不计 \n【解签】得此签者一生劳碌，谋生之处屡易，好在住宿有着落，奔波途中亦安全 '); return; }
            if (a == 277) { bot.sendGroupMsg(fromGroup, '求签结果：\n有子长，成水局，时遇火反发福，不必过忧煎，人心苦不足 \n【解签】世事难以尽如人意，不是太过就是不及，为此伤神忧虑，毫无意义 '); return; }
            if (a == 278) { bot.sendGroupMsg(fromGroup, '求签结果：\n黑夜里，勿前往，一有值，要着慌，牢牢记，须结党 \n【解签】陌生环境未了解前，勿冒然前往，如果必须前往，应结伴而行 '); return; }
            if (a == 279) { bot.sendGroupMsg(fromGroup, '求签结果：\n蛰龙已出世，头角首生成，云兴雨泽，得济苍生 \n【解签】大吉大利，所问之事，困局即将突破，从此可入坦途 '); return; }
            if (a == 280) { bot.sendGroupMsg(fromGroup, '求签结果：\n火势薰天，天边尽赤，遇际水源，庶乎成格 \n【解签】一旦发生意外灾祸，事发就不可收拾，应有克制对策，庶几解除困难 '); return; }
            if (a == 281) { bot.sendGroupMsg(fromGroup, '求签结果：\n向南有大道，乘马入杭城，不知吴人唱，更有一知音 \n【解签】含下列寓意：工作地点以南方为宜'); return; }
            if (a == 282) { bot.sendGroupMsg(fromGroup, '求签结果：\n有田一亩，尽可耕耘，无穷收获，都在西成 \n【解签】家有恒产，虽说不多，若能认真经营终必有成 '); return; }
            if (a == 283) { bot.sendGroupMsg(fromGroup, '求签结果：\n勿嫌儿无唇，疾足追不及，纳入猿穴中，走狗何处觅 \n【解签】此签寓意难明，或指形貌才智虽有缺陷，但天生万物，必有所长 '); return; }
            if (a == 284) { bot.sendGroupMsg(fromGroup, '求签结果：\n六牛耕地，垦开无疆，收成结实，盈禀盈仓 \n【解签】一分耕耘，一分收获，天下无侥幸而成之事 '); return; }
            if (a == 285) { bot.sendGroupMsg(fromGroup, '求签结果：\n大奋冲天志，勿苦恋家乡，七八君行早，扬武在沙场 \n【解签】成大事者应志在四方，勿囿于一角，把握时机及早行动 '); return; }
            if (a == 286) { bot.sendGroupMsg(fromGroup, '求签结果：\n葵花向日，忠赤倾心，大开广厦，乐享太平 \n【解签】得此签者深受部属爱戴，都能为其赤诚工作，使其事业鸿图大展 '); return; }
            if (a == 287) { bot.sendGroupMsg(fromGroup, '求签结果：\n人不识仙，那有真诀，一入玄门，津津有益 \n【解签】进行一事，必先穷理探源，把握其中要领，方能得心应手 '); return; }
            if (a == 288) { bot.sendGroupMsg(fromGroup, '求签结果：\n勿谓说话太沈，泥了就不成真，悟出千般奥妙，方识仙道最神 \n【解签】所问之事，面貌并不清朗，须用心去探求其内蕴 '); return; }
            if (a == 289) { bot.sendGroupMsg(fromGroup, '求签结果：\n功名虽多实际，何如修炼成真，真身不朽，万载长春 \n【解签】与其汲汲于追求功名，不如修身养性 '); return; }
            if (a == 290) { bot.sendGroupMsg(fromGroup, '求签结果：\n走走走，遇一狗，急思寻，可长久 \n【解签】处理事情上不宜忽略小节'); return; }
            if (a == 291) { bot.sendGroupMsg(fromGroup, '求签结果：\n不知真消息，消息蓦地来，月圆月缺夜，不许把门开 \n【解签】来得仓促之消息，不可轻信，变化 忽或反覆无常事情，少管为妙 '); return; }
            if (a == 292) { bot.sendGroupMsg(fromGroup, '求签结果：\n火旺处要不疲，水深处要不呆，到头当酌量，毋得惹他灾 \n【解签】事情进行到最重要关头应慎思斟酌，方不致带来灾害 '); return; }
            if (a == 293) { bot.sendGroupMsg(fromGroup, '求签结果：\n宾雁 湖地成陆，行建功勋早回程，贪恋终非世人福，莫教鸡鹜会相争 \n【解签】见好就收 '); return; }
            if (a == 294) { bot.sendGroupMsg(fromGroup, '求签结果：\n天上风，天边月，月白风清，两两相当 \n【解签】时运正佳，故凡求职、求偶、求学、求财等均有吉利 '); return; }
            if (a == 295) { bot.sendGroupMsg(fromGroup, '求签结果：\n叶归根，长立天地，水清源长流河海，人得金丹长生渊涯 \n【解签】万物生长、代谢均循一定之自然趋势'); return; }
            if (a == 296) { bot.sendGroupMsg(fromGroup, '求签结果：\n乘马去长安，看花花正发，一日雨来淋，香色尽凋零 \n【解签】花无百日娇，无千日好，得意常想失意时'); return; }
            if (a == 297) { bot.sendGroupMsg(fromGroup, '求签结果：\n木长春天根干老，子实三秋枝叶凋，不凋不谢，不见根牢 \n【解签】先经挫折磨练，然后其生命力必更坚强 '); return; }
            if (a == 298) { bot.sendGroupMsg(fromGroup, '求签结果：\n叫道叫道，天将明了，何不伸首舒眉，反做蓬蒿到老 \n【解签】早起三光，晏起三荒，应及时努力，遇事不可因循不振 '); return; }
            if (a == 299) { bot.sendGroupMsg(fromGroup, '求签结果：\n药饵真，服了宁，三剂后，足分明，神中神，清中清，固得紧，可长生 \n【解签】任何事物，真即真假即假，一经多方考验，底细便明 '); return; }
            if (a == 300) { bot.sendGroupMsg(fromGroup, '求签结果：\n三天曾结社，四海尽知名，长骑骏马，直入天庭 \n【解签】大吉大利，凡事左右逢源，得心应手 '); return; }
            if (a == 301) { bot.sendGroupMsg(fromGroup, '求签结果：\n闲来夫子处，偶然遇一人，童颜鹤发，笑里生春 \n【解签】命中有吉人相助 '); return; }
            if (a == 302) { bot.sendGroupMsg(fromGroup, '求签结果：\n闲云野鹤望东行，惟有乡人便是知音\n【解签】悠闲自在态度追求理想者，际遇最佳，经过二三年之经营，即可有成 '); return; }
            if (a == 303) { bot.sendGroupMsg(fromGroup, '求签结果：\n汉水无情，蜀水澄清，黄河滚滚，四处烟尘 \n【解签】浊者自浊，清者自清，吾人须洁身自好，以处混乱之险恶世道 '); return; }
            if (a == 304) { bot.sendGroupMsg(fromGroup, '求签结果：\n潜龙已受困，尚不见云兴，伫看云四合，飞去到天庭 \n【解签】求签者暂遇挫折，目前尚在守时待运阶段，待时机成熟 '); return; }
            if (a == 305) { bot.sendGroupMsg(fromGroup, '求签结果：\n此处滋味浓，浓艳不耐久，何如谈笑生风，倒好东奔西走 \n【解签】好花不常开，一旦处于绝佳之境，宜淡然处之，并另谋良图 '); return; }
            if (a == 306) { bot.sendGroupMsg(fromGroup, '求签结果：\n这里有小人，切莫稍留停，忙打点，好起行，日月如逝勿久存 \n【解签】所问诸事可能受到小人干扰破坏，与其争论无益，避之则吉 '); return; }
            if (a == 307) { bot.sendGroupMsg(fromGroup, '求签结果：\n龙生头角，将沛甘霖，六七八早，好济苍生 \n【解签】感应签，求职谋事创业等，遇龙年生者可得其助'); return; }
            if (a == 308) { bot.sendGroupMsg(fromGroup, '求签结果：\n太白现西南，龙蛇相竞逐，龙自飞上天，蛇却被刑戮 \n【解签】此签示人：善恶终有报 '); return; }
            if (a == 309) { bot.sendGroupMsg(fromGroup, '求签结果：\n曾把树栽，也要待春来，东风袅袅，开遍花街 \n【解签】寓意有二：一分耕耘，一分收获'); return; }
            if (a == 310) { bot.sendGroupMsg(fromGroup, '求签结果：\n四十余年苦已深，而今汝乐度光阴，莫筹论\n【解签】此签劝人要能知足，并把握光阴享受人生 '); return; }
            if (a == 311) { bot.sendGroupMsg(fromGroup, '求签结果：\n三冬足，文艺精，到头处，亦成冰，急急回首，勿误前程 \n【解签】所问诸事做法上恐有问题，应即改弦更张另作安排 '); return; }
            if (a == 312) { bot.sendGroupMsg(fromGroup, '求签结果：\n奇怪奇怪，前番来了，今番又来，谨慎提防，勿被弄坏 \n【解签】所问之事情况怪异，应提防生变，以免坏了大事 '); return; }
            if (a == 313) { bot.sendGroupMsg(fromGroup, '求签结果：\n耕牛伏 ，辟土开疆，坐看收获，黍稷稻梁 \n【解签】得此签者有以逸待劳，坐享其成之机运 '); return; }
            if (a == 314) { bot.sendGroupMsg(fromGroup, '求签结果：\n腰下佩青萍，步入金銮殿，覆护三山，千锤百链 \n【解签】得此签者功勋卓着，必为行业中顶尖人物，所问诸事无不卓然有成 '); return; }
            if (a == 315) { bot.sendGroupMsg(fromGroup, '求签结果：\n雏鸟飞高，出谷迁乔，龙神牙爪，变化海岛 \n【解签】此签以雏鸟喻人学艺未精不知天高地厚，初入社会难免饱受波涛翻滚之苦 '); return; }
            if (a == 316) { bot.sendGroupMsg(fromGroup, '求签结果：\n吉吉吉，寻常一样窗前月，凶凶凶\n【解签】得此签者恐有不吉事情临头，并因而尝到人情淡薄之滋味 '); return; }
            if (a == 317) { bot.sendGroupMsg(fromGroup, '求签结果：\n大火炎炎，宜水相济，宝鼎丹成，掀天揭地 \n【解签】不经意引发之灾难总有克制之法，刻意策划之事端，往往一发不可收拾 '); return; }
            if (a == 318) { bot.sendGroupMsg(fromGroup, '求签结果：\n铁索一条，未把孤舟系，金刀一下，早把头落地 \n【解签】所问之事宜以快刀斩乱麻方式处理，以杜后患 '); return; }
            if (a == 319) { bot.sendGroupMsg(fromGroup, '求签结果：\n十二时中，紧急炼着，一刻少延，无处下脚 \n【解签】做任何事，均要抱着积极态度不懈不怠全力以赴'); return; }
            if (a == 320) { bot.sendGroupMsg(fromGroup, '求签结果：\n风起西南，红日当天，奇门妙诀，一掌能着 \n【解签】当时机成熟，谜题即可轻易揭开，所有疑难均会得到答案 '); return; }
            if (a == 321) { bot.sendGroupMsg(fromGroup, '求签结果：\n万籁无声际，一月正当空，忽被云遮掩，皓魄反朦胧 \n【解签】谨慎维护形象，以突破谣言扭曲，得此签者有招人忌怨、暗算之危 '); return; }
            if (a == 322) { bot.sendGroupMsg(fromGroup, '求签结果：\n一个知音，却在天边等，切勿因循，静夜当思省 \n【解签】得签者为人处事有‘曲过高和太寡’之情形，宜检讨修正 '); return; }
            if (a == 323) { bot.sendGroupMsg(fromGroup, '求签结果：\n众犬相聚，砺齿咬牙，摇头摆尾，只顾看家 \n【解签】此签示人勿为小人群聚时之假像欺骗 '); return; }
            if (a == 324) { bot.sendGroupMsg(fromGroup, '求签结果：\n妻前夫后一同行，好比先机兆已明，君若有情须切记，十年恩义莫忘心 \n【解签】有的夫妻，妻强夫弱，得此签者有娶这种妻室之可能，婚后应重视恩义 '); return; }
            if (a == 325) { bot.sendGroupMsg(fromGroup, '求签结果：\n鼠伏穴，本自宁，一露首，猫即跟，扬威伸爪，鼠丧残生 \n【解签】凡事一动不如一静，坚守本份相安无事，或寓有应严守机密勿使泄露意思 '); return; }
            if (a == 326) { bot.sendGroupMsg(fromGroup, '求签结果：\n书中有女颜如玉，书中自有黄金屋，读尽五车书\n【解签】得此签者应切记斯言，不再忧心忡忡，终年劳碌而不读书 '); return; }
            if (a == 327) { bot.sendGroupMsg(fromGroup, '求签结果：\n豹变成文采，乘龙福自臻，赤身成富贵，事事得振新 \n【解签】得此签者将获佳婿，并因而使生命改观，荣华富贵享用不尽 '); return; }
            if (a == 328) { bot.sendGroupMsg(fromGroup, '求签结果：\n孤阳微兮，群阴溢兮，力既殚兮，将不可耄兮，真谨慎兮，宜可保兮 \n【解签】此签寓有‘道消魔长’之意，处此情况唯有谨慎或可保全 '); return; }
            if (a == 329) { bot.sendGroupMsg(fromGroup, '求签结果：\n晓雨初晴映碧溪，重重春色上柴扉，黄金不尽家殷富，何必区区羡锦衣\n【解签】此签示人:家道富裕，宜安于现状，不必另起为官或经商之念 '); return; }
            if (a == 330) { bot.sendGroupMsg(fromGroup, '求签结果：\n世道多荆棘，人情每用嗟，利名如有路，勤苦逐生涯 \n【解签】名利与己与缘，不必在凶险世途上与人争夺，安份守己勤苦渡日最宜 '); return; }
            if (a == 331) { bot.sendGroupMsg(fromGroup, '求签结果：\n山穷路转迷，水急舟难渡，万事莫强为，出处遭研妒 \n【解签】跋山涉水出门远行，均属不利'); return; }
            if (a == 332) { bot.sendGroupMsg(fromGroup, '求签结果：\n时边多艰，战战兢兢，戒谨恐惧，如履薄冰\n【解签】时运不佳，未来日子风险更多，得此签者，须多加谨慎提防为宜 '); return; }
            if (a == 333) { bot.sendGroupMsg(fromGroup, '求签结果：\n一朵花枝艳更芳，清香馥郁透兰房，时风吹送终成笑，好句筵前进几觞 \n【解签】得此签者如为女性，必美且慧，远近赞美'); return; }
            if (a == 334) { bot.sendGroupMsg(fromGroup, '求签结果：\n自从持守定，功在众人先，别有非常喜，随龙到九天 \n【解签】一人做任何事，具有恒心、毅力，则其成功机会较大 '); return; }
            if (a == 335) { bot.sendGroupMsg(fromGroup, '求签结果：\n远涉波涛一叶舟，而今始得过滩头，年来心事才成就，屈指从前多可忧 \n【解签】此签甚佳，凡事亨通，如寻物得、谋事成、求偶佳、经商利、建屋吉 '); return; }
            if (a == 336) { bot.sendGroupMsg(fromGroup, '求签结果：\n受君之禄，久降祯祥，盈而不覆，守之乃昌，毋怠毋骄，永保安康 \n【解签】得签者久受重用，生活富裕，如起异心或心生骄怠，则可能失去一切 '); return; }
            if (a == 337) { bot.sendGroupMsg(fromGroup, '求签结果：\n万事不由人计较，一生尽是命安排，莫疑猜\n【解签】谋事在人，成事在天  对一切事物，莫过于贪婪奢求 '); return; }
            if (a == 338) { bot.sendGroupMsg(fromGroup, '求签结果：\n一片忧心未肯休，花逢春雨艳难留\n【解签】所问诸事均不顺遂，因而被重重烦忧困住'); return; }
            if (a == 339) { bot.sendGroupMsg(fromGroup, '求签结果：\n两女一夫，上下相祛，阴气乘阳，用是耗虚 \n【解签】对女色之困惑，须加以警惕，不可贪恋也，否则将有耗虚之虞 '); return; }
            if (a == 340) { bot.sendGroupMsg(fromGroup, '求签结果：\n双燕归南国，来寻王谢家，华堂春尽静，进此托生涯 \n【解签】倦游归来，景物全非 '); return; }
            if (a == 341) { bot.sendGroupMsg(fromGroup, '求签结果：\n命运蹇兮时违，灾殃及兮身疲，望皇天兮不我顾，嗟我亲兮病斯危 \n【解签】不吉，诸事不宜 '); return; }
            if (a == 342) { bot.sendGroupMsg(fromGroup, '求签结果：\n采药天台路转迷，桃花流水赋佳期，春风啼鸟多情思，寄语刘郎且莫归 \n【解签】在他乡工作时意外得遇知音，事事顺遂，暂且不宜返乡 '); return; }
            if (a == 343) { bot.sendGroupMsg(fromGroup, '求签结果：\n出温入寒，被薄衣单，去我慈航，难解横愆 \n【解签】因时运不济及自己过错，使得处境至为孤寂无助'); return; }
            if (a == 344) { bot.sendGroupMsg(fromGroup, '求签结果：\n三升三石放在一斗，满而溢，子自得 \n【解签】示人不可削足适屦，亦寓有‘满招损’之意 '); return; }
            if (a == 345) { bot.sendGroupMsg(fromGroup, '求签结果：\n谁说故乡无滋味，飘零湖海在天涯，任咨嗟\n【解签】得此签者，恐终年在外奔波，受尽寂寥之苦，常起思乡之念 '); return; }
            if (a == 346) { bot.sendGroupMsg(fromGroup, '求签结果：\n云散月当空，牛前马后逢，张弓方抵御，一箭定全功 \n【解签】鼠年及羊年会有一举成功机会 '); return; }
            if (a == 347) { bot.sendGroupMsg(fromGroup, '求签结果：\n马进徐行似有程，月沈西海日东升，运来何必劳心力，风送江湖万里清 \n【解签】目前机运欠佳，事情进行缓慢，日夜　劳，来日运转，情况即可完全改观 '); return; }
            if (a == 348) { bot.sendGroupMsg(fromGroup, '求签结果：\n云横山际水茫茫，千里长途望故乡，蹇厄事来君莫恨，倚门惆怅立斜阳 \n【解签】困厄之事临身，一时难以解除，惆怅难免，怨恨则不必 '); return; }
            if (a == 349) { bot.sendGroupMsg(fromGroup, '求签结果：\n风波今已息，舟楫遇安流，自此功名遂，何须叹白头 \n【解签】一切纷争已息，今后行程应平稳无险，刻下经营多顺利，虽慢了些又何妨'); return; }
            if (a == 350) { bot.sendGroupMsg(fromGroup, '求签结果：\n巴到平安地，江山万里程，绿杨芳草处，风快马蹄轻 \n【解签】历尽千辛万苦，如今终入佳境 '); return; }
            if (a == 351) { bot.sendGroupMsg(fromGroup, '求签结果：\n雕鹗当秋势转雄，乘风分翼到蟾宫，荣华若问将来事，先后名声达九重 \n【解签】时来运转，气势甚雄，做任何事均能顺利无比 '); return; }
            if (a == 352) { bot.sendGroupMsg(fromGroup, '求签结果：\n鼠为患终宵不得宁，猫儿一叫几夜太平，人岂识如兽，其理甚分明 \n【解签】小人得志，嚣张狂妄，但为时不长 '); return; }
            if (a == 353) { bot.sendGroupMsg(fromGroup, '求签结果：\n两人在旁，太阳在上，照汝一寸心，仙机曾否明 \n【解签】举头三尺有神明，与人相处莫欺心，是非到头自分明 '); return; }
            if (a == 354) { bot.sendGroupMsg(fromGroup, '求签结果：\n君子道消，小人道长，阴气郁郁，阳气不扬，如何如何，良贾深藏 \n【解签】若大丈夫怀才不遇，则深藏不露乃为上策 '); return; }
            if (a == 355) { bot.sendGroupMsg(fromGroup, '求签结果：\n去到长安，东北转角，逢着天门，便有下落 \n【解签】未明，视所问事而定 '); return; }
            if (a == 356) { bot.sendGroupMsg(fromGroup, '求签结果：\n徐步入天台，为听好消息，采药有仙童，洞府列春色 \n【解签】机运不能坐等，要亲自向可能之处探寻，寻必有所得 '); return; }
            if (a == 357) { bot.sendGroupMsg(fromGroup, '求签结果：\n思量一夜，不如打干一番，若还错，烦恼及肺肝 \n【解签】此签寓意至明 '); return; }
            if (a == 358) { bot.sendGroupMsg(fromGroup, '求签结果：\n心细胆粗，可胜上将之任，勇往前行成败何必在心\n【解签】此签寓意至明 '); return; }
            if (a == 359) { bot.sendGroupMsg(fromGroup, '求签结果：\n天念苦修人，终不落红尘，清心能见道，扰扰丧真灵 \n【解签】对某件事能专心致志去做，收获必不同凡响 '); return; }
            if (a == 360) { bot.sendGroupMsg(fromGroup, '求签结果：\n捕兕于渊，求鱼于山，从朝至暮，功负力捐，改弦易辙，庶可图全 \n【解签】走错方向，用错方法，难望有成，应改弦更张，另设他法，或有成就一天 '); return; }
            if (a == 361) { bot.sendGroupMsg(fromGroup, '求签结果：\n手持一木鱼，沿街去化缘，不见徐公来，却遇一鸟去 \n【解签】所问之事恐徒劳无功 '); return; }
            if (a == 362) { bot.sendGroupMsg(fromGroup, '求签结果：\n水火既济，阴阳相契，育物新民，参天赞地 \n【解签】所有冲突已化解，障碍亦撤除，环境无比和谐，适宜做任何事 '); return; }
            if (a == 363) { bot.sendGroupMsg(fromGroup, '求签结果：\n骑玉兔，到广寒，遇嫦娥，将桂攀，满身馥郁，两袖馨香 \n【解签】得此签者机缘奇佳，得遇贵人，因而飞黄腾达事事遂心'); return; }
            if (a == 364) { bot.sendGroupMsg(fromGroup, '求签结果：\n一个神道，随尔去行，逢人说法，到处显灵 \n【解签】得此签者手法高明，待人处事八面玲珑，如有神道随行 '); return; }
            if (a == 365) { bot.sendGroupMsg(fromGroup, '求签结果：\n炉中火，沙里金，功力到，丹鼎成 \n【解签】功夫到了，任何事均可以做成 '); return; }
            if (a == 366) { bot.sendGroupMsg(fromGroup, '求签结果：\n此去万里程，却遇见知音，同心共济，大立勋名 \n【解签】得此签者将有远行，并在当地遇知音，成家立业，赢得声名 '); return; }
            if (a == 367) { bot.sendGroupMsg(fromGroup, '求签结果：\n寻芳春日，适见花开，朵朵堪摘，枝枝可栽 \n【解签】做任何事要能适当其时，才会处处逢源，事事顺心 '); return; }
            if (a == 368) { bot.sendGroupMsg(fromGroup, '求签结果：\n龙一吟，云便兴，冲霄直上，快睹太平，为文为武，君君臣臣 \n【解签】所问之事，已出现祥瑞之兆，很快就有和谐局面出现 '); return; }
            if (a == 369) { bot.sendGroupMsg(fromGroup, '求签结果：\n虎出金榜，有勇亦何济，怎似山翁，非富犹有趣 \n【解签】若干情况出乎常情之外，不能以常理处之，此时须求助于专门人才 '); return; }
            if (a == 370) { bot.sendGroupMsg(fromGroup, '求签结果：\n过羊肠，入康庄，五陵裘马，当思故乡 \n【解签】历尽辛苦，而步入舒适称意之环境，须饮水思源不可忘本 '); return; }
            if (a == 371) { bot.sendGroupMsg(fromGroup, '求签结果：\n火遭水克，火灭其光，水势滔滔，源远流长 \n【解签】处理紧急情况，不能急切，须防后患 '); return; }
            if (a == 372) { bot.sendGroupMsg(fromGroup, '求签结果：\n东阁筵开，佳客自来，高歌唱和，展挹舒怀 \n【解签】得签人已颇有名望，且乐于交际应酬，往来多为高雅之士 '); return; }
            if (a == 373) { bot.sendGroupMsg(fromGroup, '求签结果：\n世界似清宁，不知辞已休，打叠要小心，须防遭火  \n【解签】天下本无事，庸人自扰之，或谓‘苦恼皆因强出头’ '); return; }
            if (a == 374) { bot.sendGroupMsg(fromGroup, '求签结果：\n跳龙门，须激浪，雷电轰轰，踊跃万丈 \n【解签】要达崇高目标，须有超人本事，并能借机乘势 '); return; }
            if (a == 375) { bot.sendGroupMsg(fromGroup, '求签结果：\n山上有古松，亭亭冲汉斗，干老枝更长，天地生荣久 \n【解签】顺其自然，把握有利机运去求发展，才会有指望 '); return; }
            if (a == 376) { bot.sendGroupMsg(fromGroup, '求签结果：\n诽谤言，勿计论，到头来，数已定，碌碌浮生，不如安分 \n【解签】对于挑拨离间之闲言杂语，不去理会，一切自有天数，冥冥之中报应不爽 '); return; }
            if (a == 377) { bot.sendGroupMsg(fromGroup, '求签结果：\n一头猪，可祭天地，虽丧身，亦算好处 \n【解签】天生万物必有用，寓意人万勿连猪狗都不如 '); return; }
            if (a == 378) { bot.sendGroupMsg(fromGroup, '求签结果：\n与其日营营，何如夜忖忖，日里多劳形，夜间却安稳 \n【解签】此签寓意至明 '); return; }
            if (a == 379) { bot.sendGroupMsg(fromGroup, '求签结果：\n东风来，花自开，大家喝采，畅饮三杯 \n【解签】万事俱备，只欠东风，如今东风来了，自是令人开怀之事 '); return; }
            if (a == 380) { bot.sendGroupMsg(fromGroup, '求签结果：\n疏食饮水，乐在其中，膏梁美味，反使心朦 \n【解签】知足常乐 '); return; }
            if (a == 381) { bot.sendGroupMsg(fromGroup, '求签结果：\n黄牛辟土，大力开疆，西成时候，谷米盈仓 \n【解签】一分耕耘，一分收获 '); return; }
            if (a == 382) { bot.sendGroupMsg(fromGroup, '求签结果：\n蛇可化龙，头角将出，平地一声雷，方显龙蛇力 \n【解签】得此签者在平凡中力求不凡，即将有所成就 '); return; }
            if (a == 383) { bot.sendGroupMsg(fromGroup, '求签结果：\n九华山顶，紫气腾腾，异尽一舟，取去前行 \n【解签】得签者可望取得通达之机缘，从此一帆风顺 '); return; }
            if (a == 384) { bot.sendGroupMsg(fromGroup, '求签结果：\n人非孔颜鲜能无过，过而能改仍复无过\n【解签】有错要知悔改，做事务必落实，心胸宽大，人生才有意义 '); return; }
            bot.sendGroupMsg(fromGroup, '我也不知道');

        }
    })
}