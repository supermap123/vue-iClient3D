<template>
  <div v-show="backlineComb">
    <div class="sm-function-module-content">
      <div class="boxchild">
        <button class="tbtn tbn1" type="button" v-on:click="analysis">{{Resource.analyze}}</button>
        <button @click="clear" class="tbtn" type="button">{{Resource.clear}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sm3dBackLineAnalysis",
  props: {
    spatialAnalysisUrl: {
      type: String,
    },
    queryUrl: {
      type: String,
    },
  },
  data() {
    return {
      sharedState: store.state,
      index: null, //当前插入界面位置
      // tooltip: null,
      ids: null,
    };
  },
  computed: {
    backlineComb: function () {
      return this.sharedState.componentShows[this.index];
    },
    isInitViewer: function () {
      return this.sharedState.isInitViewer;
    },
  },
  created() {
    let cNames = this.sharedState.componentNames;
    let cShows = this.sharedState.componentShows;
    let cTypes = this.sharedState.componentTypes;
    this.index = cNames.length;
    if (cNames.length === 0) {
      cShows.push(1);
    } else {
      cShows.push(0);
    }
    cTypes.push("analysis");
    cNames.push(Resource.BackLineAnalysis);
  },
  mounted() {
    if (this.isInitViewer && this.backlineComb) {
      this.init();
    }
  },
  methods: {
    init() {
      let that = this;
      if (window.layers) {
        let original = window.layers.find("original");
        original.setObjsVisible([47], false);
      }
    },
    analysis() {
      let that = this;
      viewer.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
          115.00569784240564,
          39.010694131402644,
          234.8315778961851
        ),
        orientation: {
          heading: 2.205646,
          pitch: -0.399956,
          roll: 0.0,
        },
      });
      scene.layers.find("original").setObjsVisible([47], false);
      setTimeout(function () {
        window.polyLine = viewer.entities.add({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              115.00787890205515,
              39.00950957365,
              100.1,
              115.00780513629414,
              39.00939287572396,
              100.1,
              115.00845873860158,
              39.007961490024464,
              100.1,
            ]),
            width: 6.0,
            material: Cesium.Color.RED,
          },
        });
        let pTime = 0;
        let pTimeId = setInterval(function () {
          if (pTime == 5) {
            clearInterval(pTimeId);
            that.backLine();
          }
          polyLine.show = !polyLine.show;
          pTime++;
        }, 500);
      }, 5000);
    },
    backLine() {
      let that = this;
      setInterval(function () {
        polyLine.show = true;
      }, 500);
      let geometryBuffer3DPostParameter = {};
      geometryBuffer3DPostParameter.geometry = {
        type: "LINE3D",
        parts: [3],
        points: [
          {
            x: 115.00787890205515,
            y: 39.00950957365,
            z: 100.1,
          },
          {
            x: 115.00780513629414,
            y: 39.00939287572396,
            z: 100.1,
          },
          {
            x: 115.00845873860158,
            y: 39.007961490024464,
            z: 100.1,
          },
        ],
      };
      geometryBuffer3DPostParameter.distance = 3;
      geometryBuffer3DPostParameter.lonlat = true;
      geometryBuffer3DPostParameter.resultType = "REGION";
      geometryBuffer3DPostParameter.joinType = "ROUND";

      let url = this.$props.spatialAnalysisUrl;
      // "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/buffer.json";

      window.axios
        .post(url, geometryBuffer3DPostParameter)
        .then(function (response) {
          //再发送一次GET请求  获取到运算结果
          window.axios
            .get(response.data.newResourceLocation + ".json")
            .then(function (response) {
              let data = response.data;

              let point3Ds = new Cesium.Point3Ds();
              let points = new Array();
              for (let i = 0; i < data.geometry.points.length; i++) {
                points.push(data.geometry.points[i].x);
                points.push(data.geometry.points[i].y);
                points.push(data.geometry.points[i].z);
              }
              let orangePolygon1 = viewer.entities.add({
                name: "Orange polygon with per-position heights and outline",
                polygon: {
                  hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(points),
                  extrudedHeight: 157.4,
                  perPositionHeight: true,
                  material: Cesium.Color.ORANGE.withAlpha(0.3),
                  outline: true,
                  outlineColor: Cesium.Color.BLACK,
                  outlineWidth: 10.0,
                },
              });
              let datasetSpatialQuery3DPostParameter = {};
              datasetSpatialQuery3DPostParameter.operateRegion = {
                type: "REGION",
                points: data.geometry.points,
              };
              datasetSpatialQuery3DPostParameter.positionMode =
                "INTERSECTSORCONTAINS";
              datasetSpatialQuery3DPostParameter.extendedHeight = 165;
              datasetSpatialQuery3DPostParameter.sourceDatasetFilter = {
                attributeFilter: "",
              };

              let queryUrl = that.$props.queryUrl;
              // "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/datasets/%E5%A2%99%40%E4%B9%9D%E5%8F%B7%E6%A5%BC%E6%8B%89%E4%BD%8E/spatialquery3d.json";

              window.axios
                .post(queryUrl, datasetSpatialQuery3DPostParameter)
                .then(function (response) {
                  //再发送一次GET请求  获取到运算结果
                  window.axios
                    .get(response.data.newResourceLocation + ".json")
                    .then(function (response) {
                      let data = response.data;

                      let ids = data.ids;
                      that.ids = ids;
                      let layer = scene.layers.find("日照墙");
                      let color = new Cesium.Color(160 / 255, 0, 0, 1);
                      layer.setObjsColor(ids, color);
                      let cartesian = Cesium.Cartesian3.fromDegrees(
                        115.00781874492442,
                        39.009393932590584,
                        132.314
                      );
                      let pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                        viewer.scene,
                        cartesian
                      );
                      tooltip.showAt(pick, "退线不足3米");
                      window.setTimeout(function () {
                        tooltip.setVisible(false);
                      }, 4000);
                      let orangePolygon1 = viewer.entities.add({
                        name:
                          "Orange polygon with per-position heights and outline",
                        polygon: {
                          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                            115.00781835183739,
                            39.009393557694274,
                            157.7,
                            115.00786836423599,
                            39.009299692575006,
                            157.7,
                            115.00790442533352,
                            39.00931098890217,
                            157.7,
                            115.00785030819625,
                            39.00940394849713,
                            157.7,
                          ]),
                          extrudedHeight: 0,
                          perPositionHeight: true,
                          material: Cesium.Color.ORANGE.withAlpha(0.0),
                          outline: true,
                          outlineColor: Cesium.Color.BLACK,
                          outlineWidth: 5.0,
                        },
                      });
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clear() {
      let layer = scene.layers.find("日照墙");
      viewer.entities.removeAll();
      if (this.ids) {
        layer.removeObjsColor(this.ids);
        this.ids = null;
      }
      scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(
          115.00022575830863,
          39.009956534844858,
          500
        ),
        orientation: {
          heading: 1.705646,
          pitch: -0.499956,
          roll: 0.0,
        },
      });
    },
    destory() {},
  },
  watch: {
    isInitViewer(val) {
      this.init();
    },
    backlineComb(val) {
      if (val && this.isInitViewer) {
        this.init();
      }
    },
  },
};
</script>


