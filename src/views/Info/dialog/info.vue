<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info" @close="close" width="600px" @opened="open">
      <el-form :model="form" ref="ruleform">
        <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              :label="item.label"
              :value="item.category_name"
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
import { addInfo } from "@/api/news/news";
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
    };

    watch(() => {
      dialog_info.value = props.flag;
    });

    const submit = () => {
      load.value = true;
      let requsetData = {
        category: form.category,
        title: form.title,
        content: form.content
      };

      addInfo(requsetData)
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
      load
    };
  }
};
</script>
<style>
</style>