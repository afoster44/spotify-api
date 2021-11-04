<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <p>{{state.code}} should have a code</p>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const route = useRoute()
    const state = reactive ({
      code: computed(() => route.params.code)
    })
    console.log(state.code)
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
