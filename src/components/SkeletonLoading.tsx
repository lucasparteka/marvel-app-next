import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
export default function SkeletonLoading({ loading }) {

    return (
        <>
            {loading && <Grid container justify="center" spacing={2}>
                <Grid xs={6} sm={3} md={2} key={1} item>
                    <Skeleton variant="rect" height={200} />
                </Grid>
                <Grid xs={6} sm={3} md={2} key={2} item>
                    <Skeleton variant="rect" height={200} />
                </Grid>
                <Grid xs={6} sm={3} md={2} key={3} item>
                    <Skeleton variant="rect" height={200} />
                </Grid>
                <Grid xs={6} sm={3} md={2} key={4} item>
                    <Skeleton variant="rect" height={220} />
                </Grid>
                <Grid xs={6} sm={3} md={2} key={5} item>
                    <Skeleton variant="rect" height={220} />
                </Grid>
                <Grid xs={6} sm={3} md={2} key={6} item>
                    <Skeleton variant="rect" height={220} />
                </Grid>
            </Grid>}
        </>
    )
}