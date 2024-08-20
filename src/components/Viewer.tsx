import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';

const Viewer: FC = () => {
  const { data } = useContext(DataContext);
  return (
    <pre>
      <code>
        users: {data?.users.length}
        <br />
        channels: {data?.channels.length}
        <br />
        data: {JSON.stringify(data, null, 2)}
      </code>
    </pre>
  );
};

export default Viewer;
