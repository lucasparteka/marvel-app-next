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

export default function Event({ event, charactersData, comicsData, creatorData, seriesData }) {
    const { query } = useRouter();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HeaderDetails path={event.thumbnail.path} extension={event.thumbnail.extension} name={event.title} />
            <ItemContent currentItem={event} charactersData={charactersData} comicsData={comicsData} creatorsData={creatorData} eventsData={null} seriesData={seriesData} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    let paths = [];

    try {
        let result = await MarvelService.fetchCollection(COLLECTION_TYPE.EVENTS, 0);
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
    let result = await MarvelService.fetchById(COLLECTION_TYPE.EVENTS, id);
    let charactersResult = await MarvelService.fetchById(COLLECTION_TYPE.EVENTS, id, COLLECTION_TYPE.CHARACTERS);
    let creatorsResult = await MarvelService.fetchById(COLLECTION_TYPE.EVENTS, id, COLLECTION_TYPE.CREATORS);
    let comicsResult = await MarvelService.fetchById(COLLECTION_TYPE.EVENTS, id, COLLECTION_TYPE.COMICS);
    let seriesResult = await MarvelService.fetchById(COLLECTION_TYPE.EVENTS, id, COLLECTION_TYPE.SERIES);
    return {
        props: {
            event: result.data.results[0],
            charactersData: charactersResult,
            comicsData: comicsResult,
            creatorsData: creatorsResult,
            seriesData: seriesResult
        }
    }
}