/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import PropTypes from 'prop-types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import DragndropContext, { type Context } from './DragndropContext'
import Icon from '../Icon/Icon';

export type Props = {
  className?: string,
  disabled: boolean,
  children: Node,
  name: string
};

type State = Context;

class DragOverlay extends PureComponent<Props, State> {
  leaveCounter: number;

  static defaultProps = {
    name: 'DragOverlay',
    disabled: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      name: props.name,
      dragging: false,
      disabled: props.disabled
    };

    this.leaveCounter = 0;
  }

  static getDerivedStateFromProps(props: Props, prevState: State): State {
    return {
      ...prevState,
      name: props.name,
      disabled: props.disabled
    }
  }

  handleDrop = (event: DragEvent): void => {
    console.log('DragOverlay handleDrop', this.props, this.state);
    event.preventDefault();
    this.leaveCounter = 0;
    this.setState({ dragging: false });
  };

  handleDragEnter = (event: DragEvent): void => {
    console.log('DragOverlay handleDragEnter', this.props, this.state)
    event.preventDefault();
    this.leaveCounter++;
    this.setState({ dragging: true });
  };

  handleDragLeave = (): void => {
    console.log('DragOverlay handleDragLeave', this.props, this.state)
    this.leaveCounter--;
    if (this.leaveCounter === 0) {
      this.setState(({ dragging: false }));
    }
  };

  handleDragOver = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    // Makes it possible to drag files from chrome's download bar
    // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
    try {
      if (event.dataTransfer) {
        const { effectAllowed } = event.dataTransfer;
        switch (effectAllowed) {
          case 'move':
          case 'linkMove':
            event.dataTransfer.dropEffect = 'move';
            break;

          default:
            event.dataTransfer.dropEffect = 'copy';
            break;
        }
      }
    } catch (e) {
      // do nothing
    }
  };


  render() {
    console.log('DragOverlay render', this.props, this.state);

    return (
      <DragndropContext.Provider value={this.state}>
        <section
          className={this.props.className}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          {this.props.children}
        </section>
      </DragndropContext.Provider>
    );
  }
}

export default DragOverlay;
