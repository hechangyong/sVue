<template>
  <div id="app">
    <transition :name="animation">
      <router-view class="page-container" comp-type="page"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data: function () {
    return {
      animation: 'fade'
    }
  }
}
</script>
