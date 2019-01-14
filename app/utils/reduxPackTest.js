import { KEY } from 'redux-pack';

export function makePackAction(lifecycle, { type, payload, meta = {} }) {
  return {
    type,
    payload,
    meta: {
      ...meta,
      [KEY.LIFECYCLE]: lifecycle,
    },
  };
}
