<template lang="pug">
section#calculator
  .calculator
    transition-group.total(name="total")
      span(v-if="state==='clear'" key="clear") 0
      span(v-if="state==='register'" key="register") {{op?'= ':''}}{{register}}  
      span(v-if="state==='op'" key="op") {{op}}{{operative}}
    .clear.mid(@click="clear(0)") C
    .sign.mid(@click="sign") ±
    .percent.mid(@click="percent") %
    .division.accent(@click="operate('÷')") ÷
    .seven(@click="number(7)") 7
    .eight(@click="number(8)") 8
    .nine(@click="number(9)") 9
    .multiply.accent(@click="operate('x')") X
    .four(@click="number(4)") 4
    .five(@click="number(5)") 5 
    .six(@click="number(6)") 6
    .minus.accent(@click="operate('-')") -
    .one(@click="number(1)") 1
    .two(@click="number(2)") 2
    .three(@click="number(3)") 3
    .addition.accent(@click="operate('+')") +
    .zero(@click="number(0)") 0
    .decimal .
    .equals(@click="solve") =
</template>

<script>
// start with cleared
// if cleared, numbers add to register
// if not, numbers add to operative
// set cleared
export default {
   name: 'calculator',
   data() {
      return {
        register: 0,
        operative: 0,
        state: "clear",
        op: false,
      }
   },
  props: {},
  methods:{
    number(num){
      if (this.state === "clear" || this.state === "register"){ 
        //directly add the number to the end of the register string since it's the first number
        if(this.operative!==0){
          // if state is register but there's also a value in operator it means we just hit solve
          // so we need to clear and add instead
          this.clear()
        }
        this.register = Number(this.register+""+String(num))
        this.state = "register"
      }else if(this.state ==="op"){
        this.operative = Number(this.operative+""+String(num))
      }
    },
    operate(oper){
      this.operative = ""
      if (this.state !== "op"){
        // if the state is clear or register it's the first addition
        this.op = oper
      }else{
        solve()
        this.op = oper
      }
      this.state = "op"
    },
    solve(){
      console.log("solver")
      if(this.op==="+"){this.register = this.register + this.operative}
      if(this.op==="-"){this.register = this.register - this.operative}
      if(this.op==="÷"){this.register = this.register / this.operative}
      if(this.op==="x"){this.register = this.register * this.operative}
      this.state = "register"
    },
    clear(){
      console.log("clear")
      this.op = false
      this.state = "clear"
      this.register = 0
      this.operative = 0
    },
    sign(){
      if (this.state === "register"){ this.register *= -1 }
      if (this.state === "op"){ this.operative *= -1 }
    },
    percent(){
      if (this.state === "register"){ this.register /= 100 }
      if (this.state === "op"){ this.operative /= 100 }
    },
  },
  calculated:{
    fullDisplay: function (){
      if(this.state === "clear"){
        return 0
      }
      else if(this.state === "register"){
        return this.register
      }
      else if(this.state === "op"){
        return this.operative
      }
      else{
        return 0
      }
    },
    calcSign: function(){
      if(this.op==="add"){return "+"}
      else if(this.op==="subtract"){return "-"}
      else if(this.op==="divide"){return "÷"}
      else if(this.op==="multiply"){return "x"}
      else{return ""}
    }
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

.total-enter-active
  transition all 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275);
.total-enter
opacity 0
  transform translateX(300%)
.total-enter-to 
  opacity 1
  transform translateX(00%)
.total-leave
  opacity 1
  transform translateY(00%)
.total-leave-to 
  opacity 0
  transform translateY(-300%)
.total-leave-active
  transition all 0.3s cubic-bezier(0.550, 0.055, 0.675, 0.190)

#calculator
  width 100%
  height 100%
  .calculator
    width 100%
    height 100%
    display grid
    background #2D2C2F
    grid-template:\
      "ttl ttl ttl ttl" 1.5fr \
      "clr sgn prc div" 1fr \
      "svn eit nin mlt" 1fr \ 
      "frr fiv six min" 1fr \
      "one two thr pls" 1fr \
      "zer zer dcm eql" 1fr \
      / 1fr 1fr 1fr 1fr
    grid-gap 3px
    >div, >span
      background #6C6467
      display grid 
      justify-content center
      align-content center
      color var(--text-light)
      font-size 30px
      font-family: 'Nunito', sans-serif
      cursor pointer
      user-select none
      transition .05s
      &:hover
        background #575153

    .total
      grid-area ttl
      background transparent
      overflow hidden
      >span 
        grid-row 1/2
        grid-column 1/2
        background transparent
    .clear
      grid-area clr
    .sign
      grid-area sgn
    .percent
      grid-area prc
    .division
      grid-area div
    .seven
      grid-area svn
    .eight
      grid-area eit
    .nine
      grid-area nin
    .multiply
      grid-area mlt
    .four
      grid-area frr
    .five
      grid-area fiv
    .six
      grid-area six
    .minus
      grid-area min
    .one
      grid-area one
    .two
      grid-area two
    .three
      grid-area thr
    .addition
      grid-area pls
    .zero
      grid-area zer
    .decimal
      grid-area dcm
    .equals 
      grid-area eql

    .accent
      background var(--primary)
      &:hover
        background var(--primary-dark)
    .mid
      background gray
</style> 
