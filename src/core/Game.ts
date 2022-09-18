import { TerisRule } from './TerisRule';
import { SquareGroup } from './SquareGroup';
import { createTeris } from './Teris';
import {GameStatus, GameView, MoveDirection} from './types'
import GameConfig from './GameConfig';
import { Square } from './Square';

export class Game{
    private _gameStatus:GameStatus=GameStatus.init;
    public get gameStatus(){
        return this._gameStatus
    }
    private _curTeris?:SquareGroup;
    private _nextTeris:SquareGroup;
    private _timer?:any;
    private _duration:number=1500;
    private _exists:Square[]=[];
    private _score:number=0;
    public get score() {
        return this._score;
    }
    public set score(val) {
        this._score = val;
        this._viewer.showScore(val);
        const level = GameConfig.levels.filter(it => it.score <= val).pop()!;
        if (level.duration === this._duration) {
            return;
        }
        this._duration = level.duration;
        console.log(this._duration)
        if(this._timer){
            clearInterval(this._timer);
            this._timer = undefined;
            this.autoFall();
        }
    }
    constructor(private _viewer:GameView){
       this._nextTeris=createTeris({x:0,y:0})
    //    console.log(this._nextTeris)
       this.createNext()
       this._viewer.init(this)
       this.score=0;
    }
    private createNext(){
        // this._nextTeris.squares.map(it=>{
        //     it.view?.hidden()
        // })
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPoint(GameConfig.infoSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }
    start(){
        if(this._gameStatus===GameStatus.playing){
            return;
        }
        if (this._gameStatus === GameStatus.over) {
            //初始化操作
            this.init();
        }
        this._gameStatus=GameStatus.playing;
        if(!this._curTeris){
            this.switchTeris()
        }
        this.autoFall();
        this._viewer.onGameStart()
    }
    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGamePause();
        }
    }
    private init() {
        this._exists.forEach(sq => {
            if (sq.view) {
                sq.view.hidden();
            }
        })
        this._exists = [];
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
    }


    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.left,this._exists);
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.right,this._exists);
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirectly(this._curTeris, MoveDirection.down,this._exists);
            //触底
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris,this._exists);
        }
    }
    private switchTeris(){
        this._curTeris=this._nextTeris;
        this._curTeris.squares.forEach(it=>{
            // it.view?.hidden()
        })
        this.resetCenterPoint(GameConfig.gameSize.width, this._curTeris);
        if(!TerisRule.canIMove(this._curTeris.shape,this._curTeris.centerPoint,this._exists)){
            this._gameStatus=GameStatus.over;
            clearInterval(this._timer)
            this._timer=undefined;
            this._viewer.onGameOver()
            return;
        }
        this._viewer.switch(this._curTeris)
        this.createNext()

    }
    private autoFall(){
        if(this._timer||this._gameStatus!==GameStatus.playing){
            return;
        }
        this._timer=setInterval(()=>{
            if(!TerisRule.move(this._curTeris as SquareGroup,MoveDirection.down,this._exists)){
                this.hitBottom()
            }  
        },this._duration)
    }

    private resetCenterPoint(width: number, teris: SquareGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.centerPoint = { x, y };
        while (teris.squares.some(it => it.point.y < 0)) {
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            };
        }
    }
    private hitBottom(){
        this._exists.push(...this._curTeris!.squares)
        const num=TerisRule.deleteSquares(this._exists)
        this.addScore(num)
        this.switchTeris()
    }
    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10;
        }
        else if (lineNum === 2) {
            this.score += 25;
        }
        else if (lineNum === 3) {
            this.score += 50;
        }
        else {
            this.score += 100;
        }
    }
}