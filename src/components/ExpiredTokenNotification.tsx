import { useState, useEffect } from 'react';

const ExpiredTokenNotification = ({ expiryTime }: { expiryTime: string }) => {
  const [timeToExpire, setTimeToExpire] = useState("");

  useEffect(() => {
    const countDownDate = new Date(expiryTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeToExp = countDownDate - now;

      if (timeToExp < 0) {
        clearInterval(interval);
        setTimeToExpire("0s");
        return;
      }

      const minutes = Math.floor((timeToExp % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeToExp % (1000 * 60)) / 1000);

      setTimeToExpire(` ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [expiryTime]);

  return (
    <div className="absolute top-0 right-0 left-0 mx-auto w-1/2 bg-orange-200 h-[3.25rem] rounded-sm p-2 flex items-center justify-center">
      Token will expire in&nbsp;<span className='font-bold'>{timeToExpire}</span>. Logging out...
    </div>
  );
};

export default ExpiredTokenNotification;
