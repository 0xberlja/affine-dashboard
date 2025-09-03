"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";

type Props = {
  text: string;
  uid?: string;
  index?: string;
  max?: number;
};

const ShortenText = ({ text, uid = "", index = "", max = 8 }: Props) => {
  if (text.length > max)
    return (
      <>
        <CopyToClipboard
          text={text}
          onCopy={() => {
            toast.success("Copied.");
          }}
        >
          <span data-tooltip-id={`${uid}-${index || text}`} className="cursor-pointer u-transition-color">
            {text.slice(0, max / 2)}...{text.slice(-max / 2)}
          </span>
        </CopyToClipboard>
        <Tooltip id={`${uid}-${index || text}`} className="">
          <div className="text-12 text-white/80">{text}</div>
        </Tooltip>
      </>
    );
  return <span>{text}</span>;
};

export default ShortenText;
