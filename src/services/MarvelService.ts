import axios from './index';
import {generateMarvelHash} from "../utils/HashGenerator";
import {PARAM_COLLECTION} from "../enums/enums";

class MarvelService {

    static async fetchCollection(collectionType: string, offset: number) {
        try {
            let ts = Date.now();
            let hash = generateMarvelHash(ts);
            const response = await axios.get("/" + collectionType, {
                params: {
                    limit: 12,
                    offset: offset,
                    ts: ts,
                    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
                    hash: hash
                }
            })
            return response.data;
        } catch (error) {
            
        }
    }

    static async fetchByName(collectionType: string, value: string) {
        try {
            let ts = Date.now();
            let hash = generateMarvelHash(ts);
            let buildParams = {
                ts: ts,
                apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
                hash: hash
            }
            buildParams[PARAM_COLLECTION[collectionType]] = value;
            console.log(buildParams);
            const response = await axios.get("/" + collectionType, {
                params: buildParams
            })
            return response.data;
        } catch (error) {
            
        }
    }

    static async fetchById(collectionType: string, id: any, subList?: string) {
        try {
            let ts = Date.now();
            let hash = generateMarvelHash(ts);
            let url = this.buildURL(collectionType, id, subList);
            const response = await axios.get(url, {
                params: {
                    ts: ts,
                    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
                    hash: hash
                }
            })
            return response.data;
        } catch (error) {
            
        }
    }

    static buildURL(collectionType: string, id: string, subList?: string) {
        return "/" + collectionType + "/" + id + (!!subList ? "/" + subList : ""); 
    }
}

export default MarvelService;