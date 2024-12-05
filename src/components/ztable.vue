<script setup>
import { ref, computed, watch } from 'vue'

// 定义组件属性
const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  // 表格列配置
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  // 是否显示序号列
  showIndex: Boolean,
  // 是否显示复选框列
  showSelection: Boolean,
  // 是否显示操作列
  showOperation: Boolean,
  // 是否带边框
  border: {
    type: Boolean,
    default: true
  },
  // 是否带斑马纹
  stripe: {
    type: Boolean,
    default: true
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true
  },
  // 分页配置
  pagination: {
    type: Object,
    default: () => ({
      pageSize: 10,
      currentPage: 1,
      total: 0,
      pageSizes: [10, 20, 30, 50]
    })
  },
  // 表格高度
  height: [String, Number],
  // 表格最大高度
  maxHeight: [String, Number],
  // 加载状态
  loading: Boolean,
  // 空数据文本
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  // 操作列配置
  operationConfig: {
    type: Object,
    default: () => ({
      label: '操作',
      width: 150,
      fixed: 'right'
    })
  }
})

// 定义事件
const emit = defineEmits([
  'update:pagination',
  'selection-change',
  'sort-change',
  'page-change',
  'size-change',
  'row-click',
  'operation-click'
])

// 表格实例引用
const tableRef = ref(null)

// 选中的行数据
const selectedRows = ref([])

// 计算表格列配置
const tableColumns = computed(() => {
  const columns = []
  
  // 添加序号列
  if (props.showIndex) {
    columns.push({
      type: 'index',
      label: '序号',
      width: 60,
      align: 'center'
    })
  }
  
  // 添加选择列
  if (props.showSelection) {
    columns.push({
      type: 'selection',
      width: 60,
      align: 'center',
      fixed: props.columns.some(col => col.fixed === 'left') ? 'left' : false
    })
  }
  
  // 添加数据列
  columns.push(...props.columns)
  
  // 添加操作列
  if (props.showOperation) {
    columns.push({
      ...props.operationConfig,
      slot: 'operation'
    })
  }
  
  return columns
})

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
  emit('selection-change', selection)
}

// 处理排序变化
const handleSortChange = ({ column, prop, order }) => {
  emit('sort-change', { column, prop, order })
}

// 处理分页变化
const handleCurrentChange = (currentPage) => {
  const newPagination = { ...props.pagination, currentPage }
  emit('update:pagination', newPagination)
  emit('page-change', currentPage)
}

// 处理每页条数变化
const handleSizeChange = (pageSize) => {
  const newPagination = { ...props.pagination, pageSize, currentPage: 1 }
  emit('update:pagination', newPagination)
  emit('size-change', pageSize)
}

// 处理行点击
const handleRowClick = (row, column, event) => {
  emit('row-click', { row, column, event })
}

// 暴露方法给父组件
defineExpose({
  // 获取选中行数据
  getSelectionRows: () => selectedRows.value,
  // 清空选中
  clearSelection: () => {
    if (tableRef.value) {
      tableRef.value.clearSelection()
    }
  },
  // 切换行选中状态
  toggleRowSelection: (row, selected) => {
    if (tableRef.value) {
      tableRef.value.toggleRowSelection(row, selected)
    }
  }
})
</script>

<template>
  <div class="z-table">
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="data"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      v-loading="loading"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
    >
      <template v-for="(column, index) in tableColumns" :key="index">
        <el-table-column
          v-if="!column.slot"
          v-bind="column"
        >
          <template #default="scope" v-if="column.formatter">
            {{ column.formatter(scope.row, column, scope.$index) }}
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="column"
        >
          <template #default="scope">
            <slot
              :name="column.slot"
              :row="scope.row"
              :column="column"
              :index="scope.$index"
            >
              <!-- 默认操作按钮 -->
              <template v-if="column.slot === 'operation'">
                <slot name="operation" :row="scope.row">
                  <el-button
                    type="primary"
                    link
                    @click.stop="$emit('operation-click', 'edit', scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="danger"
                    link
                    @click.stop="$emit('operation-click', 'delete', scope.row)"
                  >
                    删除
                  </el-button>
                </slot>
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页器 -->
    <div v-if="showPagination" class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.z-table {
  width: 100%;
}

.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 表格样式优化 */
:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-header-bg-color: var(--el-fill-color-light);
  --el-table-row-hover-bg-color: var(--el-fill-color);
}

:deep(.el-table__row) {
  transition: background-color 0.3s ease;
}

:deep(.el-table__header th) {
  font-weight: 600;
  color: var(--el-text-color-primary);
  background-color: var(--el-table-header-bg-color);
}

:deep(.el-button--link) {
  padding: 4px 8px;
}

/* 修复操作按钮间距 */
:deep(.el-button--link + .el-button--link) {
  margin-left: 8px;
}

/* 优化加载状态 */
:deep(.el-loading-mask) {
  background-color: var(--el-mask-color);
  backdrop-filter: blur(2px);
}
</style>
