export const COLLECTION_TYPE = Object.freeze({
    CHARACTERS: "characters",
    COMICS: "comics",
    CREATORS: "creators",
    EVENTS: "events",
    SERIES: "series",
})

export enum PARAM_COLLECTION {
    characters = "nameStartsWith",
    creators = "nameStartsWith",
    comics = "titleStartsWith",
    events = "nameStartsWith",
    series = "titleStartsWith",
}