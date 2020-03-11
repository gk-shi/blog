
const plugins = []
// plugins.push(require('dva-logger')())


export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      console.error(err.message)
    }
  },
  plugins: plugins
}
