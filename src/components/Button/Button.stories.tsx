import React from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
};

export const Default = () => (
  <div>
    <Button onClick={() => console.log('Button clicked')}>Default</Button>
    <Button primary onClick={() => console.log('Button clicked')}>
      Primary
    </Button>
    <Button disabled primary>
      Disabled
    </Button>
  </div>
);

export const Link = () => (
  <span>
    This is an{' '}
    <Button link onClick={() => console.log('Button clicked')}>
      inline link
    </Button>{' '}
    button.
  </span>
);
