const DATA={players:[],clubs:[],associations:[],tournaments:[]};
let state={view:"players",q:"",detail:null};
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const WEB="./web/";
let MANIFEST=null,SEARCH=[];
const CACHE=new Map();
async function getJSON(url){
  if(CACHE.has(url)) return CACHE.get(url);
  const p=fetch(url,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status+" "+url);return r.json()});
  CACHE.set(url,p); return p;
}
function norm(s){return String(s??"").toLocaleLowerCase("de-DE").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}
function label(o){return o?.name||o?.canonical_name||o?.player_name||o?.club_name||o?.tournament_name||o?.association_name||o?.label||o?.id||""}
function ident(o){return String(o?.player_id||o?.club_id||o?.association_id||o?.tournament_id||o?.result_id||o?.round_id||o?.drl_entry_id||o?.dmv_entry_id||o?.id||"")}
function link(v,k,t){return '<button class="link" onclick="openItem('+JSON.stringify(v)+','+JSON.stringify(String(k))+')">'+esc(t||k)+'</button>'}
function setView(v){state={view:v,q:"",detail:null};$("#search").value="";document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===v));render()}
function openItem(v,k){state={view:v,q:"",detail:String(k)};$("#search").value="";render()}
function renderStats(){const d=MANIFEST?.counts||{};const defs=[["players","Spieler"],["clubs","Vereine"],["associations","Verbände"],["tournaments","Turniere"],["results","Ergebnisse"],["rounds","Runden"],["drl","DRL"],["dmv","DMV"]];$("#stats").innerHTML=defs.map(([k,l])=>'<button class="stat" onclick="setView(\''+k+'\')"><b>'+Number(d[k]||0).toLocaleString("de-DE")+'</b><span>'+l+'</span></button>').join("")}
function renderStatus(ok=true,msg=""){const c=MANIFEST?.counts||{};$("#drl-status").innerHTML='<div class="drl-status ok"><b>Datenbank:</b> '+(ok?"Webindex aktiv":"Laden…")+' · '+Number(c.players||0).toLocaleString("de-DE")+' Spieler · '+Number(c.drl||0).toLocaleString("de-DE")+' DRL · '+Number(c.dmv||0).toLocaleString("de-DE")+' DMV</div>'+(msg?'<div class="drl-status warn"><b>Fehler:</b> '+esc(msg)+'</div>':"")}
function rowsFor(v){return DATA[v]||[]}
function renderTable(rows,view){
  if(!rows.length){$("#tablewrap").innerHTML='<div class="empty">Keine Datensätze gefunden.</div>';return}
  const cols=Object.keys(rows[0]).slice(0,8);
  $("#tablewrap").innerHTML='<div class="tablebox"><table><thead><tr>'+cols.map(c=>'<th>'+esc(c)+'</th>').join("")+'</tr></thead><tbody>'+rows.slice(0,500).map(o=>'<tr>'+cols.map(c=>'<td>'+((["player_id","club_id","association_id","tournament_id","result_id","round_id"].includes(c)&&o[c])?link(c.replace("_id","")+"s",o[c],o[c]):esc(o[c]))+'</td>').join("")+'</tr>').join("")+'</tbody></table></div><div class="history-stat">'+rows.length.toLocaleString("de-DE")+' Treffer · Anzeige maximal 500</div>'
}
function filterRows(rows){const q=norm(state.q);return !q?rows:rows.filter(o=>Object.values(o).some(v=>norm(v).includes(q)))}
function renderCoverage(){const c=MANIFEST?.counts||{};$("#relation-coverage").innerHTML='<div class="coverage-card"><span>Architektur</span><b>Index + On-Demand</b><small>iPhone-optimiert</small></div><div class="coverage-card"><span>Quellen</span><b>Geprüfte Masterdaten</b><small>Keine Voll-Ladung beim Start</small></div><div class="coverage-card"><span>DRL</span><b>'+Number(c.drl||0).toLocaleString("de-DE")+'</b><small>kanonische Shards</small></div><div class="coverage-card"><span>DMV</span><b>'+Number(c.dmv||0).toLocaleString("de-DE")+'</b><small>16 öffentliche Shards</small></div>'}
async function loadBase(){
  MANIFEST=await getJSON(WEB+"manifest.json");
  [DATA.players,DATA.clubs,DATA.associations,DATA.tournaments]=await Promise.all([
    getJSON(WEB+"players-index.json"),getJSON(WEB+"clubs-index.json"),getJSON(WEB+"associations-index.json"),getJSON(WEB+"tournaments-index.json")
  ]);
  SEARCH=await getJSON(WEB+"search-index.json");
}
function searchEntities(q){
  const n=norm(q); if(!n)return [];
  return SEARCH.filter(x=>norm(x.label+" "+x.keywords).includes(n)).slice(0,40);
}
async function loadCatalog(view){
  const files=MANIFEST.catalog?.[view]||[];
  const all=[];
  for(const f of files){const part=await getJSON(WEB+"catalog/"+f);all.push(...part)}
  return all;
}
async function playerDetail(id){
  const b=String(id).match(/^\d+$/)?String(Math.floor(Number(id)/100)).padStart(4,"0"):"0000";
  const x=await getJSON(WEB+"players/"+b+".json"); return x[String(id)]||null;
}
async function clubDetail(id){return getJSON(WEB+"clubs/"+id+".json")}
async function associationDetail(id){return getJSON(WEB+"associations/"+id+".json")}
function tourBucket(id){let n=0;for(let i=0;i<String(id).length;i++)n+=((i+1)*String(id).charCodeAt(i));return (n%256).toString(16).padStart(2,"0")}
async function tournamentDetail(id){const x=await getJSON(WEB+"tournaments/"+tourBucket(id)+".json");return x[String(id)]||null}
function historyTable(title,rows){
  if(!rows?.length)return "";
  const cols=Object.keys(rows[0]).slice(0,7);
  return '<details open><summary>'+esc(title)+' ('+rows.length.toLocaleString("de-DE")+')</summary><div class="tablebox"><table><thead><tr>'+cols.map(c=>'<th>'+esc(c)+'</th>').join("")+'</tr></thead><tbody>'+rows.slice(0,100).map(o=>'<tr>'+cols.map(c=>'<td>'+esc(o[c])+'</td>').join("")+'</tr>').join("")+'</tbody></table></div></details>'
}
async function renderDetail(){
  const v=state.view,id=state.detail;
  let d=null;
  if(v==="players")d=await playerDetail(id);
  else if(v==="clubs")d=await clubDetail(id);
  else if(v==="associations")d=await associationDetail(id);
  else if(v==="tournaments")d=await tournamentDetail(id);
  if(!d){$("#detail").innerHTML='<div class="empty">Datensatz nicht gefunden.</div>';return}
  let title="",body="";
  if(v==="players"){
    const p=d.player; title=p.name;
    body='<div class="history-links"><b>Verein:</b> '+esc(p.current_club_id||"—")+' · <b>Verband:</b> '+esc(p.current_association_id||"—")+' · <b>Passnummer:</b> '+esc(p.pass_number||"—")+'</div>'+
      '<div class="history-links"><b>Ergebnisse:</b> '+d.results.length+' · <b>Runden:</b> '+d.rounds.length+' · <b>DRL:</b> '+d.drl.length+' · <b>DMV:</b> '+d.dmv.length+'</div>'+
      historyTable("Ergebnisse",d.results)+historyTable("Runden",d.rounds)+historyTable("DRL",d.drl)+historyTable("DMV",d.dmv);
  } else if(v==="clubs"){
    title=d.club.canonical_name;
    body='<div class="history-links"><b>Verband:</b> '+esc(d.club.association_id||"—")+' · <b>Spieler:</b> '+d.player_ids.length+'</div>'+
      historyTable("Spieler",d.player_ids.map(id=>DATA.players.find(p=>String(p.player_id)===String(id))).filter(Boolean));
  } else if(v==="associations"){
    title=d.association.association_name;
    body='<div class="history-links"><b>Spieler:</b> '+d.player_ids.length+' · <b>Vereine:</b> '+d.club_ids.length+'</div>'+
      historyTable("Vereine",d.club_ids.map(id=>DATA.clubs.find(c=>String(c.club_id)===String(id))).filter(Boolean));
  } else {
    title=d.tournament.tournament_name;
    body='<div class="history-links"><b>Datum:</b> '+esc(d.tournament.date||"—")+' · <b>Ort:</b> '+esc(d.tournament.location||"—")+' · <b>Ergebnisse:</b> '+d.result_ids.length+' · <b>Runden:</b> '+d.round_ids.length+'</div>'+
      '<div class="history-links">Die zugehörigen Ergebnisse und Runden werden bei Bedarf aus den Katalogen geladen.</div>';
  }
  $("#detail").innerHTML='<div class="history-section"><div class="history-title">'+esc(title)+'</div>'+body+'</div>';
  $("#tablewrap").innerHTML="";
}
async function render(){
  if(!MANIFEST){$("#title").textContent="Datenbank wird geladen…";return}
  const labels={players:"Spieler",clubs:"Vereine",tournaments:"Turniere",associations:"Verbände",results:"Ergebnisse",rounds:"Runden",drl:"DRL-Listen",dmv:"DMV-Daten"};
  $("#viewLabel").textContent=labels[state.view]||"Datenbank";$("#title").textContent=state.detail?"Detailansicht":labels[state.view]+"übersicht";
  renderStats();renderStatus();renderCoverage();
  if(state.detail){try{await renderDetail()}catch(e){renderStatus(false,e.message);$("#detail").innerHTML='<div class="empty">Daten konnten nicht geladen werden.</div>'}return}
  let rows=rowsFor(state.view);
  if(["results","rounds","drl","dmv"].includes(state.view)){
    if(!DATA[state.view].length)DATA[state.view]=await loadCatalog(state.view);
    rows=DATA[state.view];
  }
  rows=filterRows(rows);$("#count").textContent=rows.length.toLocaleString("de-DE")+" Datensätze";$("#detail").innerHTML="";renderTable(rows,state.view);
}
function renderSearchResults(q){
  const box=$("#search-results");
  if(!q){box.innerHTML="";return}
  const map={player:"players",club:"clubs",association:"associations",tournament:"tournaments"};
  box.innerHTML=searchEntities(q).map(x=>{
    const v=map[x.type]||x.type;
    return '<button onclick="openItem('+JSON.stringify(v)+','+JSON.stringify(x.id)+')">'+esc(x.label)+' <small>('+esc(x.type)+')</small></button>'
  }).join("")
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
(async()=>{try{await loadBase();render()}catch(e){renderStatus(false,e.message);$("#title").textContent="Datenbank konnte nicht geladen werden";$("#detail").innerHTML='<div class="empty">Die Webdaten sind noch nicht veröffentlicht oder konnten nicht geladen werden.</div>'}})();
