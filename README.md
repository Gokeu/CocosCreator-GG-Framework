# Cocos Creator GG Framework

[![](https://img.shields.io/badge/Release-0.1.0-orange.svg)](CHANGELOG.md)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%202.4.3-green.svg)](http://www.cocos.com/creator)

Cocos Creator GG Framework 是一个让游戏快速搭建跑起来的框架，意为 Go Game! 

// TODO：框架介绍贴图

GG 框架基于 TypeScript 语言，框架入口为 `gg`，只需要在编辑器中输入 `gg.` 即可通过 Visual Studio Code 编辑器的提示，了解框架所有API的用法及其含义，十分方便上手。

现在，Go Game!

## 一、项目规范

- 采用[CocosCreator 官方推荐编码规范](http://docs.cocos.com/creator/manual/zh/scripting/reference/coding-standards.html?h=%E8%A7%84%E8%8C%83)
- 采用[VsCode 上的 Prettier 插件进行格式化控制](https://juejin.im/post/5a791d566fb9a0634853400e)
    1. 项目采用了 VsCode 上的 **Prettier** 插件进行代码格式化控制
    2. `.prettierrc` 文件为 Prettier 插件的配置文件，在 VsCode 运行时，会读取这个格式化控制配置文件
    3. 更多关于 Prettier 插件的使用，可以查阅下面两篇文章：
        - [VsCode + Prettier 使用教程](https://juejin.im/post/5a791d566fb9a0634853400e)
        - [Prettier 配置文件说明](https://prettier.io/docs/en/configuration.html)

## 二、项目开发环境配置

1. 安装 [Cocos Creator 2.4.3](https://www.cocos.com/)
2. 安装 [NodeJS](https://nodejs.org/en/)，安装成功后，建议全局下载以下 npm 包（可跳过）：
   ```
   npm install typescript -g
   npm install tslint -g
   ```     
3. 推荐使用 VSCode + TypeScript    

## 三、项目详细介绍

项目基础架构为 **单场景 + 多Prefab** 。其中，

* 不同的 Prefab 将通过 AssetBundle 去进行组织以形成模块。形成模块的目的解耦，提高复用性，方便跨项目使用
* 在跨项目使用的时候，我们的数据结构和逻辑基本是可以服用的，只有UI可能会有差异

项目结构概览：

```
assets
┣━━ mainbundle (此为文件夹，无需配置为bundle，打包后会变为内置的 main Bundle，bundle 优先级: 7)
┃    ┣━━ scenes
┃    ┃   ┗━━ MainScene.fire (主场景)
┃    ┗━━ scripts
┃        ┣━━ configs
┃        ┃   ┗━━ Panels.ts (记录所有面板的脚本)
┃        ┗━━ MainSceneCtrl.ts (主场景入口逻辑脚本)
┣━━ commonbundle (通用模块 bundle 优先级: 6)
┃    ┣━━ prefabs
┃    ┃   ┣━━ boot
┃    ┃   ┃   ┗━━ BootPanelPrefab.prefab (游戏启动页面板 Prefab)
┃    ┃   ┣━━ popwindow
┃    ┃   ┃   ┣━━ LoadingPanelPrefab.prefab (全局通用 Loading 面板 Prefab)
┃    ┃   ┃   ┗━━ ToastPanelPrefab.prefab (全局通用 Toast 面板 Prefab)
┃    ┃   ┗━━ setting
┃    ┃       ┗━━ GameSettingPanelPrefab.prefab (游戏设置面板 Prefab)
┃    ┣━━ scripts
┃    ┃   ┣━━ boot
┃    ┃   ┃   ┗━━ BootPanelPrefab.ts (游戏启动页面板 Prefab 的控制脚本)
┃    ┃   ┣━━ popwindow
┃    ┃   ┃   ┣━━ LoadingPanelPrefab.ts (全局通用 Loading 面板 Prefab 的控制脚本)
┃    ┃   ┃   ┗━━ ToastPanelPrefab.ts (全局通用 Toast 面板 Prefab 的控制脚本)
┃    ┃   ┗━━ setting
┃    ┃       ┣━━ GameSettingConst.ts (游戏设置模块的常量)
┃    ┃       ┣━━ GameSettingModel.ts (游戏设置模块的数据)
┃    ┃       ┣━━ GameSettingModule.ts (游戏设置模块的逻辑控制)
┃    ┃       ┗━━ GameSettingPanelPrefab.ts (游戏设置面板 Prefab 的控制脚本)
┃    ┗━━ textures
┃        ┗━━ xxx (自行组织)
┣━━ gamebundle (游戏模块 bundle 优先级: 5)
┃    ┣━━ prefabs
┃    ┃   ┗━━ game
┃    ┃       ┗━━ GamePanelPrefab.prefab (游戏主面板 Prefab)
┃    ┣━━ scripts
┃    ┃   ┗━━ game
┃    ┃       ┗━━ GamePanelPrefab.prefab (游戏主面板 Prefab 的控制脚本)
┃    ┗━━ textures
┃        ┗━━ xxx (自行组织)
```

说明：

1. 除了 `mainBundle` 文件夹之外，其他 `*bundle` 后缀的文件夹都需要配置为 bundle
2. 此框架项目取消了使用 `resources` 的 bundle ，只保留了 `main`, `internal` 两个内置 bundle （对于内置 bundle 的理解可以阅读 [官方文档](http://docs.cocos.com/creator/manual/zh/asset-manager/bundle.html) ）
3. 注意bundle优先级， `mainbundle > commonbundle > gamebundle > ...bundle`

### Q & A

Q：为什么启动页不放在 MainScene.scene 中， 而是要单独弄一个 BootPanelPrefab.prefab 呢？

A：这个是为了优化小游戏首包体积，这样子设计，**小游戏首包体积几乎是只有一个场景（无任何资源引用）+框架脚本，保证一个极小体积的首包**。当然不是非得这样子弄，只是这样子弄的意图是这个意思。



// TODO 补充更详细说明
