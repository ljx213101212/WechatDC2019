// components/component-tag-name.js
var myBehavior = require('./behaviors/my-behavior')
Component({
  observer:{
    "properties.myProperty": function (myProperty) {
      console.log("observer callback -> ", myProperty);
    }
  },
  behaviors: [myBehavior,'wx://form-field'],
  properties: {
    myProperty: { // 属性名
      type: String,
      value: '123'
    },
    myProperty2: String // 简化的定义方式
  },

  data: {
    testPageData1:10
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      console.log("实例组件 attached")
    },
    moved: function () { 
      console.log("实例组件 moved")
    },
    detached: function () { 
      console.log("实例组件 detached")
    },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { 
    console.log("实例组件 attached2")

  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log("实例组件 show")
     },
    hide: function () { 
      console.log("实例组件 hide")
    },
    resize: function () {
      console.log("实例组件 resize")
     },
  },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
        testPageData1: this.data.testPageData1 + 10
      })
      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    onMyButtonTap2: function(){
      console.log("点我发送事件")
      //this.triggerEvent('customevent', {}) // 只会触发 pageEventListener2
    //  this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
      this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1

    },

    onMyButtonTap3:function(){
      this.triggerEvent('changepropertyevent', {}) // 只会触发 pageEventListener2
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function (newVal, oldVal) {
      console.log("实例组件的参数改变->", `新参数:${newVal}`, `老参数:${oldval}`);
    }
  }

})