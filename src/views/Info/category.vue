<template>
  <div id="catrgory">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row>
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="item in categoryList.item" :key="item.id">
              <h4>
                <svg-icon icon-class="add"></svg-icon>
                {{item.category_name}}
                <div class="button-group">
                  <el-button type="danger" size="mini" round @click="editFirst(item)">编辑</el-button>
                  <el-button type="success" size="mini" round @click="addChild(item)">添加子级</el-button>
                  <el-button type size="mini" round @click="dleFirst(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="itemChild in item.children" :key="itemChild.id">
                  {{itemChild.category_name}}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round @click="editFirst(itemChild)">编辑</el-button>
                    <el-button type size="mini" round @click="dleFirst(itemChild.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" :model="formLabelAlign" style="width:440px" ref="ruleForm">
            <el-form-item label="一级分类名称" v-if="category_first">
              <el-input
                v-model="formLabelAlign.categoryName"
                maxlength="8"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="category_second">
              <el-input
                v-model="formLabelAlign.secondName"
                maxlength="8"
                :disabled="category_second_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :loading="load" :disabled="buttonStatus">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

import {
  addFirstCategory,
  getCategoryList,
  deleteCategory,
  editFirstCategory,
  addChildrenCategory
} from "@/api/news/news";

export default {
  name: "Catrgory",
  setup(props, { root, refs }) {
    const categoryList = reactive({
      item: [],
      current: []
    });

    const formLabelAlign = reactive({
      categoryName: "",
      secondName: ""
    });

    const submit = () => {
      if (flag.value === 1) {
        addFirstCate();
      }
      if (flag.value === 2) {
        addTwoCate();
      }
      if (flag.value === 3) {
        addChildCate();
      }
    };

    const addFirstCate = () => {
      if (!formLabelAlign.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }

      load.value = true;

      addFirstCategory({ categoryName: formLabelAlign.categoryName })
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              message: res.data.message,
              type: "success"
            });

            // categoryList.item.push(res.data.data);
            getCategory();
          }
          load.value = false;
          formLabelAlign.categoryName = "";
          // refs["ruleForm"].resetFields();
        })
        .catch(error => {
          load.value = false;
          formLabelAlign.categoryName = "";
          // refs["ruleForm"].resetFields();
        });
    };

    const addTwoCate = () => {
      if (!formLabelAlign.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }

      load.value = true;

      let data = {
        id: categoryList.current.id,
        categoryName: formLabelAlign.categoryName
      };

      editFirstCategory(data)
        .then(res => {
          if (res.data.resCode === 0) {
            let resData = res.data;
            root.$message({
              message: resData.message,
              type: "success"
            });

            // let data = categoryList.item.filter(
            //   item => item.id == categoryList.current.id
            // );
            // data[0].category_name = resData.data.data.categoryName;
            categoryList.current.category_name = resData.data.data.categoryName;
          }
          load.value = false;
          formLabelAlign.categoryName = "";
          // refs["ruleForm"].resetFields();
        })
        .catch(error => {
          load.value = false;
          formLabelAlign.categoryName = "";
          // refs["ruleForm"].resetFields();
        });
    };

    const addChildCate = () => {
      if (!formLabelAlign.secondName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      load.value = true;

      let data = {
        parentId: categoryList.current.id,
        categoryName: formLabelAlign.secondName
      };

      addChildrenCategory(data)
        .then(res => {
          if (res.data.resCode === 0) {
            let resData = res.data;
            root.$message({
              message: resData.message,
              type: "success"
            });
          }
          load.value = false;
          getCategory();
          formLabelAlign.secondName = "";
        })
        .catch(error => {
          load.value = false;
          formLabelAlign.secondName = "";
        });
    };

    const flag = ref("");

    const category_first = ref(true);

    const category_second = ref(true);

    const load = ref(false);

    const category_first_disabled = ref(true);

    const category_second_disabled = ref(true);

    const buttonStatus = ref(true);

    const addFirst = () => {
      formLabelAlign.categoryName = "";
      category_first.value = true;
      category_first_disabled.value = false;
      buttonStatus.value = false;
      category_second.value = false;
      flag.value = 1;
    };

    const getCategory = () => {
      getCategoryList()
        .then(res => {
          categoryList.item = res.data.data;
        })
        .catch(error => {});
    };

    onMounted(() => {
      getCategory();
    });

    const dleFirst = data => {
      root.confirm({
        content: "此操作将永久删除该分类, 是否继续?",
        fn: confirmDel,
        id: data
      });
    };

    const confirmDel = data => {

      deleteCategory({ categoryId: data })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });

          // let index = categoryList.item.findIndex((item, index) => {
          //   return item.id == data;
          // });
          // categoryList.item.splice(index, 1);
          getCategory();
        })
        .catch(error => {});
    };

    const editFirst = data => {
      category_first_disabled.value = false;
      buttonStatus.value = false;
      category_second.value = false;
      formLabelAlign.categoryName = data.category_name;
      flag.value = 2;
      categoryList.current = data;
    };

    const addChild = data => {
      formLabelAlign.categoryName = data.category_name;
      category_second_disabled.value = false;
      category_first_disabled.value = true;
      category_second.value = true;
      buttonStatus.value = false;
      flag.value = 3;
      categoryList.current.id = data.id;
    };

    return {
      formLabelAlign,
      submit,
      addFirst,
      category_first,
      category_second,
      categoryList,
      load,
      category_first_disabled,
      category_second_disabled,
      buttonStatus,
      dleFirst,
      editFirst,
      flag,
      addChild,
      addChildCate
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";

.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }

  div:last-child {
    &:before {
      bottom: 22px;
    }
  }
}

.menu-title {
  line-height: 44px;
  background-color: #fff;
  padding-left: 42px;
  margin-bottom: 10px;
}

.category {
  position: relative;
  cursor: pointer;

  &:before {
    left: 22px;
    top: 0;
    bottom: 0;
    content: "";
    position: absolute;
    width: 32px;
    border-left: 1px dotted #000;
  }

  line-height: 44px;

  h4 {
    position: relative;
    padding-left: 40px;
  }

  svg {
    position: absolute;
    top: 15px;
    left: 14px;
    font-size: 17px;
  }

  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;

    &:before {
      left: 0px;
      top: 22px;
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }

  li,
  h4 {
    @include webkit(transition, all 0.3s ease 0s);

    &:hover {
      background-color: #f3f3f3;

      .button-group {
        display: block;
      }
    }
  }

  .button-group {
    display: none;
    position: absolute;
    right: 11px;
    top: -1px;
    z-index: 2;

    button {
      font-size: 12px;
    }
  }
}
.hr-e9 {
  width: calc(100% +60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
