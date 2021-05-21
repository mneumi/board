import React from 'react';
import styled from 'styled-components';

interface PropsType {}

interface StateType {
  error: string | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<PropsType>,
  StateType
> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  render() {
    if (this.state.error) {
      return <ErrorWrapper>{this.state.error}</ErrorWrapper>;
    }

    return this.props.children;
  }
}

const ErrorWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 2rem;
  color: red;
`;
