<template>
  <div id="editor-wraper">
    <span>{{ editorHTML.title }}</span>
    <Editor
      :style="editorStyle"
      v-model="editorHTML.content"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {onBeforeUnmount, ref, shallowRef} from "vue";
import {Editor} from "@wangeditor/editor-for-vue";
import {IDomEditor} from "@wangeditor/editor";

// props
const props = defineProps({
  editorHTML: {
    type: Object,
    required: true,
  },
  editorStyle: {
    type: Object,
    default: () => ({height: "400px", "margin-bottom": "10px"}),
  },
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 编辑器配置
const editorConfig = {placeholder: "请输入内容..."};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  // 将编辑器设置为只读
  editorRef.value.disable();
};
</script>

<style scoped lang="less">
#editor-wraper {
  box-sizing: border-box;
  border: 1px solid #eef0f3;
  box-shadow: 1px 1px 1px #eef0f3;
  margin-bottom: 10px;
  span {
    display: inline-block;
    width: 100%;
    padding-top: 10px;
    font-size: 24px;
    font-weight: bolder;
    text-align: center;
  }
  :deep(.w-e-scroll) {
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
