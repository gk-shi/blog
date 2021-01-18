
import { ref, nextTick, Ref } from 'vue'

interface AgeHandler {
  age: Ref<number>;
  addAge: (max?: 95, num?: 1) => void;
  addAgeHandler: () => void;
  clearAgeTimeout: () => void;
  [propName: string]: any;
}
/**
 * @description: 出生时代处理
 * @return {Object} {
    age: 时代
    addAge: 添加
    addAgeHandler: 添加延时处理器
    clearAgeTimeout: 清除延时处理器
  }
 */
export default function ageHandler (): AgeHandler {
  const age = ref(0)
  let ageTimeoutHandler: NodeJS.Timeout

  const clearAgeTimeout = (): void => {
    clearTimeout(ageTimeoutHandler)
  }

  const addAge = (max = 95, num = 1): void => {
    ageTimeoutHandler = setTimeout(() => {
      if (age.value === 95) {
        clearTimeout(ageTimeoutHandler)
        return
      }
      nextTick(() => {
        if (age.value + num > max) num = max - age.value
        age.value += num
        addAge()
      })
    }, 15)
  }


  const addAgeHandler = (): void => {
    age.value = 0
    clearAgeTimeout()
    addAge()
  }


  return {
    age,
    addAge,
    addAgeHandler,
    clearAgeTimeout
  }
}

