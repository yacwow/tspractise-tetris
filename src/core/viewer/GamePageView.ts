import { SquarePageViewer } from './SquarePageView';
import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameView } from "../types";
import $ from 'jquery'
import { Game } from '../Game';
import GameConfig from '../GameConfig';
import PageConfig from './PageConfig';

export class GamePageView implements GameView{
    private flag:boolean=false;
    onGamePause(): void {
       $(".msg").css({
        display:'flex'
       });
       $(".msg").find('p').html('paused')
    }
    onGameStart(): void {
        $(".msg").hide();
    }
    onGameOver(): void {
        $(".msg").show();
        $(".msg").find('p').html('game over')
    }
    showScore(score: number): void {
        $("#score").html('score:'+score.toString())
    }
    init(game: Game): void {
        $("#game").css({
            width:GameConfig.gameSize.width*PageConfig.SquareSize.width,
            height:GameConfig.gameSize.height*PageConfig.SquareSize.height,
        })
        $("#help").css({
            display:'flex',
            width:GameConfig.gameSize.width*PageConfig.SquareSize.width,
            height:GameConfig.gameSize.height*PageConfig.SquareSize.height,
        })
        for(let i=0;i<GameConfig.gameSize.width;i++){
            $("<div>").css({
                width:'30px',
                boxSizing:'border-box'
            }).appendTo($('#help'))
        }
        $("#info").css({
            width:GameConfig.infoSize.width*PageConfig.SquareSize.width,
            height:GameConfig.infoSize.height*PageConfig.SquareSize.height,
        })
        $(document).on('keydown',(e)=>{
            e.preventDefault()
            if(e.keyCode===37){
                game.controlLeft()
            }else if(e.keyCode===38){
                game.controlRotate();
            }else if(e.keyCode===39){
                game.controlRight();
            }else if(e.keyCode===40){
                game.controlDown()
            }else if(e.keyCode===32){
                if(game.gameStatus===GameStatus.playing){
                    game.pause()
                }else{
                    game.start()
                }
            }
            if(e.keyCode===72){
                if(!this.flag){
                    $("#help div").css({
                        border:'1px solid red'
                    })
                    
                }else{
                    $("#help div").css({
                        border:'0px solid red'
                    })
                }
                this.flag=!this.flag;
            }
            
        })
    }
    showNext(teris: SquareGroup): void {
       teris.squares.map(it=>{
        it.view=new SquarePageViewer(it,$('#info'))
       })
    }
    switch(teris: SquareGroup): void {
        teris.squares.map(it=>{
            it.view!.hidden()
            it.view=new SquarePageViewer(it,$('#game'))
           })
    }
    
}