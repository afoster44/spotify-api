<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div v-if="state.code == undefined" class="home-card p-5 bg-white rounded elevation-3">
      <a class="btn btn-success" :href="state.AUTH_URL">Spotify login</a>
    </div>
    <router-view v-if="state.code">
      <Dashboard-component :code='state.code' />
    </router-view>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import DashboardComponent from '../components/Dashboard-component.vue'
import axios from 'axios'
// import { onMounted } from '@vue/runtime-core'

export default {
  components: { DashboardComponent },
  name: 'Home',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive ({
      AUTH_URL: `https://accounts.spotify.com/authorize?client_id=83cd894c8d2646bab7384165d5be00ba&response_type=code&redirect_uri=http://localhost:8080/Dashboard&scopes=streaming%20user-read-email%20user-read-private%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
      code: new URLSearchParams(window.location.search).get('code'),
      accessToken: '',
      refreshToken: '',
      expiresIn: ''
    })
    // onMounted(async() => {
    //     const code = GET.code
    //     if (code == undefined) return
    //     await router.push({name: 'Dashboard', params: {code: code}})
    //   })
    return {
      state,
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
