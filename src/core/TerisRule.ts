import { SquareGroup } from './SquareGroup';
import GameConfig from './GameConfig';
import { Point, Shape, MoveDirection } from './types';
import { Square } from './Square';

/**
 * 判断ob是不是point
 */
function isPoint(obj: any): obj is Point {
    if (typeof obj.x === 'undefined') {
        return false;
    }
    return true;
}

export class TerisRule {
    /**
     * 判断某个形状的方块能否移动到某个位置
     */
    static canIMove(shape: Shape, targetPoint: Point,exists:Square[]): boolean {
        const targetShape: Shape = [];
        shape.map(it => {
            targetShape.push({ x: it.x + targetPoint.x, y: it.y + targetPoint.y })
        })
        let result = targetShape.some(it => {
            if (it.x < 0 || it.x > GameConfig.gameSize.width - 1 || it.y < 0 || it.y > GameConfig.gameSize.height - 1) {
                return true;
            }
            return false;
        })
        if (result) {
            return false;
        }
        result=targetShape.some(it=>exists.some(sq=>sq.point.x===it.x&&sq.point.y===it.y))
        if(result){
            return false;
        }
        return true;
    }

    /**
     * function reload
     * @param teris 
     * @param targetPoint 
     */
    static move(teris: SquareGroup, targetPoint: Point,exits:Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection,exits:Square[]): boolean;
    static move(teris: SquareGroup, targetPointOrMoveDirection: Point | MoveDirection,exits:Square[]) {
        if (isPoint(targetPointOrMoveDirection)) {
            if (this.canIMove(teris.shape, targetPointOrMoveDirection,exits)) {
                teris.centerPoint = targetPointOrMoveDirection
                return true;
            }
            return false;
        } else {
            let targetPoint: Point;
            if (targetPointOrMoveDirection === MoveDirection.down) {
                targetPoint = { x: teris.centerPoint.x, y: teris.centerPoint.y + 1 }
            } else if (targetPointOrMoveDirection === MoveDirection.left) {
                targetPoint = { x: teris.centerPoint.x - 1, y: teris.centerPoint.y }
            } else {
                targetPoint = { x: teris.centerPoint.x + 1, y: teris.centerPoint.y }
            }
            return this.move(teris, targetPoint,exits)
        }
    }

    /**
     * move directly to the end
     */
    static moveDirectly(teris: SquareGroup, target: MoveDirection,exits:Square[]) {
        // console.log(this.move(teris, target));
        while (this.move(teris, target,exits)) {}
    }
    /**
     * can rotate?
     */
    static rotate(teris:SquareGroup,exits:Square[]):boolean{
        const shape=teris.afterRotateShape();
        if(this.canIMove(shape,teris.centerPoint,exits)){
            teris.rotate();
            return true;
        }
        return false;
    }
    private static getLineSquares(exists:Square[],y:number){
        const res=exists.filter(it=>{
           if( it.point.y===y){
            return it;
           }
        })
        // console.log(res)
        return res
    }
    private static shouldDelete(exists:(Square|undefined)[]):boolean{
        if(typeof exists==='undefined'){
            return false;
        }
        if(exists.length===GameConfig.gameSize.width){
            return true;
        }
        return false;
    }
    static deleteSquares(exists:Square[]):number{
        let yRange=exists.map(it=>it.point.y);
        let yMin=Math.min(...yRange);
        let yMax=Math.max(...yRange);
        let count=0;
        for(let i=yMin;i<=yMax;i++){
            // console.log(i)
            if(this.shouldDelete(this.getLineSquares(exists,i))){
                // console.log('in')
                count++;
                this.deleteOneLine(exists,i);
            }
        }
        return count;
    }
    private static deleteOneLine(exists:Square[],y:number){
        const squares=exists.filter(it=>it.point.y===y)
        squares.forEach(element => {
            if(element.view&&element.point.y===y){
                element.view.hidden();
            }
            const index=exists.indexOf(element);
            exists.splice(index,1);
        });
        exists.filter(sq=>sq.point.y<y).forEach(it=>{
            it.point={
                x:it.point.x,
                y:it.point.y+1,
            }
        })
    }
}