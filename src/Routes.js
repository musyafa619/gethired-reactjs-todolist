import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ActivityDetail from "./pages/ActivityDetail";

function Routes() {
  return (
    <Switch>
      <Route exact path={"/"} component={Dashboard} />
      <Route
        exact
        path={"/activities/:activity_group_id"}
        component={ActivityDetail}
      />
    </Switch>
  );
}

export default Routes;
