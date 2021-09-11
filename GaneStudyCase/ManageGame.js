class ManageGame {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.backGroudImg = new Image();
        this.backGroudImg.src = 'nen.png'

    }

    init() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.snake = new Snake(this.context);
        this.prey = new Prey(this.context);
        this.rock = new Rock(this.context);
    }
    random() {

            this.prey.update();
            this.rock.update();
            setTimeout(() => this.random(),5000);

    }
    update() {

        if (this.snake.x === this.prey.x && this.snake.y === this.prey.y){
            this.snake.eatAudio.play();
            this.prey.update();
            this.snake.max++;
            this.snake.index++
        }

        if (this.snake.endGame() || this.end()) {
            document.getElementById('loses').innerText = "Game over! Try again late";
        }
    }
    draw() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.context.drawImage(this.backGroudImg,0,0)
        this.context.font= '16px Arial'
        this.context.fillText('Point: ' + this.snake.index,10,20,50)
        this.rock.draw();
        this.prey.draw();
        this.snake.draw();

    }end(){
        if (this.snake.x === this.rock.x && this.snake.y === this.rock.y){
            return true
        }
        return false;
    }
    soundLoser() {
        let song = new Audio();
        song.src = 'lose.mp3';
        song.volume = 0.2;
        song.play();
    }
}


let manage = new ManageGame();

function run() {
    manage.draw();
    manage.update()
    if (manage.snake.endGame() || manage.end())return manage.soundLoser()
    requestAnimationFrame(run)
}
function start() {
    manage.init()

    manage.random()
    manage.snake.update()


    run()
}

let o = document.getElementById("canvas")
o.addEventListener("click", ()=>{
    start()
})