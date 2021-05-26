import { Container, Grid, } from "@material-ui/core";
import Card from "../../src/components/Card";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export default function ItemContent({ currentItem, charactersData, comicsData, creatorsData, eventsData, seriesData }) {
    const classes = useStyles();

    return (
        <div>
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>

                    {currentItem.description &&
                        <Grid item xs={12}>
                            <h1>DESCRIPTION</h1>
                            <span>{currentItem.description}</span>
                        </Grid>
                    }

                    {!!charactersData && <Grid item xs={12}>
                        {!!charactersData.data.results.length && <h1>CHARACTERS</h1>}
                    </Grid>}

                    {!!charactersData && charactersData.data.results.map((character) =>
                        <Grid xs={6} sm={3} md={2} key={character.thumbnail.path} item>
                            <Card id={character.id} path={character.thumbnail.path} extension={character.thumbnail.extension} name={character.name} />
                        </Grid>)}

                    {!!comicsData && <Grid item xs={12}>
                        {!!comicsData.data.results.length && <h1>COMICS</h1>}
                    </Grid>}

                    {!!comicsData && comicsData.data.results.map((comic) =>
                        <Grid xs={6} sm={3} md={2} key={comic.thumbnail.path} item>
                            <Card id={comic.id} path={comic.thumbnail.path} extension={comic.thumbnail.extension} name={comic.title} />
                        </Grid>)}

                    {!!creatorsData && <Grid item xs={12}>
                        {!!creatorsData.data.results.length && <h1>CREATORS</h1>}
                    </Grid>}

                    {!!creatorsData && creatorsData.data.results.map((creator) =>
                        <Grid xs={6} sm={3} md={2} key={creator.thumbnail.path} item>
                            <Card id={creator.id} path={creator.thumbnail.path} extension={creator.thumbnail.extension} name={creator.fullName} />
                        </Grid>)}

                    {!!eventsData && <Grid item xs={12}>
                        {!!eventsData.data.results.length && <h1>EVENTS</h1>}
                    </Grid>}

                    {!!eventsData && eventsData.data.results.map((event) =>
                        <Grid xs={6} sm={3} md={2} key={event.thumbnail.path} item>
                            <Card id={event.id} path={event.thumbnail.path} extension={event.thumbnail.extension} name={event.title} />
                        </Grid>)}

                    {!!seriesData && <Grid item xs={12}>
                        {!!seriesData.data.results.length && <h1>SERIES</h1>}
                    </Grid>}

                    {!!seriesData && seriesData.data.results.map((serie) =>
                        <Grid xs={6} sm={3} md={2} key={serie.thumbnail.path} item>
                            <Card id={serie.id} path={serie.thumbnail.path} extension={serie.thumbnail.extension} name={serie.title} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    )
}