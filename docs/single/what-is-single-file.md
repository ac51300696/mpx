# 单文件

介绍单文件编译开发特性，包括单文件中有哪些部分以及如何进行ide配置等

## 介绍

按照小程序的文件规范，app & page & component 的组成部分都是四个文件，js, wxss, wxml, json; 多文件的形式在开发上体验并不是特别友好，使用过`vue`的同学都知道，单文件的开发模式更内聚，更可维护。因此mpx也提供了单文件开发模式，文件扩展名为 `.mpx`

通过 `webpack` 构建工具和 `mpx-loader` 可以将文件扩展名为 .mpx 的 `single file component` 转换成小程序所需要的四个文件。

这四个文件对应于单文件中的四个区域

### 基础例子

```html
<!--对应wxml文件-->
<template>
  <view>hello mpx</view>
</template>
<!--对应js文件-->
<script>
</script>
<!--对应wxss文件-->
<style lang="stylus">
</style>
<!--对应json文件-->
<script type="application/json">
</script>
```

## 编辑器/IDE高亮、提示

- [IntelliJ](what-is-single-file.md#IntelliJ)
- [vscode](what-is-single-file.md#vscode)

#### IntelliJ

如果使用IntelliJ系IDE开发，可将mpx后缀文件关联到vue类型，按vue解析。  
![关联文件类型](../images/start-tips2.png)  
但会报一个warning提示有重复的script标签，关闭该警告即可。  
![关闭警告](../images/start-tips1.png)


#### vscode

`.mpx`采用类似于`.vue`的单文件语法风格，在Visual Studio Marketplace中获取[vue语法高亮插件](https://marketplace.visualstudio.com/items?itemName=liuji-jim.vue)
然后通过[配置vscode扩展语言](https://code.visualstudio.com/docs/languages/overview#_adding-a-file-extension-to-a-language)
，将`.mpx`绑定到`.vue`语法的支持

##### vscode插件

1. `minapp`此插件主要功能是给`template`加上`wxml`的`snippet`功能，只要在 template 标签中添加属性`minapp='native' lang='wxml'`就可以使用
2. `wechat-snippet`，主要是使用里面的`wx.xxx`的snippet
3. `vetur`主要使用其高亮和格式化功能，配套安装有`prettier`，新版配置为

```
 "vetur.format.defaultFormatterOptions": {
    "prettyhtml": {
      "printWidth": 100, // No line exceeds 100 characters
      "singleQuote": false // Prefer double quotes over single quotes
    },
    "prettier": {
      // Prettier option here
      "semi": false,
      "singleQuote": true,
      "eslintIntegration": true
    }
  }
```

**注意**: 
1. 当添加了`lang="wxml"`后，是无法使用格式化的，只要把这个去掉就会格式化`template`了，不过要注意`image`这个标签，因为`html`中是没有`image`的。
2. 注意使用vscode的工作区功能，最好把`vue`插件相关提示先关闭了
3. 因为`mpx`单文件具有两个script标签，直接格式化会出问题，需要
```
<script  type='application/json' lang='json'>
{
 "navigationBarTitleText": "",
 "usingComponents": {
 
 }
}
</script>
```
如上，需要在json的script中，加上`lang="json"`这样就不会对这个标签进行格式化

##### vscode代码片段

此功能主要是为了新建文件后快速生成一些代码，只要在设置里，选择`用户代码片段`，在选择`vue.json`，将以下代码复制进去。之后只要输出写好的`prefix`，就能自动提示生成。
如此你也可以对`javascript.josn`做一些自定义的代码片段
```
"Print to weapp page": {
 "prefix": "page",
 "body": [
   "<template minapp='native' lang='wxml'>",
   "  <view class='container'>\n",
   "  </view>",
   "</template>\n",
   "<script>",
   "import { createPage } from '@mpxjs/core'",
   "  createPage({",
   "    data: {",
   "    },",
   "    onShow() {",
   "      // 所在页面显示之后就会执行一次",
   "      console.log('page show')\n",
   "    },",
   "    onHide() {",
   "      // 页面切入后台执行",
   "     console.log('page hide')\n",
   "    },",
   "    methods: {\n",
   "    /**",
   "     * 页面相关事件处理函数--监听用户下拉动作",
   "    */",
   "    onPullDownRefresh() {},",
   "    /**",
   "     * 页面上拉触底事件的处理函数",
   "    */",
   "    onReachBottom() {},",
   "     /**",
   "       * 用户点击右上角分享",
   "     */",
   "    onShareAppMessage() {},",
   "    }",
   "  })",
   "</script>\n",
   "<style lang='scss'>\n",
   " .container {} ",
   "</style>",
   "<script  type='application/json' lang='json'>",
   "{",
   " \"navigationBarTitleText\": \"搜索\",",
   " \"usingComponents\": {}",
   "}",
   "</script>\n",
   "$2"
 ],
 "description": "weapp page"
},
"Print to weapp components": {
 "prefix": "components",
 "body": [
   "<template minapp='native' lang='wxml'>",
   "  <view class='container'>\n",
   "  </view>",
   "</template>\n",
   "<script>",
   "import { createComponent } from '@mpxjs/core'",
   "  createComponent({",
   "    properties: {\n},",
   "    data: {",
   "    },",
   "    pageShow() {",
   "      // 所在页面显示之后就会执行一次",
   "      console.log('page show')\n",
   "    },",
   "    pageHide() {",
   "      // 页面切入后台执行",
   "     console.log('page hide')\n",
   "    },",
   "    methods: {\n",
   "    }",
   "  })",
   "</script>\n",
   "<style lang='scss'>\n",
   " .container {} ",
   "</style>",
   "<script  type='application/json' lang='json'>",
   "{ ",
   " \"component\": true",
   "}",
   "</script>\n",
   "$2"
 ],
 "description": "weapp components"
}
```


