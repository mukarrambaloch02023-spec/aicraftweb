import ScrollReveal from "./components/ScrollReveal"

export default function App() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '200vh', padding: '50px' }}>
      <h1 style={{ fontSize: '60px', height: '100vh' }}>Neeche Scroll Karo</h1>
      
      <ScrollReveal>
        <div style={{ background: 'white', color: 'black', padding: '50px', fontSize: '30px', borderRadius: '20px' }}>
          Agar ye animation se aya to sab ok hai!
        </div>
      </ScrollReveal>
    </div>
  )
}
