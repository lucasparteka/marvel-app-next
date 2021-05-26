import md5 from "crypto-js/md5"

export const generateMarvelHash = (ts: number, privateKey: string, publicKey: string): string => {
    return md5(ts + privateKey + publicKey).toString();
}