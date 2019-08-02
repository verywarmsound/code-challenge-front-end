/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
  location: any,
  dispatch: Function
};

/**
 * Higher-order component (HOC)
 * Defines onEnter behaviour
 */
export default function onEnter(WrappedComponent: any, onEnterHandler: any) {
  class OnEnter extends Component<Props> {
    componentWillMount() {
      this.triggerOnEnter(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
      if (nextProps.location !== this.props.location) {
        this.triggerOnEnter(nextProps);
      }
    }

    triggerOnEnter(props: Props) {
      onEnterHandler(this.props.dispatch, props);
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  return connect()(withRouter(OnEnter));
}
