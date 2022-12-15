import {
  Box,
  Card,
  Container,
  Text,
  Image,
  CardBody,
  Checkbox,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import TodoEmptyState from "../../assets/images/todo-empty-state.png";
import { priorityIndicator } from "../../libs/priority-indicator";
import PriorityIndicator from "./PriorityIndicator";

function ActivityDetailTodoList({
  todos,
  handleConfirmDeleteTodo,
  handleOpenUpdateTodo,
  handleUpdateTodo,
}) {
  const handleUpdateStatus = (id, value) => {
    const data = {
      is_active: value ? 0 : 1,
      id,
    };
    handleUpdateTodo(data);
  };
  return (
    <Container maxW="container.lg">
      {todos?.length < 1 && (
        <Box display="flex" justifyContent="center" data-cy="todo-empty-state">
          <Image src={TodoEmptyState} alt="todo-empty-state" />
        </Box>
      )}
      {todos?.map((todo, index) => {
        const priority = priorityIndicator?.find(
          (item) => item.value === todo.priority
        );
        return (
          <Card
            bgColor="white"
            width="100%"
            borderRadius="12px"
            boxShadow="0px 6px 10px rgba(0, 0, 0, 0.1)"
            justifyContent="space-between"
            data-cy={`todo-item-${index}`}
            mb="10px"
          >
            <CardBody
              display="flex"
              justifyContent="space-between"
              pt="22px"
              py="27px"
            >
              <Box display="flex" alignItems="center">
                <Checkbox
                  data-cy="todo-item-checkbox"
                  isChecked={todo.is_active === 0}
                  onChange={(event) =>
                    handleUpdateStatus(todo.id, event.target.checked)
                  }
                  colorScheme="checkbox"
                  mr="22px"
                  size="lg"
                />
                <PriorityIndicator color={priority?.color} />
                <Text
                  mx="16px"
                  fontSize="18px"
                  fontWeight={500}
                  data-cy="todo-item-title"
                  color={todo.is_active ? "black" : "grey.100"}
                  textDecoration={todo.is_active ? "none" : "line-through"}
                >
                  {todo.title}
                </Text>
                <EditIcon
                  cursor="pointer"
                  onClick={() => handleOpenUpdateTodo(todo)}
                  data-cy="todo-item-edit-button"
                />
              </Box>
              <DeleteIcon
                onClick={() => handleConfirmDeleteTodo(todo)}
                cursor="pointer"
                data-cy="todo-item-delete-button"
              />
            </CardBody>
          </Card>
        );
      })}
    </Container>
  );
}

export default ActivityDetailTodoList;
