
Page({
  data: {
    currentIndex: 0,
    num: 0,
    navData: [
      {
        title: "全部",
      },
      {
        title: "待办",
      },
      {
        title: "已完成",
      }
    ],
    val: "",
    todolist: [],
    showData: []
  },
  activeBtn({ currentTarget }) {
    let { ind } = currentTarget.dataset
    this.setData({
      currentIndex: ind
    },()=> {
      this.getShowData()
    })
  },
  getId({ detail}){
    let { value } = detail;
    let {currentIndex} = this.data
    let num = 0
    let todolist = JSON.parse(JSON.stringify(this.data.todolist))
    todolist.forEach(item => {
      if(currentIndex === 0){
        if (!item.check) {
          item.check = value.includes(item.id + "")
        }
      }else if(currentIndex === 1){
        if(!item.check){
          item.check = value.includes(item.id+"")
        }
      }else{
        if (item.check) {
          item.check = value.includes(item.id + "")
        }
      }
      if(!item.check){
        num += 1
      }
    })
    this.setData({
      todolist,
      num
    }, () => {
      this.getShowData()
    })
  },
  changeFn({ detail }) {
    let { value } = detail;
    this.setData({
      val: value
    })
  },
  getValFn() {
    let { val, todolist, currentIndex,num } = this.data
    if (!val.trim()) {
      return;
    }
    let obj = { val, check: false, id: todolist.length }
    todolist.push(obj)
    this.getShowData()
    this.setData({
      val: "",
      num: ++num,
      todolist
    })
  },
  getShowData(){
    let { currentIndex, todolist} = this.data
    if (currentIndex === 0) {
      this.setData({
        showData: todolist
      })
    } else if (currentIndex === 1) {
      this.setData({
        showData: todolist.filter(item => !item.check)
      })
    } else {
      this.setData({
        showData: todolist.filter(item => item.check)
      })
    }
  },
  onLoad: function (options) {

  }
})