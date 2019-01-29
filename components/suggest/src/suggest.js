import SuggestComponent from './suggest.vue'

let instance = null

const suggestPlugin = {
  install(Vue, initOptions = {}) {
    const SuggestDialog = Vue.extend(SuggestComponent)
    if (!instance) {
      instance = new SuggestDialog().$mount(document.createElement('div'))
      document.body.appendChild(instance.$el)
    }

    const defaults = {}
    for (let i in instance.$options.props) {
      if (i !== 'value') {
        defaults[i] = instance.$options.props[i].default
      }
    }

    const suggest = {
      show(options = {}) {
        const opt = Object.assign({}, defaults, options)
        for (let key in opt) {
          instance[key] = opt[key]
        }
        instance.visible = true
      },
      hide(callback) {
        instance.visible = false
        callback && callback()
      },
      alert (option) {
        console.log(option)
        this.show(Object.assign({}, option))
      },
    }

    Vue.mixin({
      created: function () {
        this.$suggest = suggest
      }
    })
  }
}

export default suggestPlugin
