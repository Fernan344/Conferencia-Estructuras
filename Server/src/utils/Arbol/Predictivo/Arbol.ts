import Nodo from "./Nodo";
import lodash, { get } from "lodash";
import { CDigraph, CNode, CEdge} from '../../Graphviz'
import { toDot } from 'ts-graphviz';

export default class Arbol {
    private raiz: Nodo;
    private graphIndex: number;

    constructor() {  
        this.raiz = new Nodo(null);
        this.graphIndex = 0;
    }

    public getRaiz(): Nodo {
        return this.raiz;
    }

    public setRaiz(value: Nodo) {
        this.raiz = value;
    }

    public agregarDato(value: any): {success: boolean, message: string} {        
        const chars = lodash.get(value, 'value', '').split("");
        
        let actual = this.getRaiz()        

        for(let i=0; i<chars.length; i++){            
            let nodos: Nodo[] = actual.getHijos();
            const char = chars[i];
            if (nodos.length) {
                for(let j=0; j<nodos.length; j++) {
                    if(lodash.get(nodos[j].getValor(), "index") === char){
                        if(i===chars.length-1){
                            nodos[j].setValor({...nodos[j].getValor(), ...value})
                            return {success: true, message: 'Nodo Ingresado Correctamente'}
                        }      
                        actual = nodos[j]          
                        break;       
                    }else{
                        if(j===nodos.length-1){
                            actual.getHijos().push(new Nodo({index: char}))
                            actual = actual.getHijos()[0];
                        }
                    }
                };
            }else{
                actual.setHijos([new Nodo({index: char})])
                i--;
            }
        }
        return {success: false, message: 'Nodo No Ingresado'}
    }

    public getAllSince(padre: Nodo = this.raiz, results: any[]){
        const nodos = padre.getHijos()
        if(get(padre.getValor(), 'value')) results.push(padre.getValor())

        for(let i=0; i<nodos.length; i++){
            const nodo = nodos[i];            
            this.getAllSince(nodo, results)
        }
    }

    public getMatches(value:string){
        const chars = value.split("");
        
        let actual = this.getRaiz()        

        for(let i=0; i<chars.length; i++){
            let nodos: Nodo[] = actual.getHijos();
            const char = chars[i];           

            for(let j=0; j<nodos.length; j++) {
                if(lodash.get(nodos[j].getValor(), 'index') === char){
                    actual = nodos[j]
                    break;
                }else{
                    if(j===nodos.length-1){
                        return {results: []}
                    }
                }
            }         

            if(i===chars.length-1) break;  
        }

        const results:any[] = []
        this.getAllSince(actual, results)
        return(results)
    }

    public buildTree(padre: Nodo, nodoPadre: CNode, digraph: CDigraph){
        const nodos = padre.getHijos()
        for(let i=0; i<nodos.length; i++){
            const nodo = nodos[i];
            const node = new CNode(this.graphIndex++, lodash.get(nodo.getValor(), 'value', ''));
           
            digraph.addNode(node);
            const edge = new CEdge([nodoPadre, node], lodash.get(nodo.getValor(), 'index', ''));
            digraph.addEdge(edge);

            this.buildTree(nodo, node, digraph)
        }
    }

    public getTree(name: string){
        const digraph = new CDigraph(name);
        const actual = this.raiz;

        const node = new CNode(this.graphIndex++, lodash.get(actual.getValor(), 'value', 'raiz'));
        digraph.addNode(node);

        this.buildTree(actual, node, digraph);
        this.graphIndex = 0;
        return toDot(digraph)
    }

}