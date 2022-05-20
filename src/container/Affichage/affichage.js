import React from 'react';
import Modal from './Modal/modal';
import "./affichage.css"

class Affichage extends React.Component {

    state = {
        displayThisModal : false,
        
        titre : "titre du livre", 
        auteur1 : "", 
        auteur2 : "", 
        photo : "", 
        lienAchat : "", 
        vendabilite : null,
        prix : 0
    }

    displayModal = (lien) => {
        fetch(lien)
        .then(result => { return result.json()})
        .then(data => {
            console.log(data)
            this.setState({titre : data.volumeInfo.title})
            if(data.volumeInfo.authors != undefined  ){
                this.setState({auteur1 : data.volumeInfo.authors[0]})
            }
            if(data.volumeInfo.authors != undefined){
                this.setState({auteur2 : data.volumeInfo.authors[1]})
            }
            if(data.saleInfo.saleability == "FOR_SALE"){
                this.setState({vendabilite : true})
            }else{
                this.setState({vendabilite : false})
            }

            if(data.saleInfo.saleability == "FOR_SALE"){
                this.setState({prix : data.saleInfo.retailPrice.amount})
            }

            if(data.saleInfo.saleability == "FOR_SALE"){
                this.setState({lienAchat : data.saleInfo.buyLink})
            }

            if(data.volumeInfo.imageLinks.smallThumbnail){
                this.setState({photo : data.volumeInfo.imageLinks.smallThumbnail})
            }

            this.setState({displayThisModal : true})
            console.log( this.state.prix)
        })
        
    }
    
    fermerModal = () => {
        this.setState({ displayThisModal : false })
    }

    render(){
        console.log(this.state.titre)
        return(
        <div className='fenetreAffichage'>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col-5">Titre</th>
                    <th scope="col-5">Sous-Titre</th>
                    <th scope="col-2">Lien</th>
                    </tr>
                </thead>
            <tbody>
            {this.props.data && this.props.data.map((data, index)=>{
                let lien = data.selfLink
                return(
                    <tr key={index} className="table-danger">
                        <th scope="row col-5">{data.volumeInfo.title}</th>
                        <td scope="row col-5">{data.volumeInfo.subtitle}</td>
                        <td scope="row col-5"> 
                            <button class="btn btn-primary" onClick={ () => this.displayModal(lien)} >Détails</button> 
                        </td>
                    </tr>
                )
                })
            }

            </tbody>
            </table>
            { this.state.displayThisModal &&

                <Modal
                    titre = {this.state.titre} // ok
                    auteur1 = {this.state.auteur1} // ok 
                    auteur2 = {this.state.auteur2} // ok 
                    vendabilite = {this.state.vendabilite} // ok 
                    prix = {this.state.prix} // ok
                    photo = {this.state.photo}
                    lienAchat = {this.state.lienAchat} 
                    fermerModal = {this.fermerModal}
                />

            }
        </div>

        )

    }


    }

export default Affichage