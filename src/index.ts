import { GamePageView } from './core/viewer/GamePageView';
// import { MoveDirection } from './core/types';
// import { TerisRule } from './core/TerisRule';
// import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageView";
import $ from 'jquery'
import { SquareGroup } from "./core/SquareGroup";
// import { createTeris } from "./core/Teris";
import { Game } from './core/Game';

const game=new Game(new GamePageView())

// console.log(TerisRule.canIMove(group.shape,{x:8,y:8}))

// const sq =new Square({x:3,y:3},'red');

// sq.view=new SquarePageViewer(sq,$('#root'))
// sq.view.show()

// const sq=new SquareGroup([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],{x:0,y:0},'red');
// sq.squares.map(item=>item.view=new SquarePageViewer(item,$("#root")) )
// sq.rotate()

// $('#moveDown').on('click',()=>{
//     game.controlDown()
// })
// $('#moveLeft').on('click',()=>{
//     game.controlLeft()
// })
// $('#moveRight').on('click',()=>{
//     game.controlRight()
// })
// $('#moveUp').on('click',()=>{
//     game.pause()
// })
// $("#rotate").on('click',()=>{
//     game.controlRotate()
// })
// $("#remove").on('click',()=>{
//     game.start()
// })
// $("#create").on('click',()=>{
//     // sq.view?.show() 里面有判断，每次删除了就不能重新显示
//     sq.view=new SquarePageViewer(sq,$('#root'))
// })