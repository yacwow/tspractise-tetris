import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
    private _squares: readonly Square[];
    public get squares() {
        return this._squares
    }
    public get centerPoint(): Point {
        return this._centerPoint
    }
    public set centerPoint(val: Point) {
        this._centerPoint = val
        this._shape.map((item, i) => {
            // console.log(item,this._centerPoint)
            this._squares[i].point = {
                x: this._centerPoint.x + item.x,
                y: this._centerPoint.y + item.y
            }
        })
    }
    public get shape() {
        return this._shape;
    }
    constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
        const arr: Square[] = [];
        this._shape.map(item => {
            const sq = new Square({ x: this._centerPoint.x + item.x, y: this._centerPoint.y + item.y }, this._color)
            arr.push(sq);
        })
        this._squares = arr;
    }
    /**
     * 旋转方向是否为顺时针
     */
    protected isClock = true;
    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newP: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newP;
            })
        }
        else {
            return this._shape.map(p => {
                const newP: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newP;
            })
        }
    }
    
    rotate() {
        const newShape = this.afterRotateShape();
        this._shape = newShape;
        this._shape.map((item, i) => {
            // console.log(item,this._centerPoint)
            this._squares[i].point = {
                x: this._centerPoint.x + item.x,
                y: this._centerPoint.y + item.y
            }
        })
    }
}