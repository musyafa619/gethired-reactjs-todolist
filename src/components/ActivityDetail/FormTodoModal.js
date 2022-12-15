import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";
import { SelectDropdownIcon } from "../../assets/icons";
import { priorityIndicator } from "../../libs/priority-indicator";
import PriorityIndicator from "./PriorityIndicator";

function ActivityDetailFormTodoModal({
  isOpen,
  onClose,
  handleCreateTodo,
  formTodo,
  setFormTodo,
  loadingCreateTodo,
  loadingUpdateTodo,
  handleUpdateTodo,
  selectedTodo,
}) {
  const formatOptionLabel = ({ value, label, color }) => (
    <Box
      display="flex"
      alignItems="center"
      gap="19px"
      data-cy={`modal-add-priority-${value}`}
    >
      <PriorityIndicator color={color} />
      <Text>{label}</Text>
    </Box>
  );

  const DropdownIndicator = () => {
    return (
      <SelectDropdownIcon data-cy="modal-add-priority-dropdown" mx="10px" />
    );
  };

  const handleSave = () => {
    if (selectedTodo) {
      const data = {
        title: formTodo.title,
        priority: formTodo.priority.value,
        id: selectedTodo.id,
      };
      handleUpdateTodo(data);
      return;
    }
    handleCreateTodo();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered data-cy="modal-add">
      <ModalOverlay />
      <ModalContent maxW="830px">
        <ModalHeader data-cy="modal-add-title">
          {selectedTodo ? "Edit Item" : "Tambah List Item"}
        </ModalHeader>
        <ModalCloseButton data-cy="modal-add-close-button" />

        <ModalBody
          borderTop="1px solid #E5E5E5"
          borderBottom="1px solid #E5E5E5"
          p="38px 30px"
        >
          <FormLabel
            data-cy="modal-add-name-title"
            fontSize="12px"
            fontWeight={600}
          >
            NAMA LIST ITEM
          </FormLabel>
          <Input
            data-cy="modal-add-name-input"
            placeholder="Tambahkan nama list item"
            mb="26px"
            value={formTodo.title}
            onChange={(event) =>
              setFormTodo((prevState) => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />

          <FormLabel
            data-cy="modal-add-priority-title"
            fontSize="12px"
            fontWeight={600}
          >
            Priority
          </FormLabel>
          <Box w="30%">
            <Select
              onChange={(value) =>
                setFormTodo((prevState) => ({
                  ...prevState,
                  priority: value,
                }))
              }
              data-cy="modal-add-priority-dropdown"
              value={formTodo.priority}
              formatOptionLabel={formatOptionLabel}
              options={priorityIndicator}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            h="54px"
            w="150px"
            bgColor="primary"
            color="white"
            borderRadius="45px"
            fontSize="18px"
            fontWeight={600}
            data-cy="modal-add-save-button"
            disabled={formTodo.title.length < 1}
            _hover={{ bgColor: "primary" }}
            onClick={handleSave}
            isLoading={loadingCreateTodo || loadingUpdateTodo}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ActivityDetailFormTodoModal;
