import { Vector } from "./vector.model"

export type Sprite={

    imagePointer:string
    dimension:Vector,
    size:Vector,
    position:Vector,
    frame:number,
    frameCount:number

}