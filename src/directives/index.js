// 这个js文件里面写自定义指令

// 这个自定义指令是图片地址也存在，但图片加载不出来
export const imgerror = {
  // 什么时候去图片地址
  // onerror
  inserted(el, binding, vnode) {
    // el 是当前元素
    // console.log(el) // 就是img
    // binding 是当前指令的相关信息
    // console.log(binding)
    // vnode 是虚拟节点
    // console.log(vnode)
    el.onerror = function() {
      // binding.value 是图片的信息
      el.src = binding.value
    }
  }
}
