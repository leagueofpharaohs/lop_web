export function kFormatter(num: any) {
  return Math.abs(num) > 999 && Math.abs(num) < 1000000
    ? //@ts-ignore
      Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + " " + "k"
    : Math.abs(num) > 999999 && Math.abs(num) < 1000000000
    ? //@ts-ignore
      Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + " " + "M"
    : Math.abs(num) > 999999999 && Math.abs(num) < 1000000000000
    ? //@ts-ignore
      Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + " " + "B"
    : Math.abs(num) > 999999999999 && Math.abs(num) < 1000000000000000
    ? //@ts-ignore
      Math.sign(num) * (Math.abs(num) / 1000000000000).toFixed(1) + " " + "T"
    : //@ts-ignore
      Math.sign(num) * Math.abs(num).toFixed(3)
}
