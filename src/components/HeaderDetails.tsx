import { Container, Grid, } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapperBackground: {
            backgroundImage: `url('/static/marvel-background.jpg')`,
        },
        img: {
            marginTop: '30px',
            borderRadius: '50%',
            height: '200px',
            width: '100%',
            border: '6px solid white'
        },
        itemName: {
            textAlign: 'center',
            color: 'white',
            fontSize: '30px',
            marginTop: '0px'
        }
    })
)

export default function HeaderDetails({ path, extension, name }) {
    const classes = useStyles();
    let urlImage = path.includes("not_available") ? "/static/marvel.jpg" : path.concat(".").concat(extension);

    return (
        <div className={classes.wrapperBackground}>
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={6} sm={4} md={3}>
                        <img className={classes.img} src={urlImage}></img>
                        <h3 className={classes.itemName}>{name}</h3>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}