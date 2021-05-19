import { filterTags, TrierPhotograph } from './index.js'
import { getData } from './getdata.js'

// permet de generer la page acceuil
function createHomePage () {
  getData().then(data => {
    const photographers = data.photographers
    filterTags(photographers)
    TrierPhotograph(photographers)
  })
};
createHomePage()
