export default class Nodo{
    private hijoIzquierdo: Nodo | undefined;
    private hijoDerecho: Nodo | undefined;
    private padre: Nodo | undefined;
    private valor: any;

    constructor(valor: any) {
        this.valor = valor;
    }

    public getValor(): any {
        return this.valor;
    }

    public setHijoDerecho(hijoDerecho: Nodo) {
        this.hijoDerecho = hijoDerecho;
    }

    public setHijoIzquierdo(hijoIzquierdo: Nodo) {
        this.hijoIzquierdo = hijoIzquierdo;
    }

    public setPadre(padre: Nodo) {
        this.padre = padre;
    }

    public getPadre(): Nodo | undefined {
        return this.padre;
    }

    public getHijoIzquierdo(): Nodo  | undefined {
        return this.hijoIzquierdo;
    }

    public getHijoDerecho(): Nodo  | undefined {
        return this.hijoDerecho;
    }
}