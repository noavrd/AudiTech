import { useEffect, useState } from 'react';

export default function SinglePull({ pull }) {
  console.log(pull);
  const [createdAgo, setCreatedAgo] = useState();
  const [time, setTime] = useState('');

  let userName = pull.user.slice(19);

  useEffect(() => {
    const current = new Date();
    const dateCurrent =
      current.getDate() +
      '/' +
      (current.getMonth() + 1) +
      '/' +
      current.getFullYear();

    const created = new Date(pull.createdAt);
    const dateCreated =
      created.getDate() +
      '/' +
      (created.getMonth() + 1) +
      '/' +
      created.getFullYear();
    console.log(dateCurrent);
    console.log(dateCreated);
    if (dateCreated === dateCurrent) {
      if (current.getHours() === created.getHours()) {
        if (current.getMinutes() === created.getMinutes()) {
          setCreatedAgo(current.getSeconds() - created.getSeconds());
          setTime('Second');
        } else {
          setCreatedAgo(current.getMinutes() - created.getMinutes());
          setTime('Minute');
        }
      } else {
        setCreatedAgo(current.getHours() - created.getHours());
        setTime('Hour');
      }
    } else {
      if (current.getFullYear() === created.getFullYear()) {
        if (current.getMonth() === created.getMonth()) {
          setCreatedAgo(current.getDate() - created.getDate());
          setTime('Day');
        } else {
          setCreatedAgo(current.getMonth() - created.getMonth());
          setTime('Month');
        }
      } else {
        setCreatedAgo(current.getFullYear() - created.getFullYear());
        setTime('Year');
      }
    }
  }, []);

  console.log(createdAgo);
  return (
    <div>
      <div>{pull.title}</div>
      <div>
        #{pull.number} created {createdAgo}{' '}
        {createdAgo === 1 ? time : time + 's'} ago by {userName}
      </div>
      {/* <div>{pull.title}</div>
      <div>{pull.title}</div>
      <div>{pull.title}</div> */}
    </div>
  );
}
