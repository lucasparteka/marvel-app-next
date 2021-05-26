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

export default function Comic({ comic, charactersData, creatorsData, eventsData }) {
    const { query } = useRouter();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HeaderDetails path={comic.thumbnail.path} extension={comic.thumbnail.extension} name={comic.title} />
            <ItemContent currentItem={comic} charactersData={charactersData} comicsData={null} creatorsData={creatorsData} eventsData={eventsData} seriesData={null} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    let paths = [];

    try {
        let result = await MarvelService.fetchCollection(COLLECTION_TYPE.COMICS, 0);
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
    let result = await MarvelService.fetchById(COLLECTION_TYPE.COMICS, id);
    let charactersResult = await MarvelService.fetchById(COLLECTION_TYPE.COMICS, id, COLLECTION_TYPE.CHARACTERS);
    let creatorsResult = await MarvelService.fetchById(COLLECTION_TYPE.COMICS, id, COLLECTION_TYPE.CREATORS);
    let eventsResult = await MarvelService.fetchById(COLLECTION_TYPE.COMICS, id, COLLECTION_TYPE.EVENTS);
    return {
        props: {
            comic: result.data.results[0],
            charactersData: charactersResult,
            eventsData: eventsResult,
            creatorsData: creatorsResult
        }
    }
}