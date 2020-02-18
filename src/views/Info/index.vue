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
                :label="item.category_name"
                :value="item.id"
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
              value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-col :span="6">
          <el-button type="danger" @click="search">搜索</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
          <el-button type="danger" @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-30"></div>
    <el-table
      :data="tableData.item"
      style="width: 100%;"
      highlight-current-row
      v-loading="tableToading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center" ></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="categoryId" label="分类" align="center" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" align="center" :formatter="toDate"></el-table-column>
      <!-- <el-table-column prop="user" label="管理员" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="editInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
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

    <DialogInfoEdit
      :flag="dialogInfo_edit"
      @close="close"
      :category="categoryList.cate"
      :id="infoId"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

import { getCategoryList, deleteInfo } from "@/api/news/news";

import { common } from "@/api/common";

import DialogInfo from "./dialog/info";

import DialogInfoEdit from "./dialog/edit";

import { infoList } from "@/api/news/news";

import { timestampToTime } from "@/utils/common";

export default {
  name: "InfoIndex",
  components: {
    DialogInfo,
    DialogInfoEdit
  },
  setup(props, { root }) {
    // const { getCate,category } = common()

    // /**
    //  * 监听
    //  */
    // watch(()=>category.item,(value)=>{
    // })

    const dialogInfo = ref(false);

    const delInfoId = ref("");

    const categoryList = reactive({
      cate: []
    });

    const formInline = reactive({
      category: "",
      dateValue: [],
      key: "id",
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

    const tableToading = ref(false);

    const dialogInfo_edit = ref(false);

    const total = ref(0);

    const infoId = ref("");

    const toDate = row => {
      return timestampToTime(row.createDate);
    };

    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    const gridData = reactive({});

    const close = data => {
      dialogInfo.value = data;
      dialogInfo_edit.value = data;
      getList();
    };

    const del = infoId => {
      delInfoId.value = [infoId];
      root.confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        fn: confirmDel
      });
    };

    const delAll = () => {
      if (!delInfoId.value || delInfoId.value.length == 0) {
        root.$message({
          message: "请选中需要删除的数据!",
          type: "error"
        });

        return false;
      }

      root.confirm({
        content: "此操作将永久删除选中文件, 是否继续?",
        fn: confirmDel
      });
      //传入对象参数方便后期维护
    };

    const confirmDel = data => {
      deleteInfo({ id: delInfoId.value })
        .then(res => {
          delInfoId.value = "";
          root.$message({
            message: res.data.message,
            type: "success"
          });
          getList();
        })
        .catch(error => {});
    };

    const formatData = () => {
      let data = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };

      if (formInline.category) {
        data.categoryId = formInline.category;
      }

      if (formInline.dateValue && formInline.dateValue.length > 0) {
        data.startTime = formInline.dateValue[0];
        data.endTime = formInline.dateValue[1];
      }
      if (formInline.inputText) {
        data[formInline.key] = formInline.inputText;
      }
      return data;
    };

    const getList = () => {
      let requestData = formatData();

      tableToading.value = true;

      infoList(requestData)
        .then(res => {
          tableData.item = res.data.data.data;
          total.value = res.data.data.total;
          tableToading.value = false;
        })
        .catch(error => {
          tableToading.value = false;
        });
    };

    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      delInfoId.value = id;
    };

    const toCategory = row => {
      let categoryId = row.categoryId;
      //  let categoryData = categoryList.cate.filter(item => item.id == categoryId)[0];
      // console.log(categoryList.cate.filter(item => item.id == categoryId)[0])
      // return categoryList.cate.filter(item => item.id == categoryId)[0].category_name;
    };

    const search = () => {
      getList();
    };

    const reset = () => {
      formInline.category = "";
      formInline.dateValue = [];
      formInline.key = "id";
      formInline.inputText = "";

      getList();
    };

    const editInfo = id => {
      infoId.value = id;
      dialogInfo_edit.value = true;
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
      page,
      tableToading,
      toDate,
      delInfoId,
      handleSelectionChange,
      toCategory,
      search,
      reset,
      dialogInfo_edit,
      editInfo,
      infoId
    };
  }
};
</script>
<style lang="scss" scoped>
</style>