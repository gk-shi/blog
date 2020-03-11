<template>
<div id="app" v-cloak>
  <transition name="slide-fade" mode="out-in">
    <router-view/>
  </transition>
</div>
</template>

<style>
@font-face {
  font-family: sourceCodePro;
  src: url('./assets/fonts/sourceCodePro/SourceCodePro-It.ttf'), url('./assets/fonts/sourceCodePro/SourceCodePro-It.otf');
}

[v-cloak] {
  display: none;
}

#app {
  width: 100%;
  height: 100%;
}

.slide-fade-enter-active {
  transition: all .5s linear;
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(30px);
  opacity: 0;
}
</style>
