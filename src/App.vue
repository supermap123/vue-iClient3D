<template>
  <div id="app">
    <sm-viewer :scene-url="sceneURL">
      <!--      :combination="true"  :s3mscps="scps" :scene-url="sceneURL" -->

      <!-- <sm3d-measure ></sm3d-measure> 
      <sm3d-profile ></sm3d-profile>
      <sm3d-shadowquery ></sm3d-shadowquery>
      <sm3d-sightline ></sm3d-sightline >  -->

      <!-- <sm3d-skyline ></sm3d-skyline > 
      <sm3d-viewshed :spatial-analysis-url='spatialAnalysisUrl' ></sm3d-viewshed>  -->
      <!-- <sm3d-geologic-body-analysis  :model-urls="modelUrls"></sm3d-geologic-body-analysis>  -->

      <!-- <sm3d-back-line-analysis ></sm3d-back-line-analysis>
      <sm3d-limit-height-analysis></sm3d-limit-height-analysis>
      <sm3d-on-line-analysis></sm3d-on-line-analysis> -->

      <!-- <sm3d-terrain-operation ></sm3d-terrain-operation>
      <sm3d-terrain-flood ></sm3d-terrain-flood>
      <sm3d-terrain-slope ></sm3d-terrain-slope> 
      <sm3d-terrain-isoline ></sm3d-terrain-isoline> -->

      <!-- <sm3d-clip-box ></sm3d-clip-box>
      <sm3d-clip-plane ></sm3d-clip-plane>
      <sm3d-clip-cross></sm3d-clip-cross>
      <sm3d-clip-polygon ></sm3d-clip-polygon>
      <sm3d-clip-box-byeditor></sm3d-clip-box-byeditor> -->


      <!-- <sm3d-add-point></sm3d-add-point>
      <sm3d-add-polyline></sm3d-add-polyline>
      <sm3d-add-polygon></sm3d-add-polygon> -->


    </sm-viewer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // loaded: false,
      // queryUrl:
      //   "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/datasets/%E5%A2%99%40%E4%B9%9D%E5%8F%B7%E6%A5%BC%E6%8B%89%E4%BD%8E/spatialquery3d.json",
      spatialAnalysisUrl:
        "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/buffer.json",
      // "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/viewshedbody.json",
      sceneURL:
        // "http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace",
        "http://www.supermapol.com/realspace/services/3D-cbd/rest/realspace",
      // URL_CONFIG.SCENE_BIMBUILDING,
      // URL_CONFIG.SCENE_WIREFRAME,
      // 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace',
      // profileUrl:
      //   "http://www.supermapol.com/realspace/services/spatialanalyst-sample/restjsr/spatialanalyst/datasets/JingjinTerrain@Jingjin/terraincalculation/profile.jsonp?returnContent=true",

      ImageryProviders: [],
      // scps: [
      //   {
      //     url: URL_CONFIG.SCP_FCFH_DATA,
      //   },
      // ],
      scps: [{
            url: URL_CONFIG.SCENE_GTC_HILL,
            options: {
              name: "hill"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_UOUTSIDE,
            options: {
              name: "u外部"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_UINSIDE,
            options: {
              name: "u内部"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_UWINDOW,
            options: {
              name: "u窗"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_UNIT9,
            options: {
              name: "九号楼@九号楼"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_BUILDIBG,
            options: {
              name: "original"
            }
          },
          {
            url: URL_CONFIG.SCENE_GTC_GROUND,
            options: {
              name: "ground"
            }
          }
        ],
       modelUrls: [
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer1/features/1.json",
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer2/features/1.json",
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer3/features/1.json",
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer4/features/1.json",
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer5/features/1.json",
                "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer6/features/1.json",
            ],
    };
  },

  methods: {},
  mounted() {
    //  console.log(URL_CONFIG,URL_CONFIG.BING_MAP_KEY)

    // viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url : URL_CONFIG.SiChuan_TERRAIN,
    //   isSct : true//地形服务源自SuperMap iServer发布时需设置isSct为true
    // }),
    viewer.scene.camera.setView({
         destination: new Cesium.Cartesian3(-2167835.4408299956, 4423497.534529096, 4095839.2845661934),
          orientation: {
            heading: 4.029329438295484,
            pitch: -0.23796647219353817,
            roll: 8.994289757424667e-10
          }
    });
    //bingmap
    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.BingMapsImageryProvider({
    //     url: "https://dev.virtualearth.net",
    //     mapStyle: Cesium.BingMapsStyle.AERIAL,
    //     key: URL_CONFIG.BING_MAP_KEY
    //   })
    // );
    //加载影像
    // var imagerylayer = viewer.imageryLayers.addImageryProvider(
    //   new Cesium.SuperMapImageryProvider(this.$props.imageryproviders)
    // );
    // viewer.flyTo(imagerylayer);
  },
};
</script>
<style lang="scss" scoped>
</style>
