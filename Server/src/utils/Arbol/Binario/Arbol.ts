import Nodo from "./Nodo";
import lodash from "lodash";
import { CDigraph, CNode, CEdge} from '../../Graphviz'
import { toDot } from 'ts-graphviz';

export default class Arbol {
    private raiz: Nodo | undefined;
    private key: string;
    private graphIndex: number;

    constructor(key: string) {  
        this.key = key;
        this.graphIndex = 0;
    }

    public getKey(): string {
        return this.key;
    }

    public getRaiz(): Nodo | undefined {
        return this.raiz;
    }

    public setRaiz(value: Nodo) {
        this.raiz = value;
    }

    public agregarDato(value: any): {success: boolean, message: string} {
        if(!this.raiz){
            this.setRaiz(new Nodo(value))
            return {success: true, message: 'Dato ingrasado correctamente.'}
        }else{
            let actual = this.getRaiz()
            const valueKey = lodash.get(value, this.key).toString()
            while(actual){
                const actualKey = lodash.get(actual.getValor(), this.key).toString()                

                if(actualKey === valueKey){
                    return {success: false, message: 'La llave ya existe en el arbol.'}
                }else if(valueKey < actualKey){
                    if(!actual.getHijoIzquierdo()){
                        actual.setHijoIzquierdo(new Nodo(value))         
                        break;               
                    }
                    actual = actual.getHijoIzquierdo();
                }else if(valueKey > actualKey){
                    if(!actual.getHijoDerecho()){
                        actual.setHijoDerecho(new Nodo(value))
                        break;   
                    }
                    actual = actual.getHijoDerecho();
                }else{
                    return {success: false, message: 'Error al ingresar el dato.'}
                }
            }
            return {success: true, message: 'Nodo Ingresado Correctamente'}
        }
    }

    public getValue(key: any): any {
        if(!this.raiz){            
            return {success: false, message: 'Actualmente no existen datos.'}
        }else{
            let actual = this.getRaiz()
            const valueKey = key.toString()
            while(actual){
                const actualKey = lodash.get(actual.getValor(), this.key).toString()                

                if(actualKey === valueKey){
                    return {success: true, message: actual.getValor()}
                }else if(valueKey < actualKey){
                    actual = actual.getHijoIzquierdo();
                }else if(valueKey > actualKey){
                    actual = actual.getHijoDerecho();
                }else{
                    return {success: false, message: 'El dato no puede ser localizado'}
                }
            }
            return {success: false, message: 'Dato no encontrado'}
        }
    }

    public buildTree(padre: Nodo | undefined, cNodoPadre: CNode, digraph: CDigraph){
        if(padre){
            const derecho = padre.getHijoDerecho();
            const izquierdo = padre.getHijoIzquierdo();            
            
            if(izquierdo){
                const cNodoIzquierdo = new CNode(this.graphIndex++, lodash.get(izquierdo.getValor(), 'dato', ''))            
                digraph.addNode(cNodoIzquierdo);

                const edgeIzq = new CEdge([cNodoPadre, cNodoIzquierdo], lodash.get(izquierdo.getValor(), this.key, ''));
                digraph.addEdge(edgeIzq);

                this.buildTree(izquierdo, cNodoIzquierdo, digraph)
            }

            if(derecho){
                const cNodoDerecho = new CNode(this.graphIndex++, lodash.get(derecho.getValor(), 'dato', ''))            
                digraph.addNode(cNodoDerecho);

                const edgeDer = new CEdge([cNodoPadre, cNodoDerecho], lodash.get(derecho.getValor(), this.key, ''));
                digraph.addEdge(edgeDer);

                this.buildTree(derecho, cNodoDerecho, digraph)
            }
        }
    }

    public getTree(name: string){
        const digraph = new CDigraph(name);
        const actual = this.raiz;
        
        const cNodoPadre = new CNode(this.graphIndex++, lodash.get(actual?.getValor(), 'dato', ''))
        digraph.addNode(cNodoPadre);

        this.buildTree(actual, cNodoPadre, digraph);
        return toDot(digraph)
    }
}