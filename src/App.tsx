export default function Page() {
  return (
    <main style={{background:'black', color:'white'}}>
      <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'50px'}}>
        <div>
          <h1 style={{fontSize:'70px', fontWeight:900, lineHeight:1}}>AICRAFTWEB<br/><span style={{color:'#8b5cf6'}}>3D WEBSITES</span></h1>
          <p style={{marginTop:20, color:'gray'}}>Rs 5000 se shuru - Premium design</p>
          <br/>
          <a href="https://wa.me/923000000000" style={{background:'white', color:'black', padding:'15px 30px', borderRadius:30, fontWeight:'bold', textDecoration:'none'}}>WhatsApp Karo</a>
        </div>

        {/* 3D FLOATING LAPTOP CSS */}
        <div style={{width:'500px', height:'500px', perspective:'1000px'}}>
          <div style={{width:'100%', height:'100%', background:'linear-gradient(135deg, #667eea, #764ba2)', borderRadius:'40px', transform:'rotateY(-20deg) rotateX(15deg)', boxShadow:'0 50px 100px rgba(102,126,234,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'100px', animation:'float 3s infinite ease-in-out'}}>
            💻
          </div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100%{transform:rotateY(-20deg) rotateX(15deg) translateY(0)} 50%{transform:rotateY(-20deg) rotateX(15deg) translateY(-20px)} }`}</style>
    </main>
  )
}
