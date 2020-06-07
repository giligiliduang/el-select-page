<template>
  <div>
    <p class="demo-box">
      <pagination :total="100" :pageSize="10" />
    </p>
  </div>
</template>

<script>
import Locale from "../../../src/utils/mixins/locale.js";
import Pagination from "./Pagination.vue";
export default {
  name: "ElSelectPage",
  componentName: "ElSelectPage",
  mixins: [Locale],
  components: {
    Pagination
  },
  props: {
    message: {
      type: String,
      default: "world"
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-box {
  font-size: 24px;
  font-weight: bold;
}
</style>
