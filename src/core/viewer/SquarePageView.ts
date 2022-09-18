import { IViewer } from './../types';
import { Square } from './../Square';
import $ from 'jquery'
import PageConfig from './PageConfig';
/**
 * 模块的显示删除
 */
export class SquarePageViewer implements IViewer {
    constructor(private _square: Square, private _container: JQuery<HTMLElement>) {
    }
    private dom?: JQuery<HTMLElement>
    private isDelete:boolean=false
    show(): void {
        if(this.isDelete){
            return
        }
        if (!this.dom) {
            this.dom = $('<div>').css({
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                position: 'absolute',
                border: '1px solid blue',
                boxSizing: 'border-box'
            })
        }
        this.dom.css({
            left: this._square.point.x * PageConfig.SquareSize.width,
            top: this._square.point.y * PageConfig.SquareSize.height,
            backgroundColor: this._square.color
        }).appendTo(this._container)
    }
    hidden(): void {
        if(!this.isDelete&&this.dom){
            this.dom.remove()
            this.isDelete=true
        }

    }
}
