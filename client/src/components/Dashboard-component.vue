<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12">
              <h1>Song Search</h1>
              <div>
              <input type="text" v-model="state.search">
              {{state.search}}
              </div>
              <div>
                  <h1>access token</h1>
              {{state.accessToken}}
              </div>
              <div>
                  <h1>refresh token</h1>
              {{state.refreshToken}}
              </div>
              <p> expires in : {{state.expiresIn}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, reactive, watch } from 'vue'
import { api } from '../services/AxiosService'
export default {
    props : {
        code: {
            type: String,
            required: true
        }
    },
  setup() {
      const state = reactive ({
          code: new URLSearchParams(window.location.search).get('code'),
          accessToken: '',
          refreshToken: '',
          expiresIn: 0,
          search: ''
      })
      console.log('dashboard component code', state.code)
      console.log('hello')
      onMounted (async () => {
          if(state.code != undefined) {
              console.log('onmounted', state.code)
              const res = await api.post('/login', {code : state.code})
              state.accessToken = res.data.accessToken
              state.refreshToken = res.data.refreshToken
              state.expiresIn = res.data.expiresIn
              window.history.pushState({}, null, '/')
          }
              return state.accessToken, state.refreshToken, state.expiresIn
      })
      onUpdated(() => {
          if(!state.expiresIn || !state.refreshToken) return
          const interval = setInterval(() => {
              const res = api.post('/refresh', {refreshToken: state.refreshToken})
              console.log(res.data)
          }, (state.expiresIn - 60) * 1000)
          return () => clearInterval(interval)
      })
    //   const refresh = async() => {
    //       if(!state.expiresIn || !state.refreshToken) return
    //       const interval = setInterval(() => {
    //           const res = await api.post('/refresh', {refreshToken: state.refreshToken})
    //           console.log(res.data)
    //       }, (state.expiresIn - 60) * 1000)
    //       return () => clearInterval(interval)
    //   }()
    return {
        state,
        refresh : function (){
          if(!state.expiresIn || !state.refreshToken) return
          const interval = setInterval(() => {
              const res = api.post('/refresh', {refreshToken: state.refreshToken})
              console.log(res.data)
          }, (state.expiresIn - 60) * 1000)
          return () => clearInterval(interval)
      }()
//         GET : async function(){
//     var get = {},
//     // the add function turns a key into an
//     // array if it is defined multiple times
//     add = function (key,value){
//         var cur = get[key]
//         if (cur.isArray){
//             get[key].push(value);
//         }else {
//             get[key] = [];
//             get[key].push(cur);
//             get[key].push(value);
//         }
//     },
//     search = document.location.search,
//     // decode special url characters like + into a (space)
//     decode = function (s) {
//       console.log(s)
//         return decodeURIComponent(s.split("+").join(" "));
//     };

//     // The dreaded Regex
//     search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (a,b,c) {
//         var key = decode(b)
//         if (get[key]){
//             add(decode(b),decode(c));
//         }else {
//             get[decode(b)] = decode(c);
//         }
//     });
//     console.log(get)
//     state.code = get.code
//     console.log('states code', state.code)
//     if(state.code) {
//         const res = await api.post('/login', {code: state.code})
//         console.log('loggin data', res.data)
//         state.accessToken = res.data.accessToken
//         state.refreshToken = res.data.refreshToken
//         state.expiresIn = res.data.expiresIn
//         window.history.pushState({}, null, '/')
//     }
//     return get;
// }()
    //   user: computed(() => AppState.user),
    //   async login() {
    //     AuthService.loginWithPopup()
    //   },
    //   async logout() {
    //     AuthService.logout({ returnTo: window.location.origin })
    //   }
    }
  }
}
</script>

<style scoped>

</style>