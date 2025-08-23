
const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

function handleSpecSubmit(e){
  e.preventDefault();
  const f = e.target;
  const get = id => (f.querySelector('#'+id)?.value||'').trim();
  const checkedVals = name => Array.from(f.querySelectorAll(`input[name="${name}"]:checked`)).map(x=>x.value);
  const data = {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    company: get('company'),
    buildTypes: checkedVals('buildType'),
    titles: get('titles'),
    resolution: checkedVals('resolution'),
    vr: get('vr'),
    headset: get('headset'),
    monitors: get('monitors'),
    budget: get('budget'),
    storageOS: get('storageOS'),
    storageMedia: get('storageMedia'),
    storageFootage: get('storageFootage'),
    noise: get('noise'),
    formFactor: get('formFactor'),
    timeline: get('timeline'),
    location: get('location'),
    controllers: checkedVals('controllers'),
    cockpit: get('cockpit'),
    notes: get('notes')
  };

  // Basic validation
  if(!data.name || !data.email){
    alert('Please provide your name and email so we can reply.');
    return;
  }

  // Build email body
  const lines = [];
  for(const [k,v] of Object.entries(data)){
    const val = Array.isArray(v) ? (v.join(', ')||'-') : (v||'-');
    lines.push(`${k}: ${val}`);
  }
  const body = encodeURIComponent(lines.join('\n'));
  const subject = encodeURIComponent(`Spec Intake - ${data.name}`);
  const mailto = `mailto:hello@lazydogcomputing.com?subject=${subject}&body=${body}`;
  // Try to open email client
  window.location.href = mailto;

  // Also copy to clipboard as a fallback
  const pretty = lines.join('\n');
  if(navigator.clipboard){
    navigator.clipboard.writeText(pretty).then(()=>{
      alert('Opened your email client. Your responses were also copied to the clipboard.');
    }).catch(()=>{
      console.log('Clipboard copy failed.');
    });
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('spec-intake-form');
  if(form) form.addEventListener('submit', handleSpecSubmit);
});
