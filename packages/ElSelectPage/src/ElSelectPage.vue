<template>
  <div class="el-select-page">
    <el-select 
    :multiple="multiple" 
    :value="selectValue"
    @change="handleSelectChange"
    >
      <template v-for="(item,index) in innerData">
        <el-option
          :class="{'el-select-page-option':true,'displayNone':item.displayNone}"
          :key="item[keyField]"
          :value="item[keyField]"
          :disabled="item.disabled"
          :label="item[showField]"
        >
          <div class="el-select-page-option-container">
            <span>{{renderIndex(index)}}</span>
            <span>{{item[showField]}}</span>
          </div>
        </el-option>
      </template>
      <el-option class="pagination-option" v-if="!isEmpty" value="pagination">
        <pagination
          @click.native.stop.prevent
          @on-page-change="handlePageChange"
          :total="totalItems"
          :pageSize="pageSize"
        />
      </el-option>
    </el-select>
  </div>
</template>
<script>
import Locale from "../../../src/utils/mixins/locale.js";
import Pagination from "./Pagination.vue";
import Emitter from "element-ui/src/mixins/emitter";
export default {
  name: "ElSelectPage",
  componentName: "ElSelectPage",
  mixins: [Locale, Emitter],
  model: {
    prop: "value",
    event: "change"
  },
  components: {
    Pagination
  },
  props: {
    showField: {
      type: String,
      default: "label"
    },
    keyField: {
      type: String,
      default: "value"
    },
    selectShowValue: {
      type: [String, Array],
      default: ""
    },
    pageSize: {
      type: Number,
      default: 6
    },
    totalItems: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      innerData: [],
      selectValue: this.multiple ? [] : ""
    };
  },
  computed: {
    isEmpty() {
      return this.data.length === 0;
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.innerData = val;
      }
    },
    value(val) {
      if (this.multiple) {
        let value = val.map((item,index)=>{
          return {
            [this.keyField]:item,
            [this.showField]:this.selectShowValue[index],
            displayNone:true
          }
        }).filter(item=>!val.includes(item))
        this.selectValue = value
      } else {
      }
    }
  },
  methods: {
    renderIndex(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    renderLabel(h, label, index) {
      let children = [];
      return h("div", {}, [h("span", {}, index), h("span", {}, label)]);
    },
    handlePageChange(page, pageSize) {
      this.currentPage = page;
      this.$emit("on-page-change", page, pageSize);
    },
    handleSelectChange(val){
      console.log(val)
      if(this.multiple){
        this.selectValue = val
      }else{

      }
    },
    getPaginationOption(h) {
      return h(
        "el-option",
        {
          class: "pagination-option"
        },
        [
          h("pagination", {
            props: {
              total: this.totalItems,
              pageSize: this.pageSize
            },
            nativeOn: {
              click: e => {
                e.preventDefault();
                e.stopPropagation();
              }
            },
            on: {
              "on-page-change": (page, size) => {
                this.handlePageChange(page, size);
              }
            }
          })
        ]
      );
    },
    getDataOptions(h) {
      return this.innerData.map((item, index) => {
        return h(
          "el-option",
          {
            props: {
              key: item[this.keyField],
              value: item[this.keyField],
              label: item[this.showField],
              disabled: item.disabled
            }
          },
          h(
            "div",
            {
              class: "el-select-page-option"
            },
            item.renderLabel
              ? item.renderLabel(h, item[this.showField], index)
              : this.renderLabel(h, item[this.showField], index)
          )
        );
      });
    }
  }

  // render(h) {
  //   let dataOptions = this.getDataOptions(h);
  //   let paginationOption = this.getPaginationOption(h);
  //   return h("div", { class: "el-select-page" }, [
  //     h(
  //       "el-select",
  //       {
  //         props: {
  //           multiple: this.multiple
  //         }
  //       },
  //       [dataOptions, paginationOption]
  //     )
  //   ]);
  // }
};
</script>

<style lang="scss" scoped>
.displayNone{
  display: none;
}
.el-select-dropdown__item.pagination-option {
  padding: 0;
}
</style>
