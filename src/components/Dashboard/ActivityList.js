import {
  Box,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Container,
  Text,
  Image,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { DeleteIcon } from "../../assets/icons";
import ActivityEmptyState from "../../assets/images/activity-empty-state.png";
import { useHistory } from "react-router-dom";
import Loader from "../../layout/Loader";
import { Fragment } from "react";

function DashboardActivityList({
  activities,
  loadingActivities,
  handleConfirmDeleteActivity,
}) {
  const history = useHistory();

  return (
    <Container maxW="container.lg">
      {loadingActivities ? (
        <Loader />
      ) : (
        <Fragment>
          {activities?.length < 1 && (
            <Box
              display="flex"
              justifyContent="center"
              data-cy="activity-empty-state"
            >
              <Image src={ActivityEmptyState} alt="activity-empty-state" />
            </Box>
          )}
          <Grid templateColumns="repeat(4, 1fr)" rowGap="26px" columnGap="20px">
            {activities?.map((activity, index) => (
              <GridItem>
                <Card
                  cursor="pointer"
                  bgColor="white"
                  height="234px"
                  width="235px"
                  borderRadius="12px"
                  boxShadow="0px 6px 10px rgba(0, 0, 0, 0.1)"
                  justifyContent="space-between"
                  onClick={() => history.push(`/activities/${activity?.id}`)}
                  data-cy={`activity-item`}
                >
                  <CardHeader pt="22px" py="27px">
                    <Heading data-cy="activity-item-title" size="md">
                      {activity?.title}
                    </Heading>
                  </CardHeader>
                  <CardFooter
                    py="27px"
                    pb="25px"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      data-cy="activity-item-date"
                      fontWeight={500}
                      fontSize="14px"
                      color="grey.100"
                    >
                      {dayjs(activity.created_at)
                        .locale("id")
                        .format("DD MMMM YYYY")}
                    </Text>
                    <DeleteIcon
                      cursor="pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleConfirmDeleteActivity(activity);
                      }}
                      data-cy="activity-item-delete-button"
                    />
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Fragment>
      )}
    </Container>
  );
}

export default DashboardActivityList;
