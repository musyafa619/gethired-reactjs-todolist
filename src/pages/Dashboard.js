import React, { Fragment, Suspense, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../layout/Header";
import useSWR from "swr";
import ActivityService from "../services/activity";
import Loader from "../layout/Loader";

const DashboardHeader = React.lazy(() =>
  import("../components/Dashboard/Header")
);
const DashboardActivityList = React.lazy(() =>
  import("../components/Dashboard/ActivityList")
);
const DeleteAlert = React.lazy(() =>
  import("../components/Common/DeleteAlert")
);
const ModalInformation = React.lazy(() =>
  import("../components/Common/InformationModal")
);

function Dashboard() {
  const {
    isOpen: isOpenInformationActivity,
    onOpen: onOpenInformationActivity,
    onClose: onCloseInformationActivity,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteActivity,
    onOpen: onOpenDeleteActivity,
    onClose: onCloseDeleteActivity,
  } = useDisclosure();

  const [loading, setLoading] = useState({
    createActivity: false,
    deleteActivity: false,
  });

  const [selectedActivity, setSelectedActivity] = useState(null);

  const {
    data: activities,
    isValidating: loadingActivities,
    mutate: refetchActivities,
  } = useSWR(process.env.REACT_APP_BASE_EMAIL, ActivityService.getAll, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleCreateActivity = async () => {
    const data = {
      email: process.env.REACT_APP_BASE_EMAIL,
      title: "New Activity",
    };
    setLoading((prevState) => ({
      ...prevState,
      createActivity: true,
    }));
    try {
      await ActivityService.create(data);
      refetchActivities();
      setLoading((prevState) => ({
        ...prevState,
        createActivity: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        createActivity: false,
      }));
    }
  };

  const handleDeleteActivity = async () => {
    setLoading((prevState) => ({
      ...prevState,
      deleteActivity: true,
    }));
    try {
      await ActivityService.delete(selectedActivity?.id);
      refetchActivities();
      onCloseDeleteActivity();
      onOpenInformationActivity();
      setLoading((prevState) => ({
        ...prevState,
        deleteActivity: false,
      }));
    } catch (error) {
      setLoading((prevState) => ({
        ...prevState,
        createActivity: false,
      }));
    }
  };

  const handleConfirmDeleteActivity = (activity) => {
    setSelectedActivity(activity);
    onOpenDeleteActivity();
  };

  return (
    <Box
      bgColor={activities?.data?.data?.length < 1 ? "white" : "grey.200"}
      minH="100vh"
      pb="40px"
    >
      <Header />
      {loadingActivities ? (
        <Loader />
      ) : (
        <Fragment>
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardHeader
              handleCreateActivity={handleCreateActivity}
              loadingCreateActivity={loading.createActivity}
            />
            <DashboardActivityList
              activities={activities?.data?.data}
              loadingActivities={loadingActivities}
              handleConfirmDeleteActivity={handleConfirmDeleteActivity}
            />
            <ModalInformation
              type="Activity"
              isOpen={isOpenInformationActivity}
              onClose={onCloseInformationActivity}
            />
            <DeleteAlert
              loadingDeleteActivity={loading.deleteActivity}
              name={selectedActivity?.title}
              type="activity"
              isOpen={isOpenDeleteActivity}
              onClose={onCloseDeleteActivity}
              handleConfirm={handleDeleteActivity}
            />
          </Suspense>
        </Fragment>
      )}
    </Box>
  );
}

export default Dashboard;
