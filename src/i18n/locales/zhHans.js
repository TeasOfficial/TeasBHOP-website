import { zhHans as base } from 'vuetify/locale'
const zhHans = {
  ...base,
  welcome: '踏碎速度之壁垒，飞跃空域如坦途',
  footer: {
    back: '返回主页',
  },
  index: {
    website: '访问官网',
    downloads: '资源下载',
    translate: '> 为翻译做出贡献 <',
  },
  translate: {
    title: '提交翻译文件 / 为翻译工作贡献力量',
    subtitle: '我们需要你',
    q1: '我该如何获取翻译文件？',
    a1: '我们将翻译文件托管在了 GitHub 上，你可以通过访问我们的 i18n 仓库来了解详细情况。',
    q2: '我该如何提交翻译文件？',
    a2: '只需要在GitHub仓库中提交一个PR即可。',
    q3: 'GitHub仓库地址是什么？',
  },
  downloads: {
    header: {
      title: '资源下载',
      s64: '64位服务器',
      s32: '32位服务器',
    },
    drawer: {
      index: '返回首页',
      item1: {
        title: 'BHOP本地服务器下载',
        subtitle: '由 Picrisol45 制作',
      },
      item2: '64位服务器',
    },
    title: '欢迎访问TeasBHOP资源下载页面',
    forDesktop: {
      q: '对于 电脑/宽屏 用户：',
      a1: '页面左侧的抽屉栏在通常情况下会自动打开，你可以在左侧抽屉栏内选择你想要下载的资源。',
      a2: '对应的资源可以点入查看详情。',
    },
    forMobile: {
      q: '对于 手机/窄屏 用户：',
      a1: '页面左侧的抽屉栏默认隐藏，你需要点击导航栏左侧的 列表图标 展开抽屉栏。',
      a2: '展开后你可以在抽屉栏内选择你想要下载的资源。',
      a3: '对应的资源可以点入查看详情。',
    },
    cdn: {
      title: '内容分发服务商',
      pan123: '123云盘',
      notice: {
        title: '下载前必看',
        value: `
        如果你使用 123云盘 进行下载，是需要支付流量钱的（0.06元/GB）。
        你可以通过 注册/登录123云盘账号 后免费下载。
        你所支付的流量费用，云盘会抽取 70% 提成，剩下 30% 归属 TeasOfficial。
        `,
      },
    },
    tips: '你随时可以通过抽屉栏内的 "返回首页" 回到该页面。',
    x64: {
      title: 'BHOP本地服务器下载 - 64位新版',
      downloadlink: '下载链接：',
      notice1: {
        title: '使用须知（建议阅读）',
        value: `
        1.运行server.bat即可运行本地服
        2.要添加管理员，在\\cstrike\\addons\\sourcemod\\configs\\admin_simple.ini最后一行添加
        "STEAM_0:0:XXXXXXX"      "z"

        如果不知道你的steamid，在https://steamid.io/查询
        3.!admin中Timer Commands可以添加或删除zone,记录
        4.其他常用命令:
        !js 查看ssj jhud等跳跃数据
        !nv 启用夜视仪 !nvs 夜视仪设置
        !line路线显示  !bash2 显示反作弊日志
        `,
      },
    },
  },
}
export { zhHans }
