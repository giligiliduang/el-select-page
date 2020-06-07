<script>
export default {
  name: "pagination",
  props: {
    pageSize: {
      type: Number,
      default: 6
    },
    total: {
      type: Number,
      default: 0
    },
    showTotal: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      innerCurrentPage: 1,
      totalPage: 0
    };
  },
  watch: {
    pageSize: {
      immediate: true,
      handler(val) {
        this.totalPage = Math.ceil(this.total / this.pageSize);
      }
    },
    total: {
      immediate: true,
      handler(val) {
        this.totalPage = Math.ceil(this.total / this.pageSize);
      }
    },
    innerCurrentPage(val) {
      this.$emit("on-page-change", val, this.pageSize);
    }
  },
  computed: {
    firstPageDisabled() {
      return this.innerCurrentPage === 1;
    },
    lastPageDisabled() {
      return this.innerCurrentPage === this.totalPage;
    },
    prevPageDisabled() {
      return this.innerCurrentPage === 1;
    },
    nextPageDisabled() {
      return this.innerCurrentPage === this.totalPage;
    }
  },
  methods: {
    getFirstPage(h) {
      let firstPageClass = {
        "first-page": true,
        disabled: this.firstPageDisabled
      };
      let firstPage = h(
        "div",
        {
          class: firstPageClass,
          on: {
            click: () => {
              if (this.firstPageDisabled) return;
              this.innerCurrentPage = 1;
            }
          }
        },
        [h("i", { class: "el-icon-d-arrow-left" })]
      );
      return firstPage;
    },
    getLastPage(h) {
      let lastPageClass = {
        "last-page": true,
        disabled: this.lastPageDisabled
      };
      let lastPage = h(
        "div",
        {
          class: lastPageClass,
          on: {
            click: () => {
              if (this.lastPageDisabled) return;
              this.innerCurrentPage = this.totalPage;
            }
          }
        },
        [h("i", { class: "el-icon-d-arrow-right" })]
      );
      return lastPage;
    },
    getNextPage(h) {
      let nextPageClass = {
        "next-page": true,
        disabled: this.nextPageDisabled
      };
      let nextPage = h(
        "div",
        {
          class: nextPageClass,
          on: {
            click: () => {
              if (this.nextPageDisabled) return;
              if (this.innerCurrentPage < this.totalPage) {
                this.innerCurrentPage++;
              }
            }
          }
        },
        [h("i", { class: "el-icon-arrow-right" })]
      );
      return nextPage;
    },
    getPrevPage(h) {
      let prevPageClass = {
        "prev-page": true,
        disabled: this.prevPageDisabled
      };
      let prevPage = h(
        "div",
        {
          class: prevPageClass,
          on: {
            click: () => {
              if (this.prevPageDisabled) return;
              if (this.innerCurrentPage > 1) {
                this.innerCurrentPage--;
              }
            }
          }
        },
        [h("i", { class: "el-icon-arrow-left" })]
      );
      return prevPage;
    },
    getShowTotal(h) {
      return h(
        "div",
        {
          class: "show-total"
        },
        this.showTotal
          ? this.showTotal(this.innerCurrentPage, this.totalPage, this.total)
          : `Page ${this.innerCurrentPage}/${this.totalPage} ( ${this.total} records )`
      );
    }
  },
  render(h) {
    let firstPage = this.getFirstPage(h);
    let lastPage = this.getLastPage(h);
    let nextPage = this.getNextPage(h);
    let prevPage = this.getPrevPage(h);
    let showTotal = this.getShowTotal(h);
    return h(
      "div",
      {
        class: "pagination"
      },
      [firstPage, prevPage, showTotal, nextPage, lastPage]
    );
  }
};
</script>

<style scoped>
.pagination {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif;
  padding: 0;
  background-color: #fff;
  position: relative;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  text-align: center;
  font-size: 14px;
}
.pagination .first-page,
.pagination .last-page,
.pagination .prev-page,
.pagination .next-page,
.pagination .show-total {
  display: inline-block;
  cursor: pointer;
}

.pagination .first-page.disabled,
.pagination .last-page.disabled,
.pagination .prev-page.disabled,
.pagination .next-page.disabled {
  color: gainsboro;
}
</style>