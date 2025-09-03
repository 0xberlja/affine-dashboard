export const capitalizedString = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const intToIPv4 = (ipInt: number) => {
  return [(ipInt >> 24) & 255, (ipInt >> 16) & 255, (ipInt >> 8) & 255, ipInt & 255].join(".");
};

export const IPv4ToInt = (ipStr) => {
  return ipStr.split(".").reduce((acc, octet) => (acc << 8) + Number(octet), 0);
};
