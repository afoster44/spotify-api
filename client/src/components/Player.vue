<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-sm-12">
              <h1>Song Search</h1>
              <div>
              <input type="text" v-model="state.search">
              
              </div>
              <div>
                  <h1>access token</h1>
              
              </div>
              <div>
                  <h1>refresh token</h1>
              
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    props : {
        searchResult: {
            type: Object,
            required: true
        }
    },
  setup(props) {
      const state = reactive ({
          
          })
     
    return {
        state,
    }
  }
}
</script>

<style scoped>

</style>