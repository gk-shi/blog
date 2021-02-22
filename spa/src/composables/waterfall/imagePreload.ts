import { ComputedRef, Ref, ref, nextTick } from 'vue'


type ImagePreload = {
  actualList: ref<Array<any>>;
  setLastPreloadImgIdx: (idx: number) => void;
  setActualList: (newList: any[]) => void;
  imagePreloadHandle: (noPreloadList: Array<any>, actualColWidth: Ref<number>, preloadedFn: Function | undefined, srcKey: string, errorImgHeight: ComputedRef<numnber>, errorImgSrc: string) => void;
}

export default function imagePreload (): ImagePreload {
  const actualList = ref<Array<any>>([])  // 实际用来渲染的列表
  const setActualList = (newList: any[]): void => {
    actualList.value = newList
  }


  let lastPreloadImgIdx = -1  // 上一次最后预加载的图片的下标

  const setLastPreloadImgIdx = (idx: number): void => {
    lastPreloadImgIdx = idx
  }

  // 图片预加载
  const imagePreloadHandle = (noPreloadList: Array<any>, actualColWidth: Ref<number>, preloadedFn: Function | undefined, srcKey: string, errorImgHeight: ComputedRef<numnber>, errorImgSrc: string): void => {
    let tmpIdx = lastPreloadImgIdx === 0 ? 0 : lastPreloadImgIdx + 1
    const tmpArr: any[] = []
    while (tmpIdx < noPreloadList.length) {
      const item = noPreloadList[tmpIdx]
      tmpArr.push(item)
      tmpIdx++
      if (!item[srcKey]) {
        lastPreloadImgIdx++
        item._height = 0
        continue
      }
      const oImg = new Image()
      oImg.src = item[srcKey]
      oImg.onload = oImg.onerror = (e): void => {
        if ((e as Event).type === 'error') {
          item[srcKey] = errorImgSrc
          item._height = errorImgHeight.value
        } else if ((e as Event).type === 'load') {
          item._height = Math.round(actualColWidth.value / (oImg.width / oImg.height))
        }
        lastPreloadImgIdx++
        if (lastPreloadImgIdx + 1 === noPreloadList.length) {
          // 预加载完成，开始渲染
          actualList.value = actualList.value.concat(tmpArr)
          nextTick(() => {
            // 图片预加载完成后的回调
            preloadedFn && preloadedFn()
          })
        }
      }
    }
  }

  return {
    actualList,
    setActualList,
    setLastPreloadImgIdx,
    imagePreloadHandle
  }
}
