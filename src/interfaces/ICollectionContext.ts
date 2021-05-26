export interface ICollectionContext {
    collectionList: Object;
    getCollectionList: (collectionType: string) => Promise<void>;
    setCollection: (collectionType: string, values:Object[]) => void;
}