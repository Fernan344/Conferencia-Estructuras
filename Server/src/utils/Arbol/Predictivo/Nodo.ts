export default class Nodo{
    private hijos: Nodo [];
    private padre: Nodo | undefined;
    private valor: any;

    constructor(valor: any) {
        this.valor = valor;
        this.hijos = [];
    }

    public getValor(): any {
        return this.valor;
    }

    public setValor(valor: any) {
        this.valor = valor;
    }

    public setHijos(hijos: Nodo[]) {
        this.hijos = hijos;
    }

    public setPadre(padre: Nodo) {
        this.padre = padre;
    }

    public getPadre(): Nodo | undefined {
        return this.padre;
    }

    public getHijos(): Nodo[] {
        return this.hijos;
    }
}