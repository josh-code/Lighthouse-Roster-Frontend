import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import Roster from "./components/roster";
import Register from "./components/register";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import AssignAdmin from "./components/assignAdmin";
import AssignRoles from "./components/assignRoles";
import CreateRoster from "./components/createRoster";
import UpdateRoster from "./components/updateRoster";
import Unauthorized from "./components/unauthorized";
import UserDashboard from "./components/Userdashboard";
import AdminDashboard from "./components/adminDashboard";
import UpcomingSunday from "./components/upcomingSunday";
import UpdateRosterById from "./components/updateRosterById";
import ProtectedRoute from "./components/common/protectedRoute";
import AdminRoute from "./components/common/adminRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute path="/userDashboard" component={UserDashboard} />
            <AdminRoute
              path="/admin/roster/createRoster"
              component={CreateRoster}
            />
            <AdminRoute
              path="/admin/roster/updateRoster/:id"
              component={UpdateRosterById}
            />
            <Route path="/roster/:id" component={Roster} />
            <AdminRoute
              path="/admin/roster/updateRoster"
              component={UpdateRoster}
            />
            <AdminRoute path="/admin/user/assignRoles/:id" />
            <AdminRoute
              path="/admin/user/assignRoles"
              component={AssignRoles}
            />
            <AdminRoute
              path="/admin/user/assignAdmin"
              component={AssignAdmin}
            />
            <AdminRoute path="/admin" component={AdminDashboard} />
            <Route path="/Unauthorized" component={Unauthorized} />
            <Route path="/" exact component={UpcomingSunday} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
