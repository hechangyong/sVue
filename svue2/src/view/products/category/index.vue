<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item @change="dorpdownchange" v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <is-empty v-if="cardList.length == 0" altdes>
      <span>空空如也,啥也没有~~~~~</span>
    </is-empty>
    <template v-for="item in cardList">
      <vcard :key="item.id" :cardItem="item"></vcard>
    </template>
  </div>
</template>

<script src="./category.js">
</script>