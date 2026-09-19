const DATA={players:[],clubs:[],associations:[],tournaments:[],results:[],rounds:[],drl:[],dmv:[]};
let state={view:"players",q:"",detail:null};
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SOURCES={players:"data/players.csv",clubs:"data/clubs.csv",associations:"data/associations.csv",tournaments:"data/tournaments.csv",results:"data/results.csv",rounds:"data/rounds.csv",dmv:"data/dmv_entries.csv"};
const DRL_SHARDS=Array.from({length:8},(_,i)=>`data/drl_entries_${String(i+1).padStart(2,"0")}.json`);
async function load(key){try{const r=await fetch(SOURCES[key],{cache:"no-store"});if(!r.ok)throw 0;DATA[key]=parseCSV(await r.text())}catch(e){DATA[key]=[]}}
async function loadDRL(){let all=[],loaded=0;for(const url of DRL_SHARDS){try{const r=await fetch(url,{cache:"no-store"});if(!r.ok)continue;const x=await r.json();all.push(...(Array.isArray(x)?x:(x.rows||[])));loaded++}catch(e){}}if(loaded){DATA.drl=all;return}try{const r=await fetch("data/drl_entries.csv",{cache:"no-store"});if(r.ok)DATA.drl=parseCSV(await r.text())}catch(e){DATA.drl=[]}}
function parseCSV(t){const rows=[];let row=[],cell="",quoted=false;for(let i=0;i<t.length;i++){const c=t[i],n=t[i+1];if(c==='"'&&quoted&&n==='"'){cell+='"';i++;continue}if(c==='"'){quoted=!quoted;continue}if(c===','&&!quoted){row.push(cell);cell="";continue}if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(cell);cell="";continue}cell+=c}if(cell||row.length){row.push(cell);if(row.some(x=>x.trim()))rows.push(row)}if(!rows.length)return[];const h=rows.shift().map(x=>x.trim());return rows.map(r=>Object.fromEntries(h.map((k,i)=>[k,(r[i]??"").trim()])))}
function val(o,...keys){for(const k of keys)if(o?.[k]!=null&&o[k]!=="")return o[k];return""}
function ident(o){return val(o,"player_id","club_id","association_id","tournament_id","result_id","round_id","drl_entry_id","dmv_entry_id","id")}
function label(o){return val(o,"name","canonical_name","player_name","club_name","tournament_name","association_name","original_name","normalized_name")||ident(o)}
function norm(s){return String(s??"").toLocaleLowerCase("de-DE").trim()}
function matches(o){const q=norm(state.q);return!q||Object.values(o).some(v=>norm(v).includes(q))}
function findById(view,key){return(DATA[view]||[]).find(o=>String(ident(o))===String(key))}
function link(view,key,text){return'<button class="link" onclick="openItem('+JSON.stringify(view)+','+JSON.stringify(String(key))+')">'+esc(text||key)+"</button>"}
function setView(v){state.view=v;state.detail=null;state.q="";$("#search").value="";render()}
function openItem(v,k){state.view=v;state.detail=k;state.q="";$("#search").value="";render()}
function related(view,obj){const keys={players:["player_id","pass_number"],clubs:["club_id"],associations:["association_id"],tournaments:["tournament_id"],results:["result_id","player_id","tournament_id"],rounds:["round_id","result_id","player_id"],drl:["drl_entry_id","player_id","pass_number"],dmv:["dmv_entry_id","player_id","pass_number"]};const source=keys[state.view]||[];const target=keys[view]||[];return(DATA[view]||[]).filter(x=>source.some(k=>obj?.[k]!==undefined&&obj[k]!==""&&target.some(t=>String(x?.[t]??"")===String(obj[k]))))}
function renderStats(){const defs=[["players","Spieler"],["clubs","Vereine"],["associations","Verbände"],["tournaments","Turniere"],["results","Ergebnisse"],["rounds","Runden"],["drl","DRL"],["dmv","DMV"]];$("#stats").innerHTML=defs.map(([k,l])=>'<button class="stat" onclick="setView(\''+k+'\')"><b>'+DATA[k].length.toLocaleString("de-DE")+'</b><span>'+l+"</span></button>").join("")}
function relationSummary(){
  const players=DATA.players||[],clubs=DATA.clubs||[],results=DATA.results||[],rounds=DATA.rounds||[],drl=DATA.drl||[],dmv=DATA.dmv||[];
  return {
    playersClubs:players.filter(x=>x.current_club_id&&findById("clubs",x.current_club_id)).length,
    playersAssociations:players.filter(x=>x.current_association_id&&findById("associations",x.current_association_id)).length,
    clubAssociations:clubs.filter(x=>x.association_id&&findById("associations",x.association_id)).length,
    resultPlayers:results.filter(x=>x.player_id&&findById("players",x.player_id)).length,
    resultTournaments:results.filter(x=>x.tournament_id&&findById("tournaments",x.tournament_id)).length,
    resultClubs:results.filter(x=>x.club_id&&findById("clubs",x.club_id)).length,
    roundsResults:rounds.filter(x=>x.result_id&&findById("results",x.result_id)).length,
    roundPlayers:rounds.filter(x=>x.player_id&&findById("players",x.player_id)).length,
    roundTournaments:rounds.filter(x=>x.tournament_id&&findById("tournaments",x.tournament_id)).length,
    drlPlayers:drl.filter(x=>x.player_id&&findById("players",x.player_id)).length,
    dmvPlayers:dmv.filter(x=>x.player_id&&findById("players",x.player_id)).length
  };
}
function renderIntegrity(){
  const x=relationSummary(), h=relationHealth();
  const defs=[
    ["Spieler → Verein",x.playersClubs,DATA.players.length,"players"],
    ["Spieler → Verband",x.playersAssociations,DATA.players.length,"players"],
    ["Verein → Verband",x.clubAssociations,DATA.clubs.length,"clubs"],
    ["Ergebnis → Spieler",x.resultPlayers,DATA.results.length,"results"],
    ["Ergebnis → Turnier",x.resultTournaments,DATA.results.length,"results"],
    ["Ergebnis → Verein",x.resultClubs,DATA.results.length,"results"],
    ["Runde → Ergebnis",x.roundsResults,DATA.rounds.length,"rounds"],
    ["Runde → Spieler",x.roundPlayers,DATA.rounds.length,"rounds"],
    ["Runde → Turnier",x.roundTournaments,DATA.rounds.length,"rounds"],
    ["DRL → Spieler",x.drlPlayers,DATA.drl.length,"drl"],
    ["DMV → Spieler",x.dmvPlayers,(DATA.dmv||[]).length,"dmv"]
  ];
  const overall='<div class="history-links"><b>Gesamt:</b> '+h.linked.toLocaleString("de-DE")+' / '+h.total.toLocaleString("de-DE")+' Beziehungen verknüpft ('+h.quote.toFixed(1)+' %) · <b>offen:</b> '+h.open.toLocaleString("de-DE")+'</div>';
  return '<div class="history-section"><div class="history-title">Relationaler Datenstatus</div>'+overall+'<div class="tablebox"><table><thead><tr><th>Beziehung</th><th>Verknüpft</th><th>Gesamt</th><th>Quote</th><th>Offen</th></tr></thead><tbody>'+defs.map(d=>{const open=Math.max(0,d[2]-d[1]);return '<tr><td>'+esc(d[0])+'</td><td>'+d[1].toLocaleString("de-DE")+'</td><td>'+d[2].toLocaleString("de-DE")+'</td><td>'+esc(d[2]?((d[1]/d[2])*100).toFixed(1)+" %":"–")+'</td><td>'+((open&&["players","results","rounds","drl","dmv"].includes(d[3]))?'<button class="linkbtn" onclick="showOpenRelations(\''+d[3]+'\')">'+open.toLocaleString("de-DE")+' offene Datensätze</button>':open.toLocaleString("de-DE"))+'</td></tr>'}).join("")+'</tbody></table></div></div><div id="open-relations"></div>';
}

function relationHealth(){
  const s=relationSummary(), checks=[
    ["Spieler → Verein",s.playersClubs,DATA.players.length],
    ["Spieler → Verband",s.playersAssociations,DATA.players.length],
    ["Verein → Verband",s.clubAssociations,DATA.clubs.length],
    ["Ergebnis → Spieler",s.resultPlayers,DATA.results.length],
    ["Ergebnis → Turnier",s.resultTournaments,DATA.results.length],
    ["Ergebnis → Verein",s.resultClubs,DATA.results.length],
    ["Runde → Ergebnis",s.roundsResults,DATA.rounds.length],
    ["Runde → Spieler",s.roundPlayers,DATA.rounds.length],
    ["Runde → Turnier",s.roundTournaments,DATA.rounds.length],
    ["DRL → Spieler",s.drlPlayers,DATA.drl.length],
    ["DMV → Spieler",s.dmvPlayers,(DATA.dmv||[]).length]
  ];
  const total=checks.reduce((a,x)=>a+x[2],0),linked=checks.reduce((a,x)=>a+x[1],0);
  return {checks,total,linked,open:Math.max(0,total-linked),quote:total?linked/total*100:0};
}

function render(){const labels={players:"Spieler",clubs:"Vereine",associations:"Verbände",tournaments:"Turniere",results:"Ergebnisse",rounds:"Runden",drl:"DRL-Listen",dmv:"DMV-Daten"};$("#viewLabel").textContent=labels[state.view]||state.view;$("#title").textContent=state.detail?"Detailansicht":$("#viewLabel").textContent+"übersicht";const data=(DATA[state.view]||[]).filter(matches);$("#count").textContent=(state.detail?1:data.length).toLocaleString("de-DE")+" Datensätze";renderStats();if(state.detail){renderDetail();return}if(state.view==="drl"){$("#tablewrap").innerHTML=renderDrlTable(data)}else{renderTable(data)}if(!state.detail&&state.view==="players"&&!state.q)$("#detail").innerHTML=renderIntegrity()}
$("#search").addEventListener("input",e=>{state.q=e.target.value;state.detail=null;render();renderSearchResults(e.target.value)});$("#clear").onclick=()=>{state.q="";$("#search").value="";state.detail=null;render();renderSearchResults("")};document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));$("#themeBtn").onclick=()=>document.body.classList.toggle("light");Promise.all(Object.keys(SOURCES).map(load)).then(()=>loadDRL()).then(render);