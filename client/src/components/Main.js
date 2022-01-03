import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePull from './SinglePull';

export default function Main() {
  const [allPulls, setAllPulls] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/allPullRequests')
      .then((result) =>
        setAllPulls(
          result.data.sort((a, b) =>
            a.number < b.number ? 1 : b.number < a.number ? -1 : 0
          )
        )
      )
      .catch((err) => console.log(err));

    // setAllPulls(
    //   allPulls.sort(function (a, b) {
    //     return a.number - b.number;
    //   })
    // );

    setFinished(true);
  }, []);

  return (
    <div>
      <h1>Pull Requests</h1>
      <div className="all-pulls">
        {allPulls.map((pull, i) => (
          <SinglePull pull={pull} key={i} number={i} />
        ))}
      </div>
    </div>
  );
}
