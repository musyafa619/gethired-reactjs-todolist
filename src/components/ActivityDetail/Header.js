import {
  Box,
  Heading,
  Button,
  Input,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  PlusIcon,
  BackIcon,
  SortIcon,
  EditIcon,
  SortLatestIcon,
  SortAZIcon,
  SortOldestIcon,
  SortUnfinishedIcon,
  SortZAIcon,
  ChecklistIcon,
} from "../../assets/icons";

const availableSort = [
  {
    title: "Terbaru",
    icon: <SortLatestIcon />,
    value: "sort-latest",
  },
  {
    title: "Terlama",
    icon: <SortOldestIcon />,
    value: "sort-oldest",
  },
  {
    title: "A-Z",
    icon: <SortAZIcon />,
    value: "sort-az",
  },
  {
    title: "Z-A",
    icon: <SortZAIcon />,
    value: "sort-za",
  },
  {
    title: "Belum Selesai",
    icon: <SortUnfinishedIcon />,
    value: "sort-unfinished",
  },
];

function ActivityDetailHeader({
  detailActivity,
  handleOpenCreateTodo,
  handleUpdateActivity,
  sortBy,
  setSortBy,
}) {
  const history = useHistory();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState(detailActivity.title);
  const handleOnBlurInputTitle = (event) => {
    setIsEditTitle(false);
    handleUpdateActivity(event.target.value);
  };
  return (
    <Box w="100%" color="black" pt="154px" pb="59px">
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxW="container.lg"
      >
        <Box display="flex" alignItems="center">
          <BackIcon
            cursor="pointer"
            data-cy="todo-back-button"
            onClick={() => history.push("/")}
          />
          {isEditTitle ? (
            <Input
              autoFocus
              defaultValue={title}
              fontWeight={700}
              fontSize="36px"
              ml="19px"
              mr="23px"
              variant="flushed"
              placeholder="Activity Title"
              onChange={(event) => setTitle(event.target.value)}
              onBlur={handleOnBlurInputTitle}
            />
          ) : (
            <Heading
              ml="19px"
              mr="23px"
              fontSize="36px"
              color="black"
              fontWeight={700}
              data-cy="todo-title"
              onClick={() => setIsEditTitle(true)}
            >
              {title}
            </Heading>
          )}

          <EditIcon
            cursor="pointer"
            onClick={() => setIsEditTitle(!isEditTitle)}
            data-cy="todo-title-edit-button"
          />
        </Box>
        <Box display="flex" alignItems="center" gap="18px">
          <Menu autoSelect={false}>
            <MenuButton data-cy="todo-sort-button">
              <SortIcon />
            </MenuButton>

            <MenuList overflow="hidden" p={0} borderRadius="6px">
              {availableSort?.map((item, index) => (
                <Fragment key={item.value}>
                  <MenuItem
                    onClick={() => setSortBy(item.value)}
                    data-cy={item.value}
                    h="52px"
                    icon={<Box data-cy="sort-selection-icon">{item.icon}</Box>}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Text>{item.title}</Text>
                      {sortBy === item.value && <ChecklistIcon />}
                    </Box>
                  </MenuItem>
                  {index !== availableSort.length - 1 && <MenuDivider m={0} />}
                </Fragment>
              ))}
            </MenuList>
          </Menu>

          <Button
            h="54px"
            w="159px"
            bgColor="primary"
            color="white"
            borderRadius="45px"
            fontSize="18px"
            fontWeight={600}
            data-cy="todo-add-button"
            leftIcon={<PlusIcon />}
            _hover={{ bgColor: "primary" }}
            onClick={handleOpenCreateTodo}
          >
            Tambah
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ActivityDetailHeader;
