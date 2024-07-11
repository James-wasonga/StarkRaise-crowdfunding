import { BigNumber } from "bignumber.js";
import { shortString } from "starknet";


export function bigintToShortStr(bigintstr) {
    try {
      if (!bigintstr) return "";
      const bn = BigNumber(bigintstr);
      const hex_sentence = `0x` + bn.toString(16);
      return shortString.decodeShortString(hex_sentence);
    } catch (error) {
      return bigintstr;
    }
  }

  export function bigintToLongAddress(bigintstr) {
    try {
      if (!bigintstr) return "";
      const bn = BigNumber(bigintstr);
      const hex_sentence = `0x` + bn.toString(16);
      return hex_sentence;
    } catch (error) {
      return bigintstr;
    }
  }

//ancient code
  export const daysLeft = (deadline) => {
    const difference = new Date(Number(deadline)).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
  