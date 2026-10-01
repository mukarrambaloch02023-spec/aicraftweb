"use client"

export default function Page() {
  const handleOrder = () => {
    alert("Order received 🚀");
  }

  return (
    <main style={{background:"#070A14", minHeight:"100vh", color:"white"}}>
      
      <section style={{minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"20px", position:"relative", overflow:"hidden"}}>

        {/* Glow */}
        <div style={{position:"absolute", top:"-10%", left:"20%", width:"600px", height:"600px", background:"rgba(109,40,217,0.3)", borderRadius:"50%", filter:"blur(150px)"}}></div>
        <div style={{position:"absolute", bottom:"-10%", right:"15%", width:"600px", height:"600px", background:"rgba(37,99,235,0.25)", borderRadius:"50%", filter:"blur(150px)"}}></div>

        <div style={{position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center"}}>

          <div style={{display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 16px", borderRadius:"999px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", fontSize:"10px", letterSpacing:"2px", color:"rgba(255,255,255,0.6)", marginBottom:"32px"}}>
            ✨ AI POWERED AGENCY
          </div>

          <h1 style={{fontSize:"clamp(40px, 6vw, 72px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-2px"}}>
            <span style={{color:"white"}}>We Build </span>
            <span style={{background:"linear-gradient(to right, #a78bfa, #22d3ee)", WebkitBackgroundClip:"text", color:"transparent"}}>Websites</span>
            <span style={{color:"white", display:"block", marginTop:"4px"}}>That Bring Orders</span>
          </h1>

          <p style={{marginTop:"24px", fontSize:"14px", color:"rgba(255,255,255,0.3)", maxWidth:"500px"}}>
            Premium AI Automations & High-converting designs.
          </p>

          <button onClick={handleOrder} style={{marginTop:"32px", background:"white", color:"black", padding:"14px 32px", borderRadius:"999px", fontWeight:700, fontSize:"13px", border:"none", cursor:"pointer", boxShadow:"0 0 30px rgba(255,255,255,0.4)", transition:"0.2s"}} 
          onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.05) translateZ(20px)"}
          onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}
          >
            Get Your Website 🚀
          </button>

          <p style={{marginTop:"16px", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,255,255,0.2)"}}>HOVER ON BUTTON ✨</p>
        </div>
      </section>
    </main>
  )
}
