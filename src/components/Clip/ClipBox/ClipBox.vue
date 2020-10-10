<template>
  <div v-if="clipBox">
    <div class="sm-function-module-content">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{Resource.length}}</label>
        <div class="sm-solider-input-box">
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:63%"
            type="range"
            v-model="clipLength"
          />
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:34%; height:25px;"
            type="number"
            v-model="clipLength"
          />
        </div>
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{Resource.width}}</label>
        <div class="sm-solider-input-box">
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:63%"
            type="range"
            v-model="clipWidth"
          />
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:34%; height:25px; "
            type="number"
            v-model="clipWidth"
          />
        </div>
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{Resource.height}}</label>
        <div class="sm-solider-input-box">
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:63%"
            type="range"
            v-model="clipHeight"
          />
          <input
            class="min-solider"
            min="0"
            step="1"
            style="width:34%; height:25px; "
            type="number"
            v-model="clipHeight"
          />
        </div>
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{Resource.rotate}}</label>
        <div class="sm-solider-input-box">
          <input
            class="min-solider"
            max="180"
            min="-180"
            step="1"
            style="width:63%"
            type="range"
            v-model="clipRotate"
          />
          <input
            class="min-solider"
            max="180"
            min="-180"
            step="1"
            style="width:34%; height:25px"
            type="number"
            v-model="clipRotate"
          />
        </div>
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{Resource.ClipModel}}</label>
        <select class="sm-select sm-select-s" v-model="ClipModelSelected">
          <option
            :value="Options.id"
            v-for="Options in ClipModels"
            :key="Options.id"
          >{{Options.name}}</option>
        </select>
      </div>
      <div class="boxchild">
        <button @click="BoxClip" class="tbtn tbn1" type="button">{{Resource.clip}}</button>
        <button @click="clearBoxClip" class="tbtn" type="button">{{Resource.clear}}</button>
      </div>
    </div>
  </div>
</template>

<script>
let screenSpaceEventHandler;
export default {
  name: "Sm3dClipBox",
  data() {
    return {
      sharedState: store.state,
      index: null, //当前插入界面位置
      isDestroyFlag: true,
      clipLength: 10,
      clipWidth: 10,
      clipHeight: 10,
      clipRotate: 0,
      ClipModels: [
        {
          id: "0",
          name: Resource.CutInsideBoxNOFrame
        },
        {
          id: "1",
          name: Resource.CutOutBoxNOFrame
        },
        {
          id: "2",
          name: Resource.CutInsideBoxFrame
        },
        {
          id: "3",
          name: Resource.CutOutBoxFrame
        }
      ],
      ClipModelSelected: null,
      clipModeOption: null,
      // tooltip: null,
      // boxEntity: null,
      hasClipLine: false,
      moveY: 0,
      moveX: 0,
      moveZ: 0,
    };
  },
  computed: {
    clipBox: function () {
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
    cType.push("clip");
    cName.push( Resource.BoxClip);
  },
  methods: {
    // Box裁剪
    BoxClip() {
      this.isDestroyFlag = false; //保留效果
      this.moveX = 0;
      this.moveY = 0;
      this.moveZ = 0;
      viewer.entities.removeAll();
      // 设置裁剪线颜色
      this.setAllLayersClipColor();
      if (!screenSpaceEventHandler) {
        screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(
          scene.canvas
        );
      }
      screenSpaceEventHandler.setInputAction((evt) => {
        tooltip.showAt(evt.endPosition, `<p>${Resource.ClickModelAddBox}</p>`);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      screenSpaceEventHandler.setInputAction((evt) => {
        let length = Number(this.clipLength);
        let width = Number(this.clipWidth);
        let height = Number(this.clipHeight);
        if (height <= 0 || width <= 0 || length <= 0) {
          return;
        }
        let rotate = parseFloat(this.clipRotate);
        let clipModeOption = this.clipModeOption;
        let position = scene.pickPosition(evt.position);
        let boxOption = {
          dimensions: new Cesium.Cartesian3(length, width, height),
          position: position,
          clipMode: clipModeOption,
          heading: rotate,
        };
        let hpr = new Cesium.HeadingPitchRoll(rotate, 0, 0);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          hpr
        );
        this.boxEntity = viewer.entities.add({
          box: {
            dimensions: new Cesium.Cartesian3(length, width, height),
            material: Cesium.Color.fromRandom({
              alpha: 0.2,
            }),
          },
          position: position,
          orientation: orientation,
        });
        this.setAllLayersClipOptions(boxOption);
        tooltip.setVisible(false);
        screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
        screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    clearBoxClip() {
       this.isDestroyFlag = true; //摧毁标志，释放内存
      if (!this.boxEntity) {
        return;
      }
      tooltip.setVisible(false);
      viewer.entities.removeAll();
      this.boxEntity = null;
      for (let layer of this.layers) {
        layer.clearCustomClipBox();
      }
    },
    setAllLayersClipOptions(boxOptions) {
      for (let layer of this.layers) {
        this.hasClipLine
          ? (layer.clipLineColor = new Cesium.Color(1, 1, 1, 1))
          : (layer.clipLineColor = new Cesium.Color(1, 1, 1, 0));
        layer.setCustomClipBox(boxOptions);
      }
    },
    setAllLayersClipColor() {
      for (let i = 0, j = this.layers.length; i < j; i++) {
        this.layers[i].selectEnabled = false;
        this.layers[i].clipLineColor = new Cesium.Color(1, 1, 1, 0.5);
      }
    },
    setClipBox() {
      let newDim = this.boxEntity.box.dimensions.getValue();
      let position = this.boxEntity.position.getValue(0);
      let clipMode = this.clipModeOption;
      let heading = Cesium.Math.toRadians(parseFloat(this.clipRotate));
      let boxOptions = {
        dimensions: newDim,
        position: position,
        clipMode: clipMode,
        heading: heading,
      };
      this.setAllLayersClipOptions(boxOptions);
    },
    init() {
      this.ClipModelSelected = this.ClipModels[0].id;
      this.clipModeOption = "clip_behind_all_plane";
      this.layers = viewer.scene.layers.layerQueue;
    },
  },
  mounted() {
    if (this.isInitViewer && this.clipBox) {
      this.init();
    }
  },
  beforeDestroy() {
    if (this.isDestroyFlag && this.layers) {
      screenSpaceEventHandler.destroy();
      this.layers = undefined;
      screenSpaceEventHandler = undefined;
    }
  },
  watch: {
    isInitViewer(val) {
      this.init();
    },
    clipBox(val) {
      if (val && this.isInitViewer) {
        this.init();
      }
    },
    clipLength(val) {
      if (!this.boxEntity) {
        return;
      }
      let dim = this.boxEntity.box.dimensions.getValue();
      let newVal = Number(val);
      this.boxEntity.box.dimensions = new Cesium.Cartesian3(
        newVal,
        dim.y,
        dim.z
      );
      this.setClipBox();
    },
    clipWidth(val) {
      if (!this.boxEntity) {
        return;
      }
      let dim = this.boxEntity.box.dimensions.getValue();
      let newVal = Number(val);
      this.boxEntity.box.dimensions = new Cesium.Cartesian3(
        dim.x,
        newVal,
        dim.z
      );
      this.setClipBox();
    },
    clipHeight(val) {
      if (!this.boxEntity) {
        return;
      }
      let dim = this.boxEntity.box.dimensions.getValue();
      let newVal = Number(val);
      this.boxEntity.box.dimensions = new Cesium.Cartesian3(
        dim.x,
        dim.y,
        newVal
      );
      this.setClipBox();
    },
    clipRotate(val) {
      if (!this.boxEntity) {
        return;
      }
      let position = this.boxEntity.position.getValue(0);
      let newVal = Number(val);
      let rotate = Cesium.Math.toRadians(newVal);
      let hpr = new Cesium.HeadingPitchRoll(rotate, 0, 0);
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );
      this.boxEntity.orientation = orientation;
      this.setClipBox();
    },
    ClipModelSelected(val) {
      if (!this.boxEntity) {
        return;
      }
      switch (val) {
        case "0":
          this.hasClipLine = true;
          this.clipModeOption = "clip_behind_all_plane";
          break;
        case "1":
          this.hasClipLine = true;
          this.clipModeOption = "clip_behind_any_plane";
          break;
        case "2":
          this.hasClipLine = false;
          this.clipModeOption = "clip_behind_all_plane";
          break;
        case "3":
          this.hasClipLine = false;
          this.clipModeOption = "clip_behind_any_plane";
          break;
      }
      this.setClipBox();
    },
  },
};
</script>

