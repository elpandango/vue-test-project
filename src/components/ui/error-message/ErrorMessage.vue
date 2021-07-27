<template>
  <div class="error-msg"
       :class="{'error': type === 'error', 'success': type === 'success'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    type: {
      type: String
    }
  }
}
</script>

<style lang="scss" src="./styles.scss"></style>