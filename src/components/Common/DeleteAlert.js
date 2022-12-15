import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Text,
} from "@chakra-ui/react";
import { ModalDeleteIcon } from "../../assets/icons";

function DeleteAlert({
  isOpen,
  onClose,
  type,
  name,
  handleConfirm,
  loadingDeleteActivity,
}) {
  return (
    <Box data-cy="modal-delete">
      <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb="46px"
              pt="40px"
            >
              <ModalDeleteIcon data-cy="modal-delete-icon" mb="34px" />
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                data-cy="modal-delete-title"
              >
                <Text fontSize="18px">Apakah anda yakin menghapus {type}</Text>
                <Text fontSize="18px" fontWeight="bold">
                  “{name}”?
                </Text>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter
              p="0px 0px 46px 0px"
              display="flex"
              justifyContent="center"
            >
              <Button data-cy="modal-delete-cancel-button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loadingDeleteActivity}
                data-cy="modal-delete-confirm-button"
                colorScheme="red"
                onClick={handleConfirm}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default DeleteAlert;
