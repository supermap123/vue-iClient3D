# <center>@supermap/vue-iclient3d-webgl</center>

# 简介
- 官网：http://support.supermap.com.cn:8090/webgl/examples/component/examples.html#layer
- 源码：


# 安装

``` bash
npm install @supermap/vue-iclient3d-webgl
```

# 开发
#### 方法一：Vue工程，NPM 安装：

##### 1、修改main.js文件：
``` bash
import Vue from 'vue';
import App from './App.vue';

// 根据所使用的组件依赖需求添加相应的第三方库, 参考具体组件,如天际线分析需要如下:
// import echarts from 'echarts'
// window.echarts = echarts //挂载到window上

//vue-iclient3d-webgl组件库
import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';
Vue.use(VueiClient);

new Vue({
  el: '#app',
  // router, //使用路由
  components: { App },
  template: '<App/>'
})
```

##### 2、修改index.html文件：
``` bash
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>vue-iclient3d-webgl</title>
  <!-- Cesium 依赖-->
  <link href="./static/Cesium/Widgets/widgets.css" rel="stylesheet">
  <script src="./static/Cesium/Cesium.js"></script>
</head>

<body>
  <div id="app"></div>
</body>
</html>
```

##### 3、在 vue 工程中的App.vue 中标签引入组件：
``` bash
<template>
  <div id="app">
    <sm-viewer>
     <sm3d-measure></sm3d-measure>
    </sm-viewer>
  </div>
</template>
```


#### 方法二：在 html中通过CDN引入,使用组件：

``` bash

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>vue-iClient3D-WebGL example</title>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
    <!-- Cesium依赖 -->
    <link href="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
    <script type="text/javascript" src="http://support.supermap.com.cn:8090/webgl/Build/Cesium/Cesium.js"></script>
    <!-- 组件包 -->
    <link href="http://support.supermap.com.cn:8090/webgl/examples/component/styles/vue-iclient3d-webgl.min.css" rel="stylesheet" />
    <script src="http://support.supermap.com.cn:8090/webgl/examples/component/js/vue-iclient3d-webgl.min.js"></script>
</head>
<body>
<div id="app">
    <sm-viewer :scene-url="URL">
        <sm3d-measure></sm3d-measure>
    </sm-viewer>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            URL: "http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace"
        }
    });
</script>
</body>
</html>

```

# 示例
http://support.supermap.com.cn:8090/webgl/examples/component/examples.html#layer

