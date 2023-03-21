import {ref} from "vue";
import PageModal from "@/components/page-modal.vue";

type CallbackFn = (item?: any) => void;
export function usePageModal(
  newCallback?: CallbackFn,
  editCallBack?: CallbackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});

  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
      pageModalRef.value.dialogTitle = "新建" + pageModalRef.value.modalTitle;
    }
    newCallback && newCallback();
  };

  const handleEditData = (item: any) => {
    defaultInfo.value = {...item};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
      pageModalRef.value.dialogTitle = "编辑" + pageModalRef.value.modalTitle;
    }
    editCallBack && editCallBack();
  };
  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
