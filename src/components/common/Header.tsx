// Ye lights ka code hai - isko header ke andar sabse upar lagana
<div className="absolute inset-0 -z-10 overflow-hidden">
  <div className="absolute -top-[200px] left-[20%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
  <div className="absolute -top-[100px] right-[20%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-[float_6s_ease-in-out_infinite]"></div>
  <div className="absolute top-[30%] left-[40%] w-[700px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] animate-[float2_8s_ease-in-out_infinite]"></div>
</div>

<style>{`
@keyframes float { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-30px) translateX(20px)} }
@keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(20px) translateX(-20px)} }
`}</style>
