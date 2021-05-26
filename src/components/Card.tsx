import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapperItem: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: theme.spacing(1),

        },
        imgWrapper: {
            height: '210px',
            margin: 0,
        },
        imgItem: {
            width: '100%',
            height: '100%',
            filter: 'blur(0)',
            WebkitFilter: 'blur(0)',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            marginBottom: theme.spacing(1),

        },
        itemName: {
            whiteSpace: 'pre-line'
        },
    }),
);

export default function Card({ id, path, extension, name }) {
    const classes = useStyles();
    let urlImage = path.includes("not_available") ? "/static/marvel.jpg" : path.concat(".").concat(extension);
    return (
        <Grid xs={12} key={id} item>
            <figure className={classes.imgWrapper}>
                <img className={classes.imgItem} src={urlImage}></img>
            </figure>
            <span className={classes.itemName}>{name}</span>
        </Grid>
    )
}