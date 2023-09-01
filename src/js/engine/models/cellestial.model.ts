import {Entity} from "../entity"
import {PhysicalBody} from "../physicalbody"
import {Sprite} from "../sprite"

export type Cellestial = {
    entity:Entity,
    body:PhysicalBody,
    sprite:Sprite
    markForRemoval:Boolean
}