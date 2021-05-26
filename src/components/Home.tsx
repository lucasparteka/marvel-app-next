import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Grid, Tab, Tabs, Button, CircularProgress } from '@material-ui/core';
import { tabsStyles, tabItemStyles } from "../styles/tabStyle";
import MarvelService from "../services/MarvelService";
import { COLLECTION_TYPE } from "../enums/enums";
import { CollectionContext } from "../context/CollectionContext";
import {Autocomplete}  from '@material-ui/lab';
import Card from "./Card";
import SkeletonLoading from "./SkeletonLoading";

const useTabsStyles = makeStyles(tabsStyles);
const useTabItemStyles = makeStyles(createStyles(tabItemStyles));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      color: "#FFF",
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      letterSpacing: '-1px',
    },
    message: {
      background: '#ec1d24',
      lineHeight: '11vmin',
      marginBottom: '80px',
      letterSpacing: '-2px',
      fontSize: '12vmin',
      whiteSpace: 'nowrap'
    },
    input: {
      width: '100%'
    },
    wrapperItem: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: theme.spacing(1),
      '&:hover': {
        cursor: 'pointer'
      },
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
      '&:hover': {
        opacity: '.5',
      }
    },
    itemName: {
      whiteSpace: 'pre-line'
    },
    collectionSelected: {
      textDecoration: 'underline',
      textDecorationColor: '#ec1d24'
    },
    getMore: {
      textDecoration: 'underline',
      textDecorationColor: '#ec1d24',
      cursor: 'pointer'
    },
    imgFilter: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '20px'
    },
    wrapperItemFilter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    discovery: {
      whiteSpace: 'pre-line'
    },
    wrapperItemList: {
      cursor: 'pointer'
    },
    loadMore: {
      textAlign: 'center',
      marginTop: theme.spacing(3),
      position: 'relative',

    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
      color: '#ec1d24'
    },
  }),
);

export default function Home({ characters }) {
  const classes = useStyles();
  const router = useRouter();
  const { setCollection, collectionList, getCollectionList } = useContext(CollectionContext);
  const [tabIndex, setTabIndex] = useState<string>(COLLECTION_TYPE.CHARACTERS);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingGetMore, setLoadingGetMore] = useState(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterList, setFilterList] = useState<Object[]>([]);

  useEffect(() => {
    if (collectionList[tabIndex].values.length === 0) {
      setCollection(COLLECTION_TYPE.CHARACTERS, characters.data.results)
    }
  }, [])

  const handleCollectionChange = async (collectionType: string) => {
    try {
      setLoadingGetMore(true);
      setFilterList([]);
      setFilterValue("");
      setTabIndex(collectionType);

      if (!collectionList[collectionType].values.length) {
        await getCollectionList(collectionType);
      }
    } catch (error) {

    } finally {
      setLoadingGetMore(false);
    }
  }

  const handleFetchPaginatedCollection = async () => {
    try {
      setLoadingButton(true);
      setLoadingGetMore(true);
      await getCollectionList(tabIndex)
    } catch (error) {

    } finally {
      setLoadingButton(false);
      setLoadingGetMore(false);
    }
  }

  const handleFilter = async (value: string) => {
    setFilterValue(value);

    if (value.length >= 3) {
      let result = await MarvelService.fetchByName(tabIndex, value);

      if (result && result.data.results.length) {
        setFilterList(result.data.results);
      }
    }
  }

  const defaultProps = {
    options: filterList,
    getOptionLabel: (item: any) => item.name || item.title || item.fullName,
  };

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <h1 className={classes.message}>MARVEL'S FAN?</h1>
        <Autocomplete
          color="secondary"
          noOptionsText={filterValue.length < 3 ? "Type 3 or more" : "No results found"}
          className={classes.input}
          {...defaultProps}
          id="include-input-in-list"
          includeInputInList
          onChange={(e, item) => router.push(`/${tabIndex}/${item.id}`)}
          renderOption={(option: any) => (
            <div className={classes.wrapperItemFilter}>
              <img className={classes.imgFilter} src={option.thumbnail.path + "." + option.thumbnail.extension}></img>
              <p>{option.name || option.title || option.fullName}</p>
            </div>
          )}
          renderInput={(params) => (
            <TextField
              color="secondary"
              onChange={(e) => handleFilter(e.target.value)}
              placeholder={`SEARCH ${tabIndex.toUpperCase()}`}
              {...params}
            />
          )}
        />
        <br />
        <div>
          <Tabs classes={useTabsStyles()} value={tabIndex} onChange={(e, index) => handleCollectionChange(index)}
          >
            <Tab classes={useTabItemStyles()} value={COLLECTION_TYPE.CHARACTERS} label={'CHARACTERS'} />
            <Tab classes={useTabItemStyles()} value={COLLECTION_TYPE.COMICS} label={'COMICS'} />
            <Tab classes={useTabItemStyles()} value={COLLECTION_TYPE.CREATORS} label={'CREATORS'} />
            <Tab classes={useTabItemStyles()} value={COLLECTION_TYPE.EVENTS} label={'EVENTS'} />
            <Tab classes={useTabItemStyles()} value={COLLECTION_TYPE.SERIES} label={'SERIES'} />
          </Tabs>
        </div>
        <br />
        <h1 className={classes.discovery}>OR DISCOVERY ALL <span className={classes.collectionSelected}>{tabIndex.toUpperCase()}</span></h1>
        <Grid container justify="center" spacing={2}>
          {collectionList[tabIndex].values.map((item) =>
            <Grid xs={6} sm={3} md={2} key={item.id} item>
              <div onClick={() => router.push(`/${tabIndex}/${item.id}`)} className={classes.wrapperItemList}>
                <Card id={item.id} path={item.thumbnail.path} extension={item.thumbnail.extension} name={item.name || item.title || item.fullName} />
              </div>
            </Grid>
          )}
          <SkeletonLoading loading={loadingGetMore}/>
          <Grid item xs={12}>
            <div className={classes.loadMore}>
              <Button
                color="secondary"
                disabled={loadingButton}
                onClick={handleFetchPaginatedCollection}
              >
                <h2 className={classes.getMore}>GET MORE</h2>
              </Button>
              {loadingButton && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

          </Grid>
        </Grid>
      </Container>
    </>
  )
}