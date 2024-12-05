<script setup>
import { ref, reactive } from 'vue'
import ZTable from './ztable.vue'

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 25,
    address: '北京市朝阳区'
  }
])

// 表格列配置
const columns = [
  {
    prop: 'name',
    label: '姓名',
    width: 120,
    sortable: true
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80
  },
  {
    prop: 'address',
    label: '地址'
  }
]

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 20, 50, 100]
})

// 表格实例
const tableRef = ref(null)

// 处理操作按钮点击
const handleOperation = (type, row) => {
  console.log('操作类型:', type, '行数据:', row)
}

// 处理分页变化
const handlePageChange = (page) => {
  console.log('当前页:', page)
  // 这里可以调用接口获取数据
}
</script>

<template>
  <ZTable
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    show-selection
    show-index
    show-operation
    @operation-click="handleOperation"
    @page-change="handlePageChange"
  >
    <!-- 自定义操作列 -->
    <template #operation="{ row }">
      <el-button type="primary" link @click="handleOperation('view', row)">
        查看
      </el-button>
      <el-button type="success" link @click="handleOperation('edit', row)">
        编辑
      </el-button>
    </template>
  </ZTable>
</template>