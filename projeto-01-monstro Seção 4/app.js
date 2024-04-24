new Vue({
    el:'#app',
    data:{
        running: false,
        playerLife:  100, // vida do jogador 
        monsterLife: 100, // vida do monstro
        logs:[] // vetor que armazena todos os logs 
    },
    computed:{
        hasResult() { // método computado
            return this.playerLife == 0 || this.monsterLife == 0 // se a vida do jogador é zero ou a  vida do monstro é zero então o resultado esta disponivel , se a vida do jogar for zero você perdeu mas se a vida montro for zero você venceu
        }
    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial){
            this.hurt('monsterLife',5,10,especial,'Jogador','Monstro','player')
            if(this.monsterLife > 0){ // se monstrou morreu não preciso levar o dano dele
                this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
            }  
        },
        hurt(prop,min,max,especial,source,target,cls){
            const plus = especial ? 5 : 0 // se for verdadeiro ira somar 5 se for falso ira somar 0
            const hurt = this.getRandom(min + plus , max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0) // Essa função garante que o valor não vai fica negativo
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
        },
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
        },
        heal(min,max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal,100) // vai pegar o menor valor entre os dois
            this.registerLog(`Jogador ganhou força de ${heal}.`,'player')
        },
        getRandom(min,max){
            const value = Math.random() * (max - min) + min
            return Math.round(value) // aredonda o valor 
            },
        registerLog(text,cls){
            this.logs.unshift({ text, cls }) // significa que vou colocar o elemento na primeira posição do array. A lista vai ser exibida é log mais recente vai ficar em primeiro.
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})