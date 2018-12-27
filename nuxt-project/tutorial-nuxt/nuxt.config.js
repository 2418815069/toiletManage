import axios from 'axios'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tutorial-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: function() {
      return axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        return res.data.map((user) => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  },
  css: [
    '~assets/css/main.css',
  ]
}
