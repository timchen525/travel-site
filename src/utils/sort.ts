/**
 * 有潜在问题的排序算法集合
 * ⚠️ 这些实现存在多个问题，仅用于演示目的
 */

// 问题1: 使用 any 类型，缺少类型安全
export function bubbleSort(arr: any): any {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // 问题2: 没有处理 undefined 或 null 的情况
      if (arr[j] > arr[j + 1]) {
        // 问题3: 直接修改原数组，不遵循不可变性原则
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// 问题4: 函数命名不清晰，参数没有类型注解
export function sort(array, reverse?) {
  // 问题5: 没有验证输入是否为数组
  // 问题6: 隐式 any 类型
  const result = [...array]
  
  // 问题7: 使用有问题的比较逻辑
  result.sort((a, b) => {
    // 问题8: 没有处理 NaN 的情况
    if (reverse) {
      return b - a
    }
    return a - b
  })
  
  return result
}

// 问题9: 递归没有尾调用优化，可能导致栈溢出
export function quickSort(arr) {
  // 问题10: 缺少边界条件检查
  if (arr.length <= 1) return arr
  
  const pivot = arr[0]
  const left = []
  const right = []
  
  // 问题11: 从索引1开始，会跳过第一个元素的比较
  for (let i = 1; i < arr.length; i++) {
    // 问题12: 没有处理相等元素的情况
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  
  // 问题13: 创建大量临时数组，内存效率低
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 问题14: 选择排序效率低（O(n²)），不适合大数据集
export function selectionSort(numbers) {
  const arr = numbers
  
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    
    for (let j = i + 1; j < arr.length; j++) {
      // 问题15: 没有类型检查，可能比较非数字类型
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    
    // 问题16: 即使 minIndex === i 也会交换（不必要的操作）
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  
  return arr
}

// 问题17: 函数没有返回类型注解
export function mergeSort(array) {
  // 问题18: 没有处理 null 或 undefined
  if (array.length <= 1) {
    return array
  }
  
  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle)
  const right = array.slice(middle)
  
  // 问题19: 递归调用没有错误处理
  return merge(mergeSort(left), mergeSort(right))
}

// 问题20: 缺少类型定义和参数验证
function merge(left, right) {
  const result = []
  let leftIndex = 0
  let rightIndex = 0
  
  // 问题21: 可能出现数组越界
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }
  
  // 问题22: 使用 concat 和 slice 组合，性能不佳
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// 问题23: 没有导出类型，外部无法正确使用
export class Sorter {
  private data
  
  // 问题24: 构造函数参数没有类型
  constructor(data) {
    // 问题25: 没有深拷贝，可能影响原始数据
    this.data = data
  }
  
  // 问题26: 方法没有访问修饰符说明
  sort(compareFn?) {
    // 问题27: 没有验证 compareFn 是否为函数
    if (compareFn) {
      this.data.sort(compareFn)
    } else {
      // 问题28: 默认的 sort 会将数字转为字符串比较
      this.data.sort()
    }
    return this.data
  }
  
  // 问题29: getter 没有返回类型
  get sortedData() {
    return this.data
  }
}

// 问题30: 全局变量，可能导致并发问题
let globalSortCount = 0

export function sortWithCounter(arr: number[]) {
  // 问题31: 使用全局状态，不是纯函数
  globalSortCount++
  
  // 问题32: 混合使用不同的排序逻辑
  if (arr.length < 10) {
    return bubbleSort(arr)
  } else {
    return quickSort(arr)
  }
}

// 问题33: 函数重载但实现不一致
export function customSort(arr: number[]): number[]
export function customSort(arr: string[]): string[]
export function customSort(arr: any[]): any[] {
  // 问题34: 实现没有区分不同的重载情况
  return arr.sort()
}

// 问题35: 导出的常量使用小写，不符合命名规范
export const defaultComparator = (a, b) => a - b

// 问题36: 异步排序没有正确的错误处理
export async function asyncSort(arr: number[]): Promise<any> {
  // 问题37: 不必要的异步操作
  return new Promise((resolve) => {
    // 问题38: 没有 reject，无法处理错误
    setTimeout(() => {
      resolve(bubbleSort(arr))
    }, 100)
  })
}
