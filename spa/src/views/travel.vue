<template>
  <div class="travel">
    <div class="travel-wrapper">
      <div class="gas">
        <i class="icon iconfont icon-dexhaust"></i>
      </div>
      <div class="moto">
        <img src="../assets/images/motorcycle.svg" alt="" />
      </div>
    </div>
    <div id="travel-map" class="travel-map" :style="done">
      <div class="btns">
        <span class="btns-home" @click="backTo('home')">回到首页</span>
        <span class="btns-back" @click="backTo('back')">返回</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { getCitysApi } from '../api'
// import { Scene, PointLayer, Popup } from '@antv/l7'
// import { GaodeMap } from '@antv/l7-maps'
import router from '/@/router'


export default defineComponent({
  name: 'Travel',
  setup () {
    const token = `${import.meta.env.VITE_AMAP_TOKEN}`
    const loaded = ref(false)
    const done = computed(() => {
      if (!loaded.value) return 'visibility:hidden'
      return ''
    })


    const backTo: (way: string) => void = (way: string): void => {
      // const router = useRouter()
      if (way === 'home') {
        router.replace({ name: 'home' })
        return
      }
      router.go(-1)
    }


    const getData: () => Promise<any> = async (): Promise<any> => {
      // return { data: [] }
      return getCitysApi()
    }

    const formPopup: (name: string, img: string) => string = (name: string, img: string): string => {
      return `<div style="display:flex; align-items:center;"><p style="margin-right:6px;min-width:50px,text-align:center">${name}</p><img src="${img}" height="40px" /></div>`
    }







    const loadMap: (L7: any) => void = (L7: any): void => {
      // cdn 引入
      const { Scene, PointLayer, Popup, GaodeMap } = L7
      const setScene: () => any = (): any => {
        const config: any = {
          pitch: 35.210526315789465,
          style: 'dark',
          center: [104.35, 32.685],
          zoom: 6
        }
        if (token) config.token = token
        return new Scene({
          id: 'travel-map',
          map: new GaodeMap(config)
        })
      }


      const pointLayerSetting: (data: any) => any = (data: any): any => {
        const pointLayer = new PointLayer({})
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
        return pointLayer
      }



      let popup: any = null
      const mouseMove: (scene: any, pointLayer: any) => void = (scene: any, pointLayer: any): void => {
        pointLayer.on('mousemove', (e: any) => {
          popup = new Popup({
            offsets: [0, 0],
            closeButton: false
          })
            .setLnglat(e.lngLat)
            .setHTML(formPopup(e.feature.name, e.feature.img))
          scene.addPopup(popup)
        })
      }


      const mouseOut: (pointLayer: any) => void = (pointLayer: any): void => {
        pointLayer.on('mouseout', () => {
          popup.close()
        })
      }




      const drawMap: () => Promise<void> = async (): Promise<void> => {
        const scene = setScene()

        const { data } = await getData()
        const pointLayer = pointLayerSetting((data && data.data?.data) || [])

        mouseMove(scene, pointLayer)
        mouseOut(pointLayer)

        scene.addLayer(pointLayer)
        loaded.value = true
      }
      drawMap()
    }

    let timeout: NodeJS.Timeout
    function waitL7 (): void {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty('L7')) {
        loadMap((window as any).L7)
        clearTimeout(timeout)
        return
      }
      timeout = setTimeout(waitL7, 600)
    }
    onMounted(() => {
      waitL7()
    })

    onBeforeUnmount(() => {
      clearTimeout(timeout)
    })

    return {
      done,
      backTo
    }
  }
})
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
    border-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      )
      2 2;
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
      animation: moto 0.5s linear infinite;
      > img {
        margin-bottom: -20px;
        width: 100px;
      }
    }
  }
  &-map {
    position: absolute;
    background-color: rgba(4, 65, 97, 0.5);
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
      background-color: #008b8b;
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
