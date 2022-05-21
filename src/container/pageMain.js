import Affichage from './Affichage/affichage';
import React from 'react';
import Pagination from './Pagination/Pagination';
import "./pageMain.css"

class PageMain extends React.Component {

    state = {
        resultat : {
                items : []
        },

        recherche : "", 

        pageActuelle : 1, 
        postperpage : 10

    }
    /* appel à lAPI et chargement du resultat en state */
    research = () => {
        const APIKEY = "AIzaSyDDtE4fd-Ypr1jeg_dynAy4XM9nFJi8-R4"

        if(this.state.recherche != ""){
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.recherche}&maxResults=40&key=AIzaSyDDtE4fd-Ypr1jeg_dynAy4XM9nFJi8-R4`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ resultat : data })                
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    /* ecoute la saisie de la barre de recherche */
    handleChange = (e) => {
        this.setState({ recherche : e.target.value })
    }
    /* Changement de la page vue */
    paginate = (pageActuelle,e) => {
        e.preventDefault();
        this.setState({pageActuelle : pageActuelle})
    }

    render(){
        const indexofLastPost = this.state.pageActuelle * this.state.postperpage

        const indexofFirstPost = indexofLastPost - this.state.postperpage

        const currentPosts = this.state.resultat.items.slice(indexofFirstPost, indexofLastPost)
       
        return(
                <>
                <h1 className='titrePrincipal text-center m-5 text-primary h1'> Recherche de livres </h1>
                    {/* Saisie pour la recherche recherche */}
                    <div className="d-flex  pl-5 pageMain justify-content-center">
                        <input className="justify-content-center me-sm-2" type="text" placeholder="Saisir votre recherche ici"  onChange={(e) => this.handleChange(e)}/>
                        <button className="btn btn-secondary my-2 my-sm-0"  onClick={this.research}>Search</button>
                    </div>
                    <div>
                    {/* Fenetre d'affuchage des livres */}
                        <Affichage
                            data = {currentPosts}
                            postsPerPage = {this.state.postperpage}
                            totalPosts = {this.state.resultat.items.length}
                        />
                        {/* Fenetre d'affichage de la barre des pages */}
                        <Pagination
                            postsPerPage = {this.state.postperpage}
                            totalPosts = {this.state.resultat.items.length}
                            paginate = {this.paginate}
                        />
                    </div>
                    {/* Affichage du nombre de résultats en bas de la pagination */}
                    {this.state.resultat.items.length >= 2 && <p className="text-danger pagination justify-content-center">Vous avez eu {this.state.resultat.items.length} resultats</p>}
                    {this.state.resultat.items.length == 1 && <p className="text-danger pagination justify-content-center">Vous avez eu {this.state.resultat.items.length} resultat</p>}
                </>
        )
    }
}
export default PageMain