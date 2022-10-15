import { defaultImage } from "../Utils/Store";
function card(props){
    return(
        <div class="card mb-3">
            <div class="card-body">    
                <img src={props.data.message.image? props.data.message.image : defaultImage } class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{props.data.message.dato}</h5>
                    <p class="card-text">{props.data.message.descripcion}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    )
}

export default card;

