"use client";
import React from "react";
import { formattedTimeFromSeconds, secondsToDate } from "@/utils/date.utils";
import { Tooltip } from "react-tooltip";

type Props = {
  timestamp: number;
  hint: string;
  isAgo?: boolean;
  isShort?: boolean;
};
const TimeStamp = ({ timestamp, hint, isAgo = true, isShort = false }: Props) => {
  return (
    <>
      <span data-tooltip-id={`${hint}`} className="cursor-pointer">
        {formattedTimeFromSeconds(Date.now() / 1000 - timestamp, isShort)} {isAgo ? "ago" : ""}
      </span>
      <Tooltip id={`${hint}`}>
        <div className="text-12 text-white/80">
          {secondsToDate(timestamp * 1000).date} {secondsToDate(timestamp * 1000).time}
        </div>
      </Tooltip>
    </>
  );
};

export default TimeStamp;
