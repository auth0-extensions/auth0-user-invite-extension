import './ConfigurationStatus.css';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import connectContainer from 'redux-static';
import classNames from 'classnames';

export default connectContainer(class ConfigurationStatus extends Component {
  static propTypes = {
    configurationStatus: PropTypes.object.isRequired
  };

  static stateToProps = (state) => {
    return {
      configurationStatus: state.configurationStatus
    }
  }

  render() {
    const { error, status } = this.props.configurationStatus.toJS();

    if (error) {
      return (
        <div className="row">
          <div className="col-xs-12 wrapper">
            <div className="alert alert-danger">
              <strong>Error</strong> Unable to load configuration status - <i>{error}</i>
            </div>
          </div>
        </div>
      );
    }

    if (status && !status.hasData) {
      const buttonClasses = classNames({
        btn: true,
        'btn-sm': true,
        'btn-warning': true,
        'ConfigurationStatus-link': true,
        hidden: location.pathname === '/configuration'
      });

      return (
        <div className="row">
          <div className="col-xs-12 wrapper">
            <div className="alert alert-warning">
              <strong>Warning</strong> The extension still needs to be configured before it can enforce your authorization logic.
              <div className=" pull-right">
                <Link onClick={this.props.goToConfiguration} className={buttonClasses} to='/configuration'>
                  Go to Configuration
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
});
