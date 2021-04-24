import { Button } from './Button';

export default {
  title: 'Button',
};

export const Normal = () => (
  <div>
    <Button onClick={logClick}>default</Button>
    <br />
    <br />
    <Button disabled onClick={logClick}>
      default disabled
    </Button>
    <br />
    <br />
    <Button primary onClick={logClick}>
      primary
    </Button>
    <br />
    <br />
    <Button primary disabled onClick={logClick}>
      primary disabled
    </Button>
  </div>
);

export const Link = () => (
  <span>
    This is an{' '}
    <Button link onClick={logClick}>
      inline link
    </Button>{' '}
    button.
  </span>
);

const logClick = (e) => console.log(e.target);
