/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { createContext } from 'react';

export type Context = {
  name: string,
  dragging: boolean,
  disabled: boolean
};

export default createContext({
  name: 'DropOverlay',
  dragging: false,
  disabled: false
});
