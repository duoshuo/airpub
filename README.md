## Airpub ![NPM version](https://img.shields.io/npm/v/airpub.svg?style=flat)

[Airpub](http://airpub.io) 是基于 Angular.js 搭建，[多说](http://duoshuo.com) 数据驱动的纯前端写作工具。

基于多说社交评论的海量现有社交网络账户体系与健壮的 API，Airpub 能够被托管在任何静态资源服务器上，譬如 GitHub Pages、又拍云储存、七牛云储存或使用自定义的 ftp 工具上传到任何 VPS 或虚拟主机中使用，为最终用户提供便捷流畅，优质轻量的博客写作与阅读体验。

### Airpub 功能特色
---

已实现或基本实现的特色：

- 支持 markdown 写作
- 支持表单图片上传
- 支持插入代码以及代码高亮
- 支持社交网络账户登录

即将实现或计划中的功能：

- 基于 Angular directive 规范的插件模式
- 从 WordPress 站点中一键迁移数据与评论
- 基于 Airpub 的多 编辑/作者 实现

### 如何安装
---

安装 Airpub **异常简单**，使用者并不需要再自己的服务器或虚拟主机中配置任何外部环境依赖，仅需使用 Git 拉取 master 分支下的代码，便可直接部署在支持静态资源服务器上：
```
$ git clone https://github.com/turingou/airpub.git // 拉取代码
$ cd airpub
$ cp configs-sample.js configs.js // 新建配置文件
$ vi configs.js // 根据提示编辑配置文件，填入多说配置与站点信息
```
配置填写完毕后，我们需要执行 `bower install` 用以安装 Airpub 依赖的前端资源文件，执行：

```
$ bower install 
```
依赖安装完成后，即可访问你的站点，开始 Airpub 简洁流畅的书写体验。

**提示**: 如您的多说 `short_name` 之前有在任何服务中使用过，请申请全新的多说站点以获得不同的 `short_name`，我们推荐你采用这样的方式来管理自己不同的多说站点之间的关系，例如 `myname-wordpress` 和 `myname-airpub`。

### 开发指南
---

Airpub 的前端依赖基于 bower 构建，工作流基于 NPM 构建。在进行 Airpub 二次开发之前，确保你有安装 Node.js、NPM 以及 bower，然后执行以下步骤：

```
$ cd airpub
$ bower install 
$ npm install
$ npm run dev
```

命令 `$ npm run dev` 将再 `localhost:3000` 运行一个静态资源服务器，需要确保这个端口没有被占用。

### 贡献代码
---

- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2013 turing &lt;o.u.turing@gmail.com&gt;

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