import { Game } from './Game';
import { SquareGroup } from './SquareGroup';
export interface IViewer {
    /**
     * 显示该方块
     */
    show(): void,
    /**
     * 隐藏方块
     */
    hidden(): void,
}

export interface Point {
    x: number,
    y: number,
}

export type Shape = Point[];

export enum MoveDirection {
    down,
    left,
    right
}

export enum GameStatus {
    init,
    playing,
    pause,
    over
}

export interface GameView {
    showNext(teris: SquareGroup): void,
    switch(teris: SquareGroup): void,
    init(game:Game):void,
    showScore(score:number):void,
    onGamePause():void,
    onGameStart():void,
    onGameOver():void,
}