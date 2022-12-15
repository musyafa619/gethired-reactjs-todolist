import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { ModalInformartionIcon } from "../../assets/icons";

function ModalInformation({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      data-cy="modal-information"
    >
      <ModalOverlay />
      <ModalContent maxw="490px">
        <ModalBody display="flex" flexDirection="row" p="20px 30px" gap="13px">
          <ModalInformartionIcon data-cy="modal-information-icon" />
          <Text
            data-cy="modal-information-title"
            fontSize="14px"
            fontWeight={500}
          >
            Activity berhasil dihapus
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalInformation;
