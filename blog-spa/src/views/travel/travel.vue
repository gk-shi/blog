<template>
  <div class="travel">
    <div class="travel-wrapper">
      <div class="gas">
        <i class="icon iconfont icon-dexhaust"></i>
      </div>
      <div class="moto">
        <img src="../../assets/images/motorcycle.svg" alt="">
      </div>
    </div>
    <div id="travel-map" class="travel-map" :style="done">
      <div class="btns">
        <span class="btns-home" @click="backTo(1)">回到首页</span>
        <span class="btns-back" @click="backTo(2)">返回</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Scene, PointLayer, Popup } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import { getCitysService } from '../../services/request'

export default {
  name: 'travel',
  data () {
    return {
      loaded: false,
      popup: null
    }
  },
  computed: {
    done () {
      if (!this.loaded) {
        return 'visibility:hidden'
      }
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    backTo (way) {
      if (way === 1) {
        // 回首页
        this.$router.replace({ name: 'home' })
        return
      }
      this.$router.go(-1)
    },
    async getData () {
      // return axios.get('http://127.0.0.1:4000/data')
      return getCitysService()
    },
    setScene () {
      return new Scene({
        id: 'travel-map',
        map: new GaodeMap({
          pitch: 35.210526315789465,
          style: 'dark',
          center: [ 104.35, 32.685 ],
          token: process.env.VUE_APP_AMAP_TOKEN,
          zoom: 5
        })
      })
    },
    formPopup (name, img) {
      return `<div style="display:flex; align-items:center;"><p style="margin-right:6px;min-width:50px,text-align:center">${name}</p><img src="${img}" height="40px" /></div>`
    },
    pointLayerSetting (data) {
      return new PointLayer({})
        .source(data, {
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude'
          }
        })
        .shape('circle')
        .active({
          color: '#FAEBD7'
        })
        .animate(true)
        .size(56)
        .color('#4cfd47')
        .style({
          opacity: 1
        })
    },
    mouseMove (scene, pointLayer) {
      pointLayer.on('mousemove', e => {
        this.popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        })
          .setLnglat(e.lngLat)
          .setHTML(this.formPopup(e.feature.name, e.feature.img))
        scene.addPopup(this.popup)
      })
    },
    mouseOut (pointLayer) {
      pointLayer.on('mouseout', e => {
        this.popup.close()
      })
    },
    async drawMap () {
      const scene = this.setScene()

      let { data } = await this.getData()
      const pointLayer = this.pointLayerSetting(data[0])

      this.mouseMove(scene, pointLayer)
      this.mouseOut(pointLayer)

      scene.addLayer(pointLayer)
      this.loaded = true
    }
  }
}
</script>

<style lang="scss">
.amap-logo {
  // 去掉高德地图logo
  display: none;

  > img {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
  .travel {
    position: absolute;
    background-color: #434a50;
    width: 100%;
    height: 100%;
    display: flex;
    // padding: 0 200px;
    box-sizing: border-box;
    // justify-content: center;
    align-items: center;
    &-wrapper {
      margin: 0 10%;
      display: flex;
      justify-content: flex-end;
      border-bottom: 5px solid;
      border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%) 2 2;
      animation: road-move 3s linear forwards;
      .gas {
        display: flex;
        align-items: flex-end;
        animation: gas 1s linear infinite;
        > i {
          transform: scaleX(-1);
          font-size: 30px;
          color: #ffffff;
        }
      }
      .moto {
        animation: moto .5s linear infinite;
        > img {
          margin-bottom: -20px;
          width: 100px;
        }
      }
    }
    &-map {
      position: absolute;
      background-color: rgba(4, 65, 97, .5);
      width: 100%;
      height: 100%;
    }

    .btns {
    z-index: 100;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;

    > span {
      width: 80px;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      background-color: #008B8B;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #008080;
      }
    }

    &-home {
      margin-right: 20px;
    }
  }
  }

  @keyframes road-move {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  @keyframes gas {
    0% {
      padding-right: 0;
      font-size: 30px;
      opacity: 0;
    }
    50% {
      padding-right: 5px;
      font-size: 35px;
      opacity: 1;
    }
    100% {
      padding-right: 10px;
      font-size: 45px;
      opacity: 0;
    }
  }

  @keyframes moto {
    from {
      margin-bottom: 0;
      margin-right: 0;
    }
    to {
      margin-bottom: 1px;
      margin-right: -2px;
    }
  }

</style>
