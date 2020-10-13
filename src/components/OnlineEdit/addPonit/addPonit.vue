<template>
  <div class="sm-function-module-content" v-show="addPoint">
    <label class="sm-function-module-sub-section-setting">{{
      Resource.symbolicLibrary
    }}</label>
    <div class="symbolicLibrary">
      <div
        v-for="(Options, index) in data"
        :key="Options.id"
        class="Thematicbox"
        :title="Options.name"
        :class="{ lightSelected: Options.id === idSelected }"
        @click="pointSelectType(index, Options.path)"
      >
        <img :src="Options.thumbnail" alt />
      </div>
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.pointSymbolColor }}</label>
      <ColorPicker class="sm-colorpicker" editable v-model="pointColor" />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Xrotation }}</label>
      <input
        class="sm-input-long"
        min="-180"
        max="180"
        step="1.0"
        type="number"
        v-model="pitch"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Yrotation }}</label>
      <input
        class="sm-input-long"
        min="-180"
        max="180"
        step="1.0"
        type="number"
        v-model="roll"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Zrotation }}</label>
      <input
        class="sm-input-long"
        min="-180"
        max="180"
        step="1.0"
        type="number"
        v-model="heading"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.zoom }}</label>
      <input
        class="sm-input-long"
        step="0.1"
        min="0.1"
        type="number"
        v-model="scale"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Xmobile }}</label>
      <input
        class="sm-input-long"
        type="number"
        step="0.2"
        v-model="positionX"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Ymobile }}</label>
      <input
        class="sm-input-long"
        type="number"
        step="0.2"
        v-model="positionY"
      />
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">{{ Resource.Zmobile }}</label>
      <input
        class="sm-input-long"
        type="number"
        step="0.2"
        v-model="positionZ"
      />
    </div>
    <div class="boxchild" style="padding-left: 0">
      <span class="media-hidden" style="font-size: 12px; width: 100%">{{
        Resource.EditingTips
      }}</span>
      <button class="tbtn" type="button" @click="clearPolygon">
        {{ Resource.eliminate }}
      </button>
    </div>
  </div>
</template>

<script>
import dataSourece from "../../../data/models";
let s3mInstanceColc, screenSpaceEventHandler;
export default {
  name: "S3mAddPoint",
  data() {
    return {
      sharedState: store.state,
      data: null,
      idSelected: null,
      pointColor: "#FFFFFF",
      pitch: 0,
      roll: 0,
      heading: 0,
      scale: 1,
      defaultUrl: null,
      isDestroyFlag: true,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      index: null, //当前插入界面位置
    };
  },

  computed: {
    addPoint: function () {
      return this.sharedState.componentShows[this.index];
    },
    isInitViewer: function () {
      return this.sharedState.isInitViewer;
    },
  },
  created() {
    let cName = this.sharedState.componentNames;
    let cShow = this.sharedState.componentShows;
    let cType = this.sharedState.componentTypes;
    this.index = cName.length;
    if (cName.length === 0) {
      cShow.push(1);
    } else {
      cShow.push(0);
    }
    cType.push("draw");
    cName.push(Resource.AddPoint);
  },
  // beforeDestroy() {
  // },
  mounted() {
    if (this.isInitViewer && this.addPoint) {
      this.init();
    }
  },
  methods: {
    init() {
      if(!this.data){
        this.data = dataSourece.s3mModels;
      };
      if (s3mInstanceColc) {
        return;
      }
      if (!window.handlerPoint) {
        common.initHandler("Point");
      }
      s3mInstanceColc = new Cesium.S3MInstanceCollection(scene._context);
      viewer.scene.primitives.add(s3mInstanceColc);
      screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(
        scene.canvas
      );
      screenSpaceEventHandler.setInputAction((evt) => {
        let result = scene.pick(evt.position);
        if (result && result.primitive.type === "Instanced_Object") {
          let heading = Math.round(
            Cesium.Math.toDegrees(result.primitive.hpr.heading)
          );
          let pitch = Math.round(
            Cesium.Math.toDegrees(result.primitive.hpr.pitch)
          );
          let roll = Math.round(
            Cesium.Math.toDegrees(result.primitive.hpr.roll)
          );
          this.heading = heading;
          this.pitch = pitch;
          this.roll = roll;
          this.scale = result.primitive.scale.x;
        }
        this.idSelected = null;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      window.handlerPoint.drawEvt.addEventListener((result) => {
        let that = this;
        window.handlerPoint.clear(); // 不显示绘制的点
        let point = result.object;
        s3mInstanceColc.add(this.defaultUrl, {
          position: point.position,
          hpr: new Cesium.HeadingPitchRoll(
            parseFloat(that.heading),
            parseFloat(that.pitch),
            parseFloat(that.roll)
          ),
          scale: new Cesium.Cartesian3(
            parseFloat(that.scale),
            parseFloat(that.scale),
            parseFloat(that.scale)
          ),
        });
        window.handlerPoint && window.handlerPoint.deactivate();
      });
    },
    pointSelectType(i, path) {
      this.defaultUrl = null;
      this.idSelected = i;
      this.defaultUrl = path;
      this.heading = 0;
      this.pitch = 0;
      this.roll = 0;
      this.scale = 1;
      this.positionX = 0;
      this.positionY = 0;
      this.positionZ = 0;
      window.handlerPoint.activate();
      this.isDestroyFlag = false;
    },

    clearPolygon() {
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        let index = viewer.selectedEntity.index;
        if (instance._type == "Instanced_Object") {
          instance.updateScale(new Cesium.Cartesian3(0, 0, 0), index);
        }
      }
      window.handlerPoint.deactivate();
      // common.clearHandlerDrawing("Point");
    },

    updatePointMarkerRotation() {
      if (this.heading === "" || this.pitch === "" || this.roll === "") {
        return;
      }
      // 转换为整数
      let headingValue = Cesium.Math.toRadians(this.heading);
      let pitchValue = Cesium.Math.toRadians(this.pitch);
      let rollValue = Cesium.Math.toRadians(this.roll);
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        let index = viewer.selectedEntity.index;
        if (instance._type != "Instanced_Object") {
          return;
        }
        instance.updateRotation(
          new Cesium.HeadingPitchRoll(headingValue, pitchValue, rollValue),
          index
        );
      }
    },
  },

  watch: {
    isInitViewer(val) {
      if (val && this.addPoint) {
        this.init();
      }
    },
    addPoint(val) {
      if (val && this.isInitViewer) {
        this.init();
      }
    },
    pointColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.primitive.type === "Instanced_Object"
      ) {
        let instance = viewer.selectedEntity.primitive;
        let index = viewer.selectedEntity.id;
        instance.updateColor(color, index);
      }
    },
    pitch(val) {
      if (val == "" && Number(val) <= 0) return;
      this.updatePointMarkerRotation();
    },
    roll(val) {
      if (val == "" && Number(val) <= 0) return;
      this.updatePointMarkerRotation();
    },
    heading(val) {
      if (val == "" && Number(val) <= 0) return;
      this.updatePointMarkerRotation();
    },
    scale(val) {
      if (val == "" && Number(val) <= 0) return;
      let scale = Number(val);
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        let index = viewer.selectedEntity.index;
        if (instance._type != "Instanced_Object") {
          return;
        }
        instance.updateScale(new Cesium.Cartesian3(scale, scale, scale), index);
      }
    },
    positionX(newVal, oldVal) {
      if (newVal == "") return;
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        if (instance._type != "Instanced_Object") {
          return;
        }
        let x = Number(newVal) - Number(oldVal);
        let enu = Cesium.Transforms.eastNorthUpToFixedFrame(
          instance.position,
          Cesium.Ellipsoid.WGS84,
          new Cesium.Matrix4()
        );
        let offset = new Cesium.Cartesian3(x, 0, 0);
        let newPos = Cesium.Matrix4.multiplyByPoint(
          enu,
          offset,
          new Cesium.Cartesian3()
        );
        instance.updatePosition(newPos);
      }
    },
    positionY(newVal, oldVal) {
      if (newVal == "") return;
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        if (instance._type != "Instanced_Object") {
          return;
        }
        let y = Number(newVal) - Number(oldVal);
        let enu = Cesium.Transforms.eastNorthUpToFixedFrame(
          instance.position,
          Cesium.Ellipsoid.WGS84,
          new Cesium.Matrix4()
        );
        let offset = new Cesium.Cartesian3(0, y, 0);
        let newPos = Cesium.Matrix4.multiplyByPoint(
          enu,
          offset,
          new Cesium.Cartesian3()
        );
        instance.updatePosition(newPos);
      }
    },
    positionZ(newVal, oldVal) {
      if (newVal == "") return;
      if (viewer.selectedEntity) {
        let instance = viewer.selectedEntity.primitive;
        if (instance._type != "Instanced_Object") {
          return;
        }
        let z = Number(newVal) - Number(oldVal);
        let enu = Cesium.Transforms.eastNorthUpToFixedFrame(
          instance.position,
          Cesium.Ellipsoid.WGS84,
          new Cesium.Matrix4()
        );
        let offset = new Cesium.Cartesian3(0, 0, z);
        let newPos = Cesium.Matrix4.multiplyByPoint(
          enu,
          offset,
          new Cesium.Cartesian3()
        );
        instance.updatePosition(newPos);
      }
    },
  },
};
</script>

<style lang="scss"  scoped>
@import "addPonit";
</style>