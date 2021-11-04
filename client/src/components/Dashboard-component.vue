<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12">
              <h1>Song Search</h1>
              <input type="text">
          </div>
      </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { api } from '../services/AxiosService'
export default {
  setup() {
      const state = reactive ({
          code: '',
          accessToken: '',
          refreshToken: '',
          expiresIn: ''
      })
    //   onMounted (async () => {
    //       if(state.code != undefined) {
    //           console.log('onmounted', state.code)
    //           const data = await api.post('/login', {code : state.code})
    //           console.log(data)
    //       }
    //   })
    return {
        state,
        GET : async function(){
    var get = {},
    // the add function turns a key into an
    // array if it is defined multiple times
    add = function (key,value){
        var cur = get[key]
        if (cur.isArray){
            get[key].push(value);
        }else {
            get[key] = [];
            get[key].push(cur);
            get[key].push(value);
        }
    },
    search = document.location.search,
    // decode special url characters like + into a (space)
    decode = function (s) {
      console.log(s)
        return decodeURIComponent(s.split("+").join(" "));
    };

    // The dreaded Regex
    search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (a,b,c) {
        var key = decode(b)
        if (get[key]){
            add(decode(b),decode(c));
        }else {
            get[decode(b)] = decode(c);
        }
    });
    console.log(get)
    state.code = get.code
    console.log('states code', state.code)
    const res = await api.post('/login', {code: state.code})
    console.log('loggin data', res.data)
    state.accessToken = res.data.accessToken
    state.refreshToken = res.data.refreshToken
    state.expiresIn = res.data.expiresIn
    return get;
}()
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