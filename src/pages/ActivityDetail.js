import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import ActivityDetailHeader from "../components/ActivityDetail/Header";
import ActivityDetailTodoList from "../components/ActivityDetail/TodoList";
import useSWR from "swr";
import TodoService from "../services/todo";
import { useParams } from "react-router-dom";
import ActivityService from "../services/activity";
import { priorityIndicator } from "../libs/priority-indicator";

const ActivityDetailFormTodoModal = React.lazy(() =>
  import("../components/ActivityDetail/FormTodoModal")
);
const DeleteAlert = React.lazy(() =>
  import("../components/Common/DeleteAlert")
);

const initialForm = {
  title: "",
  priority: {
    label: "Very High",
    color: "#ED4C5C",
    value: "very-high",
  },
};

function ActivityDetail() {
  const { activity_group_id } = useParams();
  const [formTodo, setFormTodo] = useState(initialForm);
  const [sortBy, setSortBy] = useState("sort-latest");
  const {
    isOpen: isOpenFormTodo,
    onOpen: onOpenFormTodo,
    onClose: onCloseFormTodo,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteTodo,
    onOpen: onOpenDeleteTodo,
    onClose: onCloseDeleteTodo,
  } = useDisclosure();

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState({
    updateActivity: false,
    createTodo: false,
    deleteTodo: false,
    updateTodo: false,
  });
  const [defaultTodos, setDefaultTodo] = useState([]);

  const {
    data: activity,
    isValidating: loadingActivity,
    mutate: refetchActivity,
  } = useSWR(activity_group_id, ActivityService.getOne, {
    onSuccess: (res) => {
      setDefaultTodo(res.data.todo_items);
      setSortBy("sort-latest");
    },
  });

  const handleUpdateActivity = async (value) => {
    const data = {
      title: value,
    };
    setLoading((prevState) => ({
      ...prevState,
      updateActivity: true,
    }));
    try {
      await ActivityService.update(activity_group_id, data);
      setLoading((prevState) => ({
        ...prevState,
        updateActivity: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        updateActivity: false,
      }));
    }
  };

  const handleCreateTodo = async () => {
    const data = {
      title: formTodo.title,
      priority: formTodo.priority.value,
      activity_group_id,
    };
    setLoading((prevState) => ({
      ...prevState,
      createTodo: true,
    }));
    try {
      await TodoService.create(data);
      refetchActivity();
      setFormTodo(initialForm);
      onCloseFormTodo();
      setLoading((prevState) => ({
        ...prevState,
        createTodo: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        createTodo: false,
      }));
    }
  };

  const handleUpdateTodo = async (data) => {
    let id = data.id;
    delete data.id;
    setLoading((prevState) => ({
      ...prevState,
      updateTodo: true,
    }));
    if (data.hasOwnProperty("is_active")) {
      const todoIndex = activity.data.todo_items.findIndex(
        (item) => item.id === id
      );
      let newActivity = activity;
      newActivity.data.todo_items[todoIndex].is_active = data.is_active;
      refetchActivity({ ...activity, ...newActivity }, false);
    }
    try {
      await TodoService.update(id, data);
      console.log("icikiwri", data.hasOwnProperty("is_active"));
      if (!data.hasOwnProperty("is_active")) {
        refetchActivity();
      }

      setFormTodo(initialForm);
      onCloseFormTodo();
      setLoading((prevState) => ({
        ...prevState,
        updateTodo: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        updateTodo: false,
      }));
    }
  };

  const handleOpenCreateTodo = () => {
    setFormTodo(initialForm);
    onOpenFormTodo();
  };

  const handleOpenUpdateTodo = (todo) => {
    const priority = priorityIndicator.find(
      (item) => item.value === todo.priority
    );
    setSelectedTodo(todo);
    setFormTodo({
      title: todo.title,
      priority,
    });
    onOpenFormTodo();
  };

  const handleConfirmDeleteTodo = (todo) => {
    setSelectedTodo(todo);
    onOpenDeleteTodo();
  };

  const handleDeleteTodo = async () => {
    setLoading((prevState) => ({
      ...prevState,
      deleteTodo: true,
    }));
    try {
      await TodoService.delete(selectedTodo?.id);
      refetchActivity();
      onCloseDeleteTodo();
      setLoading((prevState) => ({
        ...prevState,
        deleteTodo: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        deleteTodo: false,
      }));
    }
  };

  const sortAlphabetAscending = (a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  };

  const sortAlphabetDescending = (a, b) => {
    if (a.title < b.title) {
      return 1;
    } else if (a.title > b.title) {
      return -1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (defaultTodos.length > 0) {
      if (sortBy === "sort-latest") {
        console.log("sort-latest", defaultTodos);

        const newTodoItems = [...defaultTodos].sort((a, b) => b.id - a.id);
        refetchActivity(
          {
            ...activity,
            data: {
              ...activity.data,
              todo_items: newTodoItems,
            },
          },
          false
        );
      }
      if (sortBy === "sort-oldest") {
        console.log("sort-oldest", defaultTodos);
        const newTodoItems = [...defaultTodos].sort((a, b) => a.id - b.id);
        refetchActivity(
          {
            ...activity,
            data: {
              ...activity.data,
              todo_items: newTodoItems,
            },
          },
          false
        );
      }
      if (sortBy === "sort-az") {
        const newTodoItems = [...defaultTodos].sort(sortAlphabetAscending);
        refetchActivity(
          {
            ...activity,
            data: {
              ...activity.data,
              todo_items: newTodoItems,
            },
          },
          false
        );
      }
      if (sortBy === "sort-za") {
        const newTodoItems = [...defaultTodos].sort(sortAlphabetDescending);
        refetchActivity(
          {
            ...activity,
            data: {
              ...activity.data,
              todo_items: newTodoItems,
            },
          },
          false
        );
      }
      if (sortBy === "sort-unfinished") {
        const newTodoItems = [...defaultTodos].sort(
          (a, b) => b.is_active - a.is_active
        );
        refetchActivity(
          {
            ...activity,
            data: {
              ...activity.data,
              todo_items: newTodoItems,
            },
          },
          false
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, defaultTodos.length]);

  return (
    <Box bgColor="grey.200" minH="100vh" pb="40px">
      <Header />
      {loadingActivity ? (
        <Loader />
      ) : (
        <Fragment>
          <ActivityDetailHeader
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleOpenCreateTodo={handleOpenCreateTodo}
            detailActivity={activity?.data}
            handleUpdateActivity={handleUpdateActivity}
          />
          <ActivityDetailTodoList
            handleConfirmDeleteTodo={handleConfirmDeleteTodo}
            todos={[...activity?.data?.todo_items]}
            handleOpenUpdateTodo={handleOpenUpdateTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <ActivityDetailFormTodoModal
              isOpen={isOpenFormTodo}
              onClose={onCloseFormTodo}
              handleCreateTodo={handleCreateTodo}
              handleUpdateTodo={handleUpdateTodo}
              selectedTodo={selectedTodo}
              formTodo={formTodo}
              setFormTodo={setFormTodo}
              loadingCreateTodo={loading.createTodo}
              loadingUpdateTodo={loading.createTodo}
            />
            <DeleteAlert
              loadingDeleteActivity={loading.deleteTodo}
              name={selectedTodo?.title}
              type="List Item"
              isOpen={isOpenDeleteTodo}
              onClose={onCloseDeleteTodo}
              handleConfirm={handleDeleteTodo}
            />
          </Suspense>
        </Fragment>
      )}
    </Box>
  );
}

export default ActivityDetail;
