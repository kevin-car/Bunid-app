import React, { Component } from 'react';
import './modal.css'
import Dialog from '@mui/material/Dialog';
import noImage from "../../../image/noimage.svg.png"


const Modal = (props) => {
        return (
            <Dialog open={props.openModal} onClose={props.onClose} >
                <div className='fenetreModale pagination justify-content-center w-100 p-3'>
                    <div className="toast show w-50 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto"> <span className='text-primary'>{props.titre}</span> <br/> Auteur(e)(s) : 
                            {/* Affichage conditionnel s'il n'y a pas d'auteur, 1 auteur ou 2 auteurs  */}
                            {
                                props.auteur1 != "" && 
                                <div> {props.auteur1} </div>
                            }
                            {
                                props.auteur2 != "" && 
                                <div> {props.auteur2} </div>
                            }
                            </strong>
                            {/* Affichage du prix s'il est dispo, ou d'un message s'il n'est pas disponible à la vente*/}
                            {props.vendabilite ? <small className='text-primary'>{props.prix}€</small> : <small   className="text-info">Le produit n'est pas disponible</small> }
                            
                            <button type="button" className="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close" onClick={props.onClose} >
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                            

                        <div className="toast-body">
                            { props.photo != "" && <img src={props.photo}/>}
                            { props.photo == "" && <img src={noImage}/>}

                        </div>
                        <div className="toast-body">
                            {props.vendabilite ? <a href={props.lienAchat} target="_blank">Acheter ce livre</a>  : <p>Aucun lien disponible</p>}
                        </div>
                    </div>
                </div>
            </Dialog>
        );
}

export default Modal;

