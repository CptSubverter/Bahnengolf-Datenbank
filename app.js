const DATA={players:[],clubs:[],associations:[],tournaments:[],results:[],rounds:[],drl:[],dmv:[]};
const INDEX={};
let state={view:"players",q:"",detail:null};
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SOURCES={players:"data/players.csv",clubs:"data/clubs.csv",associations:"data/associations.csv",tournaments:"data/tournaments.csv",results:"data/results.csv",rounds:"data/rounds.csv"};
const DMV_SHARDS=Array.from({length:16},(_,i)=>`data/dmv_entries_${String(i+1).padStart(2,"0")}.csv`);
const DRL_SHARDS=Array.from({length:8},(_,i)=>`data/drl_entries_${String(i+1).padStart(2,"0")}.json`);
const DRL_OVERRIDE_URL="data/drl_identity_overrides.json";
let DRL_OVERRIDES={},DRL_STATUS={loaded:false,shards:0,rows:0,expected:213155},DMV_STATUS={loaded:false,shards:0,rows:0,expected:156744};
function parseCSV(t){const rows=[];let row=[],cell="",quoted=false;for(let i=0;i<t.length;i++){const c=t[i],n=t[i+1];if(c==='"'&&quoted&&n==='"'){cell+='"';i++;continue}if(c==='"'){quoted=!quoted;continue}if(c===','&&!quoted){row.push(cell);cell="";continue}if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(cell);cell="";continue}cell+=c}if(cell||row.length){row.push(cell);if(row.some(x=>x.trim()))rows.push(row)}if(!rows.length)return[];const h=rows.shift().map(x=>x.trim());return rows.map(r=>Object.fromEntries(h.map((k,i)=>[k,(r[i]??"").trim()])))}
function val(o,...keys){for(const k of keys)if(o?.[k]!=null&&o[k]!=="")return o[k];return""}
function ident(o){return val(o,"player_id","club_id","association_id","tournament_id","result_id","round_id","drl_entry_id","dmv_entry_id","id")}
function label(o){return val(o,"name","canonical_name","player_name","club_name","tournament_name","association_name","original_name","normalized_name")||ident(o)}
function norm(s){return String(s??"").toLocaleLowerCase("de-DE").trim()}
function rebuildIndexes(){Object.keys(DATA).forEach(v=>INDEX[v]=new Map((DATA[v]||[]).map(o=>[String(ident(o)),o])))}
function findById(v,k){return INDEX[v]?.get(String(k))}
function link(v,k,t){return '<button class="link" onclick="openItem('+JSON.stringify(v)+','+JSON.stringify(String(k))+')">'+esc(t||k)+'</button>'}
function setView(v){state={view:v,q:"",detail:null};$("#search").value="";document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===v));render()}
function openItem(v,k){state={view:v,q:"",detail:String(k)};$("#search").value="";render()}
async function loadCSV(key,url){try{const r=await fetch(url,{cache:"no-store"});if(r.ok)DATA[key]=parseCSV(await r.text())}catch(e){}}
async function loadDRL(){let all=[],loaded=0;try{const r=await fetch(DRL_OVERRIDE_URL,{cache:"no-store"});if(r.ok){const x=await r.json();DRL_OVERRIDES=Object.fromEntries((x.overrides||[]).map(v=>[String(v.historical_pass_number),v.player_id]))}}catch(e){}const rs=await Promise.all(DRL_SHARDS.map(u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?r.json():[]).catch(()=>[])));rs.forEach(x=>{const rows=Array.isArray(x)?x:(x.rows||[]);if(rows.length){all.push(...rows);loaded++}});all.forEach(r=>{if(!r.player_id&&DRL_OVERRIDES[String(r.pass_number)])r.player_id=DRL_OVERRIDES[String(r.pass_number)]});DATA.drl=all;DRL_STATUS={loaded:loaded===8,shards:loaded,rows:all.length,expected:213155}}
async function loadDMV(){const rs=await Promise.all(DMV_SHARDS.map(u=>fetch(u,{cache:"no-store"}).then(async r=>r.ok?parseCSV(await r.text()):[]).catch(()=>[])));const all=rs.flat();DATA.dmv=all;const loaded=rs.filter(x=>x.length).length;DMV_STATUS={loaded:loaded===16,shards:loaded,rows:all.length,expected:156744}}
function relationSummary(){const p=DATA.players,c=DATA.clubs,a=DATA.associations,r=DATA.results,ro=DATA.rounds,d=DATA.drl,m=DATA.dmv;return{playersClubs:p.filter(x=>x.current_club_id&&findById("clubs",x.current_club_id)).length,playersAssociations:p.filter(x=>x.current_association_id&&findById("associations",x.current_association_id)).length,clubAssociations:c.filter(x=>x.association_id&&findById("associations",x.association_id)).length,resultPlayers:r.filter(x=>x.player_id&&findById("players",x.player_id)).length,resultTournaments:r.filter(x=>x.tournament_id&&findById("tournaments",x.tournament_id)).length,resultClubs:r.filter(x=>x.club_id&&findById("clubs",x.club_id)).length,roundsResults:ro.filter(x=>x.result_id&&findById("results",x.result_id)).length,roundPlayers:ro.filter(x=>x.player_id&&findById("players",x.player_id)).length,roundTournaments:ro.filter(x=>x.tournament_id&&findById("tournaments",x.tournament_id)).length,drlPlayers:d.filter(x=>x.player_id&&findById("players",x.player_id)).length,dmvPlayers:m.filter(x=>x.player_id&&findById("players",x.player_id)).length}}
function relationHealth(){const s=relationSummary(),checks=[["Spieler → Verein",s.playersClubs,DATA.players.length],["Spieler → Verband",s.playersAssociations,DATA.players.length],["Verein → Verband",s.clubAssociations,DATA.clubs.length],["Ergebnis → Spieler",s.resultPlayers,DATA.results.length],["Ergebnis → Turnier",s.resultTournaments,DATA.results.length],["Ergebnis → Verein",s.resultClubs,DATA.results.length],["Runde → Ergebnis",s.roundsResults,DATA.rounds.length],["Runde → Spieler",s.roundPlayers,DATA.rounds.length],["Runde → Turnier",s.roundTournaments,DATA.rounds.length],["DRL → Spieler",s.drlPlayers,DATA.drl.length],["DMV → Spieler",s.dmvPlayers,DATA.dmv.length]];const total=checks.reduce((a,x)=>a+x[2],0),linked=checks.reduce((a,x)=>a+x[1],0);return{checks,total,linked,open:total-linked}}
function relatedRows(v,obj){
  const id=String(ident(obj)||""), p=String(obj.player_id||""), t=String(obj.tournament_id||""), cl=String(obj.club_id||""), res=String(obj.result_id||"");
  const playerIdsFor=(contextView,contextObj)=>{
    if(contextView==="players") return new Set([String(contextObj.player_id||"")]);
    if(contextView==="clubs") return new Set(DATA.players.filter(x=>String(x.current_club_id||"")===String(contextObj.club_id||"")).map(x=>String(x.player_id)));
    if(contextView==="associations") return new Set(DATA.players.filter(x=>String(x.current_association_id||"")===String(contextObj.association_id||"")).map(x=>String(x.player_id)));
    if(contextView==="tournaments"){
      const tid=String(contextObj.tournament_id||"");
      return new Set([...DATA.results.filter(x=>String(x.tournament_id||"")===tid).map(x=>x.player_id),...DATA.rounds.filter(x=>String(x.tournament_id||"")===tid).map(x=>x.player_id)].filter(Boolean).map(String));
    }
    if(contextView==="results"||contextView==="rounds") return new Set(p?[p]:[]);
    return new Set();
  };
  const pids=playerIdsFor(state.view,obj);
  if(v==="players") return pids.size ? DATA.players.filter(x=>pids.has(String(x.player_id))) : [];
  if(v==="clubs"){
    if(state.view==="players") return DATA.clubs.filter(x=>String(x.club_id||"")===String(obj.current_club_id||""));
    if(state.view==="associations") return DATA.clubs.filter(x=>String(x.association_id||"")===id);
    if(pids.size) return DATA.clubs.filter(x=>[...pids].some(pid=>String(findById("players",pid)?.current_club_id||"")===String(x.club_id||"")));
    if(cl) return DATA.clubs.filter(x=>String(x.club_id)===cl);
    return [];
  }
  if(v==="associations"){
    if(state.view==="players") return DATA.associations.filter(x=>String(x.association_id||"")===String(obj.current_association_id||""));
    if(state.view==="clubs") return DATA.associations.filter(x=>String(x.association_id||"")===String(obj.association_id||""));
    if(pids.size){
      const aids=new Set([...pids].map(pid=>findById("players",pid)?.current_association_id).filter(Boolean).map(String));
      return DATA.associations.filter(x=>aids.has(String(x.association_id)));
    }
    return [];
  }
  if(v==="tournaments"){
    const tids=new Set();
    if(state.view==="results"||state.view==="rounds"){ if(t) tids.add(t); }
    else if(state.view==="players"){
      DATA.results.filter(x=>String(x.player_id)===String(obj.player_id)).forEach(x=>x.tournament_id&&tids.add(String(x.tournament_id)));
      DATA.rounds.filter(x=>String(x.player_id)===String(obj.player_id)).forEach(x=>x.tournament_id&&tids.add(String(x.tournament_id)));
    } else if(state.view==="clubs"||state.view==="associations"){
      const ids=playerIdsFor(state.view,obj);
      DATA.results.filter(x=>ids.has(String(x.player_id))&&x.tournament_id).forEach(x=>tids.add(String(x.tournament_id)));
      DATA.rounds.filter(x=>ids.has(String(x.player_id))&&x.tournament_id).forEach(x=>tids.add(String(x.tournament_id)));
    }
    return DATA.tournaments.filter(x=>tids.has(String(x.tournament_id)));
  }
  if(v==="results"){
    if(state.view==="players") return DATA.results.filter(x=>String(x.player_id)===String(obj.player_id));
    if(state.view==="tournaments") return DATA.results.filter(x=>String(x.tournament_id)===String(obj.tournament_id));
    if(state.view==="rounds") return DATA.results.filter(x=>String(x.result_id)===String(obj.result_id));
    if(state.view==="clubs"||state.view==="associations"){ const ids=playerIdsFor(state.view,obj); return DATA.results.filter(x=>ids.has(String(x.player_id))||String(x.club_id||"")===String(obj.club_id||"")); }
    if(res) return DATA.results.filter(x=>String(x.result_id)===res);
    return [];
  }
  if(v==="rounds"){
    if(state.view==="players") return DATA.rounds.filter(x=>String(x.player_id)===String(obj.player_id));
    if(state.view==="results") return DATA.rounds.filter(x=>String(x.result_id)===String(obj.result_id));
    if(state.view==="tournaments") return DATA.rounds.filter(x=>String(x.tournament_id)===String(obj.tournament_id));
    if(state.view==="clubs"||state.view==="associations"){ const ids=playerIdsFor(state.view,obj); return DATA.rounds.filter(x=>ids.has(String(x.player_id))); }
    return [];
  }
  if(v==="drl"){
    if(state.view==="players") return DATA.drl.filter(x=>String(x.player_id)===String(obj.player_id)||String(x.pass_number||"")===String(obj.pass_number||""));
    if(pids.size) return DATA.drl.filter(x=>pids.has(String(x.player_id)));
    return [];
  }
  if(v==="dmv"){
    if(state.view==="players") return DATA.dmv.filter(x=>String(x.player_id)===String(obj.player_id)||String(x.pass_number||"")===String(obj.pass_number||""));
    if(pids.size) return DATA.dmv.filter(x=>pids.has(String(x.player_id)));
    return [];
  }
  return [];
}

function renderStats(){const defs=[["players","Spieler"],["clubs","Vereine"],["associations","Verbände"],["tournaments","Turniere"],["results","Ergebnisse"],["rounds","Runden"],["drl","DRL"],["dmv","DMV"]];$("#stats").innerHTML=defs.map(([k,l])=>'<button class="stat" onclick="setView(\''+k+'\')"><b>'+DATA[k].length.toLocaleString("de-DE")+'</b><span>'+l+'</span></button>').join("")}
function renderStatus(){const d=DRL_STATUS,m=DMV_STATUS;$("#drl-status").innerHTML='<div class="drl-status '+(d.loaded&&d.rows===d.expected?"ok":"warn")+'"><b>DRL:</b> '+d.rows.toLocaleString("de-DE")+' / 213.155 · '+d.shards+'/8 Shards</div><div class="drl-status '+(m.loaded&&m.rows===m.expected?"ok":"warn")+'"><b>DMV:</b> '+m.rows.toLocaleString("de-DE")+' / 156.744 · '+m.shards+'/16 Shards</div>'}
function renderCoverage(){const s=relationSummary(),rows=[["Spieler → Verein",s.playersClubs,DATA.players.length],["Spieler → Verband",s.playersAssociations,DATA.players.length],["Verein → Verband",s.clubAssociations,DATA.clubs.length],["Ergebnis → Spieler",s.resultPlayers,DATA.results.length],["Ergebnis → Turnier",s.resultTournaments,DATA.results.length],["Ergebnis → Verein",s.resultClubs,DATA.results.length],["Runde → Ergebnis",s.roundsResults,DATA.rounds.length],["Runde → Spieler",s.roundPlayers,DATA.rounds.length],["Runde → Turnier",s.roundTournaments,DATA.rounds.length],["DRL → Spieler",s.drlPlayers,DATA.drl.length],["DMV → Spieler",s.dmvPlayers,DATA.dmv.length]];$("#relation-coverage").innerHTML=rows.map(x=>'<div class="coverage-card"><span>'+esc(x[0])+'</span><b>'+x[1].toLocaleString("de-DE")+' / '+x[2].toLocaleString("de-DE")+'</b><small>'+((x[2]?x[1]/x[2]*100:100).toFixed(1))+' %</small></div>').join("")}
function rowMatches(o){const q=norm(state.q);return !q||Object.values(o).some(v=>norm(v).includes(q))}
function viewForField(c){return ({player_id:"players",club_id:"clubs",association_id:"associations",tournament_id:"tournaments",result_id:"results",round_id:"rounds",drl_entry_id:"drl",dmv_entry_id:"dmv"})[c]}
function renderTable(rows){if(!rows.length){$("#tablewrap").innerHTML='<div class="empty">Keine Datensätze gefunden.</div>';return}const cols=Object.keys(rows[0]).slice(0,8);$("#tablewrap").innerHTML='<div class="tablebox"><table><thead><tr>'+cols.map(c=>'<th>'+esc(c)+'</th>').join("")+'</tr></thead><tbody>'+rows.slice(0,500).map(o=>'<tr>'+cols.map(c=>'<td>'+((viewForField(c)&&o[c])?link(viewForField(c),o[c],o[c]):esc(o[c]))+'</td>').join("")+'</tr>').join("")+'</tbody></table></div><div class="history-stat">'+rows.length.toLocaleString("de-DE")+' Treffer · Anzeige maximal 500</div>'}

function playerHistory(p){const club=findById("clubs",p.current_club_id),assoc=findById("associations",p.current_association_id),res=DATA.results.filter(x=>String(x.player_id)===String(p.player_id)),rounds=DATA.rounds.filter(x=>String(x.player_id)===String(p.player_id)),drl=DATA.drl.filter(x=>String(x.player_id)===String(p.player_id)),dmv=DATA.dmv.filter(x=>String(x.player_id)===String(p.player_id)||String(x.pass_number||"")===String(p.pass_number||""));const tournaments=[...new Map(res.map(x=>{const t=findById("tournaments",x.tournament_id);return t?[t.tournament_id,t]:null}).filter(Boolean)).values()];return '<div class="history-section"><div class="history-title">Spielerprofil</div><div class="history-links"><b>Verein:</b> '+(club?link("clubs",club.club_id,club.canonical_name):"nicht zugeordnet")+' · <b>Verband:</b> '+(assoc?link("associations",assoc.association_id,assoc.association_name):"nicht zugeordnet")+'</div><div class="history-links"><b>Turniere:</b> '+tournaments.length.toLocaleString("de-DE")+' · <b>Ergebnisse:</b> '+res.length.toLocaleString("de-DE")+' · <b>Runden:</b> '+rounds.length.toLocaleString("de-DE")+' · <b>DRL:</b> '+drl.length.toLocaleString("de-DE")+' · <b>DMV:</b> '+dmv.length.toLocaleString("de-DE")+'</div>'+historyTable("Turniere",tournaments,"tournaments")+historyTable("Ergebnisse",res,"results")+historyTable("Runden",rounds,"rounds")+historyTable("DRL",drl.slice(0,300),"drl")+historyTable("DMV",dmv.slice(0,300),"dmv")+'</div>'}

function historyTable(title,rows,view){if(!rows.length)return "";const cols=Object.keys(rows[0]).slice(0,7);return '<details open><summary>'+esc(title)+' ('+rows.length.toLocaleString("de-DE")+')</summary><div class="tablebox"><table><thead><tr>'+cols.map(c=>'<th>'+esc(c)+'</th>').join("")+'</tr></thead><tbody>'+rows.slice(0,100).map(o=>'<tr>'+cols.map(c=>'<td>'+((viewForField(c)&&o[c])?link(viewForField(c),o[c],o[c]):esc(o[c]))+'</td>').join("")+'</tr>').join("")+'</tbody></table></div></details>'}

function renderDetail(){const o=findById(state.view,state.detail);if(!o){$("#detail").innerHTML='<div class="empty">Datensatz nicht gefunden.</div>';return}$("#detail").innerHTML='<div class="history-section"><div class="history-title">'+esc(label(o))+'</div><div class="detail-grid">'+Object.entries(o).map(([k,v])=>'<div><small>'+esc(k)+'</small><b>'+esc(v||"—")+'</b></div>').join("")+'</div></div>'+(state.view==="players"?playerHistory(o):'<div class="history-section"><div class="history-title">Verknüpfte Daten</div>'+["players","clubs","associations","tournaments","results","rounds","drl","dmv"].filter(v=>v!==state.view).map(v=>{const rr=relatedRows(v,o);return rr.length?'<details><summary>'+esc(v)+' ('+rr.length.toLocaleString("de-DE")+')</summary>'+historyTable("",rr.slice(0,100),v)+'</details>':""}).join("")+'</div>');$("#tablewrap").innerHTML=""}
function renderIntegrity(){const h=relationHealth();return '<div class="history-section"><div class="history-title">Integritätsprüfung</div><div class="history-links"><b>'+h.linked.toLocaleString("de-DE")+'</b> verknüpfte Relationen · <b>'+h.open.toLocaleString("de-DE")+'</b> offene Relationen</div>'+h.checks.map(x=>'<div class="coverage-card"><span>'+esc(x[0])+'</span><b>'+x[1].toLocaleString("de-DE")+' / '+x[2].toLocaleString("de-DE")+'</b><small>'+((x[2]?x[1]/x[2]*100:100).toFixed(1))+' %</small></div>').join("")+'</div>'}
function render(){const labels={players:"Spieler",clubs:"Vereine",tournaments:"Turniere",associations:"Verbände",results:"Ergebnisse",rounds:"Runden",drl:"DRL-Listen",dmv:"DMV-Daten"};$("#viewLabel").textContent=labels[state.view]||"Datenbank";$("#title").textContent=state.detail?"Detailansicht":$("#viewLabel").textContent+"übersicht";renderStats();renderStatus();renderCoverage();if(state.detail){renderDetail();return}const rows=(DATA[state.view]||[]).filter(rowMatches);$("#count").textContent=rows.length.toLocaleString("de-DE")+" Datensätze";if(state.view==="integrity"){$("#detail").innerHTML=renderIntegrity();$("#tablewrap").innerHTML="";return}$("#detail").innerHTML="";renderTable(rows)}
$("#search").addEventListener("input",e=>{state.q=e.target.value;state.detail=null;render();renderSearchResults(e.target.value)});$("#clear").onclick=()=>{state.q="";$("#search").value="";state.detail=null;render();renderSearchResults("")};
function renderSearchResults(q){const box=$("#search-results");if(!q){box.innerHTML="";return}const out=[];for(const v of ["players","clubs","tournaments","associations","results","rounds","drl","dmv"]){(DATA[v]||[]).filter(rowMatches).slice(0,5).forEach(o=>out.push('<button onclick="openItem(\''+v+'\',\''+esc(ident(o))+'\')">'+esc(label(o))+' <small>('+esc(v)+')</small></button>'))}box.innerHTML=out.join("")}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
Promise.all(Object.entries(SOURCES).map(([k,u])=>loadCSV(k,u))).then(()=>Promise.all([loadDRL(),loadDMV()])).then(()=>{rebuildIndexes();render()});
