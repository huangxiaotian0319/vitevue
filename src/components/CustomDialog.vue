<script setup>
// ... 前面的 script 代码保持不变 ...

// 添加动画类型
const props = defineProps({
  // ... 其他 props ...
  animationType: {
    type: String,
    default: 'zoom', // zoom, slide, flip, rotate
    validator: (value) => ['zoom', 'slide', 'flip', 'rotate'].includes(value)
  }
})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :class="['custom-dialog', `animation-${animationType}`]"
    :show-close="showClose"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :fullscreen="fullscreen"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    :destroy-on-close="true"
  >
    <!-- ... 模板内容保持不变 ... -->
  </el-dialog>
</template>

<style scoped>
.custom-dialog {
  :deep(.el-dialog) {
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    transform-origin: center;
    margin-top: 15vh !important;
  }

  /* 基础动画效果 */
  :deep(.el-overlay) {
    backdrop-filter: blur(6px);
    transition: backdrop-filter 0.3s ease;
  }

  :deep(.el-overlay-dialog) {
    position: relative;
    perspective: 1200px;
  }

  /* 缩放动画 */
  &.animation-zoom {
    :deep(.el-dialog) {
      animation: dialogZoomIn 0.3s ease-out forwards;
    }
  }

  /* 滑动动画 */
  &.animation-slide {
    :deep(.el-dialog) {
      animation: dialogSlideIn 0.3s ease-out forwards;
    }
  }

  /* 翻转动画 */
  &.animation-flip {
    :deep(.el-dialog) {
      animation: dialogFlipIn 0.5s ease-out forwards;
    }
  }

  /* 旋转动画 */
  &.animation-rotate {
    :deep(.el-dialog) {
      animation: dialogRotateIn 0.5s ease-out forwards;
    }
  }

  /* 关闭时的动画 */
  &.el-dialog__wrapper.is-hidden {
    animation: none !important;
    
    :deep(.el-dialog) {
      animation: dialogFadeOut 0.3s ease-in forwards !important;
    }
  }
}

/* 定义动画关键帧 */
@keyframes dialogZoomIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dialogSlideIn {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes dialogFlipIn {
  0% {
    transform: perspective(1200px) rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(1200px) rotateX(0);
    opacity: 1;
  }
}

@keyframes dialogRotateIn {
  0% {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}

@keyframes dialogFadeOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}

/* 添加内容过渡效果 */
.custom-dialog {
  :deep(.el-dialog__body) {
    transition: all 0.3s ease-out;
    animation: contentFadeIn 0.4s 0.2s ease-out forwards;
    opacity: 0;
  }
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加按钮悬停效果 */
.custom-dialog {
  :deep(.el-button) {
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

/* 添加标题动画 */
.custom-dialog {
  :deep(.el-dialog__title) {
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #409EFF, #a0cfff);
      transition: width 0.3s ease;
    }
  }

  &:deep(.el-dialog:hover .el-dialog__title::after) {
    width: 100%;
  }
}

/* 添加关闭按钮效果 */
.custom-dialog {
  :deep(.el-dialog__headerbtn) {
    transition: all 0.3s ease;
    
    &:hover {
      transform: rotate(90deg);
      
      .el-dialog__close {
        color: #f56c6c;
      }
    }
  }
}
</style> 