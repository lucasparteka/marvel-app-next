import MarvelService from "../src/services/MarvelService";
import { COLLECTION_TYPE } from "../src/enums/enums";
import Home from "../src/components/Home";

export default function Index({ characters }) {
  return <Home characters={characters}/>
}

export const getStaticProps = async () => {
  let data = await MarvelService.fetchCollection(COLLECTION_TYPE.CHARACTERS, 0);
  return {
    props: {
      characters: data
    },
  }
}