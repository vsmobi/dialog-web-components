/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Context } from '../DragOverlay/DragndropContext';
import PropTypes from 'prop-types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import DragndropContext from '../DragOverlay/DragndropContext';
import styles from './DropZone.css';

export type Props = {
  className?: string,
  children: Node,
  onDrop?: (event: DragEvent, context: Context) => mixed
};

class DropZone extends PureComponent<Props> {
  handleDrop = (context: Context) => {
    return (event: DragEvent) => {
      console.log('DropZone handleDrop', { event, context });
      if (this.props.onDrop) {
        this.props.onDrop(event, context);
      }
    };
  };

  renderDropzone = (context: Context) => {
    const className = classNames(
      styles.container,
      {
        [styles.dragging]: context.dragging
      },
      this.props.className
    );

    return (
      <div className={className} onDrop={this.handleDrop(context)}>
        {this.props.children}
      </div>
    );
  };

  render() {
    console.log('DropZone render', this.props);

    return (
      <DragndropContext.Consumer>
        {this.renderDropzone}
      </DragndropContext.Consumer>
    );
  }
}

export default DropZone;
