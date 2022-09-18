import { SquareGroup } from './SquareGroup';

import { Shape, Point } from './types';
import { getRandom } from './util';

export class TShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],_centerPoint,_color)
    }
}
// export const TShape: Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }]

export class LShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],_centerPoint,_color)
    }
}
// export const LShape: Shape = [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }]

export class LMirrorShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],_centerPoint,_color)
    }
}
// export const LMirrorShape:Shape=[{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }]

export class SShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],_centerPoint,_color)
    }
    rotate(){
        super.rotate();
        this.isClock=!this.isClock
    }
}
// export const SShape:Shape=[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]

export class SMirrorShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],_centerPoint,_color)
    }
    rotate(){
        super.rotate();
        this.isClock=!this.isClock
    }
}
// export const SMirrorShape:Shape=[{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]

export class SquareShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],_centerPoint,_color)
    }
    afterRotateShape(){
        // console.log(this.shape)
        return this.shape
    }
}
// export const SquareShape:Shape=[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]

export class LineShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],_centerPoint,_color)
    }
    rotate(){
        super.rotate();
        this.isClock=!this.isClock
    }
}
// export const LineShape:Shape=[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]

export class UShape extends SquareGroup{
    constructor(_centerPoint:Point,_color:string){
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 1, y: -1 }],_centerPoint,_color)
    }
}
// export const UShape:Shape=[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 1, y: -1 }]

export const shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape,
    UShape
]

export const colors = [
    "red",
    "green",
    "blue",
    "orange"
]

/**
 * 生产各种不同的俄罗斯方块，颜色，形状
 * @param centerPoint 
 */
export function createTeris(centerPoint:Point){
    return new shapes[getRandom(0,shapes.length)](centerPoint,colors[getRandom(0,colors.length)])
}