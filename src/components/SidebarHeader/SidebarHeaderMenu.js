/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Trigger from '../Trigger/Trigger';
import Icon from '../Icon/Icon';
import styles from './SidebarHeader.css';

export type Props = {
  appName: string,
  logo: React.Element<any>,
  children?: React.Element<any>
};

class SidebarHeaderMenu extends PureComponent {
  props: Props;

  // $FlowFixMe: children are required, actually
  renderChildren = (): React.Element<any> => {
    return this.props.children;
  };

  renderLogo(): ?React.Element<any> {
    const { logo } = this.props;

    if (!logo) {
      return null;
    }

    return (
      <div className={styles.logo}>{logo}</div>
    );
  }

  renderTrigger = (handlers: Object, isActive: boolean): React.Element<any> => {
    const { appName } = this.props;

    return (
      <a className={styles.menu} {...handlers}>
        {this.renderLogo()}
        <div className={styles.appName}>{appName}</div>
        <Icon glyph={isActive ? 'arrow_drop_up' : 'arrow_drop_down'} className={styles.arrow} />
      </a>
    );
  };

  render(): React.Element<any> {
    const options = {
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together'
      }],
      targetOffset: '10px 24px'
    };

    return (
      <Trigger
        options={options}
        renderTrigger={this.renderTrigger}
        renderChild={this.renderChildren}
        openHandler={['onClick']}
        closeHandler={['onClick']}
        closeOnDocumentClick
        closeOnDocumentScroll
      />
    );
  }
}

export default SidebarHeaderMenu;