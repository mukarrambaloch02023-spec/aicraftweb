export default function Page() {
  return (
    <div style={{background:"#070A14", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"white", flexDirection:"column"}}>
      <h1 style={{fontSize: "50px", fontWeight:"900"}}>We Build Websites</h1>
      <p>Site backup is running...</p>
      <button onClick={()=> alert("Working!")} style={{marginTop:"20px", background:"white", color:"black", padding:"10px 20px", borderRadius:"20px"}}>Test Button</button>
    </div>
  )
}
