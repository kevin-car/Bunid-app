import Affichage from './Affichage/affichage';
import React from 'react';
import Pagination from './Pagination/Pagination';
import "./pageMain.css"

class PageMain extends React.Component {

    state = {
        resultat : {
                items : [
                ]
        },

        recherche : "", 

        pageActuelle : 1, 
        postperpage : 10

    }
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

    handleChange = (e) => {
        this.setState({ recherche : e.target.value })
    }

    paginate = (pageActuelle) => {
        this.setState({pageActuelle : pageActuelle})
    }


    render(){
        const indexofLastPost = this.state.pageActuelle * this.state.postperpage

        const indexofFirstPost = indexofLastPost - this.state.postperpage

        const currentPosts = this.state.resultat.items.slice(indexofFirstPost, indexofLastPost)
       
        return(
                <>
                    <div className="d-flex  pl-5 pageMain justify-content-center">
                        <input className="justify-content-center me-sm-2" type="text" placeholder="Saisir votre recherche ici"  onChange={(e) => this.handleChange(e)}/>
                        <button className="btn btn-secondary my-2 my-sm-0"  onClick={this.research}>Search</button>
                    </div>
                    <div>
                        <Affichage
                            data = {currentPosts}
                            postsPerPage = {this.state.postperpage}
                            totalPosts = {this.state.resultat.items.length}
                        />
                        <Pagination
                            postsPerPage = {this.state.postperpage}
                            totalPosts = {this.state.resultat.items.length}
                            paginate = {this.paginate}
                        />
                    </div>
                    {
                        
                    }
                    {this.state.resultat.items.length >= 2 && <p className="text-danger pagination justify-content-center">Vous avez eu {this.state.resultat.items.length} resultats</p>}
                    {this.state.resultat.items.length == 1 && <p className="text-danger pagination justify-content-center">Vous avez eu {this.state.resultat.items.length} resultat</p>}
                    

                </>

        )


    }
}
export default PageMain