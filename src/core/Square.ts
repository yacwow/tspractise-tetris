import { IViewer, Point } from "./types";

export class Square{
    constructor(private _point:Point,private _color:string){
    }
    private _view?:IViewer;
    get point(){
        return this._point
    }
    set point(val){
        this._point=val
        this._view?.show()
    }
    get color(){
        return this._color
    }
    set color(val){
        this._color=val
    }
    get view(){
        return this._view
    }
    set view(val){
        this._view=val
        if(val){
            val.show()
        }
    }
}