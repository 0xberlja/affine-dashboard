import useAppSelector from "@/hooks/global/useAppSelector";
import React, { useEffect, useState } from "react";
import { formattedTimeFromSeconds } from "@/utils/date.utils";

const Header = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000 * 60);

    return () => {
      clearInterval(id);
    };
  }, []); //eslint-disable

  const last_update = useAppSelector((state) => state.global.last_update);
  return (
    <header className="w-full p-24 flex items-center justify-between">
      <div className="text-16">Affine Dashboard</div>
      <div>Last Updated: {formattedTimeFromSeconds(Date.now() / 1000 - last_update, false)} ago</div>
    </header>
  );
};

export default Header;
