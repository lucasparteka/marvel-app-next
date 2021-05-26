import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router";
import { COLLECTION_TYPE } from "../../src/enums/enums";
import MarvelService from "../../src/services/MarvelService";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HeaderDetails from "../../src/components/HeaderDetails";
import ItemContent from "../../src/components/ItemContent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& h1': {
                textDecoration: 'underline',
                textDecorationColor: '#ec1d24',
                marginBottom: '5px'
            },
            background: "#fff",
            color: "black",
            minHeight: '100vh'
        }
    })
)

export default function Character({ character, comicsData, eventsData, seriesData }) {
    const { query } = useRouter();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HeaderDetails path={character.thumbnail.path} extension={character.thumbnail.extension} name={character.name} />
            <ItemContent currentItem={character} charactersData={null} comicsData={comicsData} creatorsData={null} eventsData={eventsData} seriesData={seriesData} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    let paths = [];

    try {
        let result = await MarvelService.fetchCollection(COLLECTION_TYPE.CHARACTERS, 0);
        if (!!result && !!result.data.results.length) {
            paths = result.data.results.map((item) => {
                return { params: { id: item.id.toString() } }
            })
        }
    } catch (error) { }

    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params;
    let result = await MarvelService.fetchById(COLLECTION_TYPE.CHARACTERS, id);
    let comicsResult = await MarvelService.fetchById(COLLECTION_TYPE.CHARACTERS, id, COLLECTION_TYPE.COMICS);
    let eventsResult = await MarvelService.fetchById(COLLECTION_TYPE.CHARACTERS, id, COLLECTION_TYPE.EVENTS);
    let seriesResult = await MarvelService.fetchById(COLLECTION_TYPE.CHARACTERS, id, COLLECTION_TYPE.SERIES);
    return {
        props: {
            character: result.data.results[0],
            comicsData: comicsResult,
            eventsData: eventsResult,
            seriesData: seriesResult
        }
    }
}