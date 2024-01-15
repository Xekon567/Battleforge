import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useModal } from "hooks/use-modal";

const ConfirmModal = (props: any) => {
  const {
    hideModal,
    onConfirm,
    title = "Confirm Action",
    text = "Are you sure?"
  } = props;
  return (
    <>
      <Dialog open onClose={hideModal} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {text}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={(event) => { onConfirm(event); hideModal() }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function useConfirmation(params: any) {
  const { onConfirm, title, text } = params;
  const [ showConfirm, hideConfirm ] = useModal(
    ({ extraProps }: any) => (
      <ConfirmModal
        {...extraProps}
        title={title}
        text={text}
        hideModal={hideConfirm}
        onConfirm={onConfirm}
      />
    ),
    []
  );
  return showConfirm;
}