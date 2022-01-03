import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePull from './SinglePull';

export default function Main() {
  const [allPulls, setAllPulls] = useState([]);

  useEffect(() => {
    // await axios
    //   .post('http://localhost:3001/repo')
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err));

    axios
      .get('http://localhost:3001/allPullRequests')
      .then((result) => setAllPulls(result.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(allPulls);
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
