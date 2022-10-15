import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar"
import { search, getValue } from "../../Utils/Connector"
import Card from "../../Components/Card"
import './Index.css'

function Index() {
    const [searchValue, setSearchValue] = useState("")
    const [results, setResults] = useState([])
    const [cardInfo, setCardInfo] = useState(<></>)

    const findOption = (option) =>{
        getValue(option)
            .then((data) => {
                if(data.success === true){
                    setCardInfo(
                        <Card data = {{...data}}/>
                    )
                }
            })
    }

    useEffect(() => {  
        if(searchValue !== "")      
            search(searchValue)
                .then((data) => {
                    const newResults = data.length ? data.map(element => 
                        (
                            <div class="row">
                                <div class="column"><p>{element.value}</p></div>
                                <div class="column">
                                    <button type="button" class="btn btn-find btn-outline-warning" onClick={() => findOption(element.key)} style={{marginLeft: '25px'}}>Buscar</button>
                                </div>
                            </div>
                        )
                    ): [];
                    setResults(newResults)
                })
        else setResults([])
    }, [searchValue]);

    return (
        <>
            <NavBar searchState = {setSearchValue}/>
            <h1>BIENVENIDO!!!!</h1>   
            <div class="find-results" style={{justifyContent: 'center'}}>
                {results} 
            </div>            
            <div class="card-info">
                {cardInfo}
            </div>
        </>
    );
}

export default Index;
