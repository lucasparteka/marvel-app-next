import axios from './index';
import {generateMarvelHash} from "../utils/HashGenerator";
import {PARAM_COLLECTION} from "../enums/enums";

class MarvelService {

    static async fetchCollection(collectionType: string, offset: number) {
        try {
            let ts = Date.now();
            let hash = generateMarvelHash(ts, process.env.privateKey, process.env.publicKey);
            const response = await axios.get("/" + collectionType, {
                params: {
                    limit: 12,
                    offset: offset,
                    ts: ts,
                    apikey: process.env.publicKey,
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
            let hash = generateMarvelHash(ts, process.env.privateKey, process.env.publicKey);
            let buildParams = {
                ts: ts,
                apikey: process.env.publicKey,
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
            let hash = generateMarvelHash(ts, process.env.privateKey, process.env.publicKey);
            let url = this.buildURL(collectionType, id, subList);
            const response = await axios.get(url, {
                params: {
                    ts: ts,
                    apikey: process.env.publicKey,
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