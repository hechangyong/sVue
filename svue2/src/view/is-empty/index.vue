<template>
	<div class="is_empty">
		<div>
			<img src="../../assets/images/is_empty.png" :alt="altdes" width="20%">
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
  name: 'is-empty',
  props:["altdes"]
};
</script>


<style lang="scss" scoped>
.is_empty {
  text-align: center;
  color: #999;
  padding-top: 100px;
  > div {
    margin-bottom: 20px;
    font-size: 14px;
  }
}
</style>
