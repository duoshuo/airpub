[![Airpub logo](http://ww1.sinaimg.cn/large/61ff0de3gw1ejdogm8gyxj20pt0hamyc.jpg)](http://airpub.io)

## Airpub ![NPM version](https://img.shields.io/npm/v/airpub.svg?style=flat)

[Airpub](http://airpub.io) 是基于 Angular.js 搭建，[多说](http://duoshuo.com) 数据驱动的纯前端写作工具。

基于多说现有社交网络账户体系与健壮 API，Airpub 能够托管在任何静态资源服务器上，例如 GitHub Pages、又拍云储存、七牛云储存或使用自定义的 FTP 工具上传到任何 VPS 或虚拟主机中使用，为最终用户提供便捷流畅，优质轻量的博客写作与阅读体验。访问[官方网站](http://airpub.io)

### 快速开始

- [如何安装](#%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85)
- [配置指南](#%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97)
- [开发指南](#%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97)
- [贡献代码](#%E8%B4%A1%E7%8C%AE%E4%BB%A3%E7%A0%81)

### Airpub 功能特色
---

已实现的功能特色: 

- [x] 支持 Markdown 写作
- [x] 支持图片上传，目前支持上传到 又拍云
- [x] 支持插入代码以及代码高亮
- [x] 支持基于多说的社交网络账户登录
- [x] 基于 Angular Directive 规范的 add-on 系统
- [x] 基于 bower 管理的主题系统
- [x] 符合规范的，更好的 Angular SEO 实现
- [x] 更好的移动端登录体验，去掉多说登录中间页面，跳转到相应社交网站登录页面
- [x] 拆分后台文件与逻辑到独立页面，缩减普通用户请求资源大小
- [x] 支持友好地分享到微信信息流、朋友圈

Todo List:

- [x] 精细化压缩 `bootstrap.css`，实现更小的页面资源加载。
- [x] 解决前端鉴权产生的冗余依赖问题，消除对 `angular-md5`，`angular-base64` 等库的依赖。
- [ ] 实现单一文章多账户编辑的逻辑与界面，设计基本的 ACL 机制。

### 如何安装
---

#### 自动安装

使用 [Airpub CLI Installer](https://github.com/airpub/installer) 来安装 Airpub 的稳定版本：
```
$ [sudo] npm install -g airpub-installer
```
新建站点目录：
```
$ mkdir my-airpub-blog && cd my-airpub-blog
```
然后执行操作将相关的依赖全部安装完毕：
```
$ airpub install
```
airpub installer 将自动新建配置，仅需[简单编辑](#%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97)：
```
$ vi configs.js
```
大功告成！即可访问你的站点，开始 Airpub 简洁流畅的书写体验。

#### 手动安装

手动安装 Airpub 也**异常简单**，仅需使用 Git 拉取主干代码，即可直接部署在静态资源服务器上：
```
// 拉取代码
$ git clone https://github.com/turingou/airpub.git

// 手动新建配置文件
$ cd airpub
$ cp configs-sample.js configs.js

// 根据提示编辑配置文件，填入多说配置与站点信息
$ vi configs.js
```
配置填写完毕后，我们需要安装 Airpub 依赖的前端资源文件，执行：

```
$ bower install 
```
依赖安装完成后，即可访问你的站点，开始 Airpub 简洁流畅的书写体验。

### 配置指南
---

Airpub 仅需简单配置，即可达成不错的写作与阅读效果。在 `configs.js` 中，你应该会注意到存在两种配置项：

- `airpubConfig`: Airpub 博客系统本身的配置，包括站点名称，描述，以及其他元数据。
  * `name`: 站点名称
  * `description`: 站点描述
  * `url`: 线上访问地址，必须是绝对地址，用于分享
  * `upyun` 又拍云配置（用于上传图片）
    - `bucket`: 又拍云 bucket **名称**，在提供 `policy` 与 `signature` 时不需要提供
    - `policy`: 又拍云 policy，可通过 upyun-sign 命令行工具生成
    - `signature`: 又拍云 signature，可通过 upyun-sign 命令行工具生成
    - `form_api_secret`: 又拍云 `form_api_secret`，不推荐直接暴露在前端
    - `host`: 返回的图片的默认主机地址（可选）
    - `endpoint`: 默认 API 地址（可选）

- `duoshuoQuery`: 你的多说站点信息，目前仅需要提供 `short_name`

Airpub 鉴权基于多说用户系统，这意味着你不需要对 管理员 身份进行任何配置，仅需使用生成该 `short_name` 相应的多说用户登录即可进行文章的新建与管理操作。

**重要提示**: 如你的多说 `short_name` 之前有在任何服务中使用过，请申请全新的多说站点以获得不同的 `short_name`，我们推荐你采用这样的方式来管理自己不同的多说站点之间的关系，例如 `myname-wordpress` 和 `myname-airpub`。

**重要提示**: 建议你在多说管理后台（站点管理 => 设置 => 文章信息来源）开启 `只接受来自服务器的文章信息请求` 选项，防止非 API 请求造成的非法数据写入。

**提示**: 由于表单上传会暴露您的 `form_api_secret`，建议开启防盗链模式，并经常性更换 `form_api_secret`。如果你选择这种方式在前端进行摘要计算，记得在自己的页面上额外引入 `js-base64` 与 `js-md5` 的代码库。

### 开发指南
---

Airpub 的前端依赖基于 bower 构建，工作流基于 NPM 构建。在进行 Airpub 二次开发之前，确保你有安装 Node.js、NPM 以及 bower，然后执行以下步骤：

```
$ cd airpub
$ bower install 
$ npm install
$ npm run dev
```

命令 `$ npm run dev` 将再 `localhost:3000` 运行一个静态资源服务器，并实时压缩 dist 文件。需要确保这个端口没有被占用后再执行此操作。

### 贡献代码
---

欢迎为 Airpub 贡献代码。如果你有兴趣为 Airpub 贡献代码，请先查阅本项目中的相关代码，fork 项目后，再提交 pull request。
如果你对 Airpub 计划中的主题系统或 add-on 系统感兴趣，欢迎在 [issue](https://github.com/duoshuo/airpub/issues) 区提交新话题。

### MIT license
Copyright (c) 2014 Guo Yu &lt;o.u.turing@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
generated using [docor](https://github.com/turingou/docor.git) @ 0.1.0. brought to you by [turingou](https://github.com/turingou)