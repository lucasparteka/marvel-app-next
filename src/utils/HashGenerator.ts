import md5 from "crypto-js/md5"

export const generateMarvelHash = (ts: number): string => {
    return md5(ts + `${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}` + `${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`).toString();
}