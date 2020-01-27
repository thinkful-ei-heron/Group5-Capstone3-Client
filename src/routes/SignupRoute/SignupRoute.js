import React from "react";
import Signup from "../../components/Signup/Signup";
import "./SignupRoute.css";

export default class SignupRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
<<<<<<< HEAD
    const { history } = this.props;
    history.push("/dashboard");
=======
    const { history } = this.props
    history.push('/settings')
>>>>>>> origin/kei-review
  };

  render() {
    return (
      <section className="registration marginTop">
        <h2>Sign up</h2>
        <p className="landingText">Sign up to save and manage your bookmarks</p>
        <Signup onRegistrationSuccess={this.handleRegistrationSuccess} />
      </section>
    );
  }
}
