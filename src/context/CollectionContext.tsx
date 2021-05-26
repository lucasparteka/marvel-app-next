import { createContext, useState } from "react";
import { ICollectionContext } from "../interfaces/ICollectionContext";
import MarvelService from "../services/MarvelService";

const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext);

const CollectionProvider: React.FC = ({ children }) => {

    const initialValues = {
        characters: {
            offset: 0,
            values: []
        },
        comics: {
            offset: 0,
            values: []
        },
        creators: {
            offset: 0,
            values: []
        },
        events: {
            offset: 0,
            values: []
        },
        series: {
            offset: 0,
            values: []
        },
    }

    const [collectionList, setCollectionList] = useState<Object>(initialValues);

    const getCollectionList = async (collectionType: string) => {
        let result = await MarvelService.fetchCollection(collectionType, collectionList[collectionType].offset);
        setCollection(collectionType, result.data.results)  
    };

    const setCollection = async (collectionType: string, values: Object[]) => {
        setCollectionList((currentCollections) => (
            {...currentCollections, 
                [collectionType]: {
                    offset: calculateOffset(collectionType, values.length), 
                    values: [...currentCollections[collectionType].values, ...values]}}))
    };

    const calculateOffset = (collectionType: string, sizeIncrement: number) => {
        return collectionList[collectionType].offset + sizeIncrement;
    }

    return (
        <CollectionContext.Provider value={{ collectionList, getCollectionList, setCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};

export { CollectionContext, CollectionProvider };
