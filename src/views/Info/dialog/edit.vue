<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="dialog_info"
      @close="close"
      width="600px"
      @opened="open"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="ruleform">
        <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              :label="item.category_name"
              :value="item.id"
              v-for="item in categoryList.cate"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入概况" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit" :loading="load">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
import { editInfo, infoList } from "@/api/news/news";
export default {
  name: "dialogInfo",
  //props 单向数据流，父级--》子级 不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    }
  },
  setup(props, { root, emit, refs }) {
    const dialog_info = ref(false);

    const form = reactive({
      category: "",
      title: "",
      content: ""
    });

    const load = ref(false);

    const categoryList = reactive({
      cate: []
    });

    const formLabelWidth = ref("70px");

    const close = () => {
      refs["ruleform"].resetFields();
      dialog_info.value = false;
      // this.$emit('update:flag',flase)  修饰器修改 需要在属性后面加上.sync,需要处理逻辑的时候使用回调方式修改值
      emit("close", false);
      //修改父组件
    };

    const open = () => {
      refs["ruleform"].resetFields();
      categoryList.cate = props.category;
      getInfo(props.id);
    };

    watch(() => {
      dialog_info.value = props.flag;
    });

    const getInfo = data => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data
      };
      infoList(requestData)
        .then(res => {
          let response = res.data.data.data[0];
          form.category = response.categoryId;
          form.title = response.title;
          form.content = response.content;
        })
        .catch(error => {});
    };

    const submit = () => {
      let requsetData = {
        id: props.id,
        categoryId: form.category,
        title: form.title,
        content: form.content
      };

      if (!requsetData.categoryId) {
        root.$message({
          message: "分类不能为空！",
          type: "error"
        });
        return false;
      }
      load.value = true;

      editInfo(requsetData)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              message: res.data.message,
              type: "success"
            });
            close();
          }

          load.value = false;
        })
        .catch(error => {
          load.value = false;
        });
    };

    return {
      dialog_info,
      form,
      formLabelWidth,
      close,
      open,
      categoryList,
      submit,
      load,
      getInfo
    };
  }
};
</script>
<style>
</style>