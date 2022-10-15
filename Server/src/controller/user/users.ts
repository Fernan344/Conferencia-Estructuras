import { Response, Request } from 'express';
import lodash, { get } from 'lodash';
import Predictivo from '../../utils/Arbol/Predictivo/Arbol';
import Binario from '../../utils/Arbol/Binario/Arbol'

const predictive = new Predictivo()
const binary = new Binario('key')

export const buildTree = (req: Request, res: Response): void => {   
    predictive.agregarDato({value: "Guatemala", key: 158})    
    predictive.agregarDato({value: "Sandia", key: 252})
    predictive.agregarDato({value: "Sindi", key: 111})
    predictive.agregarDato({value: "Sindy", key: 25})
    predictive.agregarDato({value: "Gutierrez", key: 12})
    predictive.agregarDato({value: "Manzanal", key: 177})
    predictive.agregarDato({value: "Estructuras", key: 586})  
    predictive.agregarDato({value: "Estructurales", key: 5})  
    
    binary.agregarDato({dato: "Guatemala", descripcion: "Pais de la eterna primavera", key: 158, image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg'})    
    binary.agregarDato({dato: "Guadalupe", descripcion: "Nombre propio femenino Guadalupe", key: 205})    
    binary.agregarDato({dato: "Guadalajara", descripcion: "Nombre de un lugar en mexico",  key: 408})    
    binary.agregarDato({dato: 'Guatemalteco', descripcion: "Nacionalidad del pais de Guatemala", key: 409})    
    binary.agregarDato({dato: 'Manzana', descripcion: "Fruta de color rojo", key: 518})    
    binary.agregarDato({dato: 'Sandia', descripcion: "Fruta grande de color verde", key: 252})    
    binary.agregarDato({dato: 'Sindi', descripcion: 'Nombre propio femenino sindi', key: 111})    
    binary.agregarDato({dato: 'Sindy', descripcion: 'Nombre propio femenino sindy', key: 25})    
    binary.agregarDato({dato: 'Gutierrez', descripcion: 'Apellido de nombre propio', key: 12})    
    binary.agregarDato({dato: 'Manzanal', descripcion: 'Nombre del arbol que da de fruto las manzanas', key: 177})    
    binary.agregarDato({dato: 'Estructuras', descripcion: 'Datos u objetos ordenados de formas especificas', key: 586})     
    binary.agregarDato({dato: 'Estructurales', descripcion: 'Que realiza un análisis o estudio de una cosa considerándola una estructura o un conjunto de estructuras susceptibles de formalización.', key: 5})
    
    console.log(predictive.getTree("Diagrama de prueba"))
    console.log(binary.getTree("Diagrama de prueba"))
    res.json({})
};

export const getMatchs = (req: Request, res: Response): void => {
    const value = lodash.get(req.params, 'value', '')

    const results = predictive.getMatches(value)
    res.json(results)
}

export const getValue = (req: Request, res: Response): void => {
    const value = lodash.get(req.params, 'value', '')

    const result = binary.getValue(value)
    if(get(result, 'success')===false) res.json(result).status(404).send()
    else res.json(result)
}