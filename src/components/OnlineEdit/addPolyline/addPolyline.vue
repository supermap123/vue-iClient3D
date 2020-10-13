<template>
  <div class="sm-function-module-content" v-show="addpolyline">
    <label class="sm-function-module-sub-section-setting">{{
      Resource.symbolicLibrary
    }}</label>
    <div class="symbolicLibrary">
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 0 }"
        @click="polylineSelectType(0)"
      >
        <div id="pointLight" class="minbox">
          <span class="iconfont iconshixian"></span>
        </div>
        {{ Resource.fulline }}
      </div>
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 1 }"
        @click="polylineSelectType(1)"
      >
        <div class="minbox" id="spotLight">
          <span class="iconfont iconxuxian"></span>
        </div>
        {{ Resource.Virtuallinear }}
      </div>
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 2 }"
        @click="polylineSelectType(2)"
      >
        <div class="minbox" id="directionalLight">
          <span class="iconfont iconlunkuoxian"></span>
        </div>
        {{ Resource.contourline }}
      </div>
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 3 }"
        @click="polylineSelectType(3)"
      >
        <div class="minbox" id="spotLight">
          <span class="iconfont iconjiantouxian"></span>
        </div>
        {{ Resource.arrowline }}
      </div>
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 4 }"
        @click="polylineSelectType(4)"
      >
        <div class="minbox" id="directionalLight">
          <span class="iconfont iconguangyunxian"></span>
        </div>
        {{ Resource.Haloline }}
      </div>
      <div
        class="Thematicbox"
        :class="{ lightSelected: polylineType === 5 }"
        @click="polylineSelectType(5)"
      >
        <div class="minbox" id="spotLight">
          <span class="iconfont iconweijixian"></span>
        </div>
        {{ Resource.Wakeline }}
      </div>
    </div>
    <!-- 实线 -->
    <div v-show="polylineType === 0">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="fullLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="fullLineWidth"
        />
      </div>
    </div>
    <!-- 虚线 -->
    <div v-show="polylineType === 1">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker
          class="sm-colorpicker"
          editable
          v-model="dottedLineColor"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="dottedLineWidth"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolGapColor
        }}</label>
        <ColorPicker
          class="sm-colorpicker"
          editable
          v-model="dottedLineGapColor"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineDashSectionLength
        }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="dottedLineDashLenght"
        />
      </div>
    </div>
    <!-- 轮廓线 -->
    <div v-show="polylineType === 2">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="oLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="oLineWidth"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolOutlineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="outLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolOutlineWdith
        }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="outLineWidth"
        />
      </div>
    </div>
    <!-- 箭头线 -->
    <div v-show="polylineType === 3">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="arrowLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="arrowLineWidth"
        />
      </div>
    </div>
    <!-- 光晕线 -->
    <div v-show="polylineType === 4">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="glowLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1.0"
          type="number"
          v-model="glowLineWidth"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolGlowPower
        }}</label>
        <input
          class="sm-input-long"
          min="0.05"
          max="1"
          step="0.05"
          type="number"
          v-model="glowLineStrength"
        />
      </div>
    </div>
    <!-- 尾迹线 -->
    <div v-show="polylineType === 5">
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineSymbolLineColor
        }}</label>
        <ColorPicker class="sm-colorpicker" editable v-model="TrailLineColor" />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{ Resource.LineWidthPixel }}</label>
        <input
          class="sm-input-long"
          min="1"
          step="1"
          type="number"
          v-model="TrailLineWidth"
        />
      </div>
      <div class="sm-function-module-sub-section">
        <label class="label-container">{{
          Resource.polylineTrailPercent
        }}</label>
        <input
          class="sm-input-long"
          min="0.1"
          max="1"
          step="0.1"
          type="number"
          v-model="TrailLinePercentage"
        />
      </div>
    </div>
    <div class="sm-function-module-sub-section">
      <label class="label-container">绘制模式</label>
      <select class="sm-select sm-select-s" v-model="drawModle">
        <option value="0">空间</option>
        <option value="1">贴地</option>
        <option value="2">贴对象</option>
      </select>
    </div>
    <div class="flexbox">
      <label class="sm-viewshed-label-right">{{ Resource.edit }}</label>
      <input type="checkbox" v-model="isEdit" />
      <label class="sm-viewshed-label-right">{{ Resource.editZ }}</label>
      <input type="checkbox" v-model="isEditZ" />
    </div>
    <span class="media-hidden" style="font-size: 12px; width: 100%">{{
      Resource.EditingTips
    }}</span>
    <div class="boxchild">
      <button class="tbtn tbn1" type="button" @click="drawPolyline">
        {{ Resource.draw }}
      </button>
      <button class="tbtn" type="button" @click="clearPolyline">
        {{ Resource.eliminate }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "S3mAddPolyline",
  data() {
    return {
      sharedState: store.state,
      polylineType: 0,
      isDestroyFlag: true,
      fullLineColor: "#C8910A",
      fullLineWidth: 5,
      dottedLineColor: "#C8910A",
      dottedLineWidth: 5,
      dottedLineGapColor: "#0AC848",
      dottedLineDashLenght: 16,
      oLineColor: "#C8910A",
      oLineWidth: 5,
      outLineColor: "#1754E3",
      outLineWidth: 2,
      arrowLineColor: "#C8910A",
      arrowLineWidth: 5,
      glowLineColor: "#C8910A",
      glowLineWidth: 5,
      glowLineStrength: 0.5,
      TrailLineColor: "#C8910A",
      TrailLineWidth: 5,
      TrailLinePercentage: 0.3,
      TrailLinePeriod: 2,
      isEdit: false,
      isEditZ: false,
      EditPositions: [],
      drawModle: "0",
      clampToGround: false,
      classificationType: undefined,
      index: null, //当前插入界面位置
    };
  },

  computed: {
    addpolyline: function () {
      return this.sharedState.componentShows[this.index];
    },
    isInitViewer: function () {
      return this.sharedState.isInitViewer;
    },
    getIsEdit: function () {
      return this.sharedState.isEdit;
    },
    getIsEditZ: function () {
      return this.sharedState.isEditZ;
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
    cName.push(Resource.AddLine);
  },
  //   beforeDestroy() {
  //   },
  mounted() {
    if (this.isInitViewer && this.addpolyline) {
      this.init();
    }
  },
  methods: {
    init() {
      if (!window.handlerPolyline) {
        common.initHandler("Polyline");
      }
    },
    polylineSelectType(i) {
      this.polylineType = i;
    },
    drawPolyline() {
      this.isDestroyFlag = false;
      if (!window.handlerPolyline) {
        this.init();
      }
      common.handlerDrawing("Polyline").then(
        (res) => {
          this.positions = res.positions;
          let handlerPolyline = window.handlerPolyline;
          this.DrawPolylineUpdate(res.positions);
          handlerPolyline.polyline.show = false;
          window.polylineTransparent.show = false; //半透线隐藏
          handlerPolyline.deactivate();
          if (this.isEdit) {
            common.Edit(this);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      window.handlerPolyline.activate();
    },

    clearPolyline() {
      this.isDestroyFlag = true;
      if (window.editHandler) {
        if (
          window.editHandler._editObject &&
          window.editHandler._editObject.id.indexOf("polyline-symbol") === 0
        ) {
          viewer.entities.removeById(window.editHandler._editObject.id);
        }
      } else if (viewer.selectedEntity) {
        if (
          viewer.selectedEntity.id &&
          viewer.selectedEntity.id.indexOf("polyline-symbol") === 0
        ) {
          viewer.entities.removeById(viewer.selectedEntity.id);
        }
      }
      common.clearHandlerDrawing("Polyline");
    },

    DrawPolylineUpdate(position) {
      switch (this.polylineType) {
        case 0:
          let fullLineColor = Cesium.Color.fromCssColorString(
            this.fullLineColor
          );
          let fullLineWidth = Number(this.fullLineWidth);
          viewer.entities.add({
            id: "polyline-symbol-full-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: fullLineWidth,
              material: fullLineColor,
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        case 1:
          let dashLineColor = Cesium.Color.fromCssColorString(
            this.dottedLineColor
          );
          let dashLineGapColor = Cesium.Color.fromCssColorString(
            this.dottedLineGapColor
          );
          let dashLineWidth = Number(this.dottedLineWidth);
          let dashLineDashSectionLength = Number(this.dottedLineDashLenght);
          viewer.entities.add({
            id: "polyline-symbol-dash-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: dashLineWidth,
              material: new Cesium.PolylineDashMaterialProperty({
                color: dashLineColor,
                gapColor: dashLineGapColor,
                dashLength: dashLineDashSectionLength,
              }),
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        case 2:
          let outlineInnerColor = Cesium.Color.fromCssColorString(
            this.oLineColor
          );
          let outlineOuterColor = Cesium.Color.fromCssColorString(
            this.outLineColor
          );
          let outlineInnerWidth = Number(this.oLineWidth);
          let outlineOuterWidth = Number(this.outLineWidth);
          viewer.entities.add({
            id: "polyline-symbol-outline-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: outlineInnerWidth,
              material: new Cesium.PolylineOutlineMaterialProperty({
                color: outlineInnerColor,
                outlineWidth: outlineOuterWidth,
                outlineColor: outlineOuterColor,
              }),
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        case 3:
          let arrowLineColor = Cesium.Color.fromCssColorString(
            this.arrowLineColor
          );
          let arrowLineWidth = Number(this.arrowLineWidth);
          viewer.entities.add({
            id: "polyline-symbol-arrow-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: arrowLineWidth,
              followSurface: false,
              material: new Cesium.PolylineArrowMaterialProperty(
                arrowLineColor
              ),
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        case 4:
          let glowLineColor = Cesium.Color.fromCssColorString(
            this.glowLineColor
          );
          let glowLineWidth = Number(this.glowLineWidth);
          let glowLinePower = Number(this.glowLineStrength);
          viewer.entities.add({
            id: "polyline-symbol-glow-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: glowLineWidth,
              material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: glowLinePower,
                color: glowLineColor,
              }),
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        case 5:
          let trailLineColor = Cesium.Color.fromCssColorString(
            this.TrailLineColor
          );
          let trailLineWidth = Number(this.TrailLineWidth);
          let trailLinePercent = Number(this.TrailLinePercentage);
          let trailLinePeroid = Number(this.TrailLinePeriod);
          viewer.entities.add({
            id: "polyline-symbol-trail-" + new Date().getTime(),
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
              width: trailLineWidth,
              material: new Cesium.PolylineTrailMaterialProperty({
                color: trailLineColor,
                trailLength: trailLinePercent,
                period: trailLinePeroid,
              }),
              clampToGround: this.clampToGround, //线贴地
              classificationType: this.classificationType, //线面贴对象
            },
          });
          break;
        default:
          break;
      }
    },
    // 切换模式
    changeModle(clampToGround, classificationType) {
      if (window.editHandler) {
        if (
          window.editHandler._editObject &&
          window.editHandler._editObject.id.indexOf("polyline-symbol") === 0
        ) {
          window.editHandler._editObject.polyline.clampToGround = clampToGround;
          window.editHandler._editObject.polyline.classificationType = classificationType;
        }
      } else if (viewer.selectedEntity) {
        if (
          viewer.selectedEntity.id &&
          viewer.selectedEntity.id.indexOf("polyline-symbol") === 0
        ) {
          viewer.selectedEntity.polyline.clampToGround = clampToGround;
          viewer.selectedEntity.polyline.classificationType = classificationType;
        }
      }
    },
    // 编辑还原模式
    // restoreMode(){
    //   let d = this.drawModle;
    //   this.drawModle = "";
    //   this.drawModle = d;
    // }
  },

  watch: {
    getIsEdit(val) {
      this.isEdit = val;
    },
    getIsEditZ(val) {
      this.isEditZ = val;
    },
    isEdit(val) {
      if (!this.addpolyline) {
        return;
      }
      if (val) {
        common.Edit(this);
      } else {
        common.clearEditHandler();
      }
      store.setIsEdit(val);
    },
    isEditZ(val) {
      if (!this.addpolyline) {
        return;
      }
      if (window.editHandler) {
        window.editHandler.isEditZ = val;
      }
      store.setIsEditZ(val);
    },
    addpolyline: function (val) {
      if (val) {
        this.init();
      }
    },
    isInitViewer(val) {
      if (val && this.addpolyline) {
        this.init();
      }
    },

    fullLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-full") === 0
      ) {
        viewer.selectedEntity.polyline.material = color;
      }
    },
    fullLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-full") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    dottedLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-dash") === 0
      ) {
        viewer.selectedEntity.polyline.material.color = color;
      }
    },
    dottedLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-dash") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    dottedLineGapColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-dash") === 0
      ) {
        viewer.selectedEntity.polyline.material.gapColor = color;
      }
    },
    dottedLineDashLenght(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-dash") === 0
      ) {
        viewer.selectedEntity.polyline.material.dashLength = Number(val);
      }
    },
    oLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-outline") === 0
      ) {
        viewer.selectedEntity.polyline.material.color = color;
      }
    },
    oLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-outline") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    outLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-outline") === 0
      ) {
        viewer.selectedEntity.polyline.material.outlineColor = color;
      }
    },
    outLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-outline") === 0
      ) {
        viewer.selectedEntity.polyline.material.outlineWidth = Number(val);
      }
    },
    arrowLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-arrow") === 0
      ) {
        viewer.selectedEntity.polyline.material.color = color;
      }
    },
    arrowLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-arrow") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    glowLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-glow") === 0
      ) {
        viewer.selectedEntity.polyline.material.color = color;
      }
    },
    glowLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-glow") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    glowLineStrength(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-glow") === 0
      ) {
        viewer.selectedEntity.polyline.material.glowPower = Number(val);
      }
    },
    TrailLineColor(val) {
      let color = Cesium.Color.fromCssColorString(val);
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-trail") === 0
      ) {
        viewer.selectedEntity.polyline.material.color = color;
      }
    },
    TrailLineWidth(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-trail") === 0
      ) {
        viewer.selectedEntity.polyline.width = Number(val);
      }
    },
    TrailLinePercentage(val) {
      if (val == "" && Number(val) <= 0) return;
      if (
        viewer.selectedEntity &&
        viewer.selectedEntity.id &&
        viewer.selectedEntity.id.indexOf("polyline-symbol-trail") === 0
      ) {
        viewer.selectedEntity.polyline.material.trailLength = Number(val);
      }
    },
    drawModle(val) {
      switch (val) {
        case "0":
          this.clampToGround = false;
          this.classificationType = undefined;
          this.changeModle(false, undefined);
          break;
        case "1":
          this.clampToGround = true;
          this.classificationType = undefined;
          this.changeModle(true, undefined);
          break;
        case "2":
          this.clampToGround = true;
          this.classificationType = Cesium.ClassificationType.S3M_TILE;
          this.changeModle(true, Cesium.ClassificationType.S3M_TILE);
          break;
        default:
          this.clampToGround = false;
          this.classificationType = undefined;
          this.changeModle(false, undefined);
          break;
      }
    },
  },
};
</script>

<style lang="scss"  scoped>
@import "addPolyline";
</style>