import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Box,
} from "@chakra-ui/react";
import { ModalInformartionIcon } from "../../assets/icons";

function ModalInformation({ isOpen, onClose }) {
  return (
    <Box data-cy="modal-information">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxw="490px">
          <ModalBody
            display="flex"
            flexDirection="row"
            p="20px 30px"
            gap="13px"
          >
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
    </Box>
  );
}

export default ModalInformation;
