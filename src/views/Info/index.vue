<template>
  <div id="infoIndex">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="分类">
            <el-select
              v-model="formInline.category"
              placeholder="请选择"
              clearable
              filterable
              style="width: 180px;"
            >
              <el-option
                :label="item.label"
                :value="item.category_name"
                v-for="item in categoryList.cate"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="日期">
            <el-date-picker
              v-model="formInline.dateValue"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 420px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="关键字">
            <el-select
              v-model="formInline.key"
              placeholder="请选择"
              clearable
              filterable
              style="width: 100px;"
            >
              <el-option
                v-for="item in selectkey"
                :key="item.id"
                :label="item.key"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="formInline.inputText"
              placeholder="请输入内容"
              clearable
              style="width:230px;margin-left: 15px;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="danger">搜索</el-button>
          <el-button type="danger" @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-30"></div>
    <el-table :data="tableData.item" style="width: 100%;" border highlight-current-row>
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="categoryId" label="类型" align="center"></el-table-column>
      <el-table-column prop="createDate" label="日期" align="center"></el-table-column>
      <!-- <el-table-column prop="user" label="管理员" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="small" @click="delAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>

    <DialogInfo :flag="dialogInfo" @close="close" :category="categoryList.cate" />
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

import { getCategoryList } from "@/api/news/news";

import { common } from "@/api/common";

import DialogInfo from "./dialog/info";

import { infoList } from "@/api/news/news";

export default {
  name: "InfoIndex",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    // const { getCate,category } = common()

    // /**
    //  * 监听
    //  */
    // watch(()=>category.item,(value)=>{
    // })

    const dialogInfo = ref(false);

    const categoryList = reactive({
      cate: []
    });

    const formInline = reactive({
      category: "",
      dateValue: "",
      key: "ID",
      inputText: ""
    });

    const selectkey = reactive([
      {
        key: "ID",
        value: "id"
      },
      {
        key: "标题",
        value: "title"
      }
    ]);

    const tableData = reactive({
      item: []
    });

    const getCategoryItem = () => {
      root.$store
        .dispatch("common/getCategoryItem")
        .then(res => {
          categoryList.cate = res;
        })
        .catch(error => {
          console.log(error);
        });

      //   getCategoryList()
      //     .then(res => {
      //       categoryList.cate = res.data.data.data;
      //     })
      //     .catch(error => {});
    };

    const handleSizeChange = val => {
      page.pageSize = val;
      getList();
    };

    const handleCurrentChange = val => {
      page.pageNumber = val;
      getList();
    };

    const dialogTableVisible = ref(false);

    const total = ref(0);

    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    const gridData = reactive({});

    const close = data => {
      dialogInfo.value = data;
    };

    const del = () => {
      root.confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        fn: confirmDel,
        id: "123"
      });
    };

    const delAll = () => {
      root.confirm({
        content: "此操作将永久删除选中文件, 是否继续?",
        fn: confirmDel
      });
      //传入对象参数方便后期维护
    };

    const confirmDel = data => {
      console.log(data);
    };

    const getList = () => {
      let requestData = {
        categoryId: "",
        startTime: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };

      infoList(requestData)
        .then(res => {
          tableData.item = res.data.data.data;
          total.value = res.data.data.total;
        })
        .catch(error => {});
    };

    onMounted(() => {
      getCategoryItem();
      getList();
    });

    return {
      formInline,
      selectkey,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      dialogTableVisible,
      gridData,
      dialogInfo,
      close,
      del,
      delAll,
      categoryList,
      total,
      page
    };
  }
};
</script>
<style lang="scss" scoped>
</style>