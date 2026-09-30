"use client"
import ScrollReveal from "./components/ScrollReveal"

export default function App() {
  return (
    <div style={{background:'black', color:'white', minHeight:'200vh', padding:'50px'}}>
      <h1 style={{fontSize:'60px', height:'100vh'}}>WE CREATE DIGITAL</h1>
      
      <ScrollReveal>
        <div style={{background:'white', color:'black', padding:'50px', fontSize:'30px', borderRadius:'20px'}}>
          Ye neeche se ayega - agar ye dikha to ok hai
        </div>
      </ScrollReveal>
    </div>
  )
}
